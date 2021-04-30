export const legend = (focused: any, remainingChars: number) => {
  if (!focused) return ''
  else if (remainingChars > 0) return `${remainingChars} characters remaining`
  else return `${remainingChars} characters`
}
