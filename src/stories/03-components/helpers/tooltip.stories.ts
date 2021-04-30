import RequirementsPopover from '@/components/RequirementsPopover.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Helpers/Tooltips & Popover`,
  component: RequirementsPopover
}

const defaultPopoverContent = `<!-- popover target -->
                               <Button class="tooltip-target">Click me</Button>

                               <!-- content of the popover -->
                               <template slot="popover">
                                  <h2 class="tooltip-header">Popover header</h2>
                                  <p style="margin: 0">Some popover content</p>
                               </template>`

export const TooltipDirective = () => ({
  template: `<div style="margin-left: 50px">
              <div style="margin-top: 50px"><Button v-tooltip="'Tooltip'">Hover me</Button></div>
              <div style="margin-top: 10px"><Button v-tooltip.bottom="'Tooltip'">Hover me</Button></div>
              <div style="margin-top: 10px"><Button v-tooltip.right="'Tooltip'">Hover me</Button></div>
              <div style="margin-top: 10px"><Button v-tooltip.left="'Tooltip'">Hover me</Button></div>
            </div>`
})

export const PopoverComponent = () => ({
  template: `<div style="margin-left: 150px">
                <div><v-popover>${defaultPopoverContent}</v-popover></div>
                <div style="margin-top: 10px"><v-popover placement="top">${defaultPopoverContent}</v-popover></div>
                <div style="margin-top: 10px"><v-popover placement="right">${defaultPopoverContent}</v-popover></div>
                <div style="margin-top: 10px"><v-popover placement="left">${defaultPopoverContent}</v-popover></div>
              </div>`
})

export const PopoverWithClose = () => ({
  template: `<v-popover>
                <!-- popover target -->
                <Button class="tooltip-target">Click me</Button>

                <!-- content of the popover -->
                <template slot="popover">
                  <LinkedText v-close-popover>Close</LinkedText>
                  <h2 class="tooltip-header">Popover header</h2>
                  <p style="margin: 0">Some popover content</p>
                </template>
              </v-popover>`
})

export const RequirementsListPopover = () => ({
  template: `<RequirementsPopover header="Requirements" :requirements="{'Requirement 1': true, 'Requirement 2': false}">
            <!-- popover target -->
            <Button class="tooltip-target">Click me</Button>
          </RequirementsPopover>`
})
