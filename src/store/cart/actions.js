export function _cart ({commit}, payload) {
  payload.items = payload.items.map(item => {
    item.loading = false;
    return item
  })
  return commit('cart_', payload)
}

export function _cartStatus ({commit}, payload) {
  return commit('cartStatus_', payload)
}

export function _pushItem ({commit}, payload) {
  return commit('pushItem_', payload)
}

export function _updateItem ({commit}, payload) {
  return commit('updateItem_', payload)
}
