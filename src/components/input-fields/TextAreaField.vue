<template>
  <FormField :title="title" :noLabel="noLabel" class="text-area-field">
    <textarea
      :value="value"
      v-bind="$attrs"
      :disabled="fieldFormDisabled"
      :class="textAreaClasses"
      class="form-control text-area-field__text-area paragraph"
      data-plankton-test="input-field"
      @blur="fieldValidatorTouch"
      v-on="listeners"
    ></textarea>
    <div v-if="fieldValidatorInlineErrorsShown">
      <div
        v-for="errorMessage in fieldValidatorInlineErrorMessages"
        :key="errorMessage"
        class="input-error-message label-text"
        data-plankton-test="wrong-input-feedback"
      >
        {{ errorMessage }}
      </div>
    </div>
    <div
      v-else-if="legend"
      class="text-area-field__legend label-text"
      data-plankton-test="input-legend"
    >
      {{ legend }}
    </div>
  </FormField>
</template>

<script>
import fieldValidatorMixin from '@/mixins/field-validator-mixin'
import fieldFormDisabledMixin from '@/mixins/field-form-disabled-mixin'
import FormField from '@/components/FormField.vue'

export default {
  components: {
    FormField
  },
  mixins: [fieldValidatorMixin(), fieldFormDisabledMixin],
  inheritAttrs: false,
  props: {
    title: { type: String, default: '' },
    noLabel: { type: Boolean, default: false },
    value: { type: String, default: null },
    legend: { type: String, default: null },
    convertEmptyToNull: { type: Boolean, default: false }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: $event => {
          const value = $event.target.value
          return this.$emit('input', this.convertEmptyToNull ? value || null : value)
        }
      }
    },
    textAreaClasses() {
      return {
        'text-area-field__text-area--wrong-value': this.fieldValidatorErrorIndicatorShown,
        'text-area-field__text-area--disabled': this.fieldFormDisabled
      }
    }
  }
}
</script>
