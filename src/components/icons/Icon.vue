<template>
  <i v-if="materialIcon" class="material-icons">{{ materialIcon }}</i>
  <component
    :is="iconComponent ? iconComponent.component : ''"
    v-else
    role="img"
    :class="iconComponent ? iconComponent.classes : null"
    class="icon-default"
  />
</template>

<script lang="ts">
interface Icon {
  component: () => {}
  classes?: String[]
}

const icons: { [key: string]: Icon } = {
  activity: { component: () => import('./iconset/Activity.vue') },
  close: { component: () => import('./iconset/Close.vue') },
  comments: {
    component: () => import('./iconset/Comments.vue'),
    classes: ['stroke-only']
  },
  downloadPdf: { component: () => import('./iconset/DownloadPdf.vue') },
  edit: { component: () => import('./iconset/Edit.vue') },
  fileClaim: { component: () => import('./iconset/FileClaims.vue') },
  clone: { component: () => import('./iconset/Clone.vue') },
  moreHorizontal: { component: () => import('./iconset/MoreHorizontal.vue') },
  euroSign: {
    component: () => import('./iconset/EuroSign.vue'),
    classes: ['stroke-only']
  },
  doc: { component: () => import('./iconset/Doc.vue') },
  factoringApproved: { component: () => import('./iconset/FactoringApproved.vue') },
  factoringDenied: { component: () => import('./iconset/FactoringDenied.vue') },
  factoringInProgress: { component: () => import('./iconset/FactoringInProgress.vue') },
  factoringRequest: { component: () => import('./iconset/FactoringRequest.vue') },
  factoringSubmitted: { component: () => import('./iconset/FactoringSubmitted.vue') },
  incident: { component: () => import('./iconset/Incident.vue') },
  people: { component: () => import('./iconset/People.vue'), classes: ['stroke-only'] },
  switch: {
    component: () => import('./iconset/SwitchIcon.vue'),
    classes: ['stroke-only']
  },
  fileText: {
    component: () => import('./iconset/FileText.vue'),
    classes: ['stroke-only']
  },
  xOctagon: {
    component: () => import('./iconset/XOctagon.vue'),
    classes: ['stroke-only']
  },
  raisedHand: {
    component: () => import('./iconset/RaisedHand.vue'),
    classes: ['stroke-only']
  }
}

export const availableIcons: Array<string> = Object.keys(icons)

export default {
  props: {
    name: {
      type: String,
      default: '',
      required: false,
      validator(value: string) {
        return value === '' ? true : availableIcons.includes(value)
      }
    },
    materialIcon: {
      type: String,
      default: '',
      required: false
    }
  },

  computed: {
    //@ts-ignore
    iconComponent() {
      //@ts-ignore
      return icons[this.name]
    }
  }
}
</script>

<style scoped lang="scss">
.icon-default {
  fill: currentColor;
  display: inline-block;
  width: 1em;
  height: 1em;
}

.stroke-only {
  fill: none;
  stroke: currentColor;
}
</style>
