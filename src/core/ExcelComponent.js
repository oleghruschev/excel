import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emmiter = options.emmiter
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
  $subscribe(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn)
    this.unsubscibes.push(unsub)
  }

  // уведомляем слушателей про события event
  $dispatch(event, ...args) {
    this.emmiter.dispatch(event, ...args)
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
  }
}
