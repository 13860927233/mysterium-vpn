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

function getVersionLabel (mysterionReleaseId: string, clientVersion: ?string): string {
  if (!clientVersion) {
    return `v${mysterionReleaseId}`
  }
  return `v${mysterionReleaseId}-${clientVersion}`
}

function getMysterionReleaseId (version: ?string, build: ?string): string {
  version = version || ''
  if (build == null) {
    return version
  }
  build = minifyBuildNumber(build)
  return `${version}(${build})`
}

function minifyBuildNumber (build: string): string {
  const workerIdStart = build.indexOf('.')
  if (workerIdStart < 0) {
    return build
  }
  return build.substr(0, workerIdStart)
}

export { getVersionLabel, getMysterionReleaseId }
