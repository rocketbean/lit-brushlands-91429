import { boot } from 'quasar/wrappers'
import register from 'src/components/register/register'
import newItem from 'src/components/items/create'
import itemCard from 'src/components/items/card'
import avatarmenu from 'src/components/avatarmenu/menu'
import avatar from 'src/components/avatarmenu/avatar'
import errorList from 'src/components/error-list'
import items from 'src/pages/dashboard/items'
import cartAdd from 'src/components/cart/add'
import cartNav from 'src/components/cart/nav'
import sideProfile from 'src/components/side-profile'
import claims from 'src/components/claims'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app}) => {
  app.component('new-item', newItem)
  app.component('avatar-menu', avatarmenu)
  app.component('error-list', errorList)
  app.component('avatar', avatar)
  app.component('register', register)
  app.component('items', items)
  app.component('item-card', itemCard)
  app.component('cart-add', cartAdd)
  app.component('cart-nav', cartNav)
  app.component('side-profile', sideProfile)
  app.component('claims', claims)


  String.prototype.isValidHttpUrl = function () {
    let url;
    try {
      url = new URL(this);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  String.prototype.delimitedHttpUrl = function () {
    let status = true;
    this.split(",").map(str => {
      if(!str.isValidHttpUrl()) status = false
    })
    return status;
  }

  String.prototype.trimEllip = function (length) {
    return this.length > length ? this.substring(0, length) + "..." : this;
  }
})
