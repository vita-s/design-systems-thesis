import { ref, onMounted, onUnmounted, watch, Ref } from '@vue/composition-api'

export default (
  parentContainer: Ref<HTMLElement>,
  selector: string,
  propToWatch: Ref<string>
) => {
  const isOverflowing = ref(false)

  function isOverflown(element: HTMLElement) {
    return element.scrollWidth > element.clientWidth
  }

  const computeOverflow = () => {
    const queryElement = parentContainer.value.querySelector(selector)
    if (queryElement) {
      isOverflowing.value = isOverflown(queryElement as HTMLElement)
    } else return false
  }

  watch(propToWatch, () => {
    computeOverflow()
  })

  onMounted(() => {
    window.addEventListener('resize', computeOverflow, false)
    computeOverflow()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', computeOverflow, false)
  })

  return { isOverflowing }
}
