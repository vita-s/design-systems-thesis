export const formatWithThousands = (number: string | number) => {
  return Number.parseFloat(number?.toString()).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const formatIntegerWithThousands = (number: string | number) => {
  return Number.parseInt(number?.toString()).toLocaleString('en-US')
}

export const formatNullInteger = (number: string | number) => {
  return Number.parseInt(number?.toString()) == 0 ? '0' : number
}

export function isNumber(obj: string | number | object | null) {
  if (obj === null) return false
  else return !isNaN(parseFloat(obj?.toString())) && isFinite(parseFloat(obj?.toString()))
}
