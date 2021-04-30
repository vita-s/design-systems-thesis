# Sennder UI library

## Package installation

```
npm i @sennder/plankton
```

## Project setup

```
npm install --legacy-peer-deps
```

We need `--legacy-peer-deps` as a temporary solution because `storybook` dependency doesn't fully support npm v7 (see [https://github.com/storybookjs/storybook/issues/14119](storybookjs#14119) for more information).

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies and generates an npm bundle for production (to be used by octopus, orcas, go, etc)

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Check types

```
npm run check:types
```

## Storybook:

### Locally serve storybook

```
npm run storybook:serve
```