import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TimeScale from '../TimeScale/TimeScale.js'

const Day = (props) => {
  const timeScaleProps = {
    withoutText: true,
    steps: props.steps,
    stepDuration: props.stepDuration
  }

  return (
    <Wrapper>
      <TimeScale {...timeScaleProps} />
    </Wrapper>
  )
}

export default Day

Day.defaultProps = {
  steps: 4,
  stepDuration: 15
}

Day.propTypes = {
  steps: PropTypes.number,
  stepDuration: PropTypes.number
}

const Wrapper = styled.div`
  position: relative;
`
