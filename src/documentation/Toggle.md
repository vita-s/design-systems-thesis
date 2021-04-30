# ToggleInput

## Implementation details
`ToggleInput` wraps [`vue-js-toggle-button`](https://www.npmjs.com/package/vue-js-toggle-button).

## Known issues

- Styles for `disabled` state do not match design specifications. 
To customize this we will probably need to set `vue-js-toggle-button`'s `css-colors` to true 
to deactivates the setting of colors through inline styles, and apply CSS to all states.