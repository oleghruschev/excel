class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(value) {
    if (typeof value === 'string') {
      this.$el.textContent=value
      return this
    }
    return this.$el.textContent
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles) {
    for (const [key, value] of Object.entries(styles)) {
      this.$el.style[key] = value
    }
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':')

      return {
        row: +row,
        col: + col
      }
    }

    return this.data.id
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  focus() {
    this.$el.focus()
    return this
  }
}

// event.target
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
