import { debounce } from '@/core/utils';

export class StateProcessor {
  constructor(saver, delay = 300) {
    this.saver = saver
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    this.saver.save(state)
  }

  get() {
    return this.saver.get()
  }
}
