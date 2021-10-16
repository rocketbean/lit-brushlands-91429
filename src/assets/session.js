export default class session {
  constructor () {
    this.auth = this.loadSession()
  }

	loadSession () {
		try {
			return JSON.parse(atob(localStorage.getItem("_s")))
		} catch {
			return false
		}
	}

  getToken () {
    try {
      let token = JSON.parse(atob(localStorage.getItem("_c")))
      return `Bearer ${token.token}`
    } catch {
      return false
    }
  }

  getUser () {
		try {
			let d = JSON.parse(atob(localStorage.getItem("_s")))
      return d.user;
		} catch {
			return false
		}
  }

  async awaitUser () {
		try {
			let d = JSON.parse(atob(localStorage.getItem("_s")))
      return await d.user;
		} catch {
			return false
		}
  }

	storeeUserSession (user) {
		localStorage.setItem("_s", this.encodeSession({
			user
		}))
	}

	storeToken (token) {
		localStorage.setItem("_c", this.encodeSession({
			token
		}))
	}

	update (user) {
		try {
			localStorage.setItem("_s", this.encodeSession({user}))
			return user
		} catch {
			return false
		}
	}

  setAuth (data) {
    this.storeeUserSession(data.user);
    this.storeToken(data.token);
    this.auth = this.loadSession()
    return;
  }

	destroy() {
		localStorage.clear()
		sessionStorage.clear()
	}

  static isAuthenticated () {
    try {
      let token = JSON.parse(atob(localStorage.getItem("_c")))
      return true
    } catch {
      return false
    }
  }
	encodeSession (_s) {
		return btoa(JSON.stringify(_s))
	}
}
