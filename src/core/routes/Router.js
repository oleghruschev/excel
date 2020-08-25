import {$} from '../dom'
import { ActiveRoute } from './ActiveRoute'


export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw Error('Selector is not defined')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear()

    const currentRoute = ActiveRoute.path.split('/')[0]

    const Page = this.routes[currentRoute]

    if (!Page) {
      return this.$placeholder.html('<h1>404 Not found</h1>')
    }

    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
