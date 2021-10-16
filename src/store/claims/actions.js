export function _claims ({commit}, payload) {
  return commit('claims_', payload)
}

export function _pushClaim ({commit}, payload) {
  return commit ('pushClaim_', payload)
}
