// @ts-ignore Ignore import type checking because is not javascript
import { colorPrimaryMain, colorLayoutDivider } from '@/styles/helpers/js-variables.scss'
import _isEmpty from 'lodash/isEmpty'
import Swal, { SweetAlertOptions } from 'sweetalert2'

interface CustomConfigCallback {
  (): Partial<SweetAlertOptions>
}

export const AlertModal = (swal: typeof Swal) => {
  return { showErrorMessage, showSuccessMessage, showWarningMessage }

  function postModalOpenMessage() {
    window.top.postMessage('dialog:open', '*')
  }

  function postModalClosedMessage() {
    window.top.postMessage('dialog:closed', '*')
  }

  function showErrorMessage(
    title = '',
    text = '',
    onApplyCustomConfig: CustomConfigCallback = () => ({})
  ) {
    if (!_isEmpty(onApplyCustomConfig())) {
      return swal.fire({
        html: text,
        title,
        didOpen: postModalOpenMessage,
        willClose: postModalClosedMessage,
        ...onApplyCustomConfig()
      })
      return
    }
    return swal.fire({
      title,
      html: text,
      icon: 'error',
      confirmButtonColor: colorPrimaryMain,
      willClose: postModalClosedMessage
    })
  }

  function showSuccessMessage(
    title: string,
    text: string,
    onApplyCustomConfig: CustomConfigCallback = () => ({})
  ) {
    return swal.fire({
      title,
      html: text,
      icon: 'success',
      confirmButtonColor: colorPrimaryMain,
      didOpen: postModalOpenMessage,
      willClose: postModalClosedMessage,
      ...onApplyCustomConfig()
    })
  }

  function showWarningMessage(
    title: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText = 'Cancel',
    showCancelButton = false,
    onApplyCustomConfig: CustomConfigCallback = () => ({})
  ) {
    return swal.fire({
      title,
      html: text,
      icon: 'warning',
      showCancelButton: showCancelButton,
      cancelButtonColor: colorLayoutDivider,
      confirmButtonColor: colorPrimaryMain,
      confirmButtonText,
      cancelButtonText,
      didOpen: postModalOpenMessage,
      willClose: postModalClosedMessage,
      ...onApplyCustomConfig()
    })
  }
}

export const alertModalMixin = {
  created() {
    // @ts-ignore
    this.alertModal = AlertModal(this.$swal)
  }
}

export default AlertModal
