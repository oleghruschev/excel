import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

import { createTable } from './table.template';
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSeclection } from './TableSelecion';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSeclection()
  }

  init() {
    super.init()

    const $select = this.$root.find(['[data-id="0:0"]'])
    this.selection.select($select)
    this.$subscribe('FORMULA_VALUE', text => {
      this.selection.current.text(text)
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        // group
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
        console.log('$cells', $cells)
      } else {
        this.selection.select($target)
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
      this.selection.select($next)
    }
  }

  toHTML() {
    return createTable();
  }
}


