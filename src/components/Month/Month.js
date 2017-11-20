import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import dateAdapter from '../../adapters/dateAdapter.js'

class Month extends React.PureComponent {
  render () {
    const weekdays = this.props.date.weekDays()
    const monthdays = this.props.date.monthMatrix()

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

Month.defaultProps = {}

Month.propTypes = {
  date: PropTypes.instanceOf(dateAdapter).isRequired
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
