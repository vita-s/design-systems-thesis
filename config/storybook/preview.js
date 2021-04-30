import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import plankton from '@/index'
import BootstrapVue from 'bootstrap-vue'
import '@/styles/storybook/_main.scss'
Vue.use(VueCompositionApi)
Vue.use(BootstrapVue)
plankton.install(Vue)
