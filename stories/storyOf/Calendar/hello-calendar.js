import React from 'react'
import moment from 'moment'

import Calendar from 'qalendar'

export default () => {
  return (
    <Calendar
      defaultView='month'
      events={[
        {
          start: new Date(),
          end: moment().add(2, 'hour')
        },
        {
          start: moment().add(1, 'hour'),
          end: moment().add(3, 'hour')
        },
        {
          start: moment().add(2, 'hour'),
          end: moment().add(4, 'hour')
        },
        {
          start: moment().add(3.5, 'hour'),
          end: moment().add(1, 'day')
        }
      ]} />
  )
}
