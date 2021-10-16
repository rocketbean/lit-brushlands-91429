<template>
  <q-btn rounded :outline="activate" :flat="!activate"  icon = "shopping_cart" :color = "activate ? 'orange': 'white'" @click = "deactivateStatus">
    <q-badge color="orange"  align ="bottom" v-if = "activate"/>
    <q-menu style = "width:230px; height: 320px">
      <div class = "flex" style = "height:100%; overflow: hidden" v-if = "cart.items.length > 0" >
        <q-scroll-area style = "height:85%; width:100%">
          <q-list  >
            <q-item clickable v-for = "item in cart.items" :key = "item._id">
              <q-item-section avatar>
                <avatar :url="item.item.imageUrl" size="32px"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>{{item.item.name}}</q-item-label>
                <q-item-label caption lines="2">{{item.item.description.trimEllip(30)}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label >
                  <q-btn round flat :loading="item.loading" :label = "item.qty" />
                </q-item-label>
                <q-popup-edit
                  v-model.number="item.qty"
                  :validate="validateItem"
                  @save="updateItem"
                  @before-show="setOnItem(item)"
                  ref="inputSlot"
                  auto-save
                  v-slot="scope">
                  <q-input
                    bottom-slots dense autofocus type="number"
                    :loading="item.loading"
                    v-model.number="scope.value"
                    @keyup.enter="scope.set"
                    :rules="[
                      async val => await itemVald(scope.value) || 'quantity cannot exceed stock limit'
                    ]"
                  />
                </q-popup-edit>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <div class = "bg-primary q-pa-sm" style = "height:15%; width:100%; align-items: center; align-self: flex-end; display:flex; justify-content: space-between">
          <span class = "text-white">total: {{totalCount}}</span>
          <q-btn dark round color = "white" flat icon = "grading" @click ="purchaseItems">
            <q-tooltip>
              checkout your cart
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div v-if = "cart.items.length < 1" class = "flex flex-center" style = "width:100%; height:100%">
        <span class = "q-pa-md text-grey">
          your cart is empty
        </span>
      </div>
    </q-menu>
  </q-btn>
</template>
<script>
import cart from 'src/store/cart'
import { Notify } from 'quasar'
import {mapActions, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['cart']),
    totalCount () {
      return this.cart?.items.reduce((a, b) => a + b.qty, 0)
    },
    activate () {
      return this.cart.status == 1 ? true : false
    }
  },
  data () {
    return {
      onItem: {}
    }
  },
  methods: {
    ...mapActions(['_cart', '_cartStatus']),
    getCart() {
      this.$resman.get('cart').then(r => {
        this._cart(r.data)
      })
    },
    setOnItem (item) {
      item.validated = false;
      this.onItem = item
    },
    deactivateStatus () {
      this.$resman.patch(`cart/${this.cart._id}`, {status: 0}).then(r => {
        this._cartStatus(0)
      })
    },
    updateValidate () {
      // this.$resman.patch(`cart/${this.cart._id}/item/${this.onItem._id}`, {value: val})
    },
    checkValidation(item) {
      return !item.validated
    },
    async itemVald (val) {
      return await this.$resman.post(`cart/${this.cart._id}/item/${this.onItem._id}/validate`, {value: val}).then(r => {
        this.$refs.inputSlot.set()
        return true;
      }).catch(e => {
        return false;
      })
    },
    validateItem(val) {
      this.onItem.loading = true
      this.$resman.post(`cart/${this.cart._id}/item/${this.onItem._id}/validate`, {value: val}).then(r => {
        this.onItem.loading = false
        this.onItem.validated = true
        return true;
      }).catch(e => {
        this.onItem.loading = false
        this.onItem.validated = false
        return false;
      })
      return this.onItem.validated
    },
    purchaseItems () {
      this.cart.items.map(item => {
        this.purchase(item);
      })
    },
    purchase(item) {
      item.loading = true
      this.$resman.post(`cart/${this.cart._id}/item/${item._id}/purchase`).then(r => {
        this._cart(r.data)
        item.loading = false
      }).catch(e => {
        item.loading = false
        Notify.create({
          message: e.response.data,
          icon: "warning",
          color: "red",
          position: 'bottom-right',
          progress: true,
        })
      })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
