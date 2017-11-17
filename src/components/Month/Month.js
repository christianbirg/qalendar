import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import dateAdapter from '../../adapters/dateAdapter.js'

class Month extends React.PureComponent {
  getWeekdays () {
    let { date } = this.props

    const weekdays = []
    let currentWeekDay = date.startOf('week')
    const endOfWeek = date.endOf('week')
    while (currentWeekDay.isSameOrBefore(endOfWeek)) {
      weekdays.push(currentWeekDay)
      currentWeekDay = currentWeekDay.add(1, 'day')
    }
    return weekdays
  }

  getMonthdays () {
    let { date } = this.props

    const monthdays = []
    let currentMonthDay = date.startOf('month').startOf('week')
    const endOfMonth = date.endOf('month').endOf('week')
    while (currentMonthDay.isSameOrBefore(endOfMonth)) {
      monthdays.push(currentMonthDay)
      currentMonthDay = currentMonthDay.add(1, 'day')
    }

    return monthdays.reduce((list, day, i) => {
      let pos = (i/7)|0
      list[pos] = list[pos] || []
      list[pos].push(day)

      return list
    }, [])
  }

  render () {
    const weekdays = this.getWeekdays()
    const monthdays = this.getMonthdays()
    console.log(monthdays)
    return (
      <Wrapper>
        <HeaderWrapper>
          {
            weekdays.map((day, index) => (
              <Header key={index}> { day.format('dd') }</Header>
            ))
          }
        </HeaderWrapper>
        <MonthWrapper>
          {
            monthdays.map((row, index) => (
              <MonthRow key={index}>
                {
                  row.map((day, index) => (
                    <MonthDay key={index}>
                      { day.format('DD') }
                    </MonthDay>
                  ))
                }
              </MonthRow>
            ))
          }
        </MonthWrapper>
      </Wrapper>
    )
  }
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

const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const MonthDay = styled.div`
  flex: 0 1 100%;
  padding: 16px;
  font-family: sans-serif;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  height: 150px;
`

const MonthRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${MonthDay}:first-child {
    border-left: 0;
  }
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
