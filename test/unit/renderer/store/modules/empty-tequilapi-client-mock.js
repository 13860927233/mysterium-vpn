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
import type { ConnectionIPDTO } from 'mysterium-tequilapi/lib/dto/connection-ip'
import type { ConnectionStatusDTO } from 'mysterium-tequilapi/lib/dto/connection-status-dto'
import type { ConnectionSessionDTO } from 'mysterium-tequilapi/lib/dto/connection-session'
import type { ServiceSessionDTO } from 'mysterium-tequilapi/lib/dto/service-session'
import type { ConnectionStatisticsDTO } from 'mysterium-tequilapi/lib/dto/connection-statistics'
import { TequilapiClient } from 'mysterium-tequilapi/lib/client'
import type { IdentityDTO } from 'mysterium-tequilapi/lib/dto/identity'
import type { ProposalQueryOptions } from 'mysterium-tequilapi/lib/dto/query/proposals-query-options'
import type { ProposalDTO } from 'mysterium-tequilapi/lib/dto/proposal'
import type { ConsumerLocationDTO } from 'mysterium-tequilapi/lib/dto/consumer-location'
import type { NodeHealthcheckDTO } from 'mysterium-tequilapi/lib/dto/node-healthcheck'
import type { IdentityRegistrationDTO } from 'mysterium-tequilapi/lib/dto/identity-registration/identity-registration'
import { ConnectionStatus } from 'mysterium-tequilapi/lib/dto/connection-status'
import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info'
import { ServiceRequest } from 'mysterium-tequilapi/lib/dto/service-request'
import { ServiceStatus } from 'mysterium-tequilapi/lib/dto/service-status'
import { parseProposalDTO } from 'mysterium-tequilapi/lib/dto/proposal'
import { IdentityPayoutDTO } from 'mysterium-tequilapi/lib/dto/identity-payout'
import { AccessPolicyDTO } from 'mysterium-tequilapi/lib/dto/access-policies'

class EmptyTequilapiClientMock implements TequilapiClient {
  async healthCheck (_timeout: ?number): Promise<NodeHealthcheckDTO> {
    return {
      uptime: '',
      process: 0,
      version: '',
      buildInfo: {
        branch: 'mock branch',
        buildNumber: 'mock build number',
        commit: 'mock commit'
      }
    }
  }

  async stop (): Promise<void> {
  }

  async identitiesList (): Promise<Array<IdentityDTO>> {
    return []
  }

  async identityCreate (passphrase: string): Promise<IdentityDTO> {
    return { id: 'mocked identity' }
  }

  async identityUnlock (id: string, passphrase: string): Promise<void> {
  }

  async identityRegistration (id: string): Promise<IdentityRegistrationDTO> {
    return { registered: true }
  }

  async identityPayout (id: string): Promise<IdentityPayoutDTO> {
    return { ethAddress: 'mock eth address' }
  }

  async updateIdentityPayout (id: string, ethAddress: string): Promise<void> {
  }

  async findProposals (query: ?ProposalQueryOptions): Promise<Array<ProposalDTO>> {
    return []
  }

  async connectionCreate (): Promise<ConnectionStatusDTO> {
    return { status: ConnectionStatus.CONNECTED }
  }

  async connectionStatus (): Promise<ConnectionStatusDTO> {
    return { status: ConnectionStatus.NOT_CONNECTED }
  }

  async connectionCancel (): Promise<void> {
  }

  async connectionIP (): Promise<ConnectionIPDTO> {
    return {}
  }

  async connectionStatistics (): Promise<ConnectionStatisticsDTO> {
    return {
      bytesSent: 0,
      bytesReceived: 0,
      duration: 0
    }
  }

  async connectionSessions (): Promise<ConnectionSessionDTO[]> {
    return []
  }

  async location (): Promise<ConsumerLocationDTO> {
    return {}
  }

  async serviceList (): Promise<ServiceInfoDTO[]> {
    return []
  }

  async serviceGet (id: string): Promise<ServiceInfoDTO> {
    return buildServiceInfoDTO()
  }

  async serviceStart (request: ServiceRequest, timeout?: number | void): Promise<ServiceInfoDTO> {
    return buildServiceInfoDTO()
  }

  async serviceStop (serviceId: string): Promise<void> {
  }

  async serviceSessions (): Promise<ServiceSessionDTO[]> {
    return []
  }

  async accessPolicies (): Promise<AccessPolicyDTO[]> {
    return []
  }
}

const buildServiceInfoDTO = (): ServiceInfoDTO => {
  const options: { [key: string]: any } = {}

  return {
    id: '123',
    providerId: '0x123',
    type: 'wireguard',
    proposal: parseProposalDTO({
      id: 1,
      providerId: '0x1',
      serviceType: 'mock',
      serviceDefinition: { locationOriginate: { country: 'lt' } },
      metrics: { connectCount: { success: 0, fail: 10, timeout: 50 } }
    }),
    status: ServiceStatus['NOT_RUNNING'],
    options: options
  }
}

export default EmptyTequilapiClientMock
