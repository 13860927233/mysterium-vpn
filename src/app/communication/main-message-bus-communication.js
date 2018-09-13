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

import type {
  RequestConnectionDTO,
  ConnectionStatusChangeDTO,
  CurrentIdentityChangeDTO,
  CountriesDTO,
  RequestTermsDTO,
  TermsAnsweredDTO,
  AppErrorDTO,
  FavoriteProviderDTO
} from './dto'
import messages from './messages'
import type { MessageBus } from './message-bus'
import type { MainCommunication } from './main-communication'
import type { UserSettings } from '../user-settings/user-settings'
import type { MetricCommunication, MetricValueDto } from '../bug-reporting/metrics/metric-communication'
import IdentityRegistrationDTO from '../../libraries/mysterium-tequilapi/dto/identity-registration'

/**
 * This allows main process communicating with renderer process.
 */
class MainMessageBusCommunication implements MainCommunication, MetricCommunication {
  _messageBus: MessageBus

  constructor (messageBus: MessageBus) {
    this._messageBus = messageBus
  }

  onRendererBooted (callback: () => void) {
    this._on(messages.RENDERER_BOOTED, callback)
  }

  sendRendererShowErrorMessage (error: string) {
    this.sendRendererShowError({
      message: error,
      hint: '',
      fatal: true
    })
  }

  sendRendererShowError (data: AppErrorDTO) {
    this._send(messages.RENDERER_SHOW_ERROR, data)
  }

  /**
   * Notifies the renderer that we're good to go
   */
  sendMysteriumClientIsReady () {
    this._send(messages.MYSTERIUM_CLIENT_READY)
  }

  sendMysteriumClientUp () {
    this._send(messages.HEALTHCHECK_UP)
  }

  sendMysteriumClientDown () {
    this._send(messages.HEALTHCHECK_DOWN)
  }

  sendCountries (countries: CountriesDTO) {
    this._send(messages.COUNTRY_UPDATE, countries)
  }

  sendRegistration (registration: IdentityRegistrationDTO) {
    this._send(messages.IDENTITY_REGISTRATION, registration)
  }

  sendConnectionCancelRequest () {
    this._send(messages.CONNECTION_CANCEL)
  }

  sendReconnectRequest () {
    this._send(messages.RECONNECT_REQUEST)
  }

  sendConnectionRequest (data: RequestConnectionDTO) {
    this._send(messages.CONNECTION_REQUEST, data)
  }

  sendTermsRequest (data: RequestTermsDTO) {
    this._send(messages.TERMS_REQUESTED, data)
  }

  sendTermsAccepted () {
    this._send(messages.TERMS_ACCEPTED)
  }

  sendUserSettings (data: UserSettings): void {
    this._send(messages.USER_SETTINGS, data)
  }

  sendMapUpdate (data: MetricValueDto): void {
    this._send(messages.METRIC_SYNC, data)
  }

  onMapUpdate (callback: (MetricValueDto) => void): void {
    this._on(messages.METRIC_SYNC, callback)
  }

  onConnectionStatusChange (callback: (ConnectionStatusChangeDTO) => void): void {
    this._on(messages.CONNECTION_STATUS_CHANGED, callback)
  }

  onCurrentIdentityChange (callback: (CurrentIdentityChangeDTO) => void) {
    this._on(messages.CURRENT_IDENTITY_CHANGED, callback)
  }

  onCurrentIdentityChangeOnce (callback: (CurrentIdentityChangeDTO) => void) {
    let cb = (currentIdentityChange: CurrentIdentityChangeDTO) => {
      callback(currentIdentityChange)
      this._messageBus.removeCallback(messages.CURRENT_IDENTITY_CHANGED, cb)
    }
    this._on(messages.CURRENT_IDENTITY_CHANGED, cb)
  }

  onProposalUpdateRequest (callback: () => void) {
    this._on(messages.PROPOSALS_UPDATE, callback)
  }

  onTermsAnswered (callback: (TermsAnsweredDTO) => void) {
    this._on(messages.TERMS_ANSWERED, callback)
  }

  onUserSettingsRequest (callback: () => void): void {
    this._on(messages.USER_SETTINGS_REQUEST, callback)
  }

  onUserSettingsUpdate (callback: (UserSettings) => void): void {
    this._on(messages.USER_SETTINGS_UPDATE, callback)
  }

  onUserSettingsShowDisconnectNotifications (callback: (boolean) => void): void {
    this._on(messages.SHOW_DISCONNECT_NOTIFICATION, callback)
  }

  onToggleFavoriteProvider (callback: (FavoriteProviderDTO) => void): void {
    this._on(messages.TOGGLE_FAVORITE_PROVIDER, callback)
  }

  _send (channel: string, dto: mixed): void {
    this._messageBus.send(channel, dto)
  }

  _on (channel: string, callback: (dto: any) => void): void {
    this._messageBus.on(channel, callback)
  }
}

export default MainMessageBusCommunication
