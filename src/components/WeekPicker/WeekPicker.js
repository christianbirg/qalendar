import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import classiq from 'styled-classiq'

import StandardMonthSelector from './MonthSelector.js'

class WeekPicker extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      month: props.month,
      selectedWeek: props.selected || moment()
    }
    this.state.lines = this.calculateLines(this.state.month)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selected !== this.props.selected) {
      this.selectWeek(newProps.selected)
    }
  }

  generateEntry = (day, today, selectedWeek, month) => ({
    date: moment(day),
    string: day.format('D'),
    isToday: day.isSame(today, 'day'),
    inMonth: day.isSame(month, 'month'),
    isSelected: day.isSame(selectedWeek, 'week')
  })

  calculateLines = (month, selectedWeek) => {
    let lines = [ [] ]
    const firstDayOfMonth = moment(month).startOf('month')
    const today = moment()

    const day = moment(firstDayOfMonth).startOf('week')
    const endOfWeek = moment(day).endOf('week')
    while (day.isSameOrBefore(month, 'month')) {
      lines[lines.length - 1].push(this.generateEntry(day, today, selectedWeek, month))

      if (day.isSame(endOfWeek, 'day')) {
        lines.push([])
        endOfWeek.add(7, 'day').endOf('week')
      }

      day.add(1, 'day')
    }

    if (lines[lines.length - 1].length === 0) { // in case the last day of the month was a sunday
      lines.pop()
    }

    while (lines[lines.length - 1].length < 7) {
      lines[lines.length - 1].push(this.generateEntry(day, today, selectedWeek, month))
      day.add(1, 'day')
    }

    return lines
  }

  selectPreviousMonth = () => {
    const month = moment(this.state.month).subtract(1, 'month')
    const lines = this.calculateLines(month, this.state.selectedWeek)

    this.setState({
      month,
      lines
    })
  }

  selectNextMonth = () => {
    const month = moment(this.state.month).add(1, 'month')
    const lines = this.calculateLines(month, this.state.selectedWeek)

    this.setState({
      month,
      lines
    })
  }

  selectWeek = (selectedWeek) => {
    const lines = this.calculateLines(this.state.month, selectedWeek)

    this.setState({
      lines,
      selectedWeek
    })
  }

  onSelectWeek = (selectedWeek) => {
    this.selectWeek(selectedWeek)
    this.props.onSelectWeek(selectedWeek)
  }

  render () {
    return (
      <Wrapper>
        <MonthSelector
          month={this.state.month.format('MMMM YYYY')}
          onBackPress={this.selectPreviousMonth}
          onForwardPress={this.selectNextMonth}
        />

        <Content>
          <Table>
            <Header>
              { this.renderHeader() }
            </Header>

            <Body>
              { this.renderBody(this.onSelectWeek) }
            </Body>
          </Table>
        </Content>
      </Wrapper>
    )
  }

  renderHeader = () => {
    const day = moment(this.state.month).startOf('week')
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(day.format('dd').slice(0, 2))
      day.add(1, 'day')
    }

    return days.map((day, index) => (
      <HeaderEntry key={`day/${index}:${day}`}>
        { day }
      </HeaderEntry>
    ))
  }

  renderBody = (onClick) => this.state.lines.map((line, index) => (
    <Row key={`week/${index}`} onClick={() => onClick(line[0].date, line[line.length - 1].date)}>
      {
        line.map((day, dayIndex) => (
          <Cell key={`week/${index}:${dayIndex}`} inMonth={day.inMonth} isSelected={day.isSelected} isToday={day.isToday}>
            { day.string }
          </Cell>
        ))
      }
    </Row>
  ))
}

export default WeekPicker

const Wrapper = styled.div`
  width: 251px;

  border: 1px solid #EAEAEA;
  background-color: white;

  user-select: none;
`

const MonthSelector = styled(StandardMonthSelector)`
  width: 100%;
  padding: 8px;
`

const Content = styled.div`
  padding: 8px;
`

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0px 0px;
`

const Header = styled(({ children, ...props }) => (
  <thead {...props}>
    <tr>
      { children }
    </tr>
  </thead>
))`

`

const HeaderEntry = styled.th`
  font-weight: 350;
  font-size: 14px;
  padding: 8px;
`

const Body = styled.tbody`
  cursor: pointer;
`

const Cell = styled.td.attrs({
  className: classiq((props) => ({
    '--is-selected': props.isSelected,
    '--is-today': props.isToday
  }))
})`
  text-align: center;
  color: ${({ inMonth }) => inMonth ? 'black' : 'darkgray'};
  font-size: 12px;

  padding: 8px;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  &:first-child {
    border-left: 1px solid transparent;
  }
  &:last-child {
    border-right: 1px solid transparent;
  }

  &.--is-today {
    background-color: #F8F8F8;
  }

  &.--is-selected {
    border-top: 1px solid #446CB3;
    border-bottom: 1px solid #446CB3;

    &:first-child {
      border-left: 1px solid #446CB3;
    }
    &:last-child {
      border-right: 1px solid #446CB3;
    }
  }
`

const Row = styled.tr`
  &:hover {
    background-color: #a1b5d9;
    ${Cell} {
      color: black;
    }
    ${Cell}.--is-today {
      background-color: #8ea6d1;
    }
    ${Cell}:first-child, ${Cell}:last-child {
      background-color: #446cb3;
      color: white;
    }
    ${Cell}:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    ${Cell}:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
`
