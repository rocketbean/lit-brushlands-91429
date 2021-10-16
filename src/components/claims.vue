<template>
  <q-list separator class = "full-width">
    <q-item v-for="claim in claims" :key = "claim._id" style = "width:100%">
      <q-item-section avatar>
        <avatar :url="claim.item.imageUrl" size = "42px" />
      </q-item-section>
      <q-item-section>
        {{claim.item.name}}
      </q-item-section>
      <q-item-section side>
        {{claim.qty}}
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['getCreds'],
  computed: {
    ...mapGetters(['claims', 'globals']),
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['_claims']),
    getClaims() {
      this.$resman.get('claims').then(r => {
        this._claims(r.data)
      })
    }
  },
  mounted () {
    this.getClaims()
  },
  created () {
    this.$socket.on('get-item-updates', data => {
      this.globals.toggleLeftDrawer(true)
      this.getClaims();
      this.getCreds();
    })
  }
}
</script>
