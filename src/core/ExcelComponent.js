import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emmiter = options.emmiter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscibes = []

    this.prepare()
  }
  // настраиваем компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // подписываемся на события event
  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn)
    this.unsubscibes.push(unsub)
  }

  // уведомляем слушателей про события event
  $emmit(event, ...args) {
    this.emmiter.emmit(event, ...args)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  // Сюда приходят только изменения по тем полям,
  // на которые мы подписались
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // инициализируем компонент
  // добавляем слушателей
  init() {
    this.initDOMListeners()
  }

  // удаляем компонент
  // чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscibes.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
