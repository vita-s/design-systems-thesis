<template>
  <v-popover v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template slot="popover">
      <h2
        v-if="header"
        class="tooltip-header"
        data-plankton-test="popover-requirements-header"
      >
        {{ header }}
      </h2>
      <ul class="requirements" data-plankton-test="popover-requirements-list">
        <li
          v-for="(value, name) of requirements"
          :key="name"
          class="requirement"
          :class="{
            'requirement--fullfiled': value
          }"
          data-plankton-test="popover-requirement"
        >
          <div class="requirement__checkmark">
            <i class="material-icons">
              check
            </i>
          </div>
          {{ name }}
        </li>
      </ul>
    </template>
  </v-popover>
</template>
<script>
import { VPopover } from 'v-tooltip'

export default {
  components: { VPopover },
  props: {
    header: {
      type: String,
      default: ''
    },
    requirements: {
      type: Object,
      required: true,
      validator: requirements =>
        Object.values(requirements).every(value => typeof value === 'boolean')
    }
  },
  computed: {
    dataTest() {
      return this.$attrs.dataTest
    },
    attrs() {
      const attrs = { ...this.$attrs }
      delete attrs.dataTest
      return attrs
    }
  }
}
</script>

<style lang="scss" scoped>
.requirements {
  list-style: none;
  margin: 0;
  padding: 0;
}

.requirement {
  margin-bottom: 3px;
  display: flex;

  &__checkmark {
    height: 13px;
    width: 13px;
    margin-right: 6px;
    background-color: rgba(255, 255, 255, 0.21);
    border-radius: 50%;
    border: none;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 10px;
      font-weight: bold;
      color: $color-neutral-darkest;
    }
  }

  &--fullfiled .requirement__checkmark {
    background-color: $color-success-main;

    i {
      color: $color-layout-white;
    }
  }
}
</style>
