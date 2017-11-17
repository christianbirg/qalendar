import React from 'react'
import styled from 'styled-components'

import TimeScale from '../TimeScale'

export default () => (
  <Wrapper>
    <TimeScale withoutText />
  </Wrapper>
)

const Wrapper = styled.div`
  position: relative;
`
