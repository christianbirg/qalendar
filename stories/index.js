import { storiesOf } from '@storybook/react'
import { injectGlobal } from 'styled-components'

injectGlobal`
  html, body, #root {
    margin: 0;
    padding: 0;
  }
`

import HelloCalendar from './storyOf/Calendar/hello-calendar.js'
import CalendarSlots from './storyOf/Calendar/calendar-slot.js'

storiesOf('Calendar', module)
  .add('Hello Calendar', HelloCalendar)
  .add('with Slots', CalendarSlots)
