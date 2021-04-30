import ToggleInput from '@/components/toggle/ToggleInput.vue'
import { action } from '@storybook/addon-actions'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Selection Controls/Toggle`,
  component: ToggleInput
}

export const Default = () => ({
  template: `<ToggleInput @input="action" />`,
  methods: { action: action('clicked') }
})

export const On = () => ({
  template: `<ToggleInput :value="true" @input="action" />`,
  methods: { action: action('clicked') }
})

export const Disabled = () => ({
  template: `<ToggleInput :disabled="true" @input="action" />`,
  methods: { action: action('clicked') }
})
