<template>
  <FormField
    :title="title"
    :noLabel="noLabel"
    class="input-wrapper"
    :class="formFieldClasses"
  >
    <div
      ref="selectable"
      class="input-group input-field"
      :class="inputFieldClasses"
      tabindex="0"
      data-plankton-test="date-range-picker-container"
      @focus="onInputFocus"
      @blur="onInputBlur($event)"
      @keydown.tab="onTabClick($event)"
    >
      <!--disabled is used for disabling automatic calendar open on click
      we call the opening function explicitely instead, see onInputFocus()-->
      <!-- key is added to force component to re-render after language change 
      to update names of months and days, because vue2-daterange-picker uses locale 
      from props and assign it to data, what makes it non-reactive-->
      <date-range-picker
        :key="`dateRangePicker${localeData.fromLabel}`"
        ref="picker"
        v-model="localState"
        :ranges="computedRanges"
        disabled
        :autoApply="autoApplyVal"
        :single-date-picker="singleDatePicker"
        :locale-data="localeData"
        :opens="openDirection"
        :time-picker="timePicker"
        :time-picker24-hour="timePicker24Hour"
        :time-picker-increment="timePickerIncrement"
        :append-to-body="appendToBody"
        :date-format="customizeDayClasses"
        class="form-control"
        data-plankton-test="date-range-picker"
        @toggle="onToggle"
        v-on="$listeners"
      >
        <template v-slot:input="{ startDate, endDate }">
          <span
            v-if="!startDate && !endDate"
            data-plankton-test="date-range-placeholder"
            class="placeholder"
          >
            {{ placeholder }}
          </span>
          <span v-else-if="singleDatePicker" data-plankton-test="date-range-input">
            <span>{{ formattedDate(startDate) }}</span>
          </span>
          <span v-else data-plankton-test="date-range-input">
            <span>{{ formattedDate(startDate) }} - {{ formattedDate(endDate) }}</span>
          </span>
        </template>
        <template v-slot:footer="{ rangeText }">
          <!--hacky solution to always display hour and minute
          dropdowns without startDate selected-->
          <div
            v-if="timePickerInitialState"
            class="dummy-time-input"
            :class="{ 'contains-ranges': ranges }"
          >
            <div v-if="ranges && timePickerInitialState" class="ranges-margin"></div>
            <div class="time-dropdowns">
              <div class="dummy-timestamp-start">
                <div class="dummy-hour">
                  <DropdownField
                    disabled
                    inline
                    placeholder="00"
                    data-plankton-test="placeholder-start-date-hours-picker"
                  />
                </div>
                <div>:</div>
                <div class="dummy-min">
                  <DropdownField
                    disabled
                    inline
                    placeholder="00"
                    data-plankton-test="placeholder-start-date-minutes-picker"
                  />
                </div>
              </div>
              <div v-if="!isSingleDateTimePicker" class="dummy-timestamp-end">
                <div class="dummy-hour">
                  <DropdownField
                    disabled
                    inline
                    placeholder="00"
                    data-plankton-test="placeholder-end-date-hours-picker"
                  />
                </div>
                <div>:</div>
                <div class="dummy-min">
                  <DropdownField
                    disabled
                    inline
                    placeholder="00"
                    data-plankton-test="placeholder-end-date-minutes-picker"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!autoApplyVal"
            class="footer-range-container paragraph"
            :class="{ 'contains-ranges': ranges }"
          >
            <div
              class="clear-container"
              :class="{
                'contains-ranges': ranges,
                'single-date-time': isSingleDateTimePicker
              }"
            >
              <Button
                text="button"
                type="button"
                category="link"
                materialIcon="close"
                class="clear-btn"
                data-plankton-test="clear-button"
                @click="onClickReset"
              >
                {{ clearSelectionLabel }}
              </Button>
            </div>
            <div
              class="calendar-actions-container"
              :class="[{ 'contains-ranges': ranges }, { 'auto-apply': autoApplyVal }]"
            >
              <div v-if="!isSingleDateTimePicker" data-plankton-test="footer-date-range">
                <div v-if="activeRangeSelection" class="selected-range">
                  {{ rangeText }}
                </div>
                <div v-else class="placeholder-range">
                  MM.DD.YYYY 00:00 - MM.DD.YYYY 00:00
                </div>
              </div>
              <div v-if="!autoApplyVal">
                <Button
                  category="tertiary"
                  materialIcon="clear"
                  :inline="true"
                  data-plankton-test="cancel-button"
                  @click="forceClose"
                ></Button>
                <Button
                  category="primary"
                  materialIcon="done"
                  :inline="true"
                  data-plankton-test="apply-button"
                  @click="forceApply"
                ></Button>
              </div>
            </div>
          </div>
        </template>
      </date-range-picker>
      <div class="input-group-append input-field__icon-wrapper">
        <i class="material-icons input-group-text input-field__segment input-field__icon">
          date_range
        </i>
      </div>
    </div>
    <div v-if="fieldValidatorInlineErrorsShown">
      <div
        v-for="errorMessage in fieldValidatorInlineErrorMessages"
        :key="errorMessage"
        class="input-error-message label-text"
        v-text="errorMessage"
      />
    </div>
  </FormField>
</template>

<script>
import moment from 'moment-timezone'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import {
  DATE_FORMAT_WITH_DOTS,
  toIsoDate,
  toIsoDatetime,
  humanizeDateTimeWithDots,
  humanizeDateWithDots
} from '@/utilities/date-formatting'
import fieldValidatorMixin from '@/mixins/field-validator-mixin'
import fieldFormDisabledMixin from '@/mixins/field-form-disabled-mixin'
import DropdownField from './dropdown-field/DropdownField.vue'
import FormField from '@/components/FormField.vue'
import Button from '@/components/Button/Button.vue'

export default {
  components: { FormField, DropdownField, Button, DateRangePicker },
  mixins: [fieldValidatorMixin(), fieldFormDisabledMixin],
  props: {
    autoApply: { type: Boolean, default: null },
    appendToBody: { type: Boolean, default: false },
    culture: { type: String, default: 'en-US' },
    title: { type: String, required: true },
    noLabel: { type: Boolean, default: false },
    value: {
      type: Object,
      default: () => ({ startDate: '', endDate: '' })
    },
    placeholder: { type: String, default: '' },
    clearSelectionLabel: { type: String, default: 'Clear dates' },
    customTimezone: { type: String, default: null },
    timePickerIncrement: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false },
    singleDatePicker: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    timePicker24Hour: { type: Boolean, default: true },
    timePicker: { type: Boolean, default: false },
    ranges: {
      type: [Object, Boolean],
      default: false,
      validator: value =>
        //ranges need to be an array of two string representing the date
        value === false ||
        Object.values(value).every(
          range =>
            Array.isArray(range) &&
            range.length === 2 &&
            range.every(datetime => typeof datetime === 'string')
        )
    },
    inputDateFilter: { type: String, default: DATE_FORMAT_WITH_DOTS },
    dateFormat: { type: Function, default: () => {} },
    openDirection: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].includes(val)
      }
    }
  },
  computed: {
    autoApplyVal() {
      return this.autoApply || !this.timePicker
    },
    localState: {
      get() {
        if (this.timePicker) {
          return {
            startDate: this.value.startDate ? toIsoDatetime(this.value.startDate) : null,
            endDate: this.value.startDate ? toIsoDatetime(this.value.endDate) : null
          }
        } else {
          return {
            startDate: this.value.startDate ? toIsoDate(this.value.startDate) : null,
            endDate: this.value.startDate ? toIsoDate(this.value.endDate) : null
          }
        }
      },
      set(value) {
        value.startDate = value.startDate || value.endDate // Fallback for some cases where the date selection does not work correctly and only an endDate is selected

        if (this.timePicker) {
          value.startDate = value.startDate
            ? humanizeDateTimeWithDots(moment(value.startDate))
            : null
          value.endDate = value.endDate
            ? humanizeDateTimeWithDots(moment(value.endDate))
            : null
        } else {
          value.startDate = value.startDate
            ? humanizeDateWithDots(moment(value.startDate))
            : null
          value.endDate = value.endDate
            ? humanizeDateWithDots(moment(value.endDate))
            : null
        }

        this.$emit('input', value)
      }
    },

    localeData() {
      return {
        format: 'mmmm dd, yyyy HH:MM',
        firstDay: 1,
        fromLabel: this.fromLabel,
        daysOfWeek: moment
          .localeData(this.culture)
          .weekdays()
          .map(val => val.substring(0, 2)),
        monthNames: moment.localeData(this.culture).months()
      }
    },
    nothingSelected() {
      return !this.localState.startDate && !this.localState.endDate
    },
    formFieldClasses() {
      return {
        'input-wrapper--full-width': this.fullWidth
      }
    },
    inputFieldClasses() {
      return {
        'input-field--wrong-value': this.fieldValidatorErrorIndicatorShown,
        'input-field--inline': this.inline,
        'input-field--disabled': this.disabled || this.fieldFormDisabled
      }
    },
    timePickerInitialState() {
      return (
        this.timePicker && !this.$refs.picker.in_selection && !this.activeRangeSelection
      )
    },
    activeRangeSelection() {
      const pickerRef = this.$refs.picker
      return Boolean(pickerRef.rangeText.split(pickerRef.locale.separator)[0])
    },
    computedRanges() {
      const computedRanges = {}

      if (!this.ranges) return false
      for (let range in this.ranges) {
        computedRanges[range] = this.ranges[range].map(rangeDate => new Date(rangeDate))
      }

      return computedRanges
    },
    isSingleDateTimePicker() {
      return this.singleDatePicker && this.timePicker
    }
  },

  methods: {
    customizeDayClasses(classes, date) {
      this.dateFormat(classes, date)
      const currentDate = new Date()
      date.setHours(0, 0, 0, 0)
      currentDate.setHours(0, 0, 0, 0)
      if (!classes.past) {
        classes.past = date < currentDate
      }
      return classes
    },
    formattedDate(date) {
      if (this.customTimezone) {
        return moment(date).tz(this.customTimezone).format(this.inputDateFilter)
      } else {
        return moment(date).format(this.inputDateFilter)
      }
    },
    onToggle(open) {
      if (open) {
        this.$refs.selectable.focus()
        this.$emit('open')
      } else this.$refs.selectable.blur()
    },
    //this method also check if the current event target is outside the container (if not he dont close the calendar)
    close() {
      this.$refs.picker.clickAway()
    },
    //this method force the reset of the calendar and close it without any checks for the current event target
    forceClose() {
      this.$refs.picker.in_selection = false
      this.$refs.picker.clickCancel()
    },
    forceApply() {
      this.$refs.picker.clickedApply()
      this.$refs.picker.in_selection = false
    },
    onClickReset() {
      this.localState = {
        startDate: null,
        endDate: null
      }

      //clear also the date range picker dates
      this.$refs.picker.end = null
      this.$refs.picker.start = null
      this.$refs.picker.in_selection = false
    },
    async onInputFocus(event) {
      await this.$refs.picker.togglePicker(true)
      this.$emit('toggle', true, event)
    },
    onInputBlur(e) {
      if (e.relatedTarget && this.$el.contains(e.relatedTarget)) return
      else this.close()
    },
    onTabClick(e) {
      // hack: if the active element is the last selectable element (next month arrow button)
      // close the calendar window
      // Could be resolved by https://github.com/Innologica/vue2-daterange-picker/issues/149

      const selectableEls = this.$el.querySelectorAll('button, [tabindex]')
      if (selectableEls) {
        const lastSelectableEl = selectableEls[selectableEls.length - 1]
        if (!e.shiftKey && e.target === lastSelectableEl) this.forceClose()
      }
    }
  }
}
</script>

<style lang="scss">
body {
  > .daterangepicker {
    margin-top: 17px !important;
  }
}

.daterangepicker {
  top: calc(100% + 6px);
  cursor: auto;
  min-width: unset;
  padding-bottom: 0;

  &.single {
    .drp-calendar {
      > .calendar-table {
        padding-left: 9px;
      }
    }

    .calendar-actions-container {
      height: 40px;
      padding-left: 6px;
    }
  }

  &.show-ranges {
    min-width: 682px !important;
  }

  &.openscenter {
    @media (max-width: #{$small-device}) {
      left: auto;
      transform: translate(-63%);
    }
  }

  .ranges li {
    font-size: 12px;
    width: 100%;
    text-align: left;
    border: none;
    padding: 8px 12px;
    background: transparent;
    color: $color-secondary-main;

    &:focus {
      outline: none;
    }

    &.active {
      font-weight: 700;
      color: $color-secondary-main;
      background-color: $color-layout-white;
      border: none;
    }

    &:hover {
      color: $color-secondary-light;
      background-color: $color-layout-white;
    }
  }

  .drp-calendar {
    width: 350px;

    > .calendar-table,
    > .calendar-time {
      padding-left: 24px;
    }

    &.left {
      padding: 8px 0;
    }

    &.right {
      padding: 8px 0;

      > .calendar-table,
      > .calendar-time {
        padding-right: 26px;
      }
    }
  }

  :not(.single).drp-calendar {
    :not(.single) &.left th.next,
    :not(.single) &.right th.prev {
      visibility: hidden;
    }
  }

  .calendar-time {
    padding-bottom: 24px;
    border-bottom: 1px solid $color-layout-divider;

    .hourselect,
    .minuteselect {
      border: 1px solid $color-layout-divider;
      background-color: $color-layout-white;

      &:hover {
        border: 1px solid $color-secondary-main;
      }
    }
  }

  table.table-condensed {
    border-collapse: separate;
  }

  .calendar-table {
    th,
    td {
      width: 32px;
      height: 32px;
    }
  }

  th,
  td {
    font-weight: normal;

    &:focus {
      outline: none;
    }
  }

  th {
    &.next,
    &.prev,
    &.month {
      color: $color-neutral-main;

      > span {
        border-color: $color-neutral-main;
      }
    }

    &.next:hover,
    &.prev:hover {
      color: $color-secondary-main !important;
    }
  }

  td {
    &.today {
      color: $color-primary-main;
      background-color: $color-primary-lightest;

      &:hover {
        color: $color-secondary-main;
        background-color: $color-layout-white;
      }
    }

    &.past {
      color: $color-neutral-lighter;
    }

    &.off,
    &.in-range.off {
      visibility: hidden;
    }

    &.in-range:hover,
    &:hover {
      border-radius: 4px;
      color: $color-secondary-main;
      box-shadow: inset 0 0 0 1px $color-secondary-main;
    }

    &.in-range {
      color: $color-secondary-main;
      background-color: $color-secondary-lightest;
    }

    &.active {
      background-color: $color-secondary-main;
      color: $color-layout-white;
    }

    &.active:hover {
      color: $color-secondary-main;
      background-color: $color-layout-background;
    }
  }
}

.footer-range-container,
.calendar-actions-container {
  display: flex;

  &.contains-ranges {
    margin-left: 140px;
    border-left: 1px solid $color-layout-divider;

    &.auto-apply {
      border-left: none;
    }
  }

  &.auto-apply {
    margin-left: 0;
  }

  span {
    font-size: 13px;
    font-weight: bold;
  }
}

.footer-range-container {
  height: 64px;
  align-items: center;
  justify-content: space-between;
  color: $color-neutral-main;

  &.contains-ranges {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
  }

  .clear-container {
    padding-left: 28px;

    &.single-date-time {
      padding-left: 16px;
    }

    &.contains-ranges {
      display: inherit;
      margin-left: 0;
      border-left: none;
      padding-left: 15px;
      border-right: 1px solid $color-layout-divider;
      width: 141px;
      height: 64px;
      align-items: center;
    }
  }
}

.calendar-actions-container {
  padding-right: 26px;
  height: 65px;
  align-items: center;
  justify-content: space-between;
  padding-left: 28px;

  .selected-range {
    color: $color-neutral-darkest;
  }

  .placeholder-range {
    color: $color-neutral-lighter;
  }

  :not(.auto-apply) &.contains-ranges {
    margin-left: 0;
    border-left: none;
    padding-left: 0;

    .clear-container {
      border-right: 1px solid $color-layout-divider;
      width: 141px;
      padding-left: 9px;
    }
  }

  &.auto-apply {
    .clear-container {
      width: 100%;
    }
  }

  div > .button {
    margin-left: 10px;
  }

  .clear-container {
    text-align: left;
    line-height: 65px;
    width: 141px;
    padding-left: 9px;

    .clear-btn {
      &::v-deep .material-icons {
        margin-right: 0;
      }
    }
  }
}

.dummy-time-input {
  display: flex;
  margin-top: 0;

  &.contains-ranges {
    justify-content: flex-start;
  }

  &.no-ranges {
    justify-content: space-around;
  }

  .time-dropdowns {
    display: inherit;
    justify-content: space-around;
    flex-grow: 1;
    border-bottom: 1px solid $color-layout-divider;
    margin-bottom: 8px;

    .dummy-timestamp-start,
    .dummy-timestamp-end {
      width: 150px;
      height: 40px;
      display: inherit;
      justify-content: center;
      align-items: center;
      padding-bottom: 23px;
      margin-bottom: 10px;
      margin-top: 2px;

      .dummy-hour,
      .dummy-min {
        width: 50px;
        margin: 0 4px;
      }
    }

    .dummy-timestamp-start {
      padding-left: 24px;
    }
  }

  .ranges-margin {
    text-align: left;
    line-height: 65px;
    width: 141px;
    padding-left: 9px;
    border-right: 1px solid $color-layout-divider;
    border-bottom: none;
  }
}

.vue-daterange-picker {
  &.form-control {
    height: 100%;
    padding: 8px;
    padding-right: 26px;
    background: transparent;
    font-size: inherit;
    border: 1px solid transparent;
  }

  .reportrange-text {
    height: inherit;
    padding: 0;
    display: flex;
    align-items: center;
    background: inherit;
    color: $color-neutral-darkest;
    font-size: 12px;
    border: inherit;

    .placeholder {
      color: $color-neutral-lighter;
    }
  }
}
</style>

<style lang="scss" scoped>
.input-field {
  cursor: pointer;

  &:focus,
  &:focus-within {
    outline: none;
    border-color: $color-secondary-main;
  }

  &--inline {
    height: 32px;
  }

  &--disabled {
    pointer-events: none;
  }
}

.input-field__icon-wrapper {
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 0;
  user-select: none;
}
</style>
