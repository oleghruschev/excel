export class TableSeclection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()

    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSeclection.className)
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSeclection.className))
    this.group = []
  }

  selectGroup(group = []) {
    this.clear()

    this.group = group
    this.group.forEach($el => $el.addClass(TableSeclection.className))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
