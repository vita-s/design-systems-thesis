<template>
  <button
    v-if="category === 'link'"
    ref="link"
    :type="type"
    class="linked-text paragraph"
    v-on="$listeners"
  >
    <Icon
      v-if="hasIcon || loading"
      :name="icon"
      :materialIcon="loading ? 'autorenew' : materialIcon"
      class="material-icons link__icon"
      :class="iconClasses"
    />
    <slot>
      {{ text }}
    </slot>
  </button>
  <button
    v-else
    ref="button"
    :type="type"
    class="button button-text"
    :class="buttonClasses"
    v-on="$listeners"
  >
    <Icon
      v-if="hasIcon || loading"
      :name="icon"
      :materialIcon="loading ? 'autorenew' : materialIcon"
      class="material-icons button__icon"
      :class="iconClasses"
    />
    <span v-if="$slots.icon" class="button__icon" :class="{ 'has-text': hasText }">
      <slot name="icon"></slot>
    </span>
    <span v-if="hasText">
      <slot>
        {{ text }}
      </slot>
    </span>
  </button>
</template>

<script>
import Icon from '@/components/icons/Icon.vue'

export default {
  components: {
    Icon
  },
  props: {
    text: { type: String, default: '' },
    materialIcon: { type: String, default: null },
    icon: { type: String, default: null },
    loading: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    reversed: { type: Boolean, default: false },
    category: {
      type: String,
      validator: t =>
        ['primary', 'secondary', 'tertiary', 'dark', 'link', 'danger'].includes(t),
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button',
      validator: v => ['submit', 'button'].includes(v)
    }
  },
  computed: {
    hasIcon() {
      return Boolean(this.materialIcon || this.icon)
    },
    hasText() {
      return Boolean(this.text || this.$slots.default)
    },
    buttonClasses() {
      return {
        'button--primary': this.category === 'primary',
        'button--secondary': this.category === 'secondary',
        'button--tertiary': this.category === 'tertiary',
        'button--dark': this.category === 'dark',
        'button--danger': this.category === 'danger',
        'button--inline': this.inline,
        'button--reversed': this.reversed,
        'button--padded': this.hasText
      }
    },
    iconClasses() {
      return {
        'has-text': this.hasText,
        'button__icon--reversed': this.reversed,
        is_registering: this.loading
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/styles/components/button';
@import 'src/styles/components/linked_text';
</style>
