import React from 'react'

import Calendar from 'qalendar'

export default () => {
  return (
    <Calendar
      defaultView='month'
      slots={2}
      duration={30}
    />
  )
}
