import Form from '@/components/Form.vue'
import Button from '@/components/Button/Button.vue'
import InputField from '@/components/input-fields/InputField.vue'
import DropdownField from '@/components/input-fields/dropdown-field/DropdownField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Helpers/Form`,
  component: Form
}

export const ValidateWhenSubmit = () => ({
  components: { DropdownField, Button },
  template: `
    <Form @validated-submit="handleSubmitEvent">
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value1"
        title="this is required"
        :validators="[requiredValidator]"
        name="required-field"
      />
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value2"
        title="only even number"
        :validators="[evenNumberValidator]"
        name="even-field"
      />
      <DropdownField
        :options="[1, 2, 3, 4]"
        v-model="value3"
        title="only odd number"
        :validators="[oddNumberValidator]"
        name="odd-field"
      />
      <Button type="submit" category="primary" text="submit"/>
    </Form>`,
  data() {
    return {
      value1: null,
      value2: 2,
      value3: 3,
      requiredValidator: {
        errorMessage: 'required',
        isInvalid: (value: any) => !value
      },
      evenNumberValidator: {
        errorMessage: 'error',
        isInvalid: (value: number) => value % 2 === 1
      },
      oddNumberValidator: {
        errorMessage: 'error',
        isInvalid: (value: number) => value % 2 === 0
      }
    }
  },
  methods: {
    handleSubmitEvent($event: any) {
      if ($event.hasErrors) alert('form with errors :(')
      else alert('form valid :D')
    }
  }
})
export const InlineAndGeneralErrors = () => ({
  components: { Button, InputField },
  template: `
    <Form @validated-submit="handleSubmitEvent">
      <InputField
        v-model="value"
        title="I am a required field"
        :inputValidators="validators"
        placeholder="leave me empty!"
      />
      <Button type="submit" category="primary" text="submit"/>
    </Form>
  `,
  data() {
    return {
      value: '',
      validators: [
        {
          isInvalid: (value: string) => !value,
          errorMessage: 'Im an inline error'
        },
        {
          isInvalid: (value: string) => !value,
          errorMessage: 'Im a general error',
          inline: false
        }
      ]
    }
  },
  methods: {
    handleSubmitEvent() {}
  }
})
