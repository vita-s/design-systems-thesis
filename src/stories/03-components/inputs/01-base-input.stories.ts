import InputField from '@/components/input-fields/InputField.vue'
import LimitedInputField from '@/components/input-fields/LimitedInputField.vue'
import Form from '@/components/Form.vue'
import Button from '@/components/Button/Button.vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs'
import sections from '../../story-sections'
import Vue from 'vue'

export default {
  title: `${sections.components}/Inputs/InputField`,
  decorators: [withKnobs],
  component: InputField
}

export const Default = () => ({
  template: `<InputField/>`
})

export const WithWithoutTitle = () => ({
  props: {
    title: {
      default: text('Title', 'Making logistics sexy again')
    },
    noLabel: {
      default: boolean('No Label', false)
    }
  },
  template: `<InputField :title="title" :noLabel="noLabel"/>`
})

export const WithPlaceholder = () => ({
  template: `<InputField placeholder="In a village of La Mancha..."/>`
})

export const WithAnyMaterialDesignIcon = () => ({
  template: `<InputField materialIcon='favorite'/>`
})

export const WithClickHandlerOnIcon = () => ({
  template: `<InputField materialIcon='favorite' @click-on-icon="handleClickOnIcon" />`,
  methods: {
    handleClickOnIcon() {
      alert('you clicked icon')
    }
  }
})

export const WithTextAsIcon = () => ({
  props: {
    bgColor: {
      default: color('Background color', '#ffffff')
    }
  },
  template: `<div :style="{ background: bgColor, padding: '10px' }">
        <InputField textIcon="Mr"/>
        <InputField textIcon="Ms"/>
        <InputField textIcon=";)"/>
        <InputField textIcon="ok"/>
        </div>`
})

export const DisabledWithDefaultValue = () => ({
  template: `<InputField :disabled="true" value="This field is disabled on purpose"/>`
})

export const WithCustomValidation = () =>
  Vue.extend({
    data() {
      return {
        value: '',
        inputValidators: [
          {
            errorMessage: 'You should say hi!',
            isInvalid: (input: string) => input && !input.toLowerCase().includes('hi')
          }
        ]
      }
    },
    methods: {
      someMethod(input: string) {
        return action(`V-modeled: ${this.value}. Input`)(input)
      }
    },
    template: `<InputField title="Hi there!" v-model="value" :inputValidators="inputValidators" @input="someMethod"/>`
  })

export const WithMultipleValidations = () => ({
  template: `<InputField title="Hi there!" v-model="value" :inputValidators="inputValidators" />`,
  data() {
    return {
      value: '',
      inputValidators: [
        {
          errorMessage: 'You should say hi!',
          isInvalid: (input: string) => input && !input.toLowerCase().includes('hi')
        },
        {
          errorMessage: 'You must greet me by my name',
          isInvalid: (input: string) => input && !input.toLowerCase().includes('plankton')
        }
      ]
    }
  }
})

export const WithinAForm = () => ({
  components: { Form, Button },
  template: `
     <Form ref="form">
       <InputField
           v-model="value"
           title="I am a required field"
           :inputValidators="validators"
       />

       <Button @click="$refs.form.submit()">Validate input</Button>
     </Form>
  `,
  data() {
    return {
      value: '',
      validators: [
        {
          isInvalid: (value: string) => !value,
          errorMessage: 'I told you I was required'
        }
      ]
    }
  }
})

export const WithLegend = () => ({
  template: `<InputField title="Making logistics sexy again" legend="hello world" />`
})

export const WithHardLimitedLength = () => ({
  template: `<InputField title="Notes" maxlength="50" v-model="value" fullWidth />`,
  data() {
    return { value: '' }
  }
})

export const WithSoftLimitedLength = () => ({
  components: { LimitedInputField },
  template: `<LimitedInputField title="Notes" :maxLength="50" v-model="value" fullWidth />`,
  data() {
    return { value: '' }
  }
})

export const WithSoftLimitedLengthMinChars = () => ({
  components: { LimitedInputField },
  template: `<LimitedInputField title="Notes" :maxLength="60" :minLength="5" v-model="value" fullWidth />`,
  data() {
    return { value: '' }
  }
})

export const WithOverflowText = () => ({
  template: `<div>
  <InputField disabled value="This content is overflowing the container i want a tooltip to show all the content please"/>
  <InputField disabled value="This content is not overflowing"/>
  </div>`
})

export const SuccessInput = () => ({
  template: `
    <div>
      <InputField success title="Success Default" />
      <InputField success title="Text Icon" textIcon="ok"/>
      <InputField success title="Using Material Icon" materialIcon='favorite'/>
    </div>
  `
})

export const ErrorInput = () => ({
  template: `
    <div>
      <InputField error title="Success Default" />
      <InputField error title="Text Icon" textIcon="ok"/>
      <InputField error title="Using Material Icon" materialIcon='favorite'/>
    </div>
  `
})

export const WithAccessibilityStandards = () => ({
  template: `<InputField
    accessibilityStandards=true
    title="Smyrna"
    legend="Naples"
    v-model="value"
    :inputValidators="inputValidators"
  />`,
  data() {
    return {
      value: 'Trieste',
      inputValidators: [
        {
          errorMessage: 'Pharaon',
          isInvalid: (input: string) => input && !input.toLowerCase().includes('Pharaon')
        }
      ]
    }
  }
})
