<template>
  <FormField
    :id="$attrs.id"
    :title="title"
    :noLabel="noLabel"
    class="input-wrapper"
    :accessibilityStandards="accessibilityStandards"
    :class="{
      ...formFieldClasses,
      'input-success': success,
      'input-error': error
    }"
  >
    <div
      ref="inputContainer"
      v-tooltip="tooltipVal"
      class="input-group input-field paragraph"
      :class="attributeClasses"
    >
      <masked-input
        ref="inputElement"
        data-plankton-test="input-field"
        v-bind="$attrs"
        :data-test="undefined"
        :value="value"
        :mask="inputMask"
        :placeholder="placeholder"
        class="form-control input-field__segment input-field__input"
        :class="{
          'input-field__input--regular': !accessibilityStandards,
          'input-text-accessibility': accessibilityStandards
        }"
        :disabled="fieldFormDisabled"
        v-on="listeners"
      />
      <div
        v-if="hasIcon"
        :class="iconWrapperClasses"
        class="input-group-append input-field__icon-wrapper"
        data-plankton-test="icon-wrapper"
        @click="$emit('click-on-icon')"
      >
        <i
          v-if="textIcon"
          class="input-group-text input-field__segment input-field__icon input-field__text-icon button-text"
        >
          {{ textIcon }}
        </i>
        <i
          v-else
          class="material-icons input-group-text input-field__segment input-field__icon"
        >
          {{ materialIcon }}
        </i>
      </div>
    </div>

    <div v-if="fieldValidatorInlineErrorsShown" data-plankton-test="wrong-input-feedback">
      <div
        v-for="errorMessage in fieldValidatorInlineErrorMessages"
        :key="errorMessage"
        class="input-error-message label-text"
        :class="{ 'label-text-accessibility': accessibilityStandards }"
        v-text="errorMessage"
      />
    </div>
    <div
      v-else-if="legend"
      class="input-wrapper__legend label-text"
      :class="{
        'input-wrapper__legend--accessibility': accessibilityStandards,
        'label-text-accessibility': accessibilityStandards
      }"
      data-plankton-test="input-legend"
    >
      {{ legend }}
    </div>
  </FormField>
</template>

<script>
import fieldValidatorMixin from '@/mixins/field-validator-mixin'
import fieldFormDisabledMixin from '@/mixins/field-form-disabled-mixin'
import MaskedInput from 'vue-text-mask'
import { useOverflowContent } from '@/compositions'
import { computed, ref, toRef } from '@vue/composition-api'
import FormField from '@/components/FormField.vue'
import { VTooltip } from 'v-tooltip'

export default {
  directives: { tooltip: VTooltip },
  components: {
    MaskedInput,
    FormField
  },
  mixins: [
    fieldValidatorMixin({ validatorsPropName: 'inputValidators' }),
    fieldFormDisabledMixin
  ],
  props: {
    title: { type: String, default: '' },
    noLabel: { type: Boolean, default: false },
    value: { type: String, default: null },
    placeholder: { type: String, default: '' },
    inputMask: { type: [Array, Function, Boolean], default: () => false },
    materialIcon: { type: String, default: null },
    textIcon: {
      type: String,
      required: false,
      validator: text => text.length <= 4,
      default: null
    },
    fullWidth: { type: Boolean, default: false },
    legend: { type: String, default: null },
    convertEmptyToNull: { type: Boolean, default: false },
    showTooltipOnOverflow: { type: Boolean, default: true },
    success: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    accessibilityStandards: { type: Boolean, default: false }
  },
  setup(props) {
    const inputContainer = ref(null)
    const { isOverflowing } = useOverflowContent(
      inputContainer,
      'input',
      toRef(props, 'value')
    )
    const tooltipVal = computed(() => {
      if (props.showTooltipOnOverflow && isOverflowing.value) {
        return props.value
      }
      return null
    })

    return { isOverflowing, inputContainer, tooltipVal }
  },
  computed: {
    attributeClasses() {
      return {
        'input-field--wrong-value': this.fieldValidatorErrorIndicatorShown,
        'input-field--disabled': this.fieldFormDisabled
      }
    },
    formFieldClasses() {
      return {
        'input-wrapper--full-width': this.fullWidth
      }
    },
    iconWrapperClasses() {
      return {
        'input-field__icon-wrapper--clickable': this.hasClickOnIconEventListener
      }
    },
    hasIcon() {
      return Boolean(this.materialIcon || this.textIcon)
    },
    hasClickOnIconEventListener() {
      return Object.prototype.hasOwnProperty.call(this.$listeners, 'click-on-icon')
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.handleInputEvent,
        blur: this.handleBlurEvent
      }
    }
  },
  methods: {
    focus() {
      let { $refs, $children } = this
      do {
        if ($refs.inputElement) {
          $refs.inputElement.$el.focus()
          return
        }
        $refs = $children[0].$refs
        $children = $children[0].$children
      } while ($children.length)
    },
    handleBlurEvent($event) {
      this.fieldValidatorTouch()
      this.$emit('blur', $event)
    },
    handleInputEvent($event) {
      this.$emit('input', this.convertEmptyToNull ? $event || null : $event)
    }
  }
}
</script>
