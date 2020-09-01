import { storage } from '@/core/utils';
import { defaultStyles } from '@/constants';

const DEFAULT_STATE = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  currentStyles: defaultStyles,
  openedData: new Date().toJSON(),
};

function storageName(param) {
  return `excel:${param}`;
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    if (process.env.NODE_ENV === 'development') {
      console.log('-App state-', state);
    }
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    const normalize = (state) => ({
      ...state,
      currentStyles: defaultStyles,
      currentText: '',
    });

    const initialState = storage(this.name)
      ? normalize(storage(this.name))
      : DEFAULT_STATE;


    return new Promise(resolve => {
      setTimeout(() => {
        resolve(initialState)
      }, 2000)
    })
  }
}
