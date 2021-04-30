import Vue from 'vue'

/**
 * There's currently no way to type wrapper.vm
 * so types need to be weakened here to make
 * wrapper.vm.someValue be a valid typescript code,
 * see https://github.com/vuejs/vue-test-utils/issues/255
 */

export type VueRelaxed = Vue & { [key: string]: any }
