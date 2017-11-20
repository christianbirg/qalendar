import dateAdapter from '../../adapters/dateAdapter.js'

export default (steps, stepDuration) => {
  const day = dateAdapter()
  const endOfDay = day.endOf('day')

  let currentTime = day.startOf('day')
  const times = []
  while (currentTime.isSameOrBefore(endOfDay)) {
    times.push(currentTime)
    currentTime = currentTime.add(stepDuration * steps, 'minute')
  }

  return times
}
