import {TABLE_RESIZE, CHANGE_TEXT} from '@/redux/types'

export function rootReducer(state, { type, data }) {
  const dataType = data ? data.type : ''
  const field = `${dataType}State`

  switch (type) {
    case TABLE_RESIZE:
      return {
        ...state,
        [field]: { ...state[field], [data.id]: data.value }
      }

    case CHANGE_TEXT:
      return {
        ...state,
        currentText: data.value,
        dataState: { ...state.dataState, [data.id]: data.value }
      }

    default:
      return state
  }
}
