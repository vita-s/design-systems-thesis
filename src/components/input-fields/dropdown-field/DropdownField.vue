<template>
  <FormField
    :class="formFieldClasses"
    :title="title"
    :noLabel="noLabel"
    :style="`--input-width: ${inputWidth}`"
    class="dropdown-field"
  >
    <MultiSelect
      ref="dropdown-search-select"
      v-bind="$attrs"
      :value="value"
      :options="dropdownOptions"
      :searchable="searchable"
      :multiple="multiple"
      :preserve-search="preserveSearch"
      :clear-on-select="clearOnSelect"
      :close-on-select="closeOnSelect"
      :limit="visibleSelectedOptionsLimit"
      :placeholder="placeholder"
      :label="optionLabel"
      :trackBy="optionKey"
      :open-direction="openDirection"
      :name="name"
      :hide-selected="hideSelected"
      :max-height="maxHeight"
      :disabled="fieldFormDisabled"
      :class="{ ...multiSelectClasses, autosuggest, multiple }"
      :data-test="undefined"
      class="dropdown-field__multiselect paragraph"
      :taggable="taggable"
      data-plankton-test="dropdown-field--multiselect"
      :tag-placeholder="tagPlaceholder"
      @tag="addTag"
      v-on="listeners"
    >
      <template v-slot:tag="{ option }">
        <Chip
          v-if="!closingTag"
          :text="getOptionLabelWhenSelected(option)"
          category="tertiary"
          class="multiselect__chip"
          :style="`--limit: ${selectedOptionsDivider}`"
          data-plankton-test="selected-option-chip"
        />
        <FilterChip
          v-if="closingTag"
          category="secondary"
          truncated
          class="multiselect__chip"
          :style="`--limit: ${selectedOptionsDivider}`"
          data-plankton-test="selected-option-filter-chip"
          :text="getOptionLabelWhenSelected(option)"
          @remove-filter-chip="handleRemoveEvent(option)"
        />
      </template>

      <template v-slot:limit>
        <Chip
          :text="`+${selectedOptionsOffset}`"
          :category="closingTag ? 'secondary' : 'tertiary'"
          :class="{ 'filter-chip': closingTag }"
          class="multiselect__chip multiselect__chip--limit"
          data-plankton-test="limit-chip"
        />
      </template>
      <template v-slot:caret>
        <i class="material-icons dropdown-field__caret">
          {{ autosuggest ? 'search' : 'keyboard_arrow_down' }}
        </i>
      </template>
      <template v-slot:option="props">
        <slot name="option" v-bind="props">
          <span
            v-tooltip-on-overflow="getOptionLabel(props.option)"
            data-plankton-test="multiple-option"
          >
            {{ getOptionLabel(props.option) }}
          </span>
        </slot>
      </template>
      <template v-slot:singleLabel="props">
        <slot name="singleLabel" v-bind="props"></slot>
      </template>
      <template v-slot:noResult>
        <slot name="noResult">
          {{ noResultMessage }}
        </slot>
      </template>
      <template v-slot:noOptions>
        <slot name="noResult">
          {{ noOptionsMessage }}
        </slot>
      </template>
    </MultiSelect>
    <div v-if="fieldValidatorInlineErrorsShown">
      <div
        v-for="(error, index) in fieldValidatorInlineErrorMessages"
        :key="index"
        class="dropdown-field__error-message label-text"
        data-plankton-test="dropdown-field-error"
      >
        {{ error }}
      </div>
    </div>
  </FormField>
</template>

<script>
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import fieldValidatorMixin from '@/mixins/field-validator-mixin'
import fieldFormDisabledMixin from '@/mixins/field-form-disabled-mixin'
import MultiSelect from 'vue-multiselect'
import FilterChip from '@/components/FilterChip.vue'
import FormField from '@/components/FormField.vue'
import Chip from '@/components/Chip.vue'

const DROPDOWN_OPTION_ITEM_HEIGHT = 42
const DROPDOWN_MULTI_SELECT_ITEMS_DEFAULT = 2

export default {
  directives: {
    'tooltip-on-overflow': {
      update(el, binding) {
        const wrapper = el.parentElement
        const contentOverflowing = wrapper.scrollWidth > wrapper.offsetWidth
        if (contentOverflowing) {
          wrapper.setAttribute('title', binding.value)
        } else {
          wrapper.removeAttribute('title')
        }
      }
    }
  },
  components: { MultiSelect, FormField, Chip, FilterChip },
  mixins: [fieldValidatorMixin(), fieldFormDisabledMixin],
  model: { prop: 'value', event: 'select' },
  props: {
    options: { type: Array, required: false, default: () => [] },
    autosuggest: { type: Boolean, default: false },
    value: { type: [Object, String, Number, Array], default: null },
    title: { type: String, default: '' },
    noResultMessage: {
      type: String,
      default: 'No elements found. Consider changing the search query'
    },
    preserveSearch: { type: Boolean, default: false },
    closingTag: { type: Boolean, default: false },
    noOptionsMessage: { type: String, default: 'List is empty' },
    searchable: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    closeOnSelect: { type: Boolean, default: true },
    hideSelected: { type: Boolean, default: false },
    clearOnSelect: { type: Boolean, default: false },
    optionLabel: { type: String, default: null },
    optionLabelWhenSelected: { type: String, default: null },
    optionKey: { type: String, default: null },
    openDirection: {
      type: String,
      default: null,
      validator(val) {
        return ['top', 'above', 'bottom', 'below'].includes(val)
      }
    },
    maxSelection: { type: Number, default: null },
    placeholder: { type: String, default: '' },
    noLabel: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    visibleOptionsLimit: { type: Number, default: null },
    visibleSelectedOptionsLimit: {
      type: Number,
      default: DROPDOWN_MULTI_SELECT_ITEMS_DEFAULT
    },
    fullWidth: { type: Boolean, default: false },
    heightFixed: { type: Boolean, default: true },
    allowDeselectOption: { type: Boolean, default: true },
    allowEmpty: { type: Boolean, default: true },
    taggable: { type: Boolean, default: false },
    tagPlaceholder: { type: String, default: 'Add this new value' },
    clearLabel: { type: String, default: 'Clear selection' }
  },
  data: function () {
    return {
      inputWidth: '',
      searchQuery: '',
      addedTags: [],
      originalOptions: [...this.options]
    }
  },
  computed: {
    formFieldClasses() {
      return {
        'input-wrapper--full-width': this.fullWidth,
        'dropdown-field--error': this.fieldValidatorErrorIndicatorShown,
        'dropdown-field--inline': this.inline
      }
    },
    multiSelectClasses() {
      return {
        'multiselect--height-fixed': this.heightFixed,
        'multiselect--first-option-highlighted': this.showDeselectOption
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        select: this.handleSelectEvent,
        remove: this.handleRemoveEvent,
        close: this.handleCloseEvent,
        open: this.handleOpenEvent,
        'search-change': value => {
          // handle both search-change event from TypeAheadField and the one from this component
          if (this.$listeners['search-change']) this.$listeners['search-change'](value)
          this.handleSearchChangeEvent(value)
        }
      }
    },
    maxHeight() {
      if (!this.visibleOptionsLimit) return undefined // uses default value from library.
      return this.visibleOptionsLimit * DROPDOWN_OPTION_ITEM_HEIGHT
    },
    selectedOptionsOffset() {
      return isArray(this.value) && this.value.length - this.visibleSelectedOptionsLimit
    },
    selectedOptionsDivider() {
      return this.selectedOptionsOffset <= 0
        ? this.value.length
        : this.visibleSelectedOptionsLimit + 0.5
    },
    dropdownOptions() {
      if (this.options.length === 0 && this.addedTags.length === 0) return this.options
      const options = this.multiple ? this.sortedOptions : this.allOptions
      return this.showDeselectOption ? [this.clearLabel, ...options] : options
    },
    allOptions() {
      if (this.taggable) {
        return this.originalOptions.concat(this.addedTags)
      }
      return this.options.concat(this.addedTags)
    },
    sortedOptions() {
      return [...this.allOptions].sort((a, b) => {
        if (this.optionIsSelected(a) && this.optionIsSelected(b)) return 0
        if (this.optionIsSelected(a) && !this.optionIsSelected(b)) return -1
        if (!this.optionIsSelected(a) && this.optionIsSelected(b)) return 1
      })
    },
    showDeselectOption() {
      return this.allowDeselectOption && !this.searchQuery
    }
  },
  mounted() {
    this.recalculateInputWidth()
    if (this.searchable) {
      this.$refs['dropdown-search-select'].$el
        .querySelector('input')
        .setAttribute('autocomplete', 'off')
    }
  },
  methods: {
    addTag(newTag) {
      newTag.split(',').forEach(item => {
        if (
          (!this.maxSelection || this.value.length < this.maxSelection) &&
          item.trim() !== ''
        ) {
          if (!this.optionIsDuplicate(item)) this.addedTags.push(item.trim())
          if (!this.optionIsSelected(item)) this.handleSelectEvent(item.trim())
        }
      })
    },
    handleSelectEvent(selectedOption) {

      if (selectedOption === this.clearLabel) {
        this.$emit('select', this.multiple ? [] : null)
      } else {
        this.fieldValidatorTouch()
        if (this.multiple) {
          this.value.push(selectedOption)
          this.$emit('select', this.value)
          // Sometimes (e.g. in modals) the dropdown field width is 0
          // cause modals are being rendered with display:none before it's
          // actually being showed. That's why we need to recalculate chips'
          // width when we are sure that the element width is already calculated
          this.recalculateInputWidth()
        } else {
          this.$emit('select', selectedOption)
        }
      }
    },
    handleRemoveEvent(removedOption) {
      if (this.multiple && (this.value.length > 1 || this.allowEmpty)) {
        const newValue = this.value.filter(
          v => this.getOptionKey(removedOption) !== this.getOptionKey(v)
        )
        this.$emit('select', newValue)
        this.recalculateInputWidth()
      } else if (this.allowEmpty) {
        this.$emit('select', null)
      }
    },
    handleOpenEvent() {
      if (this.preserveSearch) {
        this.$emit('open', this.$refs['dropdown-search-select'].search)
      } else {
        this.$emit('open')
      }
    },
    handleCloseEvent() {
      if (this.taggable && this.searchQuery) {
        this.addTag(this.searchQuery)
      }
      this.fieldValidatorTouch()
      this.$emit('close')
    },
    handleSearchChangeEvent(value) {
      this.searchQuery = value
    },
    getOptionLabel(option) {
      if (!option) return ''
      if (option.isTag) {
        return `${this.tagPlaceholder} : ${option.label}`
      }
      return isPlainObject(option) && this.optionLabel ? option[this.optionLabel] : option
    },
    getOptionLabelWhenSelected(option) {
      if (!option) return ''
      return this.optionLabelWhenSelected
        ? option[this.optionLabelWhenSelected]
        : this.getOptionLabel(option)
    },
    getOptionKey(option) {
      if (!option) return ''
      return isPlainObject(option) && this.optionKey ? option[this.optionKey] : option
    },
    optionIsSelected(option) {
      return this.value.some(v => this.getOptionKey(option) === this.getOptionKey(v))
    },
    recalculateInputWidth() {
      if (this.$el.offsetWidth) {
        // Sometimes offsetWidth is not precise enough (it displays 100 instead of 99.5)
        // so it's better to subtract this 0.5px to make sure layout won't get broken
        this.inputWidth = this.$el.offsetWidth - 0.5 + 'px'
      }
    },
    optionIsDuplicate(option) {
      if (this.allOptions.length > 0) {
        return this.allOptions.some(
          opt => this.getOptionKey(opt) === this.getOptionKey(option)
        )
      }
      return false
    }
  }
}
</script>
