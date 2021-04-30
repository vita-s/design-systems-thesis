<template>
  <div class="filter-chip" :title="text">
    <Chip :category="category" :truncated="truncated">
      <span data-plankton-test="chip-text">{{ text }}</span>
      <button
        type="button"
        class="btn--close"
        data-plankton-test="chip-close-btn"
        @click="removeFilterChip"
      >
        <i class="material-icons">close</i>
      </button>
    </Chip>
  </div>
</template>

<script>
import Chip from '@/components/Chip.vue'

export default {
  components: { Chip },
  props: {
    text: { type: String, default: '' },
    category: {
      type: String,
      validator: t => ['primary', 'secondary', 'tertiary', 'red', 'green'].includes(t),
      default: 'secondary'
    },
    truncated: { type: Boolean, default: false }
  },
  methods: {
    removeFilterChip() {
      this.$emit('remove-filter-chip')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-chip {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1;
  position: relative;

  .chip {
    max-width: inherit;
  }

  &.multiselect__chip {
    padding: 0;
  }

  &:hover {
    color: $color-secondary-lighter;
  }

  .btn--close {
    border-style: unset;
    outline: none !important;
    width: 14px;
    height: 14px;
    line-height: 1;
    cursor: pointer;
    background-color: transparent;
    align-self: baseline;
    color: inherit;
    align-items: baseline;
    padding: 0;
    margin-left: 6px;

    &:focus {
      background-color: transparent;
    }
  }

  .material-icons {
    max-width: 16px;
    font-size: 14px;
    line-height: inherit;
  }
}
</style>
