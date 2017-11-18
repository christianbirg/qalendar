import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TimeScale from './TimeScale.js'

const TimeAxis = (props) => {
  return (
    <TimeAxisWrapper>
      <TimeScale {...props} />
      { props.children }
    </TimeAxisWrapper>
  )
}

export default TimeAxis

TimeAxis.defaultProps = {
  steps: 4,
  stepDuration: 15
}

TimeAxis.propTypes = {
  steps: PropTypes.number,
  stepDuration: PropTypes.number
}

const TimeAxisWrapper = styled.div`
  flex: 0 0 auto;
  width: 50px;
  border-right: 1px solid #ddd;
`
