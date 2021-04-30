import { Timestamp } from '@/utilities/Timestamp'

describe('Timestamp', () => {
  it('parses timestamp with offset', () => {
    const timestamp = new Timestamp('2020-06-05T03:11:12+05:00')
    expect(timestamp.isoTimeStamp).toBe('2020-06-04T22:11:12Z')
  })

  it('returns date', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    expect(timestamp.date).toEqual('05.06.2020')
  })

  it('sets date', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    timestamp.date = '03.02.2020'
    expect(timestamp.isoTimeStamp).toEqual('2020-02-03T10:11:12Z')
  })

  it('returns time', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    expect(timestamp.time).toEqual('10:11')
  })

  it('sets time', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    timestamp.time = '23:40'
    expect(timestamp.isoTimeStamp).toEqual('2020-06-05T23:40:12Z')
  })

  it('sets too long value for time', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    timestamp.time = '23:45:33'
    expect(timestamp.time).toEqual('23:45:33')
    expect(timestamp.isoTimeStamp).toEqual('2020-06-05T23:45:12Z')
  })

  it('sets too long value for date', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    timestamp.date = '01.02.20321'
    expect(timestamp.date).toEqual('01.02.20321')
    expect(timestamp.isoTimeStamp).toEqual('2032-02-01T10:11:12Z')
  })

  it('will serialize to ISO timestamp', () => {
    const timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    const obj = { timestamp }
    expect(JSON.stringify(obj)).toEqual('{"timestamp":"2020-06-05T10:11:12Z"}')
  })

  it('will serialize null', () => {
    const timestamp = new Timestamp(null)
    const obj = { timestamp }
    expect(JSON.stringify(obj)).toEqual('{"timestamp":null}')
  })

  it('will serialize as null if only date is defined', () => {
    const timestamp = new Timestamp(null)
    timestamp.date = '05.06.2020'
    const obj = { timestamp }
    expect(timestamp.isoTimeStamp).toBeNull()
    expect(JSON.stringify(obj)).toEqual('{"timestamp":null}')
  })

  it('will serialize as null if only time is defined', () => {
    const timestamp = new Timestamp(null)
    timestamp.time = '11:22'
    const obj = { timestamp }
    expect(timestamp.isoTimeStamp).toBeNull()
    expect(JSON.stringify(obj)).toEqual('{"timestamp":null}')
  })

  it('will serialize initial null with defined date and time to proper ISO timestamp', () => {
    const timestamp = new Timestamp(null)
    timestamp.date = '05.06.2020'
    timestamp.time = '11:22'
    const obj = { timestamp }
    expect(timestamp.isoTimeStamp).toEqual('2020-06-05T11:22:00Z')
    expect(JSON.stringify(obj)).toEqual('{"timestamp":"2020-06-05T11:22:00Z"}')
  })

  describe('Validation', () => {
    let timestamp: Timestamp

    beforeEach(() => {
      timestamp = new Timestamp('2020-06-05T10:11:12.013Z')
    })

    it('returns true isDateValid property', () => {
      expect(timestamp.isDateValid).toBe(true)
    })

    it('returns false isDateValid property', () => {
      timestamp.date = '32.13.'
      expect(timestamp.isDateValid).toBe(false)
    })

    it('returns true isTimeValid property', () => {
      expect(timestamp.isTimeValid).toBe(true)
    })

    it('returns false isTimeValid property', () => {
      timestamp.time = '11:'
      expect(timestamp.isTimeValid).toBe(false)
    })

    it('returns truthy isValid property', () => {
      expect(timestamp.isValid).toBe(true)
    })

    it('returns false isValid property if the date is wrong', () => {
      timestamp.date = '32.13.2020'
      expect(timestamp.isValid).toBe(false)
    })

    it('returns false isValid property if the time is wrong', () => {
      timestamp.time = '24:60'
      expect(timestamp.isValid).toBe(false)
    })

    it("doesn't set part of the date", () => {
      timestamp.date = '01'
      expect(timestamp.isValid).toBe(false)
    })

    it("doesn't set part of the time", () => {
      timestamp.time = '2'
      expect(timestamp.isValid).toBe(false)
    })
  })

  describe('Timezones', () => {
    it('will convert to given timezone', () => {
      const timestamp = new Timestamp('2020-03-29T01:20:30Z')
      timestamp.timezone = 'Europe/Berlin'
      expect(timestamp.date).toBe('29.03.2020')
      expect(timestamp.time).toBe('03:20')
    })

    it('will serialize back to UTC when daylight saving', () => {
      const timestamp = new Timestamp('2020-03-29T01:20:30Z')
      timestamp.timezone = 'Europe/Berlin'
      timestamp.time = '02:45'
      expect(timestamp.isoTimeStamp).toBe('2020-03-29T01:45:30Z')
    })

    it('will serialize back to UTC when not daylight saving', () => {
      const timestamp = new Timestamp('2020-03-29T01:20:30Z')
      timestamp.timezone = 'Europe/Berlin'
      timestamp.date = '28.03.2020'
      expect(timestamp.isoTimeStamp).toBe('2020-03-28T02:20:30Z')
    })

    it('will serialize null timestamp with timezone', () => {
      const timestamp = new Timestamp(null)
      timestamp.timezone = 'Europe/Berlin'
      expect(timestamp.isoTimeStamp).toBeNull()
    })

    it('will serialize edited null timestamp with timezone', () => {
      const timestamp = new Timestamp(null)
      timestamp.timezone = 'Europe/Berlin'
      timestamp.date = '28.03.2020'
      timestamp.time = '02:30'
      expect(timestamp.isoTimeStamp).toBe('2020-03-28T01:30:00Z')
    })

    it('will serialize edited timestamp with timezone for daylight-saving shifted timestamp', () => {
      const timestamp1 = new Timestamp('2020-03-29T00:00:00Z')
      const timestamp2 = new Timestamp('2020-03-29T00:00:00Z')
      timestamp1.timezone = 'Europe/Berlin'
      timestamp1.time = '02:30'
      timestamp2.timezone = 'Europe/Berlin'
      timestamp2.time = '03:30'
      expect(timestamp1.isoTimeStamp).toBe('2020-03-29T01:30:00Z')
      expect(timestamp2.isoTimeStamp).toBe('2020-03-29T01:30:00Z')
    })

    it('will convert timestamp to timezone forward', () => {
      const timestamp = new Timestamp('2020-03-20T23:00:00Z')
      timestamp.timezone = 'Asia/Tokyo'
      expect(timestamp.date).toBe('21.03.2020')
      expect(timestamp.time).toBe('08:00')
    })

    it('will convert timestamp to timezone backwards', () => {
      const timestamp = new Timestamp('2020-03-20T00:00:00Z')
      timestamp.timezone = 'America/Santiago'
      expect(timestamp.date).toBe('19.03.2020')
      expect(timestamp.time).toBe('21:00')
    })

    it('returns falsy isValid property for wrong timezone', () => {
      const originalConsoleError = global.console.error
      // stubbing console.error to hide the "timezone not found"
      // moment.js error
      global.console.error = jest.fn()
      const timestamp = new Timestamp('2020-03-20T00:00:00Z')
      timestamp.timezone = 'Moon/MareTranquillitatis'
      expect(timestamp.isValid).toBe(false)
      global.console.error = originalConsoleError
    })
  })
})
