export const items_ = (state, payload) => {
  state.items = payload
}

export const updateItem_ = (state, payload) => {
  let item = state.items.findIndex(item => item._id == payload._id)
  state.items[item] = {...payload}
}

