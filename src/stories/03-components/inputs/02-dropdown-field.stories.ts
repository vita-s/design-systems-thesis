import DropdownField from '@/components/input-fields/dropdown-field/DropdownField.vue'
import { breakoutDropdownFieldMixin } from '@/components/input-fields/dropdown-field/breakout-dropdown-field'
import PrimitiveDropdownField from '@/components/input-fields/dropdown-field/PrimitiveDropdownField.vue'
import sections from '../../story-sections'
import Vue from 'vue'

export default {
  title: `${sections.components}/Inputs/Dropdown (current version)`,
  component: DropdownField
}

export const Default = () => ({
  template: `
    <div>
      <DropdownField :options="[1, 2, 3, 4]" v-model="value" title="single select dropdown" placeholder="select..." />
      <DropdownField
        v-model="value1"
        :options="[{label: 'One', value: 1}, {label: 'Two', value: 2}, {label: 'Three', value: 3, $isDisabled: true}, {label: 'Four', value: 4}]"
        optionLabel="label"
        optionKey="value"
        title="dropdown with a disabled option"
        placeholder="select..."
      />
      <DropdownField disabled :options="[1, 2, 3, 4]" v-model="value" title="disabled dropdown" placeholder="select..." />
    </div>`,
  data() {
    return { value: null, value1: null }
  }
})

export const SingleWithNoDeselectOption = () => ({
  template: `
      <DropdownField
        v-model="value"
        :options="[1, 2, 3, 4]"
        :allowDeselectOption="false"
        title="can't be deselected"
      />`,
  data() {
    return { value: 1 }
  }
})

export const OpensInTopDirection = () => ({
  template: `
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value"
        title="opens in top direction"
        openDirection="top"
        style="margin-top: 100px"
      />`,
  data() {
    return { value: null }
  }
})

export const WithLongOptions = () => ({
  template: `
      <DropdownField
        :options="['Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']"
        v-model="value"
        title="hover last option and tooltip will appear"
      />`,
  data() {
    return { value: null }
  }
})

export const WithCustomWidth = () => ({
  template: `
      <DropdownField
        style="width: 25%"
        :options="['Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']"
        v-model="value"
        title="short dropdown"
        :validators="[{ errorMessage: 'invalid number', isInvalid: value => value % 2 === 1 }]"
      />`,
  data() {
    return { value: null }
  }
})

export const SmallerVariant = () => ({
  template: `
      <DropdownField
        :inline="true"
        :options="['Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']"
        v-model="value"
        title="small dropdown"
      />`,
  data() {
    return { value: null }
  }
})

export const WithValidators = () => ({
  template: `
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value"
        title="dropdown with validatrs: only even numbers"
        placeholder="select..."
        :validators="[{ errorMessage: 'invalid number', isInvalid: value => value % 2 === 1 }]"
      />`,
  data() {
    return { value: null }
  }
})

export const WithEventListeners = () =>
  Vue.extend({
    data() {
      return { value: null, message: 'Click the dropdown and check this label again' }
    },
    methods: {
      handleSelectEvent(selectedOption: string) {
        this.message = 'You have selected: ' + selectedOption
      },
      handleOpenEvent() {
        this.message = 'Select the option'
      }
    },
    template: `
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value"
        :title="message"
        @select="handleSelectEvent"
        @open="handleOpenEvent"
      />`
  })

export const WithSearch = () => ({
  template: `
      <DropdownField
        searchable
        :options="[1, 2, 3, 4]"
        title="searchable dropdown"
        noResultMessage="no matches for that search"
        v-model="value"
      />`,
  data() {
    return { value: null }
  }
})

export const WithCustomNoResultPlaceholder = () => ({
  template: `
  <DropdownField
    searchable
    :options="[1, 2, 3, 4]"
    title="type something to see the custom no result placeholder"
    v-model="value"
  >
  <div slot="noResult">
    <div>no results 🤷</div>
  </div>
  </DropdownField>`,
  data() {
    return { value: null }
  }
})

export const WithCustomNoOptionsPlaceholder = () => ({
  template: `
  <DropdownField
    :options="[]"
    title="dropdown with no options"
    v-model="value"
  >
  <div slot="noResult">
    <div>no options</div>
  </div>
  </DropdownField>`,
  data() {
    return { value: null }
  }
})

export const WithMultipleSelection = () => ({
  template: `
  <div>
  <DropdownField
    multiple
    v-model="values1"
    :options="[{label: 'One', value: 1}, {label: 'Two', value: 2}, {label: 'Three', value: 3, $isDisabled: true}, {label: 'Four', value: 4}]"
    :visibleSelectedOptionsLimit="3"
    :close-on-select="false"
    optionLabel="label"
    optionKey="value"
    placeholder="select multiple..."
    title="multi select with labels"
    />
  <DropdownField
    multiple
    v-model="values2"
    :close-on-select="false"
    :options="['Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']"
    placeholder="select multiple..."
    title="multi select with long options"
  />
  <DropdownField
    multiple
    v-model="values2"
    :close-on-select="false"
    :options="['Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']"
    :visibleSelectedOptionsLimit="3"
    placeholder="select multiple..."
    title="short multi select with long options"
    style="width:25%;"
  />
  <DropdownField
    multiple
    v-model="values2"
    :close-on-select="false"
    :options="['Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']"
    :visibleSelectedOptionsLimit="3"
    :taggable="true"
    :searchable="true"
    :closingTag="true"
    placeholder="select multiple..."
    title="short multi select with possibility to add custom values"
    style="width:25%;"
  />
  <DropdownField
  multiple
  v-model="values2"
  :close-on-select="false"
  :options="[]"
  :visibleSelectedOptionsLimit="3"
  :taggable="true"
  :searchable="true"
  :closingTag="true"
  :maxSelection="3"
  placeholder="select multiple..."
  title="short multi select with possibility to add custom values and limit the selection to 3 max"
  style="width:25%;"
  />
  <DropdownField
    multiple
    v-model="values3"
    :close-on-select="false"
    :options="[1, 2, 3, 4, 6, 7, 8]"
    :visibleSelectedOptionsLimit="6"
    placeholder="select multiple..."
    title="multi select with more options"
  />
  <DropdownField
    multiple
    searchable
    v-model="values4"
    :close-on-select="false"
    :options="[1, 2, 3, 4, 5, 6, 7, 8]"
    :visibleSelectedOptionsLimit="6"
    title="multi select with search"
    placeholder="select multiple..."
    noResultMessage="no matches for that search"
  />
  <DropdownField
    multiple
    v-model="values1"
    :options="[{label: 'One', value: 1}, {label: 'Two', value: 2}, {label: 'Three', value: 3}, {label: 'Four', value: 4}]"
    :visibleSelectedOptionsLimit="3"
    :close-on-select="false"
    closingTag
    openDirection="top"
    optionLabel="label"
    optionKey="value"
    placeholder="select multiple..."
    title="multi select with labels and option close buttons"
  />
  </div>
  `,
  data() {
    return { values1: [], values2: [], values3: [], values4: [] }
  }
})

export const MultipleWithNoDeselectOption = () => ({
  template: `
      <DropdownField
        v-model="value"
        :options="[1, 2, 3, 4]"
        :allowDeselectOption="false"
        multiple
        searchable
        title="can't be deselected"
      />`,
  data() {
    return { value: [1] }
  }
})

export const WithCustomFieldAndLabel = () => ({
  template: `
      <!-- Following the example from https://vue-multiselect.js.org/#sub-custom-option-template it is possible to set custom fields and labels -->
      <DropdownField :options="[
        { title: '40T', img: 'images/truck.png' },
        { title: 'Van', img: 'images/van.png' },
      ]" v-model="value" title="choose a value" placeholder="select...">
        <template v-slot:option="props">
          <div style="display: inline-block; width: 40px; text-align: center;margin-right: 9px;">
            <img :src="props.option.img" alt="Truck visualization"/>
          </div>
          <span>{{ props.option.title }}</span>
        </template>
        <template v-slot:singleLabel="props">
          <div style="display: inline-block; width: 40px; text-align: center;margin-right: 9px;">
            <img :src="props.option.img" alt="Truck visualization" />
          </div>
          <span>{{ props.option.title }}</span>
      </template>
      </DropdownField>`,
  data() {
    return { value: null }
  }
})

export const withPrimitiveDataModel = () => ({
  components: { PrimitiveDropdownField },
  template: `
    <div>
      <p>
        Dropdown that save its model as the key value of
        the selected option and not the whole option object.
      </p>
      <div>selected value: {{myValue}}</div>
        <PrimitiveDropdownField
          v-model="myValue"
          :options="[{label: 'One', value: 1}, {label: 'Two', value: 2}, {label: 'Three', value: 3}]"
          optionLabel="label"
          optionKey="value"
        />
    </div>`,
  data() {
    return { myValue: null }
  }
})

export const withBreakout = () =>
  Vue.extend({
    mixins: [breakoutDropdownFieldMixin],
    data() {
      return {
        value1: null,
        value2: null,
        value3: null,
        breakoutParentClass: 'breakout-test'
      }
    },
    methods: {
      checkRef() {
        console.log(this.getDropdownRef())
      },
      getDropdownRef() {
        return this.$refs.dropdown
      }
    },
    template: `
    <div :class="breakoutParentClass" style="
      width: 300px;
      height: 100px;
      overflow: scroll;
    ">
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value1"
        title="no breakout"
        placeholder="no breakout"
      />
      <DropdownField
        v-model="value2"
        :options="[1, 2, 3, 4]"
        title="with breakout"
        placeholder="with breakout"
        ref="dropdownRef2"
        @open="() => initDropdownBreakoutHelper('dropdownRef2')"
        @close="removeDropdownBreakoutHelper('dropdownRef2')"
      />
      <DropdownField
        v-model="value3"
        :options="[1, 2, 3, 4]"
        title="breakout with parent selector"
        placeholder="breakout with parent selector"
        ref="dropdownRef3"
        @open="() => initDropdownBreakoutHelper('dropdownRef3', '.' + breakoutParentClass)"
        @close="removeDropdownBreakoutHelper('dropdownRef3')"
      />
    </div>`
  })
