# Testing

vue-tiny-router's `memoryMode` makes it straightforward to test components that depend on routing.

## Setup with Vitest + Vue Test Utils

```js
import { mount } from '@vue/test-utils'
import { TinyRouter } from 'vue-tiny-router'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

test('renders the initial route', async () => {
  const wrapper = mount(TinyRouter, {
    props: {
      routes,
      memoryMode: true  // No history API interaction
    }
  })

  expect(wrapper.text()).toContain('Home')
})
```

## Testing Navigation

```js
import { useRouter } from 'vue-tiny-router'

test('navigates to another route', async () => {
  const wrapper = mount(TinyRouter, {
    props: { routes, memoryMode: true }
  })

  const router = useRouter()
  router.push('/about')
  await wrapper.vm.$nextTick()

  expect(wrapper.text()).toContain('About')
})
```

## Testing Route Parameters

```js
const User = {
  props: ['routeParams'],
  template: '<div>User {{ routeParams.id }}</div>'
}

const routes = [
  { path: '/user/:id', component: User }
]

test('passes route params to component', async () => {
  const wrapper = mount(TinyRouter, {
    props: { routes, memoryMode: true }
  })

  const router = useRouter()
  router.push('/user/42')
  await wrapper.vm.$nextTick()

  expect(wrapper.text()).toContain('User 42')
})
```

## Key Tips

- Always use `memoryMode: true` in tests to avoid interacting with `window.history`
- Use `await wrapper.vm.$nextTick()` after navigation to wait for the DOM update
- Route params are passed as the `routeParams` prop to matched components
