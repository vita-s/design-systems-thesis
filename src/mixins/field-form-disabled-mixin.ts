// @ts-nocheck
import { provider as formProvider } from '@/components/form-provider'

export default {
  props: {
    disabled: { type: Boolean, default: false }
  },
  inject: { formProvider },
  computed: {
    fieldFormDisabled() {
      return this.disabled || this.formProvider.isFormDisabled()
    }
  }
}
