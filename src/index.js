import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import dateAdapter from './adapters/dateAdapter.js'
import Views, { ViewsEnum } from './types/Views.js'
import DateTypes from './types/DateTypes.js'

import ControlPanel from './components/ControlPanel'

import Month from './components/Month/Month.js'
import Week from './components/Week/Week.js'
import Day from './components/Day/Day.js'

moment.locale('de')

class Qalendar extends React.PureComponent {
  componentWillMount () {
    const events = this.normalizeData(this.props.events)

    this.setState({
      events,
      view: this.props.defaultView,
      date: dateAdapter(this.props.date)
    })
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
      for (let day = event.start; day.isSameOrBefore(event.end, 'day'); day = day.add(1, 'day')) {
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
        <ControlPanelWrapper>
          <ControlPanel
            date={this.state.date}
            activeView={this.state.view}
            onSelectDate={this.onSelectDate}
            views={this.props.views}
            onSelectView={this.onSelectView}
          />
        </ControlPanelWrapper>
        <ViewWrapper>
          { this.renderView() }
        </ViewWrapper>
      </Wrapper>
    )
  }

  renderView = () => {
    switch (this.state.view) {
      case Views.month:
        return <Month date={this.state.date} />
      case Views.week:
        return <Week date={this.state.date} events={this.state.events} stepDuration={this.props.duration} steps={this.props.slots} />
      case Views.day:
        return <Day date={this.state.date} events={this.state.events} stepDuration={this.props.duration} steps={this.props.slots} />
    }
  }
}

export default Qalendar
export { default as Views } from './types/Views.js'

Qalendar.defaultProps = {
  date: moment(),
  views: ViewsEnum,
  defaultView: Views.week,
  events: []
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
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;

  * {
    font-family: sans-serif;
  }
`

const ControlPanelWrapper = styled.div`
  flex:  0 0 auto;
`

const ViewWrapper = styled.div`
  flex: 1 0 auto;
  overflow: auto;
  border: 1px solid #ddd;
`
