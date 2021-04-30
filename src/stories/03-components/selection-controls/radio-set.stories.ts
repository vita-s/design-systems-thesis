import RadioSet from '@/components/input-fields/RadioSet/RadioSet.vue'
import { action } from '@storybook/addon-actions'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Selection Controls/RadioSet`,
  component: RadioSet
}

export const AllPossibleStates = () => ({
  template: `<RadioSet v-model="current" :options="options" :inline="inline" @input="someMethod"/>`,
  data() {
    return {
      current: null,
      options: [
        { label: 'Unselected item', value: 0 },
        { label: 'Hover me', value: 1 },
        { label: 'Disabled item', value: 2, disabled: true },
        { label: 'Disabled & Selected', value: 3, disabled: true }
      ],
      inline: false
    }
  },
  methods: {
    someMethod(input: number) {
      // @ts-ignore
      action(`V-modeled: ${this.current}. Input`)(input)
    }
  }
})

export const Inline = () => ({
  template: `<RadioSet v-model="current" :options="options" :inline="inline" @input="someMethod"/>`,
  data() {
    return {
      current: true,
      options: [
        { label: 'a', value: true },
        { label: 'b', value: false }
      ],
      inline: true
    }
  },
  methods: {
    someMethod(input: boolean) {
      // @ts-ignore
      action(`V-modeled: ${this.current}. Input`)(input)
    }
  }
})

export const ExamplePalletExchange = () => ({
  template: `<RadioSet v-model="current" :options="options" :inline="inline" @input="someMethod"/>`,
  data() {
    return {
      current: 'NOT_REQUIRED',
      options: [
        { label: 'Not required', value: 'NOT_REQUIRED' },
        { label: 'Regular', value: 'REGULAR' },
        { label: 'Standort', value: 'STANDORT' },
        { label: 'Non feasible', value: 'NON_FEASIBLE' }
      ],
      inline: false
    }
  },
  methods: {
    someMethod(input: string) {
      // @ts-ignore
      action(`V-modeled: ${this.current}. Input`)(input)
    }
  }
})

export const ExampleYesNoNA = () => ({
  template: `<RadioSet v-model="current" :options="options" :inline="inline" @input="someMethod"/>`,
  data() {
    return {
      current: true,
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
        { label: 'N/A', value: null }
      ],
      inline: false
    }
  },
  methods: {
    someMethod(input: boolean | null) {
      // @ts-ignore
      action(`V-modeled: ${this.current}. Input`)(input)
    }
  }
})

export const WithNestedContent = () => ({
  template: `<RadioSet v-model="current" name="nester" :options="options" @input="someMethod">
        <template v-slot:with_address>
            <select class="w-50">
                <option value="dog">Brandenburger Tor</option>
                <option value="cat">Spree</option>
            </select>
        </template>
        <template v-slot:secret>
            <i class="material-icons">location_disabled</i> 
        </template>
    </RadioSet>`,
  data() {
    return {
      current: 'with_address',
      options: [
        { label: 'known place', value: 'with_address' },
        { label: 'secret place', value: 'secret' }
      ]
    }
  },
  methods: {
    someMethod(input: string) {
      // @ts-ignore
      action(`V-modeled: ${this.current}. Input`)(input)
    }
  }
})
