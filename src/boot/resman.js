

window.$serve = 'local'; // dev
if($serve == "local") {
  window.$baseApi = "http://localhost:3000/api/"
  window.$baseUrl = "http://localhost:3000/resman/"
  window.$peerhost = "ws://localhost:3000/"
} else {
  // window.$baseUrl = "https://castmonkeys.com:3000/" // "https://192.168.254.133:3000/"
  // window.$peerhost = "wss://castmonkeys.com:3000/" //"wss://192.168.254.133:3000"
}
window.$intervals = []
