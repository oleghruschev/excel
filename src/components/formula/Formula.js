import { ExcelComponent } from '@core/ExcelComponent'
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

    this.$on('TABLE_CELL_SELECT', $cell => {
      this.$root.find('#formula').text($cell.text())
    })

    this.$on('TABLE_CELL_INPUT', $cell => {
      this.$root.find('#formula').text($cell.text())
    })

    this.$subscribe(state => console.log('---formula state---', state))
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id='formula'  class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput() {
    this.$emmit('FORMULA_INPUT', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emmit('FORMULA_HANDLE_ENTER')
    }
  }
}
