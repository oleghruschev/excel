import {TABLE_RESIZE} from '@/redux/types'

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      return {
        ...state,
        colState: { ...state.colState, [action.data.id]: action.data.value }
      }

    default:
      return state
  }
}
