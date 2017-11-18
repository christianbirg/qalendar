// @flow
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import dateAdapter from './adapters/dateAdapter.js'
import Views, { ViewsEnum } from './types/Views.js'
import DateTypes from './types/DateTypes.js'

import ControlPanel from './components/ControlPanel'

import Month from './components/Month/Month.js'
import Week from './components/Week'
import Day from './components/Day'

moment.locale('de')

type View = Views.month | Views.week | Views.day

type Props = {
  date: any,
  defaultView: View,
  views: Array<View>,
  onDateChange: any,
  slots: any,
  duration: any
}

class Qalendar extends React.PureComponent<Props> {
  constructor (props) {
    super(props)

    this.state = {
      view: props.defaultView,
      date: dateAdapter(props.date)
    }
  }

  onSelectView = (view) => {
    this.setState({ view })
  }

  onSelectDate = (date) => {
    this.setState({ date })
  }

  render () {
    return (
      <Wrapper>
        <ControlPanel
          date={this.state.date}
          activeView={this.state.view}
          onSelectDate={this.onSelectDate}
          views={this.props.views}
          onSelectView={this.onSelectView}
        />

        <ViewWrapper>
          { this.renderView() }
        </ViewWrapper>
      </Wrapper>
    )
  }

  renderView = () => {
    switch (this.state.view) {
      case Views.month:
        return <Month date={this.state.date} />
      case Views.week:
        return <Week date={this.state.date} stepDuration={this.props.duration} steps={this.props.slots} />
      case Views.day:
        return <Day />
    }
  }
}

export default Qalendar
export { default as Views } from './types/Views.js'

Qalendar.defaultProps = {
  date: moment(),
  views: ViewsEnum,
  defaultView: Views.week
}

Qalendar.propTypes = {
  date: PropTypes.oneOfType(DateTypes),
  views: PropTypes.arrayOf(PropTypes.oneOf(ViewsEnum)),
  defaultView: PropTypes.oneOf(ViewsEnum)
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  * {
    font-family: sans-serif;
  }
`

const ViewWrapper = styled.div`
  flex: 1 0 auto;

  border: 1px solid #ddd;
`
