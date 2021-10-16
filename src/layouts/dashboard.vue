<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer(!leftDrawerOpen)"
        />
        <q-toolbar-title>
          <img
            alt="Quasar logo"
            src="~assets/resman.png"
            style="width: 150px; "
          >
        </q-toolbar-title>
        <div class = "q-gutter-sm">
          <cart-nav/>
          <avatar-menu class = "q-mr-xl"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <div class = "flex flex-center " style = "width:100%; height:100%; overflow: hidden">
        <side-profile style = "width:100%; height:100%; "/>
      </div>
    </q-drawer>

    <q-page-container class = "bg-blue-grey-1" style = "height:100%;width:100%;position:fixed;padding-bottom:0px;">
      <transition
        enter-active-class=" animated fadeIn"
        leave-active-class=" animated fadeOut"
        appear
        :duration="120">
        <router-view :key="$route.fullPath" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['globals'])
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
      toggleLeftDrawer (v) {
        this.leftDrawerOpen = v
      }
  },
  created () {

    this.globals.toggleLeftDrawer = this.toggleLeftDrawer.bind(this)
    this.$socket.emit('initiate');
  }

}
</script>
