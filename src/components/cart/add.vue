<template>
  <q-dialog v-model='open'>
    <q-card style = 'position:relative; min-width: 250px'>
      <q-card-section  class = 'flex' style = 'justify-content:center; flex-direction: column'>
        <span> add <b> {{item.name}} </b> </span>
        <q-input type = "number" v-model="cart.qty" color = "primary" label="quantity"
          outlined bottom-slots
          autofocus
          :disable="loadState"
          :rules="[
            val => validator(Number(val)) || 'quantity cannot exceed the stock limit or be empty',
          ]"
        />
      </q-card-section >
      <q-card-actions align='right' >
        <q-btn @click = "addToCart" color='positive' :disable='loadState||!validated' :loading='loadState' class = 'q-mt-sm' flat icon = 'add_shopping_cart' />
      </q-card-actions>
      <q-card-section style = 'padding:0px' class = 'bg-red text-white flex flex-center'>
        <error-list :errors='errors'/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['dialogs', 'auth']),
    open: {
      get () {
        return this.dialogs.cartAdd.open
      },
      set () {
        this._dialogs({'cartAdd': {
          open: false,
          data: {}
        }})
      }
    },
    item () {
      return this.dialogs.cartAdd.data.item
    }
  },
  data () {
    return {
      loadState: false,
      cart: {
        qty: 0
      },
      validated: false,
      errors: []
    }
  },
  methods: {
    ...mapActions(['_dialogs', '_toggle', '_cart']),
    validator (val) {
      if(typeof val == 'number') {
        if( (val <= this.item.stock) && (val >= 1) ) this.validated = true
        else this.validated = false
        return (val <= this.item.stock) && (val >= 1)
      }
    },
    addToCart () {
      if(this.validated) {
        this.loadState = true
        this.cart.item = this.item._id
        this.$resman.post('cart/add', this.cart).then(r => {
          this._cart(r.data)
          this.cart.qty = 0
          this.loadState = false
          this.open = false
        }).catch(e => {
          this.cart.qty = 0
          this.loadState = false
          e.response.data.split(",").map(error => {
            this.errors.push({text: error.replace("item validation failed:", "")})
          })
        })
      }
    }
  },
  mounted () {
  }
}
</script>
