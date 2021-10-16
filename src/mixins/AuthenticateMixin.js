import {mapActions, mapGetters} from 'vuex'
export default {

	methods: {
    async authenticate (data) {
      this.$session.setAuth(data)
      this.$api.defaults.headers.common['Authorization'] = data.token
      this.$resman.defaults.headers.common['Authorization'] = data.token
      $startSocketSession()
      return
    }
	}

}
