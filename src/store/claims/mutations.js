export const claims_ = (state, payload) => {
  state.claims = payload
}

export const pushClaim_ = (state, payload) => {
  state.claims.unshift(payload)
}


