<template>
  <q-page style="width:100%; height:78vh;">
    <cart-add />
    <q-scroll-area style = "height:100%; width:100%"  >
      <div class ="flex flex-center full-width">
        <div class = "full-width" style = "max-width: 1320px; overflow:hidden">
          <div style="display: grid; margin: 40px 12px; grid-gap: 0.3rem; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));  " class = "q-pa-xs">
            <item-card v-for = "item in items" :key = "item._id" :item="item" />
          </div>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['items']),
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['_items', '_updateItem']),
    getItems() {
      this.$resman.get('items').then(r => {
        this._items(r.data)
      })
    }
  },
  mounted () {
    this.getItems()
  },
  created () {
    this.$socket.on("item-update", data => {
      this._updateItem(data)
    })
  }
}
</script>
