import Checkbox from '@/components/input-fields/Checkbox/Checkbox.vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Selection Controls/Checkbox`,
  decorators: [withKnobs],
  component: Checkbox
}

export const WithDifferentSizes = () => ({
  template: `<div>
  <Checkbox :checked="checked" size="small"  label="small (12px) default value" />
  <Checkbox :checked="checked" size="medium" label="medium (16px)" />
  <Checkbox :checked="checked" size="large" label="large (20px)"/>
  </div>`,
  data: () => ({
    checked: true
  })
})

export const BoundToBoolean = () => ({
  template: `<Checkbox :checked="checked" :disabled="disabled" :label="label" @input="someMethod"/>`,
  props: {
    label: {
      default: text('Label text', 'Checkbox item')
    },
    disabled: { default: boolean('Disabled', false) },
    initiallyChecked: { default: boolean('Checked', false) }
  },
  data: () => ({
    checked: { type: Array, default: () => [] }
  }),
  methods: {
    someMethod(input: Boolean[]) {
      // @ts-ignore
      this.checked = input
      return action('emits: input')(input)
    }
  }
})

export const BoundToArray = () => ({
  template: `<div>
    <Checkbox :checked="checked" value="checkbox_1" label="Checkbox 1" @input="someMethod"/>
    <Checkbox :checked="checked" value="checkbox_2" label="Checkbox 2" @input="someMethod"/>
    <Checkbox :checked="checked" value="checkbox_3" label="Checkbox 3" @input="someMethod"/>
    <br>
    <span>Checked values: {{ checked }}</span>
  </div>`,
  props: {
    label: {
      default: text('Label text', 'Checkbox item')
    },
    disabled: { default: boolean('Disabled', false) },
    initiallyChecked: { default: boolean('Checked', false) }
  },
  data: () => ({
    checked: []
  }),
  methods: {
    someMethod(input: boolean[]) {
      // @ts-ignore
      this.checked = input
      return action('emits: input')(input)
    }
  }
})
