import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import dateAdapter from '../../adapters/dateAdapter.js'

const Month = (props) => {
  const { date } = props

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
        {
          days.map((day, index) => (
            <Header key={index}> { day.format('dd') }</Header>
          ))
        }
      </HeaderWrapper>
    </Wrapper>
  )
}

export default Month

Month.defaultProps = {
  steps: 4,
  stepDuration: 15
}

Month.propTypes = {
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

const HeaderWrapper = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: row;
`

const Header = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 32px;
`
