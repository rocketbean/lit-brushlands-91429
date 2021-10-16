export const cart_ = (state, payload) => {
  state.cart = payload
}

export function pushItem_ (state, payload) {
  state.cart.items.unshift(payload);
}

export function cartStatus_ (state, payload) {
  state.cart.status=payload
}

