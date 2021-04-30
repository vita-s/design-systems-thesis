// @ts-nocheck

import { ThisTypedMountOptions, VueClass, Wrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import { fakeAlertMixin, resolvePromises } from './test-utils'
import { sync } from 'vuex-router-sync'
import Vue, { Component } from 'vue/types/umd'

// We pass _mount and creteLocalVue from the client's vue-test-utils instance to avoid
// problems with the Vue instance in npm link mode
export function wrapFromClient(
  _mount: (
    component: VueClass<Vue>,
    options?: ThisTypedMountOptions<Vue>
  ) => Wrapper<Vue>,
  createLocalVue: () => typeof Vue,
  getI18n: (localisation?: string) => {},
  component: Component
) {
  const mixins: any[] = []
  const localVue = createLocalVue()
  const i18n = getI18n ? getI18n('en-GB') : {}

  localVue.use(Vuex)
  localVue.use(VueRouter)

  return {
    mount,
    withProps,
    withStore,
    withStoreConfiguration,
    withAlertModal,
    withListeners,
    withSlots,
    withPlugins,
    withFilters,
    withStubs,
    withRouter,
    withSyncRouter,
    withRoute,
    withMocks,
    attachTo,
    config
  }

  function withProps(props = {}) {
    this.props = props
    return this
  }

  function withStore(store = {}) {
    this.store = store
    return this
  }

  function withStoreConfiguration(configuration = {}) {
    this.storeConfiguration = configuration
    return this
  }

  function withAlertModal(alert: any) {
    mixins.push(fakeAlertMixin(alert))
    localVue.mixin(fakeAlertMixin(alert))
    return this
  }

  function withListeners(listeners) {
    this.listeners = listeners
    return this
  }

  function withSlots(slots) {
    this.slots = slots
    return this
  }

  function withPlugins(plugins = []) {
    plugins.forEach(localVue.use)
    return this
  }

  function withFilters(filters = []) {
    filters.forEach((filter: { name: '' }) => {
      localVue.filter(filter.name, filter)
    })
    return this
  }

  function withStubs(stubs) {
    this.stubs = stubs
    return this
  }

  function withRouter(router) {
    this.router = router
    return this
  }

  function withSyncRouter() {
    if (!this.router) this.router = new VueRouter()
    sync(this.store, this.router)
    return this
  }

  function withRoute<T extends { name: '' }>(route: T) {
    if (!this.store) throw new Error('store must me initialized before setting route')
    this.router = new VueRouter({ routes: [{ name: route.name, path: '' }] })
    this.store.state.route = route
    this.router.push(route)
    return this
  }

  function withMocks(mocks) {
    this.mocks = mocks
    return this
  }

  async function mount() {
    const wrapper = _mount(component, this.config())
    await resolvePromises()
    wrapper.commitStoreMutation = commitStoreMutation
    return wrapper
  }

  function commitStoreMutation(name: string, payload = {}) {
    this.vm.$store.commit(name, payload)
  }

  // When using this option is important to destroy the wrapper after the test
  // has finished in order to avoid memory leaks
  // (https://vue-test-utils.vuejs.org/api/options.html#attachtodocument)
  function attachTo() {
    const element = document.createElement('div')
    document.body.appendChild(element)
    this.attachTo = element
    return this
  }

  function config() {
    return {
      propsData: this.props || {},
      listeners: this.listeners || [],
      slots: this.slots || [],
      router: this.router || new VueRouter(),
      store: buildStore(this.store, this.storeConfiguration),
      stubs: this.stubs || [],
      mocks: this.mocks || [],
      localVue,
      i18n,
      mixins,
      ...(this.attachTo ? { attachTo: this.attachTo } : {})
    }
  }

  function buildStore(store: Store<unknown>, configuration = {}) {
    const myStore = store ? store : new Vuex.Store(configuration)
    if (!isAlreadyMocked(myStore.dispatch)) {
      myStore.dispatch = jest.fn(() => Promise.resolve({}))
    }
    return myStore
  }

  function isAlreadyMocked(dispatch: any) {
    return dispatch.mock && dispatch.mock.calls
  }
}
