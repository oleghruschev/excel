import {ExcelComponent} from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init()

    this.$subscribe('TABLE_CELL_SELECT', $cell => {
      this.$root.find('#formula').text($cell.text())
    })

    this.$subscribe('TABLE_CELL_INPUT', $cell => {
      this.$root.find('#formula').text($cell.text())
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id='formula'  class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput() {
    this.$dispatch('FORMULA_INPUT', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$dispatch('FORMULA_HANDLE_ENTER')
    }
  }
}
