// export function createStore(rootReducer, initialState = {}) {
//   let state = rootReducer(initialState, {type: '__INIIT__'})
//   let listeners = []

//   return {
//     subscribe(fn) {
//       listeners.push(fn)

//       return {
//         unsubscibe() {
//           listeners = listeners.filter(listener => listener !== fn)
//         }
//       }
//     },
//     dispatch(action) {
//       state = rootReducer(state, action)
//       listeners.forEach(listener => listener(state))
//     },
//     getState() {
//       return state
//     }
//   }
// }

export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.state = rootReducer(initialState, { type: '__INIIT__' })
    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)

    return {
      unsubscibe() {
        this.listeners = this.listeners.filter(listener => listener !== fn)
      }
    }
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
