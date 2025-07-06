# Vue Tiny Router Documentation

This directory contains the VitePress documentation for Vue Tiny Router.

## Structure

```
docs/
├── .vitepress/          # VitePress configuration
│   └── config.js        # Main configuration file
├── guide/               # User guide documentation
│   ├── getting-started.md
│   ├── route-parameters.md
│   └── ...
├── api/                 # API reference documentation
│   ├── router.md
│   └── ...
├── examples/            # Code examples and tutorials
│   ├── basic.md
│   └── ...
├── migration/           # Migration guides
│   └── from-vue-router.md
├── index.md             # Homepage
└── package.json         # Dependencies for docs
```

## Development

1. **Install dependencies:**
   ```bash
   cd docs
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run docs:dev
   ```

3. **Build for production:**
   ```bash
   npm run docs:build
   ```

4. **Preview production build:**
   ```bash
   npm run docs:preview
   ```

## Writing Documentation

### Adding New Pages

1. Create a new markdown file in the appropriate directory
2. Add the page to the sidebar configuration in `.vitepress/config.js`
3. Use the VitePress markdown extensions for better formatting

### Markdown Features

VitePress supports enhanced markdown features:

```markdown
::: tip
This is a tip box
:::

::: warning
This is a warning box
:::

::: danger
This is a danger box
:::

::: code-group
```js [config.js]
export default {
  // config
}
```

```ts [config.ts]
export default {
  // config
}
```
:::
```

### Code Examples

Use syntax highlighting and specify the language:

```javascript
// JavaScript example
import { TinyRouter } from 'vue-tiny-router'
```

```vue
<!-- Vue component example -->
<template>
  <TinyRouter :routes="routes" />
</template>
```

## Deployment

The documentation can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Surge.sh

Build the docs and deploy the `dist` directory:

```bash
npm run docs:build
# Deploy the .vitepress/dist directory
``` 