export function _items ({commit}, payload) {
  payload = payload.map(item => {
    item.activated = true
    return item
  })
  return commit('items_', payload)
}

export function _updateItem ({commit}, payload) {
  payload.activated = true;
  return commit('updateItem_', payload)
}
