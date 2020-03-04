class Auth {
  static authenticateToken(token) {
    localStorage.setItem("token", token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  static deauthenticateToken() {
    return localStorage.removeItem("token");
  }

  static getToken() {
    return localStorage.getItem("token");
  }
}

export default Auth;
