// @ts-ignore
import Icon, { availableIcons } from '@/components/icons/Icon.vue'
import sections from '@/stories/story-sections'

export default {
  title: `${sections.icons}/Icons`,
  component: Icon
}

export const All = () => ({
  template: `
    <div>
      <table style="width: 100%">
        <thead>
          <tr>
            <th style="border:1px solid #a6a6a6; padding: 5px">Name</th>
            <th style="border:1px solid #a6a6a6; padding: 5px">Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="icon of availableIcons">
            <td style="border:1px solid #a6a6a6; padding: 5px;">{{ icon }}</td>
            <td style="border:1px solid #a6a6a6; padding: 5px; color: #888888;"><Icon :name="icon" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  data: () => ({
    availableIcons: availableIcons
  })
})

export const SingleIcon = () => ({
  template: `<Icon name="edit" />`
})

export const MaterialIcon = () => ({
  template: `<Icon materialIcon="comment" />`
})

export const ButtonWithIcon = () => ({
  template: `<div>
  <Button text="Download" icon="downloadPdf"/>
  <Button category="tertiary" icon="edit" />
</div>`
})
