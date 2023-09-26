// Check if more than 4 hours have passed
export function fourHoursLater(timestamp: string): boolean {
  const timestampDate = new Date(timestamp)
  const currentDate = new Date()

  const timeDifference = currentDate.getTime() - timestampDate.getTime()
  const fourHoursInMilliseconds = 4 * 60 * 60 * 1000

  return timeDifference > fourHoursInMilliseconds
}
