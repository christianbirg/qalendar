import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ArrowRightIcon from './ArrowRightIcon.js'

const MonthSelector = ({ onBackPress, onForwardPress, month, ...props }) => (
  <Wrapper {...props}>
    <ArrowLeft onClick={onBackPress} />
    <Text>
      { month }
    </Text>
    <ArrowRight onClick={onForwardPress} />
  </Wrapper>
)

export default MonthSelector

MonthSelector.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onForwardPress: PropTypes.func.isRequired,
  month: PropTypes.string
}

const Wrapper = styled.div`
  width: 100%;

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

const ArrowRight = styled(ArrowRightIcon)`
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
