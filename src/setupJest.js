require('jest-extended')
import { setBerlinAsDefaultTimeZone } from '@/utilities/date-formatting'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import MutationObserver from 'mutation-observer'
import '@testing-library/jest-dom'

Vue.use(VueCompositionApi)
Object.defineProperty(window, 'MutationObserver', { value: MutationObserver })

// Set default timezone to make tests independent of running machine's timezone
setBerlinAsDefaultTimeZone()

global.IS_PLANKTON_REPO = true
