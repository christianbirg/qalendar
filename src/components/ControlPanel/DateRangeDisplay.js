import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import classiq from 'styled-classiq'

import Views from '../../types/Views'
import dateAdapter from '../../adapters/dateAdapter.js'

import MonthPicker from '../MonthPicker/MonthPicker.js'
import WeekPicker from '../WeekPicker/WeekPicker.js'

export default class ControlPanel extends React.PureComponent {
  state = {
    open: false
  }

  onSelectToday = () => {
    let today = dateAdapter()
    this.props.onSelectDate(today)
  }

  getFormtted () {
    let { date, activeView } = this.props
    switch (activeView) {
      case Views.month:
        return date.format('MMMM YYYY')
      case Views.week:
        return `KW: ${date.format('WW/GGGG')}`
      case Views.day:
        return date.format('ddd, MMMM YYYY')
    }
  }

  getDisplayRange () {
    let { date, activeView } = this.props
    switch (activeView) {
      case Views.month:
        return `${date.startOf('month').format('DD.MM.YYYY')} - ${date.endOf('month').format('DD.MM.YYYY')}`
      case Views.week:
        return `${date.startOf('week').format('DD.MM.YYYY')} - ${date.endOf('week').format('DD.MM.YYYY')}`
      case Views.day:
        return date.format('DD.MM.YYYY')
    }
  }

  onClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  onSelectDate = (date) => {
    this.setState({
      open: false
    }, () => {
      this.props.onSelectDate(date)
    })
  }

  render () {
    return (
      <DateRangeDisplayWrapper onClick={this.onClick}>
        <Display>
          {
            this.getDisplayRange()
          }
        </Display>
        {
          ReactDOM.createPortal(<div><OverlayWrapper shown={this.state.open}>
            <Overlay />
            <Popup>
              {
                this.renderPicker()
              }
            </Popup>
          </OverlayWrapper></div>, document.querySelector('body'))
        }
      </DateRangeDisplayWrapper>
    )
  }

  renderPicker () {
    let { activeView } = this.props
    switch (activeView) {
      case Views.month:
        return <MonthPicker year={this.props.date} onSelectMonth={this.onSelectDate} />
      case Views.week:
        return <WeekPicker month={this.props.date} onSelectWeek={this.onSelectDate} />
      default:
        return false
    }
  }
}

const Popup = styled.div`
  position: relative;
  z-index: 1001;
  margin: auto;
`

const Display = styled.div`
  position: relative;
  padding: 8px;
  font-size: 12px;
  font-family: sans-serif;
  background: white;
  color: #555;
  border-radius: 0;
  border: 1px solid #ddd;
  border-right: 0;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`

const DateRangeDisplayWrapper = styled.div`
  position: relative;
  width: 170px;
`

const OverlayWrapper = styled.div.attrs({
  className: classiq((props) => ({
    '--is-visible': props.shown
  }))
})`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  height: 100%;
  width: 100%;
  align-items: center;
  &.--is-visible {
    display: flex;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width:100%;
  background: rgba(0,0,0, 0.3);
`
