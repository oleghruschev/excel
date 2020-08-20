import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE
} from './types'

export function rootReducer(state, { type, data }) {
  const dataType = data ? data.type : ''
  const field = `${dataType}State`
  const stylesState = {}

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

    case CHANGE_STYLES:
      return {...state, currentStyles: data}

    case APPLY_STYLE:
      data.ids.forEach(id => {
        stylesState[id] = {...state.stylesState[id], ...data.value}
      })

      return {
        ...state,
        stylesState: {...state.stylesState, ...stylesState},
        currentStyles: {...state.currentStyles, ...data.value}
      }

    case CHANGE_TITLE:
      return {...state, title: data}

    default:
      return state
  }
}
