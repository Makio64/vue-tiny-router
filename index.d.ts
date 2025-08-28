import type { App, Component } from 'vue'

export interface Route {
  path: string
  component: Component
}

export interface RedirectsMap {
  [from: string]: string
}

export interface TinyRouterProps {
  routes: Route[]
  redirects?: RedirectsMap
  memoryMode?: boolean
}

export interface RouterAPI {
  push(path: string): void
  readonly route: string | undefined
  readonly component: Component | undefined
  readonly params: Record<string, string>
}

export interface RouteState {
  route: string
  params: Record<string, string>
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


