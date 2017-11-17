import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classiq from 'styled-classiq'

import dateAdapter from '../../adapters/dateAdapter.js'

import TimeScale from '../TimeScale'
import Day from '../Day'

const Week = (props) => {
  const { date, steps, stepDuration } = props

  const days = []
  let currentDay = date.startOf('week')
  const endOfWeek = date.endOf('week')
  while (currentDay.isSameOrBefore(endOfWeek)) {
    days.push(currentDay)
    currentDay = currentDay.add(1, 'day')
  }

  return (
    <Wrapper>
      <TimeScaleWrapper>
        <Header />
        <TimeScale steps={steps} stepDuration={stepDuration} />
      </TimeScaleWrapper>

      { renderDays(days) }
    </Wrapper>
  )
}

export default Week

Week.defaultProps = {
  steps: 4,
  stepDuration: 15
}

Week.propTypes = {

}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`

const TimeScaleWrapper = styled.div`
  flex: 1 0 auto;

  border-right: 1px solid #ddd;
`

const renderDays = (days) => days.map((day, index) => (
  <DayWrapper last={index === days.length - 1} key={`day:${day.format('dd:MM')}`}>
    <Header>
      { day.format('dd') }
    </Header>
    <Day day={day} />
  </DayWrapper>
))

const DayWrapper = styled.div.attrs({
  className: classiq((props) => ({
    '--is-last': props.last
  }))
})`
  flex: 1 0 auto;

  border-right: 1px solid #ddd;

  &.--is-last {
    border-right: none;
  }
`

const Header = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  height: 32px;
`
