import FilterChip from '@/components/FilterChip.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Chips/FilterChip`,
  component: FilterChip
}

export const All = () => ({
  template: `<div>
  <FilterChip text="I am filter chip" />
  <FilterChip text="I'm more than 150px wide thats why I am truncated" truncated />
  </div`
})
export const Default = () => ({
  template: `<FilterChip text="I am filter chip" />`
})
export const Truncated = () => ({
  template: `<FilterChip text="I'm more than 150px wide thats why I am truncated" truncated />`
})
