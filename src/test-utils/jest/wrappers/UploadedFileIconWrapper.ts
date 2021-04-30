import ComponentWrapper from './ComponentWrapper'

export default class UploadedFileIconWrapper extends ComponentWrapper {
  get icon() {
    return this.root.find('svg')
  }

  get defaultIcon() {
    return this.findByDataPlanktonTest('upload-file-icon--default-icon')
  }
}
