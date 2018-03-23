import path from 'path'
import Window from './window'
import Terms from './terms/index'
import TequilAPI from '../libraries/api/tequilapi'
import communication from './communication/index'
import {app, ipcMain, Menu, Tray} from 'electron'
import ProcessMonitoring from '../libraries/mysterium-client/monitoring'
import {Installer as MysteriumDaemonInstaller, Process as MysteriumProcess, logLevel as processLogLevel} from '../libraries/mysterium-client/index'
import bugReporter from './bug-reporting'

function MysterionFactory (config, termsContent, termsVersion) {
  const tequilApi = new TequilAPI()
  return new Mysterion({
    config,
    terms: new Terms(config.userDataDirectory, termsContent, termsVersion),
    installer: new MysteriumDaemonInstaller(config),
    monitoring: new ProcessMonitoring(tequilApi),
    process: new MysteriumProcess(tequilApi, config.userDataDirectory)
  })
}

class Mysterion {
  constructor ({config, terms, installer, monitoring, process}) {
    Object.assign(this, {config, terms, installer, monitoring, process})
  }

  run () {
    // fired when app has been launched
    app.on('ready', () => {
      this.bootstrap()
      this.buildTray()
    })
    // fired when all windows are closed
    app.on('window-all-closed', () => this.onWindowsClosed())
    // fired just before quitting, this should quit
    app.on('will-quit', () => this.onWillQuit())
    // fired when app activated
    app.on('activate', () => {
      if (!this.window.exists()) {
        return this.bootstrap()
      }
      this.window.show()
    })
    app.on('before-quit', () => {
      this.window.willQuitApp = true
    })
  }

  async bootstrap () {
    this.window = new Window(
      this.terms.accepted()
        ? this.config.windows.app
        : this.config.windows.terms,
      this.config.windows.url
    )

    try {
      await this.window.open().on(communication.RENDERER_LOADED)
    } catch (e) {
      // TODO: add an error wrapper method and send to sentry
      throw new Error('Failed to load app.')
    }

    // make sure terms are up to date and accepted
    // declining terms will quit the app
    if (!this.terms.accepted()) {
      try {
        const accepted = await this.acceptTerms()
        if (!accepted) {
          console.log('Terms were refused. Quitting.')
          app.quit()
          return
        }
      } catch (e) {
        return this.sendErrorToRenderer(e.message)
      }
    }

    // checks if daemon is installed or daemon file is expired
    // if the installation fails, it sends a message to the renderer window
    if (this.installer.needsInstallation()) {
      try {
        await this.installer.install()
      } catch (e) {
        console.error(e)
        return this.sendErrorToRenderer('Failed to install mysterium_client daemon. Please restart the app and grant permissions.')
      }
    }
    // if all is good, let's boot up the client
    // and start monitoring it
    await this.startProcess()
  }

  onWindowsClosed () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  async onWillQuit () {
    this.monitoring.stop()
    try {
      await this.process.stop()
    } catch (e) {
      console.error('Failed to stop mysterium_client process')
      bugReporter.main.captureException(e)
    }
  }

  async acceptTerms () {
    this.window.send(communication.TERMS_REQUESTED, {
      content: this.terms.getContent(),
      version: this.terms.getVersion()
    })

    const termsAnswer = await this.window.on(communication.TERMS_ANSWERED)
    if (!termsAnswer.value) {
      return false
    }

    this.window.send(communication.TERMS_ACCEPTED)

    try {
      this.terms.store()
    } catch (e) {
      console.error(e)
      throw new Error('Failed to make a local copy of terms and conditions. Please restart the app and try again.')
    }

    this.window.resize(this.config.windows.app)

    return true
  }

  async startProcess () {
    const updateRendererWithHealth = () => {
      try {
        this.window.send(communication.HEALTHCHECK, this.monitoring.isRunning())
      } catch (e) {
        // expecting last send calls to fail when window is closed
        return
      }

      setTimeout(() => updateRendererWithHealth(), 1500)
    }
    const cacheLogs = (level, data) => {
      this.window.send(communication.MYSTERIUM_CLIENT_LOG, {data, level})
      bugReporter.pushToLogCache(level, data)
    }

    this.process.start()
    this.monitoring.start()
    this.process.onLog(processLogLevel.LOG, (data) => cacheLogs(processLogLevel.LOG, data))
    this.process.onLog(processLogLevel.ERROR, (data) => cacheLogs(processLogLevel.ERROR, data))
    this.monitoring.onProcessReady(() => {
      updateRendererWithHealth()
      this.startApp()
    })
    ipcMain.on(communication.IDENTITY_SET, (evt, identity) => {
      bugReporter.setUser(identity)
    })
  }

  /**
   * notifies the renderer that we're good to go and sets up the system tray
   */
  startApp () {
    this.window.send(communication.APP_START)
  }

  sendErrorToRenderer (error, hint = '', fatal = true) {
    bugReporter.main.captureException(error)
    this.window.send(communication.APP_ERROR, {message: error, hint: hint, fatal: fatal})
  }

  buildTray () {
    let trayIconPath = path.join(__static, 'icons', 'trayTemplate.png')
    this.tray = new Tray(trayIconPath)

    let menu = []

    menu.push({
      label: 'Quit',
      click: () => {
        app.quit()
      }
    })

    if (this.config.inDevMode) {
      menu = [{
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: () => {
          this.window.toggleDevTools()
        }
      }, ...menu]
    }

    this.tray.setToolTip('Mysterium')
    this.tray.setContextMenu(Menu.buildFromTemplate(menu))
  }
}

export default MysterionFactory