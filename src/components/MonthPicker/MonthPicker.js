import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classiq from 'styled-classiq'

import dateAdapter from '../../adapters/dateAdapter.js'

import StandardYearSelector from './YearSelector.js'

class MonthPicker extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      year: props.year,
      selectedMonth: props.selected
    }
    this.state.lines = this.calculateLines(this.state.year, this.state.selectedMonth)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selected !== this.props.selected) {
      this.selectMonth(newProps.selected)
    }
  }

  generateEntry = (month, selectedMonth, today) => ({
    date: month,
    string: month.format('MMM'),
    isCurrent: month.isSame(today, 'month'),
    isSelected: month.isSame(selectedMonth, 'month')
  })

  calculateLines = (year, selectedMonth) => {
    let lines = [ [] ]
    const firstDayOfYear = year.startOf('year')
    const today = dateAdapter()

    let month = firstDayOfYear
    while (month.isSame(year, 'year')) {
      lines[lines.length - 1].push(this.generateEntry(month, selectedMonth, today))

      if (lines[lines.length - 1].length === 3) {
        lines.push([])
      }

      month = month.add(1, 'month')
    }

    return lines
  }

  selectPreviousYear = () => {
    const year = this.state.year.subtract(1, 'year')
    const lines = this.calculateLines(year, this.state.selectedMonth)

    this.setState({
      year,
      lines
    })
  }

  selectNextYear = () => {
    const year = this.state.year.add(1, 'year')
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

MonthPicker.defaultProps = {
  selected: dateAdapter()
}

MonthPicker.propTypes = {
  selected: PropTypes.instanceOf(dateAdapter),
  year: PropTypes.instanceOf(dateAdapter),
  onSelectMonth: PropTypes.func
}

const Wrapper = styled.div`
  width: 251px;
  border: 1px solid #ddd;
  background-color: white;

  user-select: none;
`

const YearSelector = styled(StandardYearSelector)`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`

const Content = styled.div`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-top: none;
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
  box-sizing: border-box;

  &:hover {
    background-color: #a1b5d9;
  }

  background-color: ${({ isCurrent }) => isCurrent ? '#F8F8F8' : 'white'};
  border: 1px solid transparent;
  &.--is-selected {
    border: 1px solid #ddd;
  }
`

const Row = styled.tr`
`
