import type { App, Component } from 'vue'

export interface Route {
  path: string
  component: Component
  meta?: Record<string, any>
}

export interface RedirectsMap {
  [from: string]: string
}

export interface TinyRouterProps {
  routes: Route[]
  redirects?: RedirectsMap
  memoryMode?: boolean,
  scrollSmooth?: boolean
}

export interface RouterAPI {
  push(path: string): void
  replace(path: string): void
  back(): void
  forward(): void
  go(n: number): void
  readonly route: string | undefined
  readonly component: Component | undefined
  readonly params: Record<string, string>
  readonly meta: Record<string, any>
}

export interface RouteState {
  route: string
  params: Record<string, string>
  meta: Record<string, any>
}

export const defaultRoute: { value: string | null }
export const initialRoute: { value: string | undefined }
export const initialQuery: { value: string | undefined }

export const TinyRouterInstall: {
  install(app: App): void
}

export function useRouter(): RouterAPI
export function useRoute(): RouteState

declare const TinyRouter: Component & { props: TinyRouterProps }
export default TinyRouter
export { TinyRouter }

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $router: RouterAPI
    }
}
