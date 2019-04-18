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

import type { ConnectionStatusDTO } from 'mysterium-tequilapi/lib/dto/connection-status-dto'
import type { NodeHealthcheckDTO } from 'mysterium-tequilapi/lib/dto/node-healthcheck'
import type { ProposalDTO } from 'mysterium-tequilapi/lib/dto/proposal'
import type { ProposalQueryOptions } from 'mysterium-tequilapi/lib/dto/query/proposals-query-options'
import { TIMEOUT_DISABLED } from 'mysterium-tequilapi/lib/timeouts'
import type { ConnectionRequest } from 'mysterium-tequilapi/lib/dto/query/connection-request'
import type { ConnectionStatisticsDTO } from 'mysterium-tequilapi/lib/dto/connection-statistics'
import type { ConnectionIPDTO } from 'mysterium-tequilapi/lib/dto/connection-ip'
import { TequilapiClient } from 'mysterium-tequilapi/lib/client'
import type { IdentityDTO } from 'mysterium-tequilapi/lib/dto/identity'
import type { ConsumerLocationDTO } from 'mysterium-tequilapi/lib/dto/consumer-location'
import type { IdentityRegistrationDTO } from 'mysterium-tequilapi/lib/dto/identity-registration/identity-registration'
import type { BugReporterMetrics } from './metrics/bug-reporter-metrics'
import { METRICS } from './metrics/metrics'
import { ConnectionSessionDTO } from 'mysterium-tequilapi/lib/dto/connection-session'
import { ServiceSessionDTO } from 'mysterium-tequilapi/lib/dto/service-session'
import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info'
import { ServiceRequest } from 'mysterium-tequilapi/lib/dto/service-request'
import { IdentityPayoutDTO } from 'mysterium-tequilapi/lib/dto/identity-payout'
import { AccessPolicyDTO } from 'mysterium-tequilapi/lib/dto/access-policies'

class TequilapiClientWithMetrics implements TequilapiClient {
  _bugReporterMetrics: BugReporterMetrics
  _client: TequilapiClient

  constructor (client: TequilapiClient, bugReporterMetrics: BugReporterMetrics) {
    this._client = client
    this._bugReporterMetrics = bugReporterMetrics
  }

  async stop (): Promise<void> {
    return this._client.stop()
  }

  async identitiesList (): Promise<Array<IdentityDTO>> {
    return this._client.identitiesList()
  }

  async identityCreate (passphrase: string): Promise<IdentityDTO> {
    return this._client.identityCreate(passphrase)
  }

  async healthCheck (timeout?: number): Promise<NodeHealthcheckDTO> {
    const result = await this._client.healthCheck(timeout)
    this._bugReporterMetrics.setWithCurrentDateTime(METRICS.HEALTH_CHECK_TIME)
    return result
  }

  async identityUnlock (id: string, passphrase: string): Promise<void> {
    this._bugReporterMetrics.set(METRICS.IDENTITY_UNLOCKED, false)
    await this._client.identityUnlock(id, passphrase)
    this._bugReporterMetrics.set(METRICS.IDENTITY_UNLOCKED, true)
  }

  async identityRegistration (id: string): Promise<IdentityRegistrationDTO> {
    const result = await this._client.identityRegistration(id)
    this._bugReporterMetrics.set(METRICS.IDENTITY_REGISTERED, result.registered)
    return result
  }

  async identityPayout (id: string): Promise<IdentityPayoutDTO> {
    return this._client.identityPayout(id)
  }

  async updateIdentityPayout (id: string, ethAddress: string): Promise<void> {
    return this._client.updateIdentityPayout(id, ethAddress)
  }

  async findProposals (query?: ProposalQueryOptions): Promise<Array<ProposalDTO>> {
    const result = await this._client.findProposals(query)
    if (!result || result.length === 0) {
      this._bugReporterMetrics.set(METRICS.PROPOSALS_FETCHED_ONCE, false)
    } else {
      this._bugReporterMetrics.set(METRICS.PROPOSALS_FETCHED_ONCE, true)
    }
    return result
  }

  async connectionCreate (
    request: ConnectionRequest,
    timeout?: number = TIMEOUT_DISABLED): Promise<ConnectionStatusDTO> {
    this._bugReporterMetrics.set(METRICS.CONNECTION_ACTIVE, false)
    const result = await this._client.connectionCreate(request, timeout)
    this._bugReporterMetrics.set(METRICS.CONNECTION_ACTIVE, true)
    return result
  }

  async connectionStatus (): Promise<ConnectionStatusDTO> {
    const result = await this._client.connectionStatus()
    this._bugReporterMetrics.set(METRICS.CONNECTION_STATUS, result)
    return result
  }

  async connectionCancel (): Promise<void> {
    await this._client.connectionCancel()
    this._bugReporterMetrics.set(METRICS.CONNECTION_ACTIVE, false)
  }

  async connectionIP (timeout?: number): Promise<ConnectionIPDTO> {
    const result = await this._client.connectionIP(timeout)
    this._bugReporterMetrics.set(METRICS.CONNECTION_IP, result)
    return result
  }

  async connectionStatistics (): Promise<ConnectionStatisticsDTO> {
    const result = await this._client.connectionStatistics()
    this._bugReporterMetrics.set(METRICS.CONNECTION_STATISTICS, result)
    return result
  }

  async location (timeout?: number): Promise<ConsumerLocationDTO> {
    return this._client.location(timeout)
  }

  async connectionSessions (): Promise<ConnectionSessionDTO[]> {
    return this._client.connectionSessions()
  }

  async serviceList (): Promise<ServiceInfoDTO[]> {
    return this._client.serviceList()
  }

  async serviceGet (id: string): Promise<ServiceInfoDTO> {
    return this._client.serviceGet(id)
  }

  async serviceStart (request: ServiceRequest, timeout?: number | void): Promise<ServiceInfoDTO> {
    return this._client.serviceStart(request, timeout)
  }

  async serviceStop (serviceId: string): Promise<void> {
    return this._client.serviceStop(serviceId)
  }

  async serviceSessions (): Promise<ServiceSessionDTO[]> {
    return this._client.serviceSessions()
  }

  async accessPolicies (): Promise<AccessPolicyDTO[]> {
    return this._client.accessPolicies()
  }
}

export default TequilapiClientWithMetrics
