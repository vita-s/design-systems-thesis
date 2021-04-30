import Button from '@/components/Button/Button.vue'
import ButtonGroup from '@/components/ButtonGroup.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Buttons/Group`,
  component: ButtonGroup
}

export const Default = () => ({
  components: { Button },
  template: `<div>
                <ButtonGroup>
                    <Button category="primary">Some</Button>
                    <Button category="primary">Button</Button>
                    <Button category="primary">Group</Button>
                </ButtonGroup>
                <br>
                <ButtonGroup>
                    <Button category="secondary">Some</Button>
                    <Button category="secondary">Button</Button>
                    <Button category="secondary" disabled>Group</Button>
                </ButtonGroup>
                <br>
                <ButtonGroup>
                    <Button category="tertiary">Some</Button>
                    <Button category="tertiary">Button</Button>
                    <Button category="tertiary">Group</Button>
                </ButtonGroup>
                <br>
                <ButtonGroup>
                    <Button category="secondary" materialIcon="keyboard_arrow_left"></Button>
                    <Button category="secondary" materialIcon="keyboard_arrow_right"></Button>
                </ButtonGroup>
            </div>`
})
