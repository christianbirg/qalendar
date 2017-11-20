import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import calculateSlotGroups from './CalculateSlotGroups.js'

import TimeSlotGroup from './TimeSlotGroup'

const TimeScale = (props) => {
  const { steps, stepDuration } = props

  return (
    <Wrapper>
      {
        calculateSlotGroups(steps, stepDuration).map((time, index) => {
          return (
            <TimeSlotGroup steps={steps} key={`TimeScale:${time.format('hh:mm')}/${index}`} />
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
  stepDuration: PropTypes.number.isRequired
}

const Wrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`
