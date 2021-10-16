<template>
<q-page class = "flex flex-center">
  <register/>
  <q-card class = "bg-blue-grey-2">
    <q-card-section class = "flex flex-center" style = "min-width:320px">
      <img
        alt="Quasar logo"
        src="~assets/resman.png"
        style="width: 150px; "
      >
    </q-card-section>
    <q-card-section class = "q-gutter-sm" style = "min-width:320px">
      <q-input v-model = "creds.email"  :disable ="loadState"  filled borderless  placeholder = "email"/>
      <q-input v-model = "creds.password" type = "password"  :disable ="loadState"  filled borderless  placeholder = "password" @keyup.enter="login"/>
    </q-card-section>
    <q-card-actions  class = "q-pr-md q-pl-md" style = "display:flex; justify-content: space-around">
      <small style = "text-align:left">
        don't have an account yet? <u class = "pointer" @click = "_toggle('register')">register here</u>
      </small>
      <q-btn flat label = "login" color = "primary" :loading="loadState" @click = "login"/>
    </q-card-actions>
  </q-card>
</q-page>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import AuthenticateMixin from 'src/mixins/AuthenticateMixin'
import { Notify } from 'quasar'

export default {
  mixins: [AuthenticateMixin],
  data () {
    return {
      errors: [],
      loadState: false,
      creds: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['_toggle']),
    login () {
      this.loadState = true;
      this.$api.post("login", this.creds).then(r => {
        this.loadState = false;
        this.authenticate(r.data)
        this.$router.replace({name:'dashboard'})
      }).catch(e => {
        this.loadState = false;
        if(e.response) {
          let str = e.response.data.split(",")
          str.forEach(error => {
            if(error.includes("email_1 dup key:")) error = "email is already registered! please use a new email"
            Notify.create({
              message: error,
              icon: "warning",
              color: "red",
              position: 'bottom-right',
              progress: true,
            })
          });
        }
      });
    }
  }
}
</script>
