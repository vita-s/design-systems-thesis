import Button from '@/components/Button/Button.vue'
import { action } from '@storybook/addon-actions'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Buttons/Links as Buttons`,
  component: Button
}

export const All = () => ({
  template: `<div>
        <Button category="link" text="link" @click="someMethod" />
        <Button category="link" disabled text="link" @click="someMethod"/>
        <Button category="link" text="link" materialIcon="favorite"  @click="someMethod"/>
        <Button category="link" disabled text="link" materialIcon="favorite"  @click="someMethod"/>
        <Button category="link" materialIcon="favorite"  @click="someMethod"/>
        <Button category="link" disabled materialIcon="favorite"  @click="someMethod"/>
      </div>`,
  methods: { someMethod: action('clicked') }
})

export const Default = () => ({
  template: `<Button category="link" text="link" @click="someMethod" />`,
  methods: { someMethod: action('clicked') }
})

export const Disabled = () => ({
  template: `<Button category="link" disabled text="link" @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const WithIcon = () => ({
  template: `<Button category="link" text="link" materialIcon="favorite"  @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const DisabledWithIcon = () => ({
  template: `<Button category="link" disabled text="link" materialIcon="favorite"  @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const WithNoText = () => ({
  template: `<Button category="link" materialIcon="favorite"  @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const DisabledWithNoText = () => ({
  template: `<Button category="link" disabled materialIcon="favorite"  @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})
