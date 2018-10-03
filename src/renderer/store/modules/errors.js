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
import type from '../types'

type OverlayError = {
  message: string,
  hint: ?string
}

type State = {
  overlay: ?OverlayError
}

const state: State = {
  overlay: null
}

const mutations = {
  [type.OVERLAY_ERROR] (state: State, error: OverlayError) {
    state.overlay = error
  }
}

const getters = {
  overlayError: (state: State) => state.overlay
}

const actions = {
  [type.OVERLAY_ERROR] ({ commit }, error: OverlayError) {
    commit(type.OVERLAY_ERROR, error)
  }
}

function factory () {
  return {
    state,
    mutations,
    getters,
    actions
  }
}

export default factory
