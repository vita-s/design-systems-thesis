import moment from 'moment-timezone'
import { step } from './types/utilitiesTypes'
import { Moment } from 'moment'

export const NOT_AVAILABLE_PLACEHOLDER = 'n/a'

export const DATE_FORMAT = 'DD-MM-YYYY'
export const SORTABLE_DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_FORMAT_WITH_DOTS = 'DD.MM.YYYY'
export const TIME_FORMAT = 'HH:mm'
export const DATETIME_FORMAT_WITH_DOTS = 'DD.MM.YYYY HH:mm'

const DATETIME_FORMAT_WITH_HYPHENS = 'DD-MM-YYYY HH:mm'
const DATETIME_FORMAT_WITH_HYPHENS_AND_SECONDS = `${DATETIME_FORMAT_WITH_HYPHENS}:ss`

// This function is also used by the clients (octopus, orcas...) to set Berlin TZ for tests
export const setBerlinAsDefaultTimeZone = () => moment.tz.setDefault('Europe/Berlin')

export const toSortableDateString = (date: string) => {
  if (date) {
    const dateParts = date.split('-')
    return dateParts[2] + dateParts[1] + dateParts[0]
  }
}

export function getDateHuman(dateInApiFormat: string) {
  // Turns a date 2000-12-24 into 24-12-2000.
  return reverseDashFormattedDate(dateInApiFormat)
}

export function getDateInApiFormat(dateHuman: string) {
  // Turns a date 24-12-2000 into 2000-12-24.
  return reverseDashFormattedDate(dateHuman)
}

function reverseDashFormattedDate(formattedDate: string) {
  if (!formattedDate) return
  const parts = formattedDate.split('-')
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

export function dateFromIsoString(isoDatetimeString: string) {
  return moment(isoDatetimeString).format(DATE_FORMAT_WITH_DOTS)
}

export const sortableDateFromIsoString = (isoDateTimeString: string) => {
  // Return format: YYYY-MM-DD
  // This takes timezones into account. Simply cutting the ISO datetime string would not.
  return moment(isoDateTimeString).format(SORTABLE_DATE_FORMAT)
}

export function toIsoDate(date: string) {
  return moment(date, DATE_FORMAT_WITH_DOTS).toISOString()
}
export function toIsoDatetime(date: string, hour: string) {
  return convertDateStringToDate(date, hour).toISOString()
}

export const convertDateStringToDate = (date: string, time: string) => {
  const dateTime = `${date} ${time}`
  return moment(dateTime, DATETIME_FORMAT_WITH_HYPHENS_AND_SECONDS)
}

export const formatWithDots = (date?: string | null) => {
  if (!date) return '-'
  return date.replace(/-/g, '.')
}

export const humanizeIsoDatetime = (isoDate: string) =>
  humanizeIso(isoDate, DATETIME_FORMAT_WITH_HYPHENS)
export const humanizeIsoDateTimeWithDots = (isoDate: string) =>
  humanizeIso(isoDate, DATETIME_FORMAT_WITH_DOTS)
export const humanizeIsoDate = (isoDate: string) => humanizeIso(isoDate, DATE_FORMAT)
export const humanizeIsoTime = (isoDate: string) => humanizeIso(isoDate, TIME_FORMAT)

const humanizeIso = (isoDate: string, format: string) =>
  (isoDate && moment(isoDate).format(format)) || undefined

export const humanizeDateTime = (value: Moment) =>
  value.format(DATETIME_FORMAT_WITH_HYPHENS)
export const humanizeDateTimeWithDots = (value: Moment) =>
  value.format(DATETIME_FORMAT_WITH_DOTS)
export const humanizeDate = (value: Moment) => value.format(DATE_FORMAT)
export const humanizeDateWithDots = (value: Moment) => value.format(DATE_FORMAT_WITH_DOTS)

export const humanizeTime = (value: Moment) => value.format(TIME_FORMAT)

export const today = () => moment().format(DATE_FORMAT)
export const now = () => moment()
export const nowInHourAndMinutes = () => moment().format(TIME_FORMAT)

export const durationBetweenIsoDates = (initialDate: string, finalDate: string) =>
  moment.duration(moment(initialDate).diff(moment(finalDate)))
export const minutesBetweenIsoDates = (initialDate: string, finalDate: string) =>
  moment(initialDate).diff(moment(finalDate), 'minutes')

export const toDateTime = (date?: string | null, time?: string | null) => {
  if (date && time) {
    const datetime = moment(date + ' ' + time, DATETIME_FORMAT_WITH_HYPHENS_AND_SECONDS)
    return datetime.isValid() ? datetime.format() : null
  }
  return null
}

export const isValidIsoDatetimeString = (isoDatetimeString?: string | null) => {
  if (!isoDatetimeString) return false
  return moment(isoDatetimeString, DATE_FORMAT).isValid()
}

export const isValidDate = (dateString?: string | null) => {
  const VALID_DATE = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/
  if (!dateString) return true
  if (!dateString.replace(/\s/g, '').match(VALID_DATE)) return false
  return moment(dateString, DATE_FORMAT).isValid()
}

export const isValidDateWithDots = (dateString?: string) => {
  if (!dateString) return true
  return moment(dateString.slice(0, 10), DATE_FORMAT_WITH_DOTS, true).isValid()
}
const validUnits = [
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years'
]

export const momentTimeDifferenceInMinutes = (step: step) => {
  if (!step.actualTime && !step.estimatedTime) {
    return null
  }
  const referenceTime =
    (step.actualTime ? step.actualTime : step.estimatedTime) ?? undefined
  return moment(referenceTime).diff(moment(step.scheduledTime), 'minutes')
}

export const humanizeTimeBetween = (
  time1?: string | Moment | null,
  time2?: string | Moment | null,
  trailingText = ''
) => {
  if (!time1 || !time2) {
    return null
  }
  const period = moment.duration(moment(time2).diff(time1))
  if (period.months() !== 0) {
    return `${Math.abs(period.months())}m ${Math.abs(period.days())}d${trailingText}`
  } else if (period.days() !== 0) {
    return `${Math.abs(period.days())}d ${Math.abs(period.hours())}h${trailingText}`
  } else if (period.hours() !== 0) {
    return `${Math.abs(period.hours())}h ${Math.abs(period.minutes())}min${trailingText}`
  } else {
    return `${Math.abs(period.minutes())}min${trailingText}`
  }
}

export const nowUtcIsoFormatted = () => {
  return moment.utc().format()
}

export const isValidHour = (hour: string) =>
  moment(hour.slice(0, 5), 'HH:mm', true).isValid()
