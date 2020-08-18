import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { $ } from '@core/dom';
import { defaultStyles } from '@/constants'
import { createToolbar } from './toolbar.template';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles)
  }

  onClick(e) {
    const $target = $(e.target);

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('TOOLBAR_APPLY_STYLE', value);
    }
  }
}
