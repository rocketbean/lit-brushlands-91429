<template>
  <div class = "q-pt-lg flex flex-center q-gutter-md" style = "width:100%; height:100%; ">
    <div class = "flex flex-center q-gutter-md" style = "height:40%" >
      <avatar class = "shadow-2" :url = "user.avatar" size = "245px" />
      <span class = "text-h5 flex flex-center" style="flex-direction: column; margin-bottom:0px">
        {{user.name}}
        <small class = "text-caption">
          {{user.email}} | <strong v-if = "!loadState" >{{userCredits}}</strong> credits
        </small>
      </span>
    </div>
    <q-scroll-area class = " full-width" fit style = "width:100%; height:57%">
      <claims style = "width:100%; " :getCreds="getCredits"/>
    </q-scroll-area>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([]),
    user () {
      return this.$session.getUser()
    }
  },
  data () {
    return {
      loadState: false,
      userCredits: 0
    }
  },
  methods: {
    ...mapActions(['']),
    getCredits() {
      this.loadState = true
      this.$resman.get('credits').then(r =>{
        this.loadState = false
        this.userCredits = r.data.credits
      }).catch(e => {
        this.loadState = false
      })
    }
  },
  mounted () {
    this.getCredits()
  }
}
</script>
