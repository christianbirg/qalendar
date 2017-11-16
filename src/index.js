// @flow
import React from 'react'

type Props = {
  date: any,
  defaultView: any,
  views: any,
  onDateChange: any,
  slots: any,
  duration: any
}

class Qalendar extends React.PureComponent<Props> {
  render () {
    return (
      <p>Test</p>
    )
  }
}

Qalendar.defaultProps = {
  views: ['month', 'week', 'day']
}

export default Qalendar
