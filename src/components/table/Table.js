import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions'
import { defaultStyles } from '@/constants'

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
      this.updateTextInStore(text)
    })

    this.$on('FORMULA_HANDLE_ENTER', () => {
      this.selection.current.focus()
    })

    this.$on('TOOLBAR_APPLY_STYLE', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
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
    this.$emit('TABLE_CELL_SELECT', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('TABLE_CELL_INPUT', $(event.target))
    this.updateTextInStore($(event.target).text())
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }
}


