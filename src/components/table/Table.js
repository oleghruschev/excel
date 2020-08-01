import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import {tableResize} from '@/redux/actions'

import { createTable } from './table.template';
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSeclection } from './TableSelecion';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSeclection()
  }

  init() {
    super.init()

    const $cell = this.$root.find(['[data-id="0:0"]'])
    this.selectCell($cell)

    this.$on('FORMULA_INPUT', text => {
      this.selection.current.text(text)
    })

    this.$on('FORMULA_HANDLE_ENTER', () => {
      this.selection.current.focus()
    })

    this.$subscribe(state => console.log('---table state---', state))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(tableResize(data))
    } catch (error) {
      console.error('resize table error', error)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        // group
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
        console.log('$cells', $cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const { key } = event
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emmit('TABLE_CELL_SELECT', $cell)
    this.$dispatch({type: 'TEST'})
  }

  onInput(event) {
    this.$emmit('TABLE_CELL_INPUT', $(event.target))
  }

  toHTML() {
    return createTable();
  }
}


