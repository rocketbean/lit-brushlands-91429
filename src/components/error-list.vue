<template>
    <q-list dense style ="max-width:95%; margin:0px; overflow: hidden" key = "container">
    <transition-group appear enter-active-class="faster animated slideInDown" leave-active-class="faster animated slideOutUp">
      <q-item v-ripple v-for="(error, e) in displayMessages" :key="e">
          <q-item-section avatar>
            <q-icon :name="error.icon?error.icon:'warning'" />
          </q-item-section>
        <q-item-section lines = "5">
        <small> {{error.text}} </small>
        </q-item-section>
        <q-item-section side>
          <q-btn round flat color="red-10" dense icon = "close" @click="close(error)" />
        </q-item-section>
      </q-item>
  </transition-group>

    </q-list>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    props: ['errors'],
    watch: {
      errors: {
        handler (v) {
          v.forEach(e => {
            if(!this.displayed.includes(e.text)) {
              this.displayed.push(e.text)
              this.messages.push(e)
            }
          })
        },
        deep:true
      }
    },
    computed: {
      ...mapGetters([]),
      displayMessages () {
        return this.messages
      }
    },
    data () {
      return {
        messages: [],
        displayed: []
      }
    },
    methods: {
      ...mapActions(['']),
      close (e) {
        this.messages = this.messages.filter(msg => msg.text !== e.text)
        this.displayed = this.displayed.filter(d => d !== e.text)
      }
    },
    mounted () {

    }
  }
</script>
