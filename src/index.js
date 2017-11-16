// @flow
import React from 'react'

type Props = {
  date: any,
  defaultView: any,
  views: any,
  onDateChange: func,
  slots: any,
  duration: any
}

export default class Qalendar extends React.PureComponent<Props> {
  static defaultProps = {
    views: ['month', 'week', 'day']
  }

  render () {
    return (
      <p>Test</p>
    )
  }
}
