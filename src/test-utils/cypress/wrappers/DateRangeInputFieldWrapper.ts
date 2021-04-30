import ControlWrapper from './ControlWrapper'
import { inMonths } from './../date-diff'

export default class DateRangeInputFieldWrapper extends ControlWrapper {
  get input() {
    return this.findByDataPlanktonTest('date-range-input')
  }

  get applyButton() {
    return this.findByDataPlanktonTest('apply-button')
  }

  focus() {
    this.findByDataPlanktonTest('date-range-picker-container').click({ force: true })
    return this
  }

  clickNextMonth() {
    this.root.find('.next').click({ force: true })
    return this
  }

  clickPreviousMonth() {
    this.root.find('.prev').click({ force: true })
    return this
  }

  clickDate(date: string) {
    this.root
      .find('.calendar-table tbody')
      .contains('td:not(.off)', Number(date).toString())
      .click()
    return this
  }

  select(dateTime: string) {
    const day = dateTime.substring(0, 2)
    const month = dateTime.substring(3, 5)
    const year = dateTime.substring(6, 10)
    const monthYear = `${year}, ${month}`
    this.focus()

    const currentMonthYear = this.root.find('.calendar-table .month').invoke('text')

    currentMonthYear.then(text => {
      const monthDiff = inMonths(monthYear, text)

      // going x months backwards/forwards (depends on the monthsDiff sign)
      for (let i = 0; i < Math.abs(monthDiff); i++) {
        if (monthDiff > 0) this.clickPreviousMonth()
        else this.clickNextMonth()
      }
    })

    this.clickDate(day)

    this.input.should('contain', dateTime)

    return this
  }

  apply() {
    this.applyButton.click()
    return this
  }
}
