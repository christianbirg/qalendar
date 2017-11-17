import React from 'react'
import styled from 'styled-components'

import TimeScale from '../TimeScale'

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

const Wrapper = styled.div`
  position: relative;
`
