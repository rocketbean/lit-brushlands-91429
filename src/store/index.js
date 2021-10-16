import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import dialogs from './dialogs'
import items from './items'
import cart from './cart'
import claims from './claims'
import globals from './globals'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      dialogs,
      items,
      cart,
      claims,
      globals
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: false
  })

  return Store
})
