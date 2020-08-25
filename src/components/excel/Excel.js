import { $ } from '@core/dom'
import { Emmiter } from '@core/Emmiter'
import { StoreSubscriber } from '@/core/StoreSubscriber'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emiter = new Emmiter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emiter: this.emiter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // debug
      if (component.name) {
        window[component.name] = component
      }

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })


    return $root
  }

  init() {
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
