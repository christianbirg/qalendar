// @flow
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import dateAdapter from './adapters/dateAdapter.js'
import Views, { ViewsEnum } from './types/Views.js'
import DateTypes from './types/DateTypes.js'

import ControlPanel from './components/ControlPanel'

import Month from './components/Month'
import Week from './components/Week'
import Day from './components/Day'

moment.locale('de')

type View = Views.month | Views.week | Views.day

type Props = {
  date: any,
  defaultView: View,
  views: Array<View>,
  onDateChange: any,
  slots: any,
  duration: any
}

class Qalendar extends React.PureComponent<Props> {
  constructor (props) {
    super(props)

    const events = this.normalizeData(props.events)

    this.state = {
      events,
      view: props.defaultView,
      date: dateAdapter(props.date)
    }
  }

  onSelectView = (view) => {
    this.setState({ view })
  }

  onSelectDate = (date) => {
    this.setState({ date })
  }

  normalizeData (eventArray) {
    const events = eventArray.map((event, index) => ({
      ...event,
      id: event.id || index,
      start: dateAdapter(event.start),
      end: dateAdapter(event.end)
    }))

    const eventsByDay = events.reduce((result, event) => {
      const days = []
      for (let day = event.start; day.isSameOrBefore(event.end); day = day.add(1, 'day')) {
        days.push(day)
      }

      days.forEach((day) => {
        const entry = result[day.format('DD/MM/YYYY')]
        if (!Array.isArray(entry)) {
          result[day.format('DD/MM/YYYY')] = [ event.id ]
        } else {
          result[day.format('DD/MM/YYYY')] = entry.concat(event.id)
        }
      })

      return result
    }, {})

    return {
      entries: events,
      filters: {
        byDay: eventsByDay
      }
    }
  }

  render () {
    return (
      <Wrapper>
        <ControlPanel
          date={this.state.date}
          onSelectDate={this.onSelectDate}
          views={this.props.views}
          onSelectView={this.onSelectView}
        />

        <ViewWrapper>
          { this.renderView() }
        </ViewWrapper>
      </Wrapper>
    )
  }

  renderView = () => {
    switch (this.state.view) {
      case Views.month:
        return <Month />
      case Views.week:
        return <Week date={this.state.date} events={this.state.events} />
      case Views.day:
        return <Day />
    }
  }
}

export default Qalendar
export { default as Views } from './types/Views.js'

Qalendar.defaultProps = {
  date: moment(),
  views: ViewsEnum,
  defaultView: Views.week
}

Qalendar.propTypes = {
  date: PropTypes.oneOfType(DateTypes),
  views: PropTypes.arrayOf(PropTypes.oneOf(ViewsEnum)),
  defaultView: PropTypes.oneOf(ViewsEnum),
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.oneOfType(DateTypes).isRequired,
    end: PropTypes.oneOfType(DateTypes).isRequired
  })).isRequired
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ViewWrapper = styled.div`
  flex: 1 0 auto;

  border: 1px solid #ddd;
`
