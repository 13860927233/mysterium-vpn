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

import { newEvent } from '../../../../src/app/statistics/events'
import NullCollector from '../../../../src/app/statistics/null-collector'

describe('Null collector', () => {
  let collector = new NullCollector()

  it('sends events', async () => {
    let event1 = newEvent({}, 'event1', 123, {})
    let event2 = newEvent({}, 'event2', 123, {})

    await collector.collectEvents(event1, event2)
  })
})
