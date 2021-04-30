import Button from '@/components/Button/Button.vue'
import { action } from '@storybook/addon-actions'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Buttons/Minion`,
  component: Button
}

export const All = () => ({
  template: `<div>
      <Button materialIcon="favorite" category="primary" @click="someMethod"/>
      <Button materialIcon="favorite" category="primary" @click="someMethod" disabled/>
      <Button materialIcon="cloud_download" category="tertiary" @click="someMethod"/>
      <Button category="tertiary" @click="someMethod" icon="downloadPdf" />
      <br/>
      <br/>
      <Button materialIcon="fingerprint" category="primary" :inline="true" @click="someMethod"/>
      <Button materialIcon="get_app" category="secondary" :inline="true" @click="someMethod"/>
      <Button materialIcon="search" category="tertiary" :inline="true" @click="someMethod"/>
      <br/>
      <br/>
      <Button materialIcon="favorite" category="primary" @click="someMethod" disabled/>
      <Button materialIcon="face" category="secondary" @click="someMethod" disabled/>
      <Button materialIcon="cloud_download" category="tertiary" @click="someMethod" disabled/>
    </div>`,
  methods: { someMethod: action('clicked') }
})

export const DefaultPrimary = () => ({
  template: `<Button materialIcon="favorite" category="primary" @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const DisabledPrimary = () => ({
  template: `<Button materialIcon="favorite" category="primary" @click="someMethod" disabled/>`,
  methods: { someMethod: action('clicked') }
})

export const InlinePrimary = () => ({
  template: `<Button materialIcon="fingerprint" category="primary" :inline="true" @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const DefaultSecondary = () => ({
  template: `<Button materialIcon="favorite" category="primary" @click="someMethod" disabled/>`,
  methods: { someMethod: action('clicked') }
})

export const DisabledSecondary = () => ({
  template: `<Button materialIcon="face" category="secondary" @click="someMethod" disabled/>`,
  methods: { someMethod: action('clicked') }
})

export const InlineSecondary = () => ({
  template: `<Button materialIcon="get_app" category="secondary" :inline="true" @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const DefaultTertiary = () => ({
  template: `<Button materialIcon="cloud_download" category="tertiary" @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})

export const DisabledTertiary = () => ({
  template: `<Button materialIcon="cloud_download" category="tertiary" @click="someMethod" disabled/>`,
  methods: { someMethod: action('clicked') }
})

export const InlineTertiary = () => ({
  template: `<Button materialIcon="search" category="tertiary" :inline="true" @click="someMethod"/>`,
  methods: { someMethod: action('clicked') }
})
