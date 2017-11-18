const Views = {
  month: 'month',
  week: 'week',
  day: 'day'
}

const getViewLocale = (view) => {
  switch (view) {
    case Views.month:
      return 'Monat'
    case Views.week:
      return 'Woche'
    case Views.day:
      return 'Tag'
  }
}

const ViewsEnum = Object.keys(Views)
  .map((key) => Views[key])

export default Views
export {
  getViewLocale,
  ViewsEnum
}
