import ComponentWrapper from './ComponentWrapper'
import UploadedFileIconWrapper from './UploadedFileIconWrapper'
import ProgressBarWrapper from './ProgressBarWrapper'

export default class UploadedFileWrapper extends ComponentWrapper {
  get icon() {
    return new UploadedFileIconWrapper(this.findByDataPlanktonTest('icon'))
  }

  get progressBar() {
    return new ProgressBarWrapper(this.findByDataPlanktonTest('progress-bar'))
  }

  get uploadLink() {
    return this.findByDataPlanktonTest('uploaded-file-link')
  }

  async uploadLinkClick() {
    await this.uploadLink.trigger('click')
  }
}
