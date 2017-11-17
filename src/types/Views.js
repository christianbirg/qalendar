const Views = {
  month: 'month',
  week: 'week',
  day: 'day'
}

const ViewsEnum = Object.keys(Views)
  .map((key) => Views[key])

export default Views
export {
  ViewsEnum
}
