import React from 'react'

import { storiesOf } from '@storybook/react'
import Calendar from '../src'

storiesOf('Calendar', module)
  .add('Hello Calendar', () => {
    return (
      <Calendar />
    )
  })
