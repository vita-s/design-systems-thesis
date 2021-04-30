<template>
  <FormField :title="title" :noLabel="noLabel" class="text-area-field" vertical>
    <div
      :title="title"
      :class="{ 'focused-container': focused }"
      class="chip-container form-control text-area-field__text-area paragraph"
      :style="containerStyle"
      data-plankton-test="chips-textarea-field"
      @click="onInputFocus"
    >
      <FilterChip
        v-for="chip of chips"
        :key="chip.label"
        :text="chip"
        category="secondary"
        class="chip"
        data-plankton-test="filter-chip"
        @remove-filter-chip="deleteChip(chip)"
      ></FilterChip>
      <input
        ref="focusTextarea"
        v-model="value"
        data-plankton-test="input-field"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @change="saveChip"
        @keydown.delete="onDeleteKeypress"
      />
      <Button
        v-if="chips.length > 0"
        type="button"
        class="btn-clear"
        data-plankton-test="clear-all-btn"
        category="link"
        @click="clearAll"
      >
        <i class="material-icons">close</i>
      </Button>
    </div>
    <div v-if="fieldValidatorInlineErrorsShown">
      <div
        v-for="errorMessage in fieldValidatorInlineErrorMessages"
        :key="errorMessage"
        class="input-error-message label-text"
      >
        {{ errorMessage }}
      </div>
    </div>
    <div v-else class="text-area-field__legend label-text">
      {{ displayHint }}
    </div>
  </FormField>
</template>

<script>
import fieldValidatorMixin from '@/mixins/field-validator-mixin'
import union from 'lodash/union'
import Button from '@/components/Button/Button.vue'
import FormField from '@/components/FormField.vue'
import FilterChip from '@/components/FilterChip.vue'

export default {
  components: { FormField, FilterChip, Button },
  mixins: [
    fieldValidatorMixin({
      componentValue: 'chips'
    })
  ],
  inheritAttrs: false,
  model: {
    prop: 'chips',
    event: 'chips-input'
  },
  props: {
    title: { type: String, default: '' },
    noLabel: { type: Boolean, default: false },
    allowDuplicates: {
      type: Boolean,
      default: true
    },
    chips: { type: Array, default: () => [] },
    displayHint: { type: String, default: '' },
    maxLength: { type: Number, default: 0 },
    containerStyle: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      focused: false,
      value: ''
    }
  },
  computed: {
    titleElementIsVisible() {
      return !this.disabled && !this.noLabel
    }
  },
  methods: {
    saveChip() {
      const { chips, value, allowDuplicates } = this
      const newChips = value
        .trim()
        .split(',')
        .filter(text => text && text.trim() !== '')
        .map(text => text.trim())
      const allChips = allowDuplicates
        ? this.chips.concat(newChips)
        : union(chips, newChips)

      if (this.maxLength && allChips.length > this.maxLength) {
        this.$emit('chips-input', [...allChips].splice(0, this.maxLength))
        this.value = [...allChips]
          .splice(this.maxLength, allChips.length - this.maxLength)
          .join(',')
      } else {
        this.$emit('chips-input', allChips)
        this.value = ''
      }

      this.fieldValidatorTouch()
    },
    deleteChip(chip) {
      this.$emit(
        'chips-input',
        this.chips.filter(c => c !== chip)
      )
    },
    clearAll() {
      this.value = ''
      this.$emit('chips-input', [])
    },
    onInputFocus() {
      if (!this.focused) {
        this.focused = true
        this.$refs.focusTextarea.focus()
      }
    },
    onInputBlur() {
      this.focused = false
    },
    onDeleteKeypress() {
      if (this.value === '' && this.chips.length > 0) {
        this.chips.pop()
        this.$emit('chips-input', this.chips)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chip-container.focused-container {
  border: 1px solid $color-secondary-main;
}

.chip-container {
  overflow: auto;
  width: 100%;
  min-height: 42px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  cursor: text;
  padding: 5px 8px;

  input {
    flex: 1 1 auto;
    width: 30px;
    border: none;
    outline: none;
    padding: 7px 2px;
  }
}

.chip {
  margin: 4px 2px;
}

.btn-clear {
  margin-top: 6px;
  margin-left: 5px;

  > i {
    font-size: 18px;
  }
}
</style>
