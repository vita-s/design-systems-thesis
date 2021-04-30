# Tooltip & Popover

We are using the 3rd party library [`v-tooltip`](https://github.com/Akryum/v-tooltip) for tooltips, tweaked with our own styles. Additionally the library provides a popover component, that can also be used in the frontends if some context needs to be displayed.

> Note: The directives and component come with plankton and don't need to be added as dependency.

## Usage

### Tooltip

We can simply add the `v-tooltip` directive to any element:

```html
<button v-tooltip="'Tooltip text'">Content</a>
```

Instead of text an object with the text and additional options can be passed in (see [documentation](https://github.com/Akryum/v-tooltip#directive) for more details).

### Popover

For popovers we can use the `v-popover` component. In order for the component to work, it's child elements must use specific classes:

```html
<v-popover>
  <!-- popover target -->
  <button class="tooltip-target">Click me</button>

  <!-- content of the popover -->
  <template slot="popover">
    <button v-close-popover>Close</button>
    <h2 class="tooltip-header">Popover header</h2>
    <p>Some popover content</p>
  </template>
</v-popover>
```

The component can receive the same options than the directive as props (see [documentation](https://github.com/Akryum/v-tooltip#component) for more details).

### Requirements list popover

#### Props

| Name         | Type   | Default value | Example                                       |
| ------------ | ------ | ------------- | --------------------------------------------- |
| header       | string | ''            |                                               |
| requirements | object |               | `{ Requirement1: true, Requirement2: false }` |

For popovers with requirements lists (password verification etc.) we can use `RequirementsPopover` component which wraps `v-popover` component providing popover content according to requirements list object:

```html
<RequirementsPopover :requirements="requirementsList">
  <!-- popover target -->
  <button class="tooltip-target">Click me</button>
</RequirementsPopover>
```
