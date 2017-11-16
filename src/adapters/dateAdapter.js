class DateProxy {

}

const dateAdapter = function (value, arg1) {
  return new DateProxy(value, arg1)
}

export default dateAdapter
