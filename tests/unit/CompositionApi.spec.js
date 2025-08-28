import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, markRaw } from 'vue'
import TinyRouter, { useRouter, useRoute, defaultRoute, initialRoute, initialQuery } from '../../src/components/TinyRouter.vue'

const Home = markRaw(defineComponent({ name: 'Home', template: '<div>Home</div>' }))
const User = markRaw(defineComponent({ name: 'User', props: ['routeParams'], template: '<div>User {{ routeParams.id }}</div>' }))

describe('Composition API: useRouter/useRoute', () => {
  const originalLocation = window.location
  const originalHistory = window.history

  beforeEach(() => {
    defaultRoute.value = null
    initialRoute.value = '/'
    initialQuery.value = ''

    delete window.location
    window.location = { pathname: '/', search: '', origin: 'http://localhost' }
    window.history = { ...window.history, pushState: () => {} }
  })

  afterEach(() => {
    window.location = originalLocation
    window.history = originalHistory
  })

  it('exposes reactive route and params via useRoute', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/user/:id', component: User }
    ]

    const Comp = defineComponent({
      name: 'Comp',
      setup() {
        const route = useRoute()
        const router = useRouter()
        return { route, router }
      },
      template: '<div><TinyRouter :routes="routes" /><span class="r">{{ route.route }}</span><span class="p">{{ route.params.id }}</span></div>',
      components: { TinyRouter },
      props: ['routes']
    })

    const wrapper = mount(Comp, { props: { routes } })
    await nextTick()

    expect(wrapper.find('.r').text()).toBe('/')
    expect(wrapper.find('.p').text()).toBe('')

    // navigate
    await wrapper.vm.router.push('/user/42')
    await nextTick()

    expect(wrapper.find('.r').text()).toBe('/user/42')
    expect(wrapper.find('.p').text()).toBe('42')
  })

  it('useRouter.push navigates and component updates', async () => {
    const routes = [
      { path: '/', component: Home },
      { path: '/user/:id', component: User }
    ]

    const Comp = defineComponent({
      name: 'Comp2',
      setup() {
        const router = useRouter()
        return { router }
      },
      template: '<div><TinyRouter :routes="routes" /><button class="go" @click="router.push(\'/user/abc\')">go</button></div>',
      components: { TinyRouter },
      props: ['routes']
    })

    const wrapper = mount(Comp, { props: { routes } })
    await nextTick()
    expect(wrapper.findComponent(Home).exists()).toBe(true)

    await wrapper.find('button.go').trigger('click')
    await nextTick()

    expect(wrapper.findComponent(User).exists()).toBe(true)
  })
})


