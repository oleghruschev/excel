import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {CreateStore} from '@/redux/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@/core/utils'
import {defaultStyles} from '@/constants'

import './scss/index.scss'

const EXCEL_STATE = 'excelState'

const INITIAL_STATE = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles

}

const store = new CreateStore(
    rootReducer,
    storage(EXCEL_STATE) || INITIAL_STATE
)

store.subscribe(state => {
  console.log('-App state-', state)
  storage(EXCEL_STATE, state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
