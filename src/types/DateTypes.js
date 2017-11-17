import PropTypes from 'prop-types'
import moment from 'moment'

export default [
  PropTypes.instanceOf(moment),
  PropTypes.instanceOf(Date),
  PropTypes.number // unix timestamp
]
