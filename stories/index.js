import { storiesOf } from '@storybook/react'

import HelloCalendar from './storyOf/Calendar/hello-calendar.js'
import CalendarSlots from './storyOf/Calendar/calendar-slot.js'

storiesOf('Calendar', module)
  .add('Hello Calendar', HelloCalendar)
  .add('with Slots', CalendarSlots)
