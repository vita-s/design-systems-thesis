import ContextMenu from '@/components/ContextMenu.vue'
import ContextMenuItem from '@/components/ContextMenuItem.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Navigation/ContextMenu`,
  component: ContextMenu
}

export const Default = () => ({
  components: { ContextMenuItem },
  template: `
  <div>
    <ContextMenu placement="bottom-start">
      <i class="material-icons">more_horiz</i>
      <template v-slot:menu-items>
        <ContextMenuItem icon="comment" text="Add addition" @click="handleCommenClick" />
        <ContextMenuItem icon="delete" text="Delete stop" @click="handleRemoveClick" />
      </template>
    </ContextMenu>
  </div>`,
  methods: {
    handleCommenClick() {
      alert('you clicked "Add addition"')
    },
    handleRemoveClick() {
      alert('you clicked "delete stop"')
    }
  }
})
