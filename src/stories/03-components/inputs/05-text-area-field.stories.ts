import TextAreaField from '@/components/input-fields/TextAreaField.vue'
import LimitedTextAreaField from '@/components/input-fields/LimitedTextAreaField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Inputs/TextArea`,
  component: TextAreaField
}

export const WithTitle = () => ({
  template: `<TextAreaField title="Message" value="greetings ...." />`
})

export const Disabled = () => ({
  template: `<TextAreaField title="Message" value="greetings ..." disabled />`
})

export const WithValidations = () => ({
  template: `<TextAreaField
    title="Message"
    v-model="value"
    placeholder="write something"
    :validators="validators" />
  `,
  data() {
    return {
      value: '',
      validators: [
        {
          isInvalid: (value: string) => value.length < 20,
          errorMessage: 'Message must has at least 20 characters'
        }
      ]
    }
  }
})

export const WithHardLimitedText = () => ({
  template: `<TextAreaField title="Notes" maxlength="50" v-model="value"/>`,
  data() {
    return { value: '' }
  }
})

export const WithSoftLimitedText = () => ({
  components: { LimitedTextAreaField },
  template: `<LimitedTextAreaField title="Notes" :maxLength="50" v-model="value"/>`,
  data() {
    return { value: '' }
  }
})

export const WithSoftLimitedTextMinLength = () => ({
  components: { LimitedTextAreaField },
  template: `<LimitedTextAreaField title="Notes" :maxLength="60" :minLength="5" v-model="value"/>`,
  data() {
    return { value: '' }
  }
})
