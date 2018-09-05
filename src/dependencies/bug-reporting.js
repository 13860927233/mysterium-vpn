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
import type { Container } from '../app/di'
import os from 'os'
import type { EnvironmentCollector } from '../app/bug-reporting/environment/environment-collector'
import { BugReporterMetrics } from '../app/bug-reporting/bug-reporter-metrics'
import { MapSync } from '../libraries/map-sync'

function bootstrap (container: Container) {
  const extendedProcess = (process: { type?: string })

  container.factory(
    'bugReporterMetrics',
    [],
    (): BugReporterMetrics => new BugReporterMetrics(new MapSync())
  )

  container.service(
    'bugReporter.config',
    ['environmentCollector'],
    (environmentCollector: EnvironmentCollector): RavenOptions => {
      return {
        captureUnhandledRejections: true,
        release: environmentCollector.getReleaseId(),
        tags: {
          environment: process.env.NODE_ENV || '',
          process: extendedProcess.type || '',
          electron: process.versions.electron || '',
          chrome: process.versions.chrome || '',
          platform: os.platform(),
          platform_release: os.release()
        },
        dataCallback: (data) => {
          const metrics = environmentCollector.getMetrics()
          Object.assign(data.tags, metrics.tags)
          Object.assign(data.extra, metrics.extra)
          data.extra.logs = environmentCollector.getSerializedCaches()
          return data
        },
        autoBreadcrumbs: {
          console: true
        }
      }
    }
  )
}

export default bootstrap
