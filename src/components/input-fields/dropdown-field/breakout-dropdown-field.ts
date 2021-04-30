import Vue from 'vue'

// Approach adapted from a Github discussion in the vue-multiselect project: //
// https://github.com/shentao/vue-multiselect/issues/618 /** * Mixin to go along with
// vue-multiselect to allow the dropdown content to break out of the stacking context of its parent.
/** More context around the problem:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 * https://www.freecodecamp.org/news/4-reasons-your-z-index-isnt-working-and-how-to-fix-it-coder-coder-6bc05f103e6c/
 */
export const breakoutDropdownFieldMixin = Vue.extend({
  data() {
    return {
      dropdownRefHelpers: {} as {
        [dropdownRefName: string]: {
          breakoutParentElement: HTMLElement | null
          repositionDropDown: () => void
        }
      }
    }
  },
  methods: {
    addDropdownBreakoutHelper(dropdownRefName: string) {
      this.dropdownRefHelpers[dropdownRefName].breakoutParentElement?.addEventListener(
        'scroll',
        this.dropdownRefHelpers[dropdownRefName].repositionDropDown,
        {
          passive: true
        }
      )
    },
    removeDropdownBreakoutHelper(dropdownRefName: string) {
      this.dropdownRefHelpers[dropdownRefName].breakoutParentElement?.removeEventListener(
        'scroll',
        this.dropdownRefHelpers[dropdownRefName].repositionDropDown
      )
      delete this.dropdownRefHelpers[dropdownRefName]
    },
    initDropdownBreakoutHelper(dropdownRefName: string, breakoutParentSelector?: string) {
      this.dropdownRefHelpers[dropdownRefName] = {
        repositionDropDown: this.repositionDropDown(dropdownRefName),
        breakoutParentElement: breakoutParentSelector
          ? this.$el.closest(breakoutParentSelector)
          : (this.$el as HTMLElement)
      }
      this.dropdownRefHelpers[dropdownRefName].repositionDropDown()
      this.addDropdownBreakoutHelper(dropdownRefName)
    },
    repositionDropDown(dropdownRefName: string) {
      return () => {
        const { top, left, height } = (this.$refs[
          dropdownRefName
        ] as Vue).$el.getBoundingClientRect()
        const multiSelectRef = (this.$refs[dropdownRefName] as Vue).$refs[
          'dropdown-search-select'
        ] as Vue
        const dropdownList = multiSelectRef.$refs.list as HTMLElement
        dropdownList.style.minWidth = getComputedStyle(multiSelectRef.$el).width
        dropdownList.style.maxWidth = `calc(${
          getComputedStyle(this.$el as Element).width
        } - ${left}px)`
        dropdownList.style.position = 'fixed'
        dropdownList.style.bottom = 'auto'
        dropdownList.style.top = `${top + height}px`
      }
    }
  }
})
