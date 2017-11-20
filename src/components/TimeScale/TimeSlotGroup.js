import React from 'react'
import styled from 'styled-components'

const TimeSlotGroup = (props) => {
  const { caption, steps } = props

  let renderSlots = (length) => Array.apply(null, { length }).map((_, i) => (
    <TimeSlot key={`timeslot:${caption}/${i}`} />
  ))

  return (
    <TimeSlotWrapper>
      {
        renderSlots(steps)
      }
      {
        caption && (
          <TimeSlotCaptionContainer>
            <TimeSlotCaption>
              { caption }
            </TimeSlotCaption>
          </TimeSlotCaptionContainer>
        )
      }
    </TimeSlotWrapper>
  )
}

export default TimeSlotGroup

const TimeSlotWrapper = styled.div`
  flex: 1 0 auto;
  border-top: 1px solid #ddd;
  position: relative;
`

const TimeSlot = styled.div`
  height: 12px;

  border-top: 1px dotted #eaeaea;

  &:first-child {
    border-top: none;
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
