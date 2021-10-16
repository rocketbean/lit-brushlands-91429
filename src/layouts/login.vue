<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar class = "bg-primary">

        <q-toolbar-title>

        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>
    <q-page-container class = "bg-primary" style = "height:100%;width:100%;position:fixed;padding-bottom:0px;">
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginLayout'

})
</script>
