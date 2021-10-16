<template>
  <q-dialog v-model='open'>
    <q-card style = 'position:relative; min-width: 320px' class = 'bg-blue-grey-2' >
      <q-card-section  class = 'flex' style = 'justify-content:center'>
        <div class = 'q-pa-md' >
          <div class = "q-gutter-sm" style = "min-width:280px;">
            <q-input v-model="item.name" color = "primary" label="item name"  outlined autofocus :disable="loadState"/>
            <q-input v-model="item.description" rows="5" color = "primary" label="what's with this item ?" autogrow  outlined :disable="loadState"/>
            <q-input v-model="item.attachments" rows="5" color = "primary" label="image urls (comma delimited)" autogrow  outlined
            :disable="loadState"
            :rules="[ val => validator(val) || 'must be a valid url']"
            />
            <q-input v-model="item.stock" type = "number" color = "primary" label="stock" autogrow  outlined :disable="loadState"/>
          </div>
        </div>
      </q-card-section >
      <q-card-actions align='right' >
        <q-btn color='positive' :disable='(loadState) || (!validated)' :loading='loadState' class = 'q-mt-sm' flat icon = 'save' @click = "add"/>
      </q-card-actions>
      <q-card-section style = 'padding:0px' class = 'flex flex-center bg-red text-white'>
        <error-list :errors='errors'/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  watch: {
    errors: {
      handler(v) {
        console.log(v)
      },
      deep:true
    }
  },
  computed: {
    ...mapGetters(['dialogs', 'auth']),
    open: {
      get () {
        return this.dialogs.newItem.open
      },
      set () {
        this._toggle('newItem');
      }
    },
  },
  data () {
    return {
      item: {
        name: '',
        description: '',
        imageUrl: '',
        stock: 0,
        attachments: [],
      },
      validated: false,
      loadState: false,
      errors: []
    }
  },
  methods: {
    ...mapActions(['_dialogs', '_toggle']),
    resetForm () {
      this.item = {
        name: '',
        description: '',
        imageUrl: '',
        stock: 0,
        attachments: [],
      }
      this.validated = false
      this.errors = []
    },
    validator (val) {
      if(typeof val == 'string') {
        if(val?.delimitedHttpUrl()) {
          this.validated = true
        }
        return val.delimitedHttpUrl()
      }
    },
    add () {
      if(this.validated) {
        this.loadState = true;
        this.item.attachments = this.item.attachments.split(",")
        this.item.imageUrl = this.item.attachments[0]
        this.$resman.post('item', this.item).then( data => {
          this.loadState = false;
          this.resetForm();
        }).catch(e => {
          this.loadState = false;
          e.response.data.split(",").map(error => {
            this.errors.push({text: error.replace("item validation failed:", "")})
          })
        })
      }

    }
  },
}
</script>
