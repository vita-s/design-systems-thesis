declare module '*.vue' {
  import { defineComponent } from '@vue/composition-api'
  const componentDefinition: ReturnType<typeof defineComponent>
  export default componentDefinition
}
