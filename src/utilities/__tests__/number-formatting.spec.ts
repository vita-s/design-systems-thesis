import {
  formatIntegerWithThousands,
  formatWithThousands,
  formatNullInteger,
  isNumber
} from '@/utilities/number-formatting'

describe('Number formatting', () => {
  it('formats quantity with thousands', () => {
    expect(formatWithThousands(1023.4567)).toBe('1,023.46')
    expect(formatWithThousands(1023.45)).toBe('1,023.45')
    expect(formatWithThousands(0)).toBe('0.00')
    expect(formatWithThousands('1023.45')).toBe('1,023.45')
  })

  it('formats quantity with thousands integer', () => {
    expect(formatIntegerWithThousands(1023.3567)).toBe('1,023')
    expect(formatIntegerWithThousands(1024.6567)).toBe('1,024')
    expect(formatIntegerWithThousands(1023)).toBe('1,023')
    expect(formatIntegerWithThousands(123)).toBe('123')
  })
  it('formats quantity with null integer', () => {
    expect(formatNullInteger(0)).toBe('0')
    expect(formatNullInteger(87)).toBe(87)
  })
  it('check if the quantity is number', () => {
    expect(isNumber(1023.3567)).toBe(true)
    expect(isNumber('not a number')).toBe(false)
  })
})
