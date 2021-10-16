

window.$serve = 'local'; // dev
if($serve == "local") {

  window.$baseApi = "https://cryptic-woodland-38791.herokuapp.com/api/"
  window.$baseUrl = "https://cryptic-woodland-38791.herokuapp.com/resman/"
  window.$peerhost = "wss://cryptic-woodland-38791.herokuapp.com/"
} else {
  // window.$baseUrl = "https://castmonkeys.com:3000/" // "https://192.168.254.133:3000/"
  // window.$peerhost = "wss://castmonkeys.com:3000/" //"wss://192.168.254.133:3000"
}
window.$intervals = []
