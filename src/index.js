import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {CreateStore} from '@/redux/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@/core/utils'
import {defaultStyles} from '@/constants'

import './scss/index.scss'

const EXCEL_STATE = 'excelState'

const DEFAULT_STATE = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {}
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

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

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
