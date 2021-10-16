export const dialogs_ = (state, payload) => {
  for (var k in payload) {
    if((payload[k] instanceof Object)) {
      for (var kk in payload[k]) {
        state.dialogs[k][kk] = payload[k][kk]
      }
    } else {
      state.dialogs[k] = payload[k]
    }
  }
}

export const toggle_ = (state, payload) => {
  state.dialogs[payload].open = !state.dialogs[payload].open
}

