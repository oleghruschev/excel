import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  get title() {
    return this.store.getState().title
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(actions.setTitle($target.text()))
  }

  toHTML() {
    return `
      <input type="text" class="input" value="${this.title}" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }
}
