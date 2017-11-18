import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classiq from 'styled-classiq'

import dateAdapter from '../../adapters/dateAdapter.js'

import TimeAxis from '../TimeScale/TimeAxis.js'
import Day from '../Day'

const Week = (props) => {
  const { date } = props
  const timeScaleProps = {
    steps: props.steps,
    stepDuration: props.stepDuration
  }

  const days = []
  let currentDay = date.startOf('week')
  const endOfWeek = date.endOf('week')
  while (currentDay.isSameOrBefore(endOfWeek)) {
    days.push(currentDay)
    currentDay = currentDay.add(1, 'day')
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <DummyHeader />
        {
          days.map((day, index) => (
            <Header key={index}> { day.format('dd') }</Header>
          ))
        }
      </HeaderWrapper>
      <TimeScaleWrapper>
        <TimeAxis {...timeScaleProps} />
        {
          days.map((day, index) => (
            <DayWrapper last={index === days.length - 1} key={`day:${day.format('dd:MM')}`}>
              <Day day={day} {...timeScaleProps} />
            </DayWrapper>
          ))
        }
      </TimeScaleWrapper>
    </Wrapper>
  )
}

export default Week

Week.defaultProps = {
  steps: 4,
  stepDuration: 15
}

Week.propTypes = {
  date: PropTypes.instanceOf(dateAdapter),
  steps: PropTypes.number,
  stepDuration: PropTypes.number
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const DummyHeader = styled.div`
  flex: 0 0 auto;
  width: 50px;
  border-right: 1px solid #ddd;
`

const HeaderWrapper = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: row;
`

const TimeScaleWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
`

const DayWrapper = styled.div`
  flex: 1 0 auto;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: 0;
  }
`

const Header = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 32px;
`
