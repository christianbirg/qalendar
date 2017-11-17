import React from 'react'
import styled from 'styled-components'

import { Icon } from '../Icon/Icon.js'

export default ({ onBackPress, onForwardPress, year, ...props }) => (
  <Wrapper {...props}>
    <ArrowLeft onClick={onBackPress} />
    <Text>
      { year }
    </Text>
    <ArrowRight onClick={onForwardPress} />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #446CB3;
`

const Text = styled.span`
  flex: 1 0 auto;
  text-align: center;
  text-transform: uppercase;
  color: white;

  font-size: 14px;
  font-weight: 500;
`

const ArrowRight = styled(Icon).attrs({
  source: require('./arrow_right.svg')
})`
  padding: 0px;
  cursor: pointer;
  svg {
    width: 28px;
    height: 28px;
    fill: white;
  }
`

const ArrowLeft = styled(ArrowRight)`
  transform: rotate(180deg);
`
