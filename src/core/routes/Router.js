import {$} from '../dom'
import { ActiveRoute } from './ActiveRoute'
import { Loader } from '../../components/Loader'


export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw Error('Selector is not defined')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.loader = new Loader()

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear().append(this.loader)

    const currentRoute = ActiveRoute.path.split('/')[0]

    let Page = null

    if (currentRoute === '') {
      Page = this.routes.dashboard
    } else {
      Page = this.routes[currentRoute]
    }


    if (!Page) {
      return this.$placeholder.html('<h1>404 Not found</h1>')
    }

    this.page = new Page(ActiveRoute.param)
    const root = await this.page.getRoot()
    this.$placeholder.clear().append(root)

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
