import React from 'react'
import styled from 'styled-components'

export default class TimeIndicator extends React.PureComponent {
  getTimePositon () {
    let { date } = this.props
    return date.diff(date.startOf('day')) / (10 * 60 * 60 * 24)
  }

  render () {
    console.log(this.props)
    return (
      <IndicatorWrapper style={{
        top: `${this.getTimePositon()}%`
      }}>
        <IndicatorKnob />
        <IndicatorLine />
      </IndicatorWrapper>
    )
  }
}

const IndicatorWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const IndicatorKnob = styled.div`
  flex: 0 0 auto;
  width: 10px;
  margin-top: -5px;
  margin-left: 45px;
  height: 10px;
  border-radius: 100%;
  background: green;
`

const IndicatorLine = styled.div`
  flex: 0 1 auto;
  width: 100%;
  margin-top: -5px;
  height: 1px;
  background: green;
`
