

window.$serve = 'local'; // dev
if($serve == "local") {
  window.$baseApi = "https://cryptic-woodland-38791.herokuapp.com/api/"
  window.$baseUrl = "https://cryptic-woodland-38791.herokuapp.com/resman/"
  window.$peerhost = "wss://cryptic-woodland-38791.herokuapp.com/"
} else {
  window.$baseApi = "http://localhost:5000/api/"
  window.$baseUrl = "http://localhost:5000/resman/"
  window.$peerhost = "ws://localhost:5000/"
}
window.$intervals = []
