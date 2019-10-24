class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
    }

    logout(cb) {

    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
