<template>
  <q-card class="bg-primary text-grey-2 easein" style=" width:100%; position:relative; ">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      padding
      infinite
      autoplay
      :arrows="item.attachments.length > 1"
      :navigation="item.attachments.length > 1"
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide v-for = "(attachment, key) in item.attachments" :key = "key" class = "bg-grey flex flex-center" :name = "key"  style = "position:relative;  padding:0px; overflow:hidden; background-blend-mode: overlay" >
          <q-img  :src = "attachment"  fit="cover" loading="lazy" style = "aspect-ratio: 1; ">
            <template v-slot:loading>
              <div class="text-white flex flex-center" style = "flex-direction: column; padding: 16px; background-color: rgba(0, 0, 0, 0.4); border-radius: 5px">
                <q-spinner-puff />
                <div class="q-mt-md">Loading...</div>
              </div>
            </template>
          </q-img>
      </q-carousel-slide>
    </q-carousel>
    <q-card-section key = "info">
      <div class = "full-width flex " style = "justify-content: space-between">
        <span class = "text-h6">
          {{item.name.trimEllip(20)}}
        </span>
        <span class = "text-grey-5" v-if = "item.stock > 1">
          {{item.stock}}pcs left
        </span>
        <span class = "text-grey-5" v-else>
          {{item.stock}}pc left
        </span>
      </div>

      <q-separator dark  />
      <span class = "text-caption">
        {{item.description.trimEllip(150)}}
      </span>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn icon = "add_shopping_cart" flat @click= "addCart" :disable="item.stock < 1" />
    </q-card-actions>
  </q-card>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['item'],
  computed: {
    ...mapGetters([]),
  },
  data () {
    return {
      slide: 0
    }
  },
  methods: {
    ...mapActions(['_dialogs']),
    addCart() {
      this._dialogs({'cartAdd': {
        open: true,
        data: {
          item: this.item
        }
      }})
    }
  },
  mounted () {
  },
  created () {
    this.$socket.emit('item-init', {item: this.item})
  }
}
</script>
