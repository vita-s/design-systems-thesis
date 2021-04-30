export const inDays = (time1: string, time2: string) =>
  parseInt(
    String((new Date(time2).getTime() - new Date(time1).getTime()) / (24 * 3600 * 1000))
  )

export const inWeeks = (time1: string, time2: string) =>
  parseInt(
    String(
      (new Date(time2).getTime() - new Date(time1).getTime()) / (24 * 3600 * 1000 * 7)
    )
  )

export const inMonths = (date1: string, date2: string): number => {
  const d1M = new Date(date1).getMonth()
  const d2M = new Date(date2).getMonth()
  const d1Y = new Date(date1).getFullYear()
  const d2Y = new Date(date2).getFullYear()

  return d2M + 12 * d2Y - (d1M + 12 * d1Y)
}

export const inYears = (date1: string, date2: string) =>
  new Date(date2).getFullYear() - new Date(date1).getFullYear()
