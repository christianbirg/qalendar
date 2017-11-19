import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import dateAdapter from '../../adapters/dateAdapter.js'

import TimeScale from '../TimeScale/TimeScale.js'

class Day extends React.Component {
  shouldComponentUpdate (nextProps) {
    if (!this.props.day.isSame(nextProps.day)) {
      return true
    }

    if (this.props.steps !== nextProps.steps || this.props.stepDuration !== nextProps.stepDuration) {
      return true
    }

    if (!this.currentEventsEqual(nextProps)) {
      return true
    }

    return false
  }

  constructor (props) {
    super(props)

    const currentEventIds = props.events.filters.byDay[props.day.format('DD/MM/YYYY')]
    this.state = {
      eventOverlapping: currentEventIds && this.calculateEventOverlapping(currentEventIds.map((id) => props.events.entries[id]))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.currentEventsEqual(nextProps)) {
      const currentEventIds = this.props.events.filters.byDay[this.props.day.format('DD/MM/YYYY')]
      this.state = {
        eventOverlapping: currentEventIds && this.calculateEventOverlapping(currentEventIds.map((id) => this.props.events.entries[id]))
      }
    }
  }

  currentEventsEqual = (nextProps) => {
    const day = this.props.day.format('DD/MM/YYYY')

    const oldFilter = this.props.events.filters.byDay[day]
    const newFilter = nextProps.events.filters.byDay[day]
    if (this.props.events.filters !== nextProps.events.filters) {
      if (oldFilter !== newFilter) {
        if (oldFilter.length !== newFilter.length) { // more events to be displayed for today
          return false
        }

        /* old and new filter have the same length */
        if (newFilter.some((eventId) => !oldFilter.includes(eventId))) { // if the new filter contains events which weren't included before
          return false
        }
      }
    }

    if (this.props.events.entries !== nextProps.events.entries) {
      const oldEvents = oldFilter.map((eventId) => this.props.events.entries[eventId])
      const newEvents = newFilter.map((eventId) => nextProps.events.entries[eventId])
      const changed = newEvents.some((newEvent) => {
        const oldEvent = oldEvents.find((event) => event.id === newEvent.id)

        const newEventKeys = Object.keys(newEvent)
        const oldEventKeys = Object.keys(oldEvent)

        return newEventKeys.length !== oldEventKeys.length && newEventKeys.some((key) => newEvent[key] !== oldEvent[key]) && oldEventKeys.some((key) => oldEvent[key] !== newEvent[key])
      })

      if (changed) {
        return false
      }
    }

    return true
  }

  calculateEventOverlapping = (events) => {
    const eventsOverlap = (event, otherEvent) => {
      if (event.start.isAfter(otherEvent.end)) {
        return false
      }

      if (event.end.isBefore(otherEvent.start)) {
        return false
      }

      return true
    }

    const result = events.reduce((result, event) => {
      const remainingEvents = events.filter((e) => e !== event)
      const overlappingEventsCount = remainingEvents.reduce((result, otherEvent) => eventsOverlap(event, otherEvent) ? result + 1 : result, 1)
      const eventIndex = remainingEvents.reduce((result, otherEvent) => eventsOverlap(event, otherEvent) && otherEvent.start.isSameOrBefore(event.start) ? result + 1 : result, 0)

      result[event.id] = {
        count: overlappingEventsCount,
        index: eventIndex
      }

      return result
    }, {})

    const test = events.sort((a, b) => a.start.isBefore(b.start) ? 1 : -1).reduce((result, event) => {
      const remainingEvents = events.filter((e) => e !== event)
      const overlappingEvents = remainingEvents.filter((otherEvent) => eventsOverlap(event, otherEvent))

      result[event.id].index = overlappingEvents.some((event) => result[event.id].index === 0) ? result[event.id].index : 0

      return result
    }, result)

    return test
  }

  render () {
    const timeScaleProps = {
      withoutText: true,
      steps: this.props.steps,
      stepDuration: this.props.stepDuration
    }

    const { day, events } = this.props
    const dateString = day.format('DD/MM/YYYY')

    return (
      <Wrapper>
        <TimeScale {...timeScaleProps} />

        {
          Array.isArray(events.filters.byDay[dateString]) &&
          events.filters.byDay[dateString].map((id) => this.renderEvent(events.entries[id]))
        }
      </Wrapper>
    )
  }

  calculateVerticalPosition = (event) => {
    const top = this.props.day.isSame(event.start, 'day')
      ? event.start.diff(event.start.startOf('day')) / (
        10 /* normally 1000 ms, instead divide by 10 only, because we later would need to multiply with 100 to get a percentage value */ *
        60 /* seconds per minute */ *
        60 /* minutes per hour */ *
        24 /* hours per day */
      )
      : 0
    const bottom = this.props.day.isSame(event.end, 'day')
      ? event.end.endOf('day').diff(event.end) / (10 * 60 * 60 * 24) // for explanation see above
      : 0

    return {
      top,
      bottom
    }
  }

  calculateHorizontalPosition = (event) => {
    const overlappingEvents = this.state.eventOverlapping[event.id]
    console.log(overlappingEvents)

    if (overlappingEvents.count > 1) {
      /* return {
        left: overlappingEvents.index * (100 / overlappingEvents.count),
        right: (overlappingEvents.count - overlappingEvents.index - 1) * (100 / overlappingEvents.count)
      } */

      const width = 50 * Math.pow(2, -overlappingEvents.index) + 20
      const right = 25 * Math.pow(2, -overlappingEvents.index)

      return {
        right,
        left: 100 - right - width,
        zIndex: overlappingEvents.index
      }
    } else {
      return {
        right: 0,
        left: 0,
        zIndex: 1
      }
    }
  }

  renderEvent = (event) => {
    console.log(event.start.format('HH:mm dd'), event.end.format('HH:mm dd'))
    const verticalPosition = this.calculateVerticalPosition(event)
    const horizontalPosition = this.calculateHorizontalPosition(event)
    console.log(horizontalPosition)

    return <Event style={{
      top: `${verticalPosition.top}%`,
      bottom: `${verticalPosition.bottom}%`,
      left: `${horizontalPosition.left}%`,
      right: `${horizontalPosition.right}%`,
      zIndex: horizontalPosition.zIndex
    }} />
  }
}

export default Day

Day.defaultProps = {
  steps: 4,
  stepDuration: 15
}

Day.propTypes = {
  day: PropTypes.instanceOf(dateAdapter).isRequired,
  steps: PropTypes.number,
  stepDuration: PropTypes.number,
  events: PropTypes.shape({
    entries: PropTypes.arrayOf(PropTypes.shape({
      start: PropTypes.instanceOf(dateAdapter),
      end: PropTypes.instanceOf(dateAdapter)
    })).isRequired,
    filters: PropTypes.shape({
      byDay: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.number)
      ).isRequired
    }).isRequired
  }).isRequired
}

const Wrapper = styled.div`
  position: relative;
`

const Event = styled.div`
  position: absolute;

  left: 8px;
  right: 8px;

  border: 1px solid black;
  background-color: red;
  z-index: 100;
`
