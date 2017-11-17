import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import classiq from 'styled-classiq'

import StandardYearSelector from './YearSelector.js'

class MonthPicker extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      year: props.year,
      selectedMonth: props.selected || moment()
    }
    this.state.lines = this.calculateLines(this.state.year, this.state.selectedMonth)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selected !== this.props.selected) {
      this.selectMonth(newProps.selected)
    }
  }

  generateEntry = (month, selectedMonth, today) => ({
    date: moment(month),
    string: month.format('MMM'),
    isCurrent: month.isSame(today, 'month'),
    isSelected: month.isSame(selectedMonth, 'month')
  })

  calculateLines = (year, selectedMonth) => {
    let lines = [ [] ]
    const firstDayOfYear = moment(year).startOf('year')
    const today = moment()

    const month = moment(firstDayOfYear)
    while (month.isSame(year, 'year')) {
      lines[lines.length - 1].push(this.generateEntry(month, selectedMonth, today))

      if (lines[lines.length - 1].length === 3) {
        lines.push([])
      }

      month.add(1, 'month')
    }

    return lines
  }

  selectPreviousYear = () => {
    const year = moment(this.state.year).subtract(1, 'year')
    const lines = this.calculateLines(year, this.state.selectedMonth)

    this.setState({
      year,
      lines
    })
  }

  selectNextYear = () => {
    const year = moment(this.state.year).add(1, 'year')
    const lines = this.calculateLines(year, this.state.selectedMonth)

    this.setState({
      year,
      lines
    })
  }

  selectMonth = (selectedMonth) => {
    const lines = this.calculateLines(this.state.year, selectedMonth)

    this.setState({
      selectedMonth,
      lines
    })
  }

  onSelectMonth = (selectedMonth) => {
    this.selectMonth(selectedMonth)
    this.props.onSelectMonth(selectedMonth)
  }

  render () {
    return (
      <Wrapper>
        <YearSelector
          year={this.state.year.format('YYYY')}
          onBackPress={this.selectPreviousYear}
          onForwardPress={this.selectNextYear}
        />

        <Content>
          <Table>
            <Body>
              { this.renderBody(this.onSelectMonth) }
            </Body>
          </Table>
        </Content>
      </Wrapper>
    )
  }

  renderBody = (onClick) => this.state.lines.map((line, index) => (
    <Row key={`month/${index}`}>
      {
        line.map((month, monthIndex) => (
          <Cell key={`month/${index}:${monthIndex}`} onClick={() => onClick(month.date)} isSelected={month.isSelected} isCurrent={month.isCurrent}>
            <span>
              { month.string }
            </span>
          </Cell>
        ))
      }
    </Row>
  ))
}

export default MonthPicker

const Wrapper = styled.div`
  width: 251px;

  border: 1px solid #EAEAEA;
  background-color: white;

  user-select: none;
`

const YearSelector = styled(StandardYearSelector)`
  width: 100%;
  padding: 8px;
`

const Content = styled.div`
  padding: 8px;
  width: 100%;
`

const Table = styled.table`
  border-collapse: separate;
  width: 100%;
`

const Body = styled.tbody`
  cursor: pointer;
`

const Cell = styled.td.attrs({
  className: classiq((props) => ({
    '--is-selected': props.isSelected
  }))
})`
  text-align: center;
  color: black;
  font-size: 12px;

  padding: 16px;

  &:hover {
    background-color: #a1b5d9;
  }

  background-color: ${({ isCurrent }) => isCurrent ? '#F8F8F8' : 'white'};
  border: 1px solid transparent;
  &.--is-selected {
    border: 1px solid #446CB3;
  }
`

const Row = styled.tr`
`
