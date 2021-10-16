<template>
  <div class = "avatardiv" :style = "`position:relative; overflow:hidden; width:${size}!important; height:${size}; border-radius:${size}!important; padding:0px; margin: 0px`">
    <q-img ratio="1" fit="cover" :spinner-size="size" :src="url" style = "background-color:grey"  />
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['url', 'size'],
  computed: {
    ...mapGetters([]),
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([''])
  },
  mounted () {

  }
}
</script>
