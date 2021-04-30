<template>
  <form class="form" novalidate @submit.prevent="submit">
    <AlertMessage
      v-if="submitted && generalErrors.length > 0"
      type="error"
      class="form__errors"
      data-plankton-test="form-general-errors"
    >
      <ul class="form__errors-list">
        <li v-for="error in generalErrors" :key="error">
          <span class="error-text">{{ error }}</span>
        </li>
      </ul>
    </AlertMessage>
    <slot></slot>
  </form>
</template>
<script>
import AlertMessage from './AlertMessage.vue'
import { provider } from './form-provider'

export default {
  components: { AlertMessage },
  props: {
    disabled: { type: Boolean, default: false }
  },
  provide() {
    return {
      [provider.from]: {
        registerField: this.registerField,
        unregisterField: this.unregisterField,
        setFieldValidationErrors: this.setFieldValidationErrors,
        isFormDisabled: () => this.disabled
      }
    }
  },
  data() {
    return { fields: {}, submitted: false, generalErrors: [] }
  },
  methods: {
    validate() {
      this.validateForm()
      this.generalErrors = this.computeGeneralErrors(this.fields)
      this.submitted = true

      const event = { hasErrors: this.hasErrors() }
      return event
    },
    submit() {
      const event = this.validate()

      this.$emit('validated-submit', event)
      return event
    },
    registerField(name, validate) {
      if (this.fields[name]) throw new Error(`field "${name}" already registered in form`)
      this.$set(this.fields, name, {
        errors: [],
        validate
      })
    },
    unregisterField(name) {
      delete this.fields[name]
    },
    setFieldValidationErrors(name, errors) {
      const field = this.fields[name]
      if (!field) throw new Error(`field "${name}" is not registered in form`)
      this.$set(this.fields, name, {
        ...field,
        errors
      })
    },
    validateForm() {
      Object.entries(this.fields).forEach(([name, field]) => {
        const errors = field.validate() || []
        this.setFieldValidationErrors(name, errors)
      })
    },
    hasErrors() {
      return Object.values(this.fields).some(field => field.errors.length > 0)
    },
    computeGeneralErrors(fields) {
      const errormessages = Object.values(fields)
        .map(field => field.errors)
        .reduce((acc, errors) => [...acc, ...errors], [])
        .filter(error => !error.inline)
        .map(error => error.errorMessage)

      return [...new Set(errormessages)]
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  &__errors {
    margin-bottom: 20px;
  }

  &__errors-list {
    margin-bottom: 0;
    padding-left: 17px;
  }

  .error-text {
    position: relative;
    left: -5px;
  }
}
</style>
