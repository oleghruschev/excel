import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()

    this.$on('TABLE_CELL_SELECT', $cell => {
      this.$root.find('#formula').text($cell.data.value)
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id='formula'  class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('FORMULA_INPUT', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('FORMULA_HANDLE_ENTER')
    }
  }

  storeChanged({ currentText }) {
    this.$root.find('#formula').text(currentText)
  }
}
