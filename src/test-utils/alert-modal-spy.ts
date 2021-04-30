export default function buildAlertModalSpy() {
  return {
    showSuccessMessage: jest.fn(() => Promise.resolve({ value: 'ok' })),
    showWarningMessage: jest.fn(() => Promise.resolve({ value: 'ok' })),
    showError: jest.fn(),
    showErrorMessage: jest.fn(),
    showAlertForOrderErrorResponse: jest.fn()
  }
}
