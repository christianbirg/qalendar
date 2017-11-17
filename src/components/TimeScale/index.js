import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import dateAdapter from '../../adapters/dateAdapter.js'

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
        times.map((time) => {
          const text = withoutText ? '' : time.format('HH:mm')

          return (
            <TimeSlotGroup text={text} steps={steps} />
          )
        })
      }
    </Wrapper>
  )
}

export default TimeScale

TimeScale.propTypes = {
  steps: PropTypes.number,
  stepDuration: PropTypes.number,
  withoutText: PropTypes.bool
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TimeSlotGroup = (props) => {
  const { text, steps } = props

  const result = []
  for (let i = 0; i < steps; i++) {
    result.push(
      <TimeSlot key={`timeslot:${text}/${i}`} />
    )
  }

  return (
    <TimeSlotWrapper>
      { result }

      <TimeSlotCaptionContainer>
        <TimeSlotCaption>
          { text }
        </TimeSlotCaption>
      </TimeSlotCaptionContainer>
    </TimeSlotWrapper>
  )
}

const TimeSlotWrapper = styled.div`
  flex: 1 0 auto;
  position: relative;
`

const TimeSlot = styled.div`
  height: 12px;

  border-top: 1px dotted #ddd;

  &:first-child {
    border-top-style: solid;
  }
`

const fontSize = 14

const TimeSlotCaptionContainer = styled.div`
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;

  margin-top: -${fontSize / 2 + 2}px;
  text-align: center;
`

const TimeSlotCaption = styled.span`
  font-size: ${fontSize}px;
  background-color: white;
`