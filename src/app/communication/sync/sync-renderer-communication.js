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

import messages from '../messages'
import type { SyncSender } from './sync'
import type { SyncRendererCommunication } from './sync-communication'
import type { SerializedLogCaches } from '../../logging/log-cache-bundle'
import type { LogDTO } from '../dto'
import type { RavenData } from '../../bug-reporting/metrics/metrics'
import type { MetricValueDto } from '../../bug-reporting/metrics/metric-communication'

/**
 * Performs synchronous calls from renderer to main.
 */
class SyncSenderRendererCommunication implements SyncRendererCommunication {
  _syncSender: SyncSender

  constructor (syncSender: SyncSender) {
    this._syncSender = syncSender
  }

  getSerializedCaches (): ?SerializedLogCaches {
    const result = this._syncSender.send(messages.GET_SERIALIZED_CACHES)
    return ((result: any): SerializedLogCaches)
  }

  sendMetric (dto: MetricValueDto): void {
    this._syncSender.send(messages.SEND_METRIC, dto)
  }

  getMetrics (): RavenData {
    const result = this._syncSender.send(messages.GET_METRICS)
    return ((result: any): RavenData)
  }

  sendLog (dto: LogDTO): void {
    this._syncSender.send(messages.LOG, dto)
  }
}

export default SyncSenderRendererCommunication
