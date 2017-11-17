import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ArrowRightIcon from './ArrowRightIcon.js'

const YearSelector = ({ onBackPress, onForwardPress, year, ...props }) => (
  <Wrapper {...props}>
    <ArrowLeft onClick={onBackPress} />

    <Text>
      { year }
    </Text>

    <ArrowRight onClick={onForwardPress} />
  </Wrapper>
)

export default YearSelector

YearSelector.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onForwardPress: PropTypes.func.isRequired,
  year: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #446CB3;

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
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
