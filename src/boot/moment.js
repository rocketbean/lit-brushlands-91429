import { boot } from 'quasar/wrappers'
import moment from 'moment';

export default async ({ app }) => {

  app.config.globalProperties.$moment = moment
}
