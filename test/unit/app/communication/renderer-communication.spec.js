/*
 * Copyright (C) 2017 The "MysteriumNetwork/mysterium-vpn" Authors.
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
import RendererCommunication from '../../../../src/app/communication/renderer-communication'
import SubscribableMessageBus from '../../../helpers/subscribable-message-bus'

describe('RendererCommunication', () => {
  let messageBus
  let rendererCommunication
  const callback = () => {}

  beforeEach(() => {
    messageBus = new SubscribableMessageBus()
    rendererCommunication = new RendererCommunication(messageBus)
  })

  describe('.removeOnUserSettingsCallback', () => {
    it('removes callback', () => {
      rendererCommunication.onUserSettings(callback)
      expect(messageBus.noRemainingCallbacks()).to.be.false

      rendererCommunication.removeOnUserSettingsCallback(callback)
      expect(messageBus.noRemainingCallbacks()).to.be.true
    })
  })

  describe('.removeCountriesUpdateCallback', () => {
    it('removes callback', () => {
      rendererCommunication.onCountriesUpdate(callback)
      expect(messageBus.noRemainingCallbacks()).to.be.false

      rendererCommunication.removeCountriesUpdateCallback(callback)
      expect(messageBus.noRemainingCallbacks()).to.be.true
    })
  })

  describe('.removeConnectionRequestCallback', () => {
    it('removes callback', () => {
      rendererCommunication.onConnectionRequest(callback)
      expect(messageBus.noRemainingCallbacks()).to.be.false

      rendererCommunication.removeConnectionRequestCallback(callback)
      expect(messageBus.noRemainingCallbacks()).to.be.true
    })
  })
})
