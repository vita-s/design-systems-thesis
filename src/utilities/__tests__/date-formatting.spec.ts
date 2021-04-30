import {
  convertDateStringToDate,
  dateFromIsoString,
  formatWithDots,
  humanizeDate,
  humanizeDateTime,
  humanizeIsoDate,
  humanizeIsoDatetime,
  humanizeIsoDateTimeWithDots,
  humanizeIsoTime,
  humanizeTime,
  isValidHour,
  isValidDate,
  isValidDateWithDots,
  isValidIsoDatetimeString,
  toDateTime,
  toIsoDatetime,
  toSortableDateString,
  momentTimeDifferenceInMinutes,
  humanizeTimeBetween
} from '@/utilities/date-formatting'
import moment from 'moment-timezone'
import { getDateHuman, sortableDateFromIsoString } from '../date-formatting'

const UTC_XMAS_AT_NINE_PM = moment.utc('2018-12-25T21:00:00Z')

describe('Date formatting module', () => {
  describe('Date converters and formatters', () => {
    it('converts Date to Sortable', () =>
      expect(toSortableDateString('25-12-2018')).toBe('20181225'))

    it('converts strings with date and hour to datetime', () => {
      expect(convertDateStringToDate('25-01-2019', '00:00:00').toISOString()).toBe(
        '2019-01-24T23:00:00.000Z'
      )
      expect(convertDateStringToDate('25-01-2019', '23:59:59').toISOString()).toBe(
        '2019-01-25T22:59:59.000Z'
      )
    })

    it('converts strings with date and hour to ISO datetime', () => {
      expect(toIsoDatetime('25-01-2019', '11:25')).toBe('2019-01-25T10:25:00.000Z')
      expect(toIsoDatetime('25-01-2019', '23:59')).toBe('2019-01-25T22:59:00.000Z')
    })

    it('format with dots', () => {
      expect(formatWithDots('29-12-2018')).toBe('29.12.2018')
      expect(formatWithDots(null)).toBe('-')
      expect(formatWithDots(undefined)).toBe('-')
    })

    it('toDateTime returns ISO datetime string containing', () => {
      //Before Daylight Saving time change (+02:00 in Berlin)
      expect(toDateTime('12-08-2018', '10:10')).toBe('2018-08-12T10:10:00+02:00')
      expect(toDateTime('12-08-2018', '15:10')).toBe('2018-08-12T15:10:00+02:00')
      //After Daylight Saving time change (+01:00 in Berlin)
      expect(toDateTime('25-12-2018', '10:10')).toBe('2018-12-25T10:10:00+01:00')
      expect(toDateTime('25-12-2018', '15:10')).toBe('2018-12-25T15:10:00+01:00')
    })

    it('toDateTime returns null on invalid date', () => {
      expect(toDateTime(null, null)).toBeNull()
    })

    it('dateFromIsoString', () => {
      expect(dateFromIsoString('2018-11-02T15:05:16.572843Z')).toBe('02.11.2018')
    })

    it('sortableDateFromIsoString formats correctly', () => {
      expect(sortableDateFromIsoString('2018-11-02T06:00:00.000000Z')).toBe('2018-11-02')
    })

    it('sortableDateFromIsoString formats correctly (timezone-aware)', () => {
      expect(sortableDateFromIsoString('2018-11-02T23:30:00.000000Z')).toBe('2018-11-03')
    })
  })

  describe('Time and Date Humanizers', () => {
    it('humanizes ISO datetime string with hypens', () =>
      expect(humanizeIsoDatetime('2018-05-29T21:30:00.115530+02:00')).toBe(
        '29-05-2018 21:30'
      ))

    it('humanizes ISO datetime string with dots', () =>
      expect(humanizeIsoDateTimeWithDots('2018-05-29T21:30:00.115530+02:00')).toBe(
        '29.05.2018 21:30'
      ))

    it('humanizes ISO date string', () =>
      expect(humanizeIsoDate('2018-05-29T21:30:00.115530+02:00')).toBe('29-05-2018'))

    it('humanizes ISO time string', () => {
      expect(humanizeIsoTime('2018-05-29T21:30:00.115530+00:00')).toBe('23:30')
      expect(humanizeIsoTime('2018-05-29T21:30:00.115530+02:00')).toBe('21:30')
    })

    it('humanizes date time', () =>
      expect(humanizeDateTime(UTC_XMAS_AT_NINE_PM)).toBe('25-12-2018 21:00'))

    it('humanizes date', () =>
      expect(humanizeDate(UTC_XMAS_AT_NINE_PM)).toBe('25-12-2018'))

    it('humanizes time', () => expect(humanizeTime(UTC_XMAS_AT_NINE_PM)).toBe('21:00'))

    it('humanizes undefined ISO string to undefined time', () =>
      expect(humanizeIsoTime('')).toBe(undefined))

    it('humanizeTimeBetween returns null if no valid time is passed as an argument', () => {
      expect(humanizeTimeBetween('', '2019-04-17T00:00:29Z')).toBe(null)
      expect(humanizeTimeBetween('2019-04-17T00:00:29Z', undefined)).toBe(null)
      expect(humanizeTimeBetween(moment(), null)).toBe(null)
    })

    it('humanizeTimeBetween returns a period of time formatted as xd yh left, yh zmin left or zmin left', () => {
      expect(
        humanizeTimeBetween('2019-04-17T13:13:29Z', '2019-04-19T19:42:29Z', ' left')
      ).toBe('2d 6h left')
      expect(
        humanizeTimeBetween('2019-04-17T00:00:29Z', '2019-04-17T06:42:29Z', ' left')
      ).toBe('6h 42min left')
      expect(
        humanizeTimeBetween('2019-04-17T00:00:29Z', '2019-04-17T00:42:29Z', ' left')
      ).toBe('42min left')
      expect(humanizeTimeBetween('2019-04-17T00:00:29Z', '2019-04-17T00:42:29Z')).toBe(
        '42min'
      )
    })

    it('humanizeTimeBetween counts days over a month ago properly', () => {
      const date = new Date('2019-08-01 09:00:00')
      const anHourAgoAMonthAgo = new Date('2019-07-01 08:00:00')

      expect(
        humanizeTimeBetween(anHourAgoAMonthAgo.toISOString(), date.toISOString(), ' left')
      ).toBe('1m 0d left')
    })

    it('getDateInApiFormat API-formats human readable date.', () =>
      expect(getDateHuman('24-12-2000')).toBe('2000-12-24'))

    it('getDateHuman humanizes API-formatted date.', () => {
      expect(getDateHuman('2000-12-24')).toBe('24-12-2000')
    })
  })

  it('isValidIsoDatetimeString', () => {
    expect(isValidIsoDatetimeString('WTF')).toBeFalsy()
    expect(isValidIsoDatetimeString('')).toBeFalsy()
    expect(isValidIsoDatetimeString(null)).toBeFalsy()
    expect(isValidIsoDatetimeString('1980-03-12T11:12:00.000Z')).toBeTruthy()
  })

  describe('isValidDate', () => {
    it('is false on text', () => expect(isValidDate('WTF')).toBeFalsy())

    it('is false on days larger than 31', () =>
      expect(isValidDate('34-12-2019')).toBeFalsy())

    it('is false on feb 29 in non-leap years', () =>
      expect(isValidDate('29-02-2019')).toBeFalsy())

    it('is false on two-digits years', () => expect(isValidDate('28-1-20')).toBeFalsy())

    it('is false when year is not added', () => {
      expect(isValidDate('28-1-')).toBeFalsy()
      expect(isValidDate('28-01')).toBeFalsy()
    })

    it('is valid on null', () => expect(isValidDate(null)).toBeTruthy())

    it('is valid on undefined', () => expect(isValidDate(undefined)).toBeTruthy())

    it('is valid one one-digit month with trailing whitespace', () =>
      expect(isValidDate('28-2 -2019')).toBeTruthy())

    it('is valid on 28-02-2019', () => expect(isValidDate('28-02-2019')).toBeTruthy())

    it('is true on one-digit months', () => expect(isValidDate('28-2-2019')).toBeTruthy())
  })

  describe('isValidDateWithDos', () => {
    it('is false on invalid format', () => {
      expect(isValidDateWithDots('12-12-2019')).toBeFalsy()
    })

    it('is false when year is not added', () => {
      expect(isValidDateWithDots('28.1.')).toBeFalsy()
      expect(isValidDateWithDots('28.01')).toBeFalsy()
    })
  })

  describe('momentTimeDifference', () => {
    it('returns correct delay in minutes when there is no actual time', () => {
      const step = {
        scheduledTime: '2019-04-17T13:13:29Z',
        estimatedTime: '2019-04-17T13:43:29Z'
      }
      expect(momentTimeDifferenceInMinutes(step)).toBe(30)
    })

    it('returns correct delay in minutes when there is an actual time', () => {
      const step = {
        scheduledTime: '2019-04-17T13:13:29Z',
        actualTime: '2019-04-17T13:43:29Z'
      }
      expect(momentTimeDifferenceInMinutes(step)).toBe(30)
    })

    it('returns null when there is no actual time nor estimated time', () => {
      const step = {
        scheduledTime: '2019-04-17T13:13:29Z',
        actualTime: null,
        estimatedTime: null
      }
      expect(momentTimeDifferenceInMinutes(step)).toBe(null)
    })
  })

  describe('isValidHour', () => {
    it('is invalid for hours beyond 24', () => expect(isValidHour('25:00')).toBeFalsy())

    it('is invalid for minutes beyond 59', () => expect(isValidHour('12:61')).toBeFalsy())

    it('is invalid for 60 minutes', () => expect(isValidHour('12:60')).toBeFalsy())

    it('is valid for a real hour', () => expect(isValidHour('12:30')).toBeTruthy())
  })
})
