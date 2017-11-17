import moment from 'moment'

// Immutable DateAdapter wrapping momentjs
class DateProxy {
  constructor (value, arg1) {
    if (arg1 === false) {
      this._dateInstance = value
    } else {
      this._dateInstance = moment(value, arg1)
    }
  }

  _getUnderlyingDateObject = () => this._dateInstance

  startOf = (unit) => {
    const newDate = moment(this._getUnderlyingDateObject()).startOf(unit)
    return createDate(newDate, false /* marks the object passed as a date instance */)
  }

  endOf = (unit) => {
    const newDate = moment(this._getUnderlyingDateObject()).endOf(unit)
    return createDate(newDate, false /* marks the object passed as a date instance */)
  }

  add = (amount, unit) => {
    const newDate = moment(this._getUnderlyingDateObject()).add(amount, unit)
    return createDate(newDate, false)
  }

  subtract = (amount, unit) => {
    const newDate = moment(this._getUnderlyingDateObject()).subtract(amount, unit)
    return createDate(newDate, false)
  }

  format = (format) => {
    return this._getUnderlyingDateObject().format(format)
  }

  isBefore = (otherDate, unit) => {
    return this._getUnderlyingDateObject().isBefore(otherDate._getUnderlyingDateObject(), unit)
  }

  isSame = (otherDate, unit) => {
    return this._getUnderlyingDateObject().isSame(otherDate._getUnderlyingDateObject(), unit)
  }

  isAfter = (otherDate, unit) => {
    return this._getUnderlyingDateObject().isAfter(otherDate._getUnderlyingDateObject(), unit)
  }

  isSameOrBefore = (otherDate, unit) => {
    return this.isBefore(otherDate, unit) || this.isSame(otherDate, unit)
  }
}

const createDate = (value, arg1) => {
  return new DateProxy(value, arg1)
}

createDate.prototype = DateProxy.prototype

export default createDate
