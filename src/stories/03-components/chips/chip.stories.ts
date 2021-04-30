import Chip from '@/components/Chip.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Chips/Input and State Chips`,
  component: Chip
}

export const All = () => ({
  template: `
  <div>
    <Chip text="I am chip" category="primary" />
    <Chip text="I am chip" category="secondary" />
    <Chip text="I am chip" category="tertiary" />
    <Chip text="I am chip" category="green" />
    <Chip text="I am chip" category="red" />
    <Chip text="I'm more than 150px wide thats why I am truncated" category="primary" truncated />
  </div>`
})

export const Primary = () => ({
  template: `<Chip text="I am chip" category="primary" />`
})
export const Secondary = () => ({
  template: `<Chip text="I am chip" category="secondary" />`
})
export const Tertiary = () => ({
  template: `<Chip text="I am chip" category="tertiary" />`
})
export const Green = () => ({
  template: `<Chip text="I am chip" category="green" />`
})
export const Red = () => ({
  template: `<Chip text="I am chip" category="red" />`
})
export const Truncated = () => ({
  template: `<Chip text="I'm more than 150px wide thats why I am truncated" category="primary" truncated />`
})
