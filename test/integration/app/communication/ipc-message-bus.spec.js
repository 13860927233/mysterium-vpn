/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @flow

import { beforeEach, describe, expect, it } from '../../../helpers/dependencies'
import RendererIpc from '../../../../src/app/communication/ipc/renderer-ipc'
import { captureError, nextTick } from '../../../helpers/utils'
import IpcMessageBus from '../../../../src/app/communication/ipc-message-bus'

describe('IpcMessageBus', () => {
  let messageBus: IpcMessageBus

  beforeEach(() => {
    const ipc = new RendererIpc()
    messageBus = new IpcMessageBus(ipc)
  })

  describe('.on', () => {
    it('throws error when subscribing same callback to the same channel twice', () => {
      const callback = () => {}
      const subscribe = () => messageBus.on('channel', callback)
      subscribe()
      const err = captureError(subscribe)
      expect(err).to.be.an('error')
      if (!err) {
        throw new Error('Expected error not to be null')
      }
      expect(err.message).to.eql('Callback being subscribed is already subscribed')
    })

    it('alls subscribing same callback to different channels', () => {
      const callback = () => {}
      messageBus.on('channel 1', callback)
      messageBus.on('channel 2', callback)
    })
  })

  describe('.removeCallback', () => {
    it('removes callback to avoid throwing process warning', async () => {
      const maxListenersLimit = 10

      let maxListenersExceeded = false
      process.on('warning', warning => {
        if (warning.name === 'MaxListenersExceededWarning') {
          maxListenersExceeded = true
        }
      })

      for (let i = 0; i < maxListenersLimit + 1; ++i) {
        const callback = () => {}
        messageBus.on('channel', callback)
        messageBus.removeCallback('channel', callback)
      }

      // wait for process warnings to be processed
      await nextTick()

      expect(maxListenersExceeded).to.be.false
    })

    it('allows re-subscribing same callback again', () => {
      const callback = () => {}
      messageBus.on('channel', callback)
      messageBus.removeCallback('channel', callback)

      messageBus.on('channel', callback)
    })

    it('throws error when invoke twice for same callback', () => {
      const callback = () => {}
      messageBus.on('channel', callback)
      const remove = () => messageBus.removeCallback('channel', callback)
      remove()
      const err = captureError(remove)
      expect(err).to.be.an('error')
    })

    it('returns error for unknown callbacks', () => {
      const f = () => messageBus.removeCallback('channel', () => {})
      const error = captureError(f)
      expect(error).to.be.an('error')
    })
  })
})
