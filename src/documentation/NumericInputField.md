# NumericInputField

## Props

| Name            | Type    | Default value | Example |
| --------------- | ------- | ------------- | ------- |
| disabled        | boolean | false         |         |
| dataTest        | string  |               |         |
| placeholder     | string  | ''            |         |
| materialIcon    | string  | ''            |         |
| textIcon        | string  |               |         |
| title           | string  |               |         |
| value           | object  | null          |         |
| inputValidators | array   | []            |         |
| allowNegative   | boolean | false         |         |
| allowDecimal    | boolean | true          |         |

## Implementation details

`NumericInputField` wraps [`InputField`](InputField.md) providing a **default mask**:

- `inputMask` is either `buildDecimalMask` or `buildIntegerMask` depending on the value of the parameter `allowDecumal`.

## Usage


#### Important notes

You must use `v-model` on the component. Otherwise default validation will fail.

Please refer to the usage section in the [InputField](InputField.md) notes.

## Known issues

- The property `value` does not define a type. We should change this to either define its type as `Number` or remove the property altogether and rely on using `v-model`. This change would affect clients already using this component or the [MoneyInputField](MoneyInputField.md) component, which wraps this.

- We would like to make the underlying `input` element of [`type` Number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) to benefit from browser support on different devices. However, this can modify decimal numbers to use a comma instead of a point, interfering with the decimal mask we are using at the moment. This might be more relevant as we move to support internationalization in our platforms.  

- For other issues that might be relevant to this component, please refer to the **known issues** section on [`InputField`](InputField.md) and on [`MoneyInputField`](MoneyInputField.md).

