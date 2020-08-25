import { Page } from '@core/Page'
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {CreateStore} from '@/redux/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@/core/utils'
import {defaultStyles} from '@/constants'

const DEFAULT_STATE = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {}
}

function storageName(param) {
  return `excel:${param}`
}


export class ExcelPage extends Page {
  getRoot() {
    const normalize = state => ({
      ...state,
      currentStyles: defaultStyles,
      currentText: ''
    })

    const EXCEL_STATE = storageName(this.params)

    const initialState
      = storage(EXCEL_STATE) ? normalize(storage(EXCEL_STATE)) : DEFAULT_STATE

    const store = new CreateStore(
        rootReducer,
        initialState
    )

    const stateListener = debounce(state => {
      console.log('-App state-', state)
      storage(EXCEL_STATE, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
