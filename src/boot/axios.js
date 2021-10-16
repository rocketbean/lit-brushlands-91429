import { boot } from 'quasar/wrappers'
import axios from 'axios'
import session from '../assets/session'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: $baseApi })
const resman = axios.create({ baseURL: $baseUrl })

export default boot(({ app }) => {
  let $session = new session
  app.config.globalProperties.$session = $session

  if($session.auth)  {
    api.defaults.headers.common['Authorization'] = $session.getToken()
    resman.defaults.headers.common['Authorization'] = $session.getToken()
  }

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$resman = resman

})

export { api }
