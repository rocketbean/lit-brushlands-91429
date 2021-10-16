export function _dialogs ({commit}, payload) {
  return commit('dialogs_', payload)
}

export function _toggle ({commit}, payload) {
  return commit('toggle_', payload)
}
