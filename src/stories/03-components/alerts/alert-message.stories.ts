import AlertMessage from '@/components/AlertMessage.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Alert Message`,
  component: AlertMessage
}

export const Success = () => ({
  template: `<AlertMessage type="success">
  The payment process has been started on <strong>06.06.2019</strong>.
  The carrier will receive the payment in <strong>6 business days.</strong>
</AlertMessage>`
})
export const Error = () => ({
  template: `<AlertMessage type="error">
  The payment can not be made because the billing details are missing.
</AlertMessage>`
})
export const Warning = () => ({
  template: `<AlertMessage type="warning">
  This order <strong>has been assigned to a carrier.</strong>
  You can still submit offers in case this carrier rejects it.
</AlertMessage>`
})
export const Info = () => ({
  template: `<AlertMessage type="info">
  There are <strong>new features available</strong>, check them out, like right now!
</AlertMessage>`
})
