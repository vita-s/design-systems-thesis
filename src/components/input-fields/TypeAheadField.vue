<template>
  <DropdownField
    autosuggest
    searchable
    :options="typeAheadOptions"
    :value="value"
    :title="title"
    :loading="searching"
    :internal-search="internalSearch"
    :clearOnSelect="true"
    :closeOnSelect="true"
    :closingTag="closingTag"
    :hide-selected="hideSelected"
    :noResultMessage="noResult"
    :noOptionsMessage="noResult"
    :listLoadingMessage="loadingMessage"
    :multiple="multiple"
    :optionLabel="optionLabel"
    :optionKey="optionKey"
    :clear-label="clearLabel"
    :allow-deselect-option="allowDeselectOption"
    v-bind="$attrs"
    :preserve-search="false"
    :visibleSelectedOptionsLimit="visibleSelectedOptionsLimit"
    v-on="$listeners"
    @search-change="searchOptionsDebounced"
    @close="clearFilterOptions"
  />
</template>

<script>
import debounce from 'lodash/debounce'
import DropdownField from './dropdown-field/DropdownField.vue'

export default {
  components: { DropdownField },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'select'
  },
  props: {
    optionLabel: { type: String, default: null },
    optionKey: { type: String, default: null },
    title: { type: String, required: true },
    multiple: { type: Boolean, default: false },
    closingTag: { type: Boolean, default: true },
    hideSelected: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    value: { type: [Object, String, Number, Array], default: null },
    minQueryLength: { type: Number, default: 3 },
    visibleSelectedOptionsLimit: { type: Number, default: 2 },
    noResultMessage: { type: String, default: null },
    noOptionsMessage: { type: String, default: null },
    loadingMessage: { type: String, default: 'Loading...' },
    internalSearch: { type: Boolean, default: true },
    clearLabel: { type: String, default: null },
    allowDeselectOption: { type: Boolean, default: false }
  },
  data() {
    return {
      searching: false,
      searchQuery: ''
    }
  },
  computed: {
    typeAheadOptions() {
      const getOptionLabel = option => {
        return typeof option === 'object' && option[this.optionKey]
          ? String(option[this.optionLabel])
          : String(option)
      }

      return this.queryValid
        ? this.options
        : this.selectedValues.filter(selectedValue =>
            getOptionLabel(selectedValue)
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          )
    },
    selectedValues() {
      if (Array.isArray(this.value)) return this.value
      else if (this.value === null || this.value === '') return []
      else return [this.value]
    },
    queryValid() {
      return this.searchQuery.length >= this.minQueryLength
    },
    noResult() {
      if (!this.queryValid)
        return (
          this.noOptionsMessage || `At least ${this.minQueryLength} letters are required`
        )
      if (!this.searching && this.options.length === 0) {
        return (
          this.noResultMessage || 'No results found. Consider changing the search text'
        )
      }
      return this.loadingMessage
    }
  },
  methods: {
    clearFilterOptions() {
      this.$emit('clearFilterOptions')
    },
    async searchOptions(query) {
      this.searchQuery = query
      this.clearFilterOptions()
      if (!this.queryValid) return
      this.searching = true
      await this.$emit('fetchFilterOptions', query)
      this.searching = false
    },
    searchOptionsDebounced: debounce(function (...args) {
      this.searchOptions(...args)
    }, 500),
    areOptionsEqual(optionA, optionB) {
      if (typeof optionA === 'object' && typeof optionB === 'object' && this.optionKey)
        return optionA[this.optionKey] === optionB[this.optionKey]
      else return optionA === optionB
    }
  }
}
</script>
