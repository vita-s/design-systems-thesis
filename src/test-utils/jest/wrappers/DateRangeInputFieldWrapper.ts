import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import { VueRelaxed } from './VueRelaxed'
import FieldWrapper from './FieldWrapper'
import ButtonWrapper from './ButtonWrapper'
import { DropdownFieldWrapper } from '.'

export default class DateRangeInputFieldWrapper extends FieldWrapper {
  get dateRangeComponent() {
    return this.root.findComponent({ ref: 'picker' }) as Wrapper<VueRelaxed>
  }
  get placeholder() {
    return this.findByDataPlanktonTest('date-range-placeholder').text()
  }
  get inputText() {
    return this.findByDataPlanktonTest('date-range-input').text()
  }
  get ranges() {
    return this.dateRangeComponent.findAll('.ranges li')
  }
  get applyButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('apply-button'))
  }
  get cancelButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('cancel-button'))
  }
  get clearButton() {
    return new ButtonWrapper(this.findByDataPlanktonTest('clear-button'))
  }

  get footerDateRange() {
    return this.findByDataPlanktonTest('footer-date-range')
  }

  get placeholderStartDateHoursPicker() {
    return new DropdownFieldWrapper(
      this.findByDataPlanktonTest('placeholder-start-date-hours-picker')
    )
  }

  get placeholderStartDateMinutesPicker() {
    return new DropdownFieldWrapper(
      this.findByDataPlanktonTest('placeholder-start-date-minutes-picker')
    )
  }

  get placeholderEndDateHoursPicker() {
    return new DropdownFieldWrapper(
      this.findByDataPlanktonTest('placeholder-end-date-hours-picker')
    )
  }

  get placeholderEndDateMinutesPicker() {
    return new DropdownFieldWrapper(
      this.findByDataPlanktonTest('placeholder-end-date-minutes-picker')
    )
  }

  async selectCustomRange(from: string, to: string) {
    this.dateRangeComponent.vm.clickRange([new Date(from), new Date(to)])
    return Vue.nextTick()
  }
  async focusInput() {
    this.root.findComponent({ ref: 'selectable' }).trigger('focus')
    return Vue.nextTick()
  }
  async selectRangeAt(index: number) {
    this.ranges.at(index).trigger('click')
  }
  async cancelSelection() {
    await this.cancelButton.click()
  }
  async applySelection() {
    await this.applyButton.click()
  }
  async clearSelection() {
    await this.clearButton.click()
  }
}
