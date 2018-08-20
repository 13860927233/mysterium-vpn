/*
 * Copyright (C) 2017 The "MysteriumNetwork/mysterion" Authors.
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

type Features = {
  payments: ?boolean
}

class FeatureToggle {
  _features: ?Features

  constructor (features: ?Features) {
    this._features = features
  }

  paymentsAreEnabled (): boolean {
    return this._getFeatureState('payments', false)
  }

  _getFeatureState (key: string, defaultValue: boolean): boolean {
    if (typeof this._features !== 'object') {
      return defaultValue
    }

    const features = this._features
    if (features == null) {
      return defaultValue
    }

    if (typeof features[key] === 'undefined') {
      return defaultValue
    }

    return features[key]
  }
}

export default FeatureToggle
export type { Features }
