import React from 'react'
import moment from 'moment'

import Calendar from 'qalendar'

export default () => {
  const date = moment()

  return (
    <Calendar
      defaultView='month'
      events={[
        {
          start: new Date(),
          end: moment(date).add(2, 'hour')
        },
        {
          start: moment(date).add(1, 'hour'),
          end: moment(date).add(3, 'hour')
        },
        {
          start: moment(date).add(2, 'hour'),
          end: moment(date).add(4, 'hour')
        },
        {
          start: moment(date).add(1.5, 'hour'),
          end: moment(date).add(1, 'day')
        }
      ]} />
  )
}
