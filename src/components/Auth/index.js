import { API } from "./backend";
import axios from "axios";

export const signup = (user) => {
  return axios
    .post(`${API}/signup`, user)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data.error) throw new Error(error.response.data.error);
    });

  // return fetch(`${API}/signup`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(user)
  // })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .catch(err => console.log(err));
};

export const signin = (user) => {
  return axios
    .post(`${API}/signin`, user)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data.error) throw new Error(error.response.data.error);
    });

  // return fetch(`${API}/signin`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(user)
  // })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return axios
      .get(`${API}/signout`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
