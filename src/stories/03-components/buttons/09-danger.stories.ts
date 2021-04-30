import Button from '@/components/Button/Button.vue'
// @ts-ignore Ignore import type checking because is not javascript
import GoogleBrand from '@/assets/storybook/google-brand.svg'
import { action } from '@storybook/addon-actions'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Buttons/Danger`,
  component: Button
}

export const All = () => ({
  components: { GoogleBrand },
  template: `<div>
  <Button category="danger" text="button" @click="someMethod" />
  <Button category="danger" text="button" materialIcon="local_shipping"  @click="someMethod" disabled/>
  <Button category="danger" text="BUTTON" materialIcon="favorite"  @click="someMethod"/>
  <Button category="danger" text="BUTTON"  @click="someMethod" loading/>
  <Button category="danger" :inline="true" text="BUTTON"  @click="someMethod"/>
  <Button category="danger" text="log in with google">
    <template v-slot:icon>
      <GoogleBrand style="width: 100%; display: block;" />
    </template>
  </Button>
  </div>`,
  methods: { someMethod: action('clicked') }
})

export const Default = () => ({
  template: `<Button category="danger" text="button" @click="someMethod" />`,
  methods: { someMethod: action('clicked') }
})

export const Disabled = () => ({
  template: `<Button category="danger" text="button" materialIcon="local_shipping"  @click="someMethod" disabled/>`,
  methods: { someMethod: action('clicked') }
})

export const WithIcon = () => ({
  template: `<Button category="danger" text="BUTTON" materialIcon="favorite"  @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const Loading = () => ({
  template: `<Button category="danger" text="BUTTON"  @click="someMethod" loading/>`,
  methods: { someMethod: action('clicked') }
})

export const Inline = () => ({
  template: `<Button category="danger" :inline="true" text="BUTTON"  @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const CustomIconElement = () => ({
  components: { GoogleBrand },
  template: `
  <Button category="danger" text="log in with google">
    <template v-slot:icon>
      <GoogleBrand style="width: 100%; display: block;" />
    </template>
  </Button>`
})
