import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import calculateSlotGroups from './CalculateSlotGroups.js'
import TimeSlotGroup from './TimeSlotGroup.js'

const TimeAxis = ({ children, ...props }) => {
  const { steps, stepDuration } = props

  return (
    <TimeAxisWrapper>
      <Wrapper>
        {
          calculateSlotGroups(steps, stepDuration).map((time, index) => {
            const caption = time.format('HH:mm')

            return (
              <TimeSlotGroup caption={caption} steps={steps} key={`TimeScale:${caption}/${index}`} />
            )
          })
        }
      </Wrapper>
      { children }
    </TimeAxisWrapper>
  )
}

export default TimeAxis

TimeAxis.defaultProps = {
  steps: 4,
  stepDuration: 15
}

TimeAxis.propTypes = {
  steps: PropTypes.number,
  stepDuration: PropTypes.number
}

const TimeAxisWrapper = styled.div`
  flex: 0 0 auto;
  width: 50px;
  border-right: 1px solid #ddd;
`

const Wrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`
