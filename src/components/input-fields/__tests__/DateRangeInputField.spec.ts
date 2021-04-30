import DateRangeInputField from '../DateRangeInputField.vue'
import { DateRangeInputFieldWrapper } from '@/test-utils/jest/wrappers'
import { mount } from '@vue/test-utils'

import moment from 'moment'

describe('DateRangeInputField', () => {
  const defaultMockedRanges = () => {
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 6)
    endDate.setHours(23, 59, 59, 999)
    const ranges = {
      ['Today only']: ['2020-01-09T00:00:00+01:00', '2020-01-09T23:59:59+01:00'],
      ['Tomorrow only']: [
        moment().startOf('day').add(1, 'days').toISOString(),
        moment().endOf('day').add(1, 'days').toISOString()
      ],
      ['Next week']: [
        moment()
          .add(1, 'week')
          .startOf('week')
          .startOf('day')
          .add(1, 'days')
          .toISOString(),
        moment().add(1, 'week').endOf('week').endOf('day').add(1, 'days').toISOString()
      ],
      ['Next 7 days']: [
        moment().startOf('day').add(1, 'days').toISOString(),
        moment().endOf('day').add(7, 'days').toISOString()
      ]
    }
    return ranges
  }

  const staticMockedRanges = () => {
    return {
      ['first range']: ['2020-01-01T00:00:00Z', '2020-01-03T00:00:00Z']
    }
  }

  const mockedDateRangeUtc = {
    startDate: '09.01.2020',
    endDate: '11.01.2020'
  }

  const mockedDateRangeBerlin = {
    startDate: '09.01.2020',
    endDate: '01.11.2020'
  }

  const mockedDateRangeBerlinWithTime = {
    startDate: '09.01.2020 12:00',
    endDate: '01.11.2020 14:00'
  }

  let dateRangeInputField: DateRangeInputFieldWrapper
  beforeEach(() => {
    const component = mount(DateRangeInputField, {
      propsData: {
        locale: 'en-US',
        title: 'LABEL',
        inputDateFilter: 'DD.MM.YYYY',
        placeholder: 'Please select a date',
        value: {
          startDate: null,
          endDate: null
        }
      }
    })
    dateRangeInputField = new DateRangeInputFieldWrapper(component)
  })

  it('displays label', () => {
    expect(dateRangeInputField.label).toContain('LABEL')
  })

  it('shows placeholder if no value provided', () => {
    expect(dateRangeInputField.placeholder).toBe('Please select a date')
  })

  it('shows provided UTC date range in local timezone (UTC+1)', async () => {
    await dateRangeInputField.setProps({ value: mockedDateRangeUtc })
    expect(dateRangeInputField.inputText).toBe('09.01.2020 - 11.01.2020')
  })

  it('shows provided Berlin date range in local timezone (UTC+1)', async () => {
    await dateRangeInputField.setProps({ value: mockedDateRangeBerlin })
    expect(dateRangeInputField.inputText).toBe('09.01.2020 - 01.11.2020')
  })

  it('shows provided UTC date in local timezone (UTC+1) for a single day', async () => {
    const mockedSingleDateRange = {
      startDate: '11.01.2020',
      endDate: '11.01.2020'
    }

    await dateRangeInputField.setProps({
      singleDatePicker: true,
      value: mockedSingleDateRange
    })
    expect(dateRangeInputField.inputText).toBe('11.01.2020')
  })

  it('emits toggle event when being focussed', async () => {
    await dateRangeInputField.setProps({
      ranges: staticMockedRanges()
    })

    await dateRangeInputField.focusInput()
    expect(dateRangeInputField.emitted('toggle')[0][0]).toEqual(true)
  })

  it('emits input event with two date-time strings when selecting a range of dates', async () => {
    await dateRangeInputField.setProps({
      ranges: staticMockedRanges()
    })

    await dateRangeInputField.focusInput()
    await dateRangeInputField.selectRangeAt(0)
    expect(dateRangeInputField.emitted('input')[0][0]).toEqual({
      startDate: '01.01.2020',
      endDate: '03.01.2020'
    })
  })

  it('shows provided ranges', async () => {
    await dateRangeInputField.setProps({
      ranges: defaultMockedRanges()
    })

    await dateRangeInputField.focusInput()
    expect(dateRangeInputField.ranges).toHaveLength(4)
  })

  it('shows correct range value on click', async () => {
    await dateRangeInputField.setProps({
      ranges: defaultMockedRanges()
    })

    await dateRangeInputField.focusInput()
    await dateRangeInputField.selectRangeAt(0)
    expect(dateRangeInputField.inputText).toBe('09.01.2020 - 09.01.2020')
  })

  it('shows time picker', async () => {
    await dateRangeInputField.setProps({
      value: mockedDateRangeBerlinWithTime,
      ranges: defaultMockedRanges(),
      timePicker: true
    })

    await dateRangeInputField.focusInput()
    const timePickersContainer = dateRangeInputField.dateRangeComponent.findAll(
      '.calendar-time'
    )
    expect(timePickersContainer.length).toBe(2)
  })

  it('shows only one calendar on single date picker', async () => {
    await dateRangeInputField.setProps({
      value: mockedDateRangeBerlin,
      ranges: defaultMockedRanges(),
      singleDatePicker: true
    })

    await dateRangeInputField.focusInput()
    const calendarTableContainer = dateRangeInputField.dateRangeComponent.findAll(
      '.calendar-table'
    )
    expect(calendarTableContainer.length).toBe(1)
  })

  it('shows two calendars on default behavior', async () => {
    await dateRangeInputField.setProps({
      value: mockedDateRangeBerlin,
      ranges: defaultMockedRanges()
    })

    await dateRangeInputField.focusInput()
    const calendarTableContainer = dateRangeInputField.dateRangeComponent.findAll(
      '.calendar-table'
    )
    expect(calendarTableContainer.length).toBe(2)
  })

  it('cancel correctly the current selection', async () => {
    await dateRangeInputField.setProps({
      ranges: defaultMockedRanges(),
      timePicker: true
    })

    await dateRangeInputField.focusInput()
    await dateRangeInputField.selectRangeAt(0)
    await dateRangeInputField.cancelSelection()
    expect(dateRangeInputField.placeholder).toBe('Please select a date')
  })

  it('renders ranges in footer', async () => {
    await dateRangeInputField.setProps({ timePicker: true })
    await dateRangeInputField.focusInput()
    expect(dateRangeInputField.footerDateRange.exists()).toBe(true)
  })

  it('renders placeholders for start and end date time picker', async () => {
    await dateRangeInputField.setProps({ timePicker: true })
    await dateRangeInputField.focusInput()
    expect(dateRangeInputField.placeholderStartDateHoursPicker.exists()).toBe(true)
    expect(dateRangeInputField.placeholderStartDateMinutesPicker.exists()).toBe(true)
    expect(dateRangeInputField.placeholderEndDateHoursPicker.exists()).toBe(true)
    expect(dateRangeInputField.placeholderEndDateMinutesPicker.exists()).toBe(true)
  })

  describe('Single date time picker', () => {
    beforeEach(async () => {
      const component = mount(DateRangeInputField, {
        propsData: {
          locale: 'en-US',
          title: 'LABEL',
          singleDatePicker: true,
          timePicker: true,
          inputDateFilter: 'DD.MM.YYYY HH:mm',
          placeholder: 'Please select a date',
          value: {
            startDate: null,
            endDate: null
          }
        }
      })
      dateRangeInputField = new DateRangeInputFieldWrapper(component)
      await dateRangeInputField.focusInput()
    })

    it('does not renders ranges in footer', () => {
      expect(dateRangeInputField.footerDateRange.exists()).toBe(false)
    })

    it('renders placeholder for start date time picker', () => {
      expect(dateRangeInputField.placeholderStartDateHoursPicker.exists()).toBe(true)
      expect(dateRangeInputField.placeholderStartDateMinutesPicker.exists()).toBe(true)
    })

    it('does not render placeholder for end date time picker', () => {
      expect(dateRangeInputField.placeholderEndDateHoursPicker.exists()).toBe(false)
      expect(dateRangeInputField.placeholderEndDateMinutesPicker.exists()).toBe(false)
    })
  })
})
