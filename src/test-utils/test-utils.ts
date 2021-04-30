import MockAdapter from 'axios-mock-adapter'
import { AxiosInstance } from 'axios'

export const resolvePromises = () => new Promise(resolve => setImmediate(resolve))

export const fakeAlertMixin = (mock: unknown) => ({
  alertModal: null,
  created: function () {
    // @ts-ignore
    this.alertModal = mock
  }
})

export const createNetworkMock = (axios: AxiosInstance) => new MockAdapter(axios)
