import { boot } from 'quasar/wrappers'
import { io } from 'socket.io-client'

export default boot(async ( { app }) => {
  let {$session} = app.config.globalProperties
  window.$startSocketSession = () => {
    if(app.config.globalProperties?.$socket == undefined) {
      let socketWrap = {
        install: (app, { connection, options }) => {
          const socket = io(connection,  options)
          app.config.globalProperties.$socket = socket
          app.provide('socket', socket)
        }
      }
      app.use(socketWrap, {
        connection: window.$peerhost,
        options: {
          transports: ['websocket'],
          query: {
            "guards": $session.auth.user._id
          }
        }
      })
    }
  }

  if($session?.auth) {
    $startSocketSession()
  }
})
