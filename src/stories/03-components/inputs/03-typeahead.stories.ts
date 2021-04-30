import TypeAheadField from '@/components/input-fields/TypeAheadField.vue'
import sections from '../../story-sections'
import Vue from 'vue'

export default {
  title: `${sections.components}/Inputs/TypeAheadField`,
  component: TypeAheadField
}

export const Default = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      const options: Array<any> = []
      return { options, value: null }
    },
    methods: {
      onFetchFilterOptions(query: string) {
        this.options = new Array(10)
          .fill(null)
          .map((value, index) => `${query} - ${index + 1}`)
      },
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value = option
      }
    },
    template: `
  <div>
        <TypeAheadField
        title="test-field"
        :options="options"
        :value="value"
        placeholder="start typing"
        @fetchFilterOptions="onFetchFilterOptions"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
    </div>`
  })

export const Disabled = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      const options: Array<any> = []
      return {
        options,
        value1: null,
        value2: 'Test 1',
        value3: ['Test 1', 'Test 2', 'Test 3']
      }
    },
    methods: {
      onFetchFilterOptions(query: string) {
        this.options = new Array(10)
          .fill(null)
          .map((value, index) => `${query} - ${index + 1}`)
      },
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value1 = option
        this.value2 = option
        this.value3 = option
      }
    },
    template: `
  <div>
        <h5>Without pre-selected options</h5>
        <TypeAheadField
          disabled
          title="test-field"
          :options="options"
          :value="value1"
          placeholder="start typing"
          @fetchFilterOptions="onFetchFilterOptions"
          @clearFilterOptions="onClearFilterOptions"
          @select="onOptionSelection"
         />
         <br/>
         <h5>Single: With pre-selected option</h5>
         <TypeAheadField
          disabled
          title="test-field"
          :options="options"
          :value="value2"
          placeholder="start typing"
          @fetchFilterOptions="onFetchFilterOptions"
          @clearFilterOptions="onClearFilterOptions"
          @select="onOptionSelection"
         />
         <br/>
         <h5>Multiple: With pre-selected options</h5>
         <TypeAheadField
          disabled
          multiple
          title="test-field"
          :options="options"
          :value="value3"
          placeholder="start typing"
          @fetchFilterOptions="onFetchFilterOptions"
          @clearFilterOptions="onClearFilterOptions"
          @select="onOptionSelection"
         />
    </div>`
  })

export const WithCustomNoOptionsMessage = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      return { options: [], value: null }
    },
    methods: {
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value = option
      }
    },
    template: `
  <div>
        <TypeAheadField
        title="test-field"
        :options="options"
        :value="value"
        placeholder="start typing"
        noOptionsMessage="Custom noOptions message"
        @fetchFilterOptions="() => null"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
    </div>`
  })

export const WithCustomNoResultMessage = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      return { options: [], value: null }
    },
    methods: {
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value = option
      }
    },
    template: `
  <div>
        <TypeAheadField
        title="test-field"
        :options="options"
        :value="value"
        placeholder="start typing"
        noResultMessage="Custom noResult message"
        @fetchFilterOptions="() => null"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
    </div>`
  })

export const Multiple = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      const options: Array<any> = []
      return { options, value: [] }
    },
    methods: {
      onFetchFilterOptions(query: string) {
        this.options = new Array(10)
          .fill(null)
          .map((value, index) => `${query} - ${index + 1}`)
      },
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value = option
      }
    },
    template: `
  <div>
        <TypeAheadField
        title="test-field"
        :options="options"
        :value="value"
        multiple
        placeholder="start typing"
        @fetchFilterOptions="onFetchFilterOptions"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
    </div>`
  })

export const MultipleWithObjectValues = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      const options: Array<any> = []
      return { options, value: [] }
    },
    methods: {
      onFetchFilterOptions(query: string) {
        this.options = new Array(10)
          .fill(null)
          .map((value, index) => ({ key: index, label: `${query} - ${index + 1}` }))
      },
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value = option
      }
    },
    template: `
  <div>
        <TypeAheadField
        title="test-field"
        :options="options"
        :value="value"
        optionLabel="label"
        optionKey="key"
        multiple
        placeholder="start typing"
        @fetchFilterOptions="onFetchFilterOptions"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
    </div>`
  })

export const MultipleWithDynamicHeight = () =>
  Vue.extend({
    components: { TypeAheadField },
    data() {
      const options: Array<any> = []
      return { options, value: [] }
    },
    methods: {
      onFetchFilterOptions(query: string) {
        this.options = new Array(10)
          .fill(null)
          .map((value, index) => ({ key: index, label: `${query} - ${index + 1}` }))
      },
      onClearFilterOptions() {
        this.options = []
      },
      onOptionSelection(option: any) {
        this.value = option
      }
    },
    template: `
  <div>
      <div style="width: 200px">
        <h5>200px width not fixed height</h5>
        <TypeAheadField
        title="test-field"
        :options="options"
        :heightFixed="false"
        :value="value"
        optionLabel="label"
        optionKey="key"
        multiple
        placeholder="start typing"
        @fetchFilterOptions="onFetchFilterOptions"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
      </div>
      <br />
      <div style="width: 500px">
        <h5>500px width fixed height</h5>
        <TypeAheadField
        title="test-field"
        :options="options"
        :heightFixed="true"
        :value="value"
        optionLabel="label"
        optionKey="key"
        multiple
        placeholder="start typing"
        @fetchFilterOptions="onFetchFilterOptions"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
         />
      </div>
      <br />
      <h5>Full width with visibleSelectedOptionsLimit="6" and not fixed height</h5>
      <TypeAheadField
        title="test-field"
        :options="options"
        :heightFixed="false"
        :visibleSelectedOptionsLimit="6"
        :value="value"
        optionLabel="label"
        optionKey="key"
        multiple
        placeholder="start typing"
        @fetchFilterOptions="onFetchFilterOptions"
        @clearFilterOptions="onClearFilterOptions"
        @select="onOptionSelection"
      />
    </div>`
  })
