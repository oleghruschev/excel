import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {debounce} from '@core/utils'
import * as actions from '@/redux/actions'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
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
        <div class="button" data-button='remove'>
          <i class="material-icons" data-button='remove'>delete</i>
        </div>
        <div class="button" data-button='exit'>
          <i class="material-icons" data-button='exit'>exit_to_app</i>
        </div>
      </div>
    `
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.button === 'remove') {
      const decison = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decison) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
