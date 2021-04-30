import moment from 'moment-timezone'
import { isValidDateWithDots, isValidHour } from './date-formatting'

/**
 * In most places in the user interface we have an ISO timestamp being
 * sent from the backend but we need to edit separately the date and the time.
 * This has historically been done by expanding the timestamp field into
 * two separate fields and concatenating them when the request is being sent
 * back to the server to update the data.
 *
 * This class serves as a mediator between the data received from/sent to
 * the server and the user interface providing easy to use interface for editing
 * separately the date and the time in the proper format (dd.mm.yyyy, hh:mm)
 *
 * There are 2 special cases that this class also covers that were previously
 * hand-crafted in each timestamp field:
 * - dealing with null values being sent from the server
 * - dealing with partial user entries
 *
 * In the first case the isoTimeStamp property returns null unless both date
 * and time has been set by the user.
 * In the latter case if the user has entered only part of the value they will
 * be filled in from either defaults (01.01.0000 for date and 00:00 for time)
 * or from original ISO string.
 *
 * Please note the class allows only to edit the date and time. The rest of the
 * elements of the ISO timestamp format are readonly and come either from the
 * original timestamp or from default values
 *
 * PLEASE NOTE!
 * It is vitally important to understand the assumptions being made for parsing
 * and serializing the timestamps in regard to timezones.
 * The ISO timestamp being passed on to the constructor and returned when
 * serializing back to ISO will always be UTC.
 * This assumption is made so that the server can always communicate with the
 * frontend in UTC timestamps and the only place where any conversion is being
 * done is in the frontend for the purposes of interacting with the user.
 *
 * Also, miliseconds are truncated to keep the timestamp comparable.
 */
export class Timestamp {
  date: string | null
  time: string | null
  timezone!: string
  readonly dateSeparator: string | undefined
  readonly originalIsoTimeStamp: string | undefined
  readonly originalDate: string | undefined | null
  readonly originalTime: string | undefined | null
  readonly seconds: string | undefined

  constructor(isoTimeStamp: string | null, tz = 'UTC', dateSeparator = '.') {
    const ts = isoTimeStamp ? isoTimestampToUTC(isoTimeStamp) : null
    this.date = (ts && convertDateFromIsoDate(extractDate(ts), dateSeparator)) || null
    this.time = (ts && extractTime(ts)) || null

    timezone(this, 'timezone', dateSeparator)

    readonly(this, 'dateSeparator', dateSeparator)
    readonly(this, 'originalIsoTimeStamp', ts)
    readonly(this, 'originalDate', this.date || '01.01.0000')
    readonly(this, 'originalTime', this.time || '00:00')
    readonly(this, 'seconds', (ts && extractSeconds(ts)) || '00')

    if (tz) this.timezone = tz
  }

  get isDateValid() {
    return this.date && isValidDateWithDots(this.date)
  }

  get isTimeValid() {
    return this.time && isValidHour(this.time)
  }

  get isValid() {
    const isTimezoneValid = this.timezone && moment.tz.zone(this.timezone)
    return Boolean(this.isDateValid && this.isTimeValid && isTimezoneValid)
  }

  get isoTimeStamp() {
    if (!this.isValid) {
      return null
    } else {
      const date = convertDateToIsoDate(
        fill(this.date, this.originalDate),
        this.dateSeparator
      )
      const time = fill(this.time, this.originalTime)
      return moment.tz(`${date} ${time}:${this.seconds}`, this.timezone).utc().format()
    }
  }

  toJSON() {
    return this.isoTimeStamp
  }
}

/**
 * Convert ISO-formatted date to program-specific format
 *
 * @param {String} isoDate date to convert to
 */
function convertDateFromIsoDate(isoDate: string, dateSeparator = '.') {
  return isoDate.split('-').reverse().join(dateSeparator)
}

/**
 * Convert program-specific formatted date to ISO format
 *
 * @param {String} date date to convert to
 */
function convertDateToIsoDate(date: string, dateSeparator = '.') {
  return date.split(dateSeparator).reverse().join('-')
}

/**
 * Fills in missing characters
 *
 * @param {String} value value to be filled
 * @param {String} original original value when the Timestamp was created
 */
function fill(value: string | null, original: string | undefined | null) {
  // 1. trim if the input is too long
  const p1 = value && original ? value.substring(0, original.length) : ''
  // 2. get extension if the value is too short
  const p2 = original && value ? original.substring(value.length) : ''

  return p1 + p2
}

/**
 * Define a read-only property on an object
 *
 * @param {*} obj object to define the property on
 * @param {String} name name of the property
 * @param {*} value value returned by that property
 */
function readonly(obj: Object, name: string, value: unknown) {
  Object.defineProperty(obj, name, {
    get() {
      return value
    }
  })
}

/**
 * Define a timezone property that reacts to changes by recalculating
 * the date and time based on the new timezone being set
 *
 * @param {*} obj object to define the property on
 * @param {String} name name of the property
 * @param {String} defaultTimeZone default timezone to use
 */
function timezone(obj: Timestamp, name: string, dateSeparator = '.') {
  let timezone = 'UTC'

  Object.defineProperty(obj, name, {
    get() {
      return timezone
    },
    set(value) {
      const ts = obj.isoTimeStamp
      timezone = value
      if (ts) {
        const mts = moment.tz(ts, timezone).format()
        this.date = convertDateFromIsoDate(extractDate(mts), dateSeparator)
        this.time = convertDateFromIsoDate(extractTime(mts), dateSeparator)
      }
    }
  })
}

/**
 * Parses the ISO timestamp, truncates miliseconds and returns
 * a definite UTC ISO timestamp
 *
 * @param {String} isoTimeStamp timestamp to format
 */
function isoTimestampToUTC(isoTimeStamp: string) {
  const ts = moment(isoTimeStamp).utc()
  if (!ts.isValid) throw new Error(`Invalid timestamp "${isoTimeStamp}"`)
  return ts.format()
}

function extractDate(timestamp: string) {
  return timestamp.substring(0, 10)
}

function extractTime(timestamp: string) {
  return timestamp.substring(11, 16)
}

function extractSeconds(timestamp: string) {
  return timestamp.substring(17, 19)
}
