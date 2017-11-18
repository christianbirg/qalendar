import React from 'react'
import styled from 'styled-components'
import classiq from 'styled-classiq'

import Views, { getViewLocale } from '../../types/Views'

import dateAdapter from '../../adapters/dateAdapter.js'

import DateRangeDisplay from './DateRangeDisplay.js'

export default class ControlPanel extends React.PureComponent {
  onSelectToday = () => {
    let today = dateAdapter()
    this.props.onSelectDate(today)
  }

  onNextDate = () => {
    let { date, activeView } = this.props
    this.props.onSelectDate(date.add(1, activeView))
  }

  onPrevDate = () => {
    let { date, activeView } = this.props
    this.props.onSelectDate(date.subtract(1, activeView))
  }

  getFormtted () {
    let { date, activeView } = this.props
    switch (activeView) {
      case Views.month:
        return date.format('MMMM YYYY')
      case Views.week:
        return ` KW: ${date.format('WW/GGGG')}`
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

  render () {
    let { views, date, onSelectView, activeView } = this.props
    return (
      <ControlPanelWrapper>
        <LinkArea>
          <ViewButtonGroup>
            <ViewButton onClick={this.onSelectToday}>Heute</ViewButton>
          </ViewButtonGroup>
          <DateDisplay>{ this.getFormtted() }</DateDisplay>
        </LinkArea>
        <CalendarControlArea>
          <ViewButtonGroup>
            <ViewButton onClick={this.onPrevDate}>Zurück</ViewButton>
            <DateRangeDisplay date={date} activeView={activeView} onSelectDate={this.props.onSelectDate} />
            <ViewButton onClick={this.onNextDate}>Vor</ViewButton>
          </ViewButtonGroup>
        </CalendarControlArea>
        <ViewArea>
          <ViewButtonGroup>
            {
              views.map((view) => {
                let locale = getViewLocale(view)
                return <ViewButton active={activeView === view} key={locale} onClick={() => onSelectView(view)}>{ locale }</ViewButton>
              })
            }
          </ViewButtonGroup>
        </ViewArea>
      </ControlPanelWrapper>
    )
  }
}

const ControlPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`

const LinkArea = styled.div`
  flex: 0 1 auto;
  width: 30%;
  display: flex;
  flex-direction: row;
`

const CalendarControlArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ViewArea = styled.div`
  width: 30%;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ViewButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

const DateDisplay = styled.div`
  flex: 0 1 auto;
  margin: 0;
  padding: 4px 16px;
  font-size: 20px;
  vertical-align: middle;
  line-height: 24px;
`

const ViewButton = styled.button.attrs({
  className: classiq((props) => ({
    'is--active': props.active
  }))
})`
  padding: 8px 16px;
  font-size: 12px;
  font-family: sans-serif;
  background: #f8f8f8;
  color: #555;
  border-radius: 0;
  border: 1px solid #ddd;
  border-right: 0;
  outline: 0;
  cursor: pointer;
  min-width: 70px;
  &:hover, &.is--active {
    background: #f1f1f1;
  }

  &:last-child {
    border-right: 1px solid #ddd;
  }
`
