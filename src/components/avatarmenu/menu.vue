<template>
  <new-item/>
  <q-avatar size="45px" square class = " q-mr-md">
    <avatar :url = "user.avatar" size="36px" />
    <q-menu fit self="top middle">
      <q-list>
        <q-item clickable tag = "small" v-close-popup @click = "_toggle('newItem')" v-if = "user.accountStatus == 1">
          <q-item-section avatar>
            <q-icon name = "playlist_add" size="20px" />
          </q-item-section>
          <q-item-section >
            add new listing
          </q-item-section>
        </q-item>
        <q-item clickable tag = "small" @click = "logout">
          <q-item-section avatar>
            <q-icon name = "logout" size="20px" />
          </q-item-section>
          <q-item-section>
            logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-avatar>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import avatar from './avatar.vue';
export default {
  components: { avatar },
  computed: {
    ...mapGetters([]),
    user () {
      return this.$session.getUser();
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['_toggle']),
    logout () {
      this.$session.destroy();
      this.$router.replace({name:'login'})
    }
  },
  mounted () {
  }
}
</script>
