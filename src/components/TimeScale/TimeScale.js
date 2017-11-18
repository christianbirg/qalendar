import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import dateAdapter from '../../adapters/dateAdapter.js'

import TimeSlotGroup from './TimeSlotGroup'

const TimeScale = (props) => {
  const { steps, stepDuration, withoutText } = props

  const day = dateAdapter()
  const endOfDay = day.endOf('day')

  let currentTime = day.startOf('day')
  const times = []
  while (currentTime.isSameOrBefore(endOfDay)) {
    times.push(currentTime)
    currentTime = currentTime.add(stepDuration * steps, 'minute')
  }

  return (
    <Wrapper>
      {
        times.map((time, index) => {
          const text = withoutText ? '' : time.format('HH:mm')

          return (
            <TimeSlotGroup text={text} steps={steps} key={`TimeScale:${text}/${index}`} />
          )
        })
      }
    </Wrapper>
  )
}

export default TimeScale

TimeScale.defaultProps = {
  withoutText: false
}

TimeScale.propTypes = {
  steps: PropTypes.number.isRequired,
  stepDuration: PropTypes.number.isRequired,
  withoutText: PropTypes.bool
}

const Wrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`
