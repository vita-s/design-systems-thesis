import Dialog from '@/components/dialog/Dialog.vue'
import { action } from '@storybook/addon-actions'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Modals/Dialog`,
  component: Dialog
}

export const ConfirmationDialog = () => ({
  components: { Dialog },
  template: `
    <div>
      <Dialog
        title="Cancel assignment"
        confirmButtonText="cancel assignment"
        cancelButtonText="close"
        @close="handleClose"
        @confirm="handleConfirmation"
        @cancel="handleCancel"
        @shown="handleWasShown"
      >
        <span>
          If you cancel the assignment the carrier will be informed and perceives the order as cancelled.
          If you cancel the assignment...
        </span>
      </Dialog>
    </div>`,
  methods: {
    handleClose: action('close event emitted'),
    handleConfirmation: action('confirmation event emitted'),
    handleCancel: action('cancel event emitted'),
    handleWasShown: action('shown event emitted')
  }
})
export const AcknowledgementDialog = () => ({
  components: { Dialog },
  template: `
    <div>
      <Dialog title="Assignment cancelled" confirmButtonText="ok">
        <span>
          If you cancel the assignment the carrier will be informed and perceives the order as cancelled.
          If you cancel the assignment...
        </span>
      </Dialog>
    </div>`
})

export const CustomTitle = () => ({
  components: { Dialog },
  template: `
    <div>
      <Dialog confirmButtonText="ok">
        <template v-slot:modal-title>
          <h4>Custom title 🎉</h4>
        </template>
        <p>You can override the modal/dialog title via the named slot <code>modal-title</code></p>
      </Dialog>
    </div>`
})

export const CustomHeader = () => ({
  components: { Dialog },
  template: `
    <div>
      <Dialog confirmButtonText="ok">
        <template v-slot:modal-header>
          <header>
            <h4>Custom header 🎉</h4>
          </header>
        </template>
        <p>This modal/dialog uses a <code>modal-header</code> slot.</p>
        <p>
          If you use the <code>modal-header</code> slot, 
          the default header X close button will not be present, nor can you use the <code>modal-title</code> slot.
        </p>
      </Dialog>
    </div>`
})

export const SideFooterContent = () => ({
  components: { Dialog },
  template: `
    <div>
      <Dialog title="Assignment cancelled" confirmButtonText="ok">
        <span>
          If you cancel the assignment the carrier will be informed and perceives the order as cancelled.
          If you cancel the assignment...
        </span>
        <template v-slot:left-side-footer>
          <img src="images/truck.png" alt="Truck visualization"/>
        </template>
      </Dialog>
    </div>`
})
