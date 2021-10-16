<template>
  <q-dialog v-model='open'>
    <q-card class = "bg-blue-grey-2" style = "width:320px">
      <q-card-section>
        <q-input color = "primary" bottom-slots v-model="register.email" style = "" label="email" type = "email"  outlined autofocus :loading="loadState" :disable="loadState"/>
          <div style = "display: grid;grid-gap: 0.2rem; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
            <q-input color = "primary" bottom-slots v-model="register.name" label="name"  outlined  :loading="loadState" :disable="loadState"   />
          </div>
          <q-input color = "primary" bottom-slots v-model="confirmPassword" label="password" type='password' outlined  :loading="loadState" :disable="loadState"
              :rules= "[ val => val.length > 5 || 'must be more than 5 characters']"
              lazy-rules
          />
          <q-input color = "primary" bottom-slots v-model="register.password" label="re type your password" type='password' outlined
              :loading="loadState"
              :disable="loadState"
              :rules= "[ val => val === confirmPassword || 'password did not match']"
              lazy-rules
          />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat outline label = "register"  @click = "registerUser" :loading="loadState"/>
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import { Notify } from 'quasar'
import AuthenticateMixin from 'src/mixins/AuthenticateMixin'

export default {
  mixins: [AuthenticateMixin],
  computed: {
    ...mapGetters(['dialogs', 'auth']),
    open: {
      get () {
        return this.dialogs.register.open
      },
      set () {
        this._toggle('register');
      }
    },
  },
  data () {
    return {
      loadState: false,
      errors: [],
      register: {
        email: '',
        name: '',
        password: ''
      },
      confirmPassword: '',
    }
  },
  methods: {
    ...mapActions(['_dialogs', '_toggle']),
    registerUser () {
      this.loadState = true;
      this.$api.post("register", this.register).then(r => {
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
  },
  mounted () {
  }
}
</script>
