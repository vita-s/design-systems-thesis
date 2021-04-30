import LinkedText from '@/components/LinkedText/LinkedText.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Buttons/Links`,
  component: LinkedText
}

export const Default = () => ({
  template: `<div>
        <LinkedText href="#">Resting state</LinkedText><br>
        <LinkedText href="#" materialIcon="favorite">Resting state</LinkedText><br>
        <LinkedText href="#" disabled materialIcon="cloud">Disabled link</LinkedText><br>
    </div>`
})

export const LinksAsButton = () => ({
  template: `<div>
        <h3>Primary</h3>
        <LinkedText href="#" role="button" category="primary">Link</LinkedText>
        <LinkedText href="#" role="button" category="primary" materialIcon="local_shipping">Link</LinkedText>
        <LinkedText href="#" role="button" category="primary" disabled>Disabled link</LinkedText>
        <br>
        <br>
        <h3>Secondary Buttons</h3>
        <LinkedText href="#" role="button" category="secondary">Link</LinkedText>
        <LinkedText href="#" role="button" category="secondary" materialIcon="local_shipping">Link</LinkedText>
        <LinkedText href="#" role="button" category="secondary" disabled>Disabled link</LinkedText>
        <br>
        <br>
        <h3>Tertiary Buttons</h3>
        <LinkedText href="#" role="button" category="tertiary">Link</LinkedText>
        <LinkedText href="#" role="button" category="tertiary" materialIcon="local_shipping">Link</LinkedText>
        <LinkedText href="#" role="button" category="tertiary" disabled>Disabled link</LinkedText>
        <br>
        <br>
        <h3>Dark Buttons</h3>
        <LinkedText href="#" role="button" category="dark">Link</LinkedText>
        <LinkedText href="#" role="button" category="dark" materialIcon="local_shipping">Link</LinkedText>
        <LinkedText href="#" role="button" category="dark" disabled>Disabled link</LinkedText>
    </div>`
})
