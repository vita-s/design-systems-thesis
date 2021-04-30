<template>
  <b-modal
    ref="dialog"
    :visible="show"
    :static="inPlace"
    :lazy="lazy"
    :scrollable="scrollable"
    modal-class="dialog"
    no-close-on-backdrop
    :hide-header-close="hideCloseButton"
    @close.prevent="emitCloseEvent"
    @hide="handleHide"
    @hidden="$emit('hidden', $event)"
    @shown="handleShownEvent"
  >
    <template v-slot:modal-title>
      <slot name="modal-title">{{ title }}</slot>
    </template>

    <template v-slot:modal-header>
      <slot name="modal-header"></slot>
    </template>

    <div :key="dialogContentKey" data-plankton-test="dialog--content">
      <slot></slot>
    </div>
    <template v-slot:modal-footer>
      <slot name="footer">
        <div>
          <slot name="left-side-footer"></slot>
        </div>
        <div>
          <Button
            v-if="cancelButtonText"
            category="tertiary"
            :text="cancelButtonText"
            :disabled="disabled"
            data-plankton-test="dialog--cancel-button"
            @click="$emit('cancel')"
          />
          <Button
            v-if="confirmButtonText"
            category="primary"
            :text="confirmButtonText"
            :disabled="disabled || confirmButtonDisabled || loading"
            :loading="loading"
            data-plankton-test="dialog--confirm-button"
            @click="submit"
          />
        </div>
      </slot>
    </template>
  </b-modal>
</template>
<script>
import { BModal } from 'bootstrap-vue'
import Button from '@/components/Button/Button.vue'

export default {
  components: {
    'b-modal': BModal,
    Button
  },
  props: {
    show: { type: Boolean, default: true },
    title: { type: String, required: true },
    confirmButtonText: { type: String, default: null },
    cancelButtonText: { type: String, default: null },
    inPlace: { type: Boolean, default: false }, // see https://bootstrap-vue.js.org/docs/components/modal/#lazy-loading-and-static-modals
    lazy: { type: Boolean, default: false },
    scrollable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    confirmButtonDisabled: { type: Boolean, default: false },
    hideCloseButton: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  data() {
    return { dialogContentKey: 0 }
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue && !oldValue) this.resetDialogContent()

      if (newValue === true) {
        window.top.postMessage('dialog:open', '*')
      } else {
        window.top.postMessage('dialog:closed', '*')
      }
    }
  },
  methods: {
    resetDialogContent() {
      this.dialogContentKey += 1
    },
    handleHide($event) {
      if ($event.trigger === 'esc') {
        $event.preventDefault()
        this.emitCloseEvent()
      }
    },
    emitCloseEvent() {
      if (this.disabled) return
      this.$emit('close')
    },
    handleShownEvent() {
      const modalBody = this.$el.querySelector?.('.modal-body')
      if (modalBody) modalBody.scrollTo(0, 0)

      this.$emit('shown')
    },
    submit() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">
// Should be global because it redefines bootstrap-vue modal CSS

.modal-header,
.modal-footer,
.modal-body {
  padding: 1rem 1.4rem;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
  display: flex;
  justify-content: space-between;

  .button + .button {
    margin-left: 0.5rem;
  }
}

.modal-title {
  font-size: 1.1rem;
  font-weight: 600;
  padding-top: 0.3rem;
}

.modal-content {
  border-radius: 5px;
  border: none;
}

.modal-footer__inner {
  display: flex;
  align-content: center;
  justify-content: flex-end;
  width: 100%;
}

.modal__body--nopadding .modal-body {
  padding: 0;
}

.modal-xl {
  max-width: 1100px;
}
</style>
