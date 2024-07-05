import { Route } from '@/entities/Route.ts'
import { Block } from '@/entities/Block.ts'

type BlockConstructor = new () => Block

export class Router {
  private static __instance: Router
  private routes: Route[] | undefined
  private history: History | undefined
  private _currentRoute: Route | null | undefined
  private _rootQuery: string | undefined

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: BlockConstructor): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    if (this.routes) {
      this.routes.push(route)
    }
    return this
  }

  start(): void {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }).bind(this)

    this._onRoute(window.location.pathname)
  }

  go(pathname: string): void {
    if (this.history) {
      this.history.pushState({}, '', pathname)
      this._onRoute(pathname)
    }
  }

  back(): void {
    if (this.history) {
      this.history.back()
    }
  }

  forward(): void {
    if (this.history) {
      this.history.forward()
    }
  }

  getRoute(pathname: string): Route | undefined {
    if (this.history) {
      return this.routes?.find((route) => route.match(pathname))
    }
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }
}
