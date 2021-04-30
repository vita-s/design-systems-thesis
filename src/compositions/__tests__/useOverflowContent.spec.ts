import shallowMountComposition from '../shallowMountComposition'
import useOverflowContent from '../useOverflowContent'
import { Wrapper } from '@vue/test-utils'
import { ref } from '@vue/composition-api'
import { VueRelaxed } from '@/test-utils/jest/wrappers/VueRelaxed'

const addEventListenerMock = jest.fn()
const removeEventListenerMock = jest.fn()

describe('useOverflowContent composition', () => {
  let component: Wrapper<VueRelaxed>

  const originalAddEventListener = window.addEventListener
  const originalRemoveEventListener = window.removeEventListener
  window.addEventListener = addEventListenerMock
  window.removeEventListener = removeEventListenerMock

  const mockedParentDom = document.createElement('div')
  mockedParentDom.innerHTML = '<div><input></input></div>'

  beforeEach(async () => {
    addEventListenerMock.mockClear()
    removeEventListenerMock.mockClear()
  })

  afterEach(() => {
    component.destroy()
  })

  afterAll(() => {
    document.addEventListener = originalAddEventListener
    document.removeEventListener = originalRemoveEventListener
  })

  it('isOverflowing is true when child is wider', async () => {
    mockedParentDom.querySelector = jest.fn(() => {
      return { scrollWidth: 20, clientWidth: 10 }
    })
    component = await shallowMountComposition(() => {
      const { isOverflowing } = useOverflowContent(
        ref(mockedParentDom),
        'input',
        ref('mocked')
      )
      return { isOverflowing }
    })
    expect(component.vm.isOverflowing).toBe(true)
  })

  it('isOverflowing is false when child is smaller', async () => {
    mockedParentDom.querySelector = jest.fn(() => {
      return { scrollWidth: 10, clientWidth: 20 }
    })
    component = await shallowMountComposition(() => {
      const { isOverflowing } = useOverflowContent(
        ref(mockedParentDom),
        'input',
        ref('mocked')
      )
      return { isOverflowing }
    })
    expect(component.vm.isOverflowing).toBe(false)
  })

  it('adds resize event on mounted', async () => {
    component = await shallowMountComposition(() => {
      const { isOverflowing } = useOverflowContent(
        ref(mockedParentDom),
        'input',
        ref('mocked')
      )
      return { isOverflowing }
    })
    component.destroy()
    expect(addEventListenerMock).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      false
    )
  })

  it('removes resize event on unmounted', async () => {
    component = await shallowMountComposition(() => {
      const { isOverflowing } = useOverflowContent(
        ref(mockedParentDom),
        'input',
        ref('mocked')
      )
      return { isOverflowing }
    })
    component.destroy()
    expect(removeEventListenerMock).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      false
    )
  })
})
