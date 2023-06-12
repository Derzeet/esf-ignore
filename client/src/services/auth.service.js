import axios from "axios";

const API_URL = "http://192.168.30.24:9091/api/finpol/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, FIO, password, level) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      FIO,
      password,
      level
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

const l = new AuthService()

export default l;
