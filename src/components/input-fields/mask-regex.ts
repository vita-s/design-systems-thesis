//@ts-ignore
import createNumberMask from 'text-mask-addons/src/createNumberMask'

const D = /\d/ // a digit

export const DATE_MASK = [D, D, '-', D, D, '-', D, D, D, D]
export const DATE_MASK_WITH_DOTS = [D, D, '.', D, D, '.', D, D, D, D]
export const TIME_MASK = [D, D, ':', D, D]

export function buildIntegerMask(allowNegative = false, integerLimit = false) {
  return createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    allowLeadingZeroes: true,
    allowNegative,
    integerLimit
  })
}

export function buildDecimalMask(
  allowNegative = false,
  integerLimit = null,
  decimalLimit = null
) {
  return createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    allowLeadingZeroes: true,
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit,
    integerLimit,
    allowNegative
  })
}
