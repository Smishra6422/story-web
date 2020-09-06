import { API } from "../Auth/backend";
import axios from "axios";

export const getAllStories = (userId, token) => {
  return axios
    .get(`${API}/stories/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data.error) throw new Error(error.response.data.error);
    });
};

export const getStory = (userId, storyId, token) => {
  return axios
    .get(`${API}/story/${userId}/${storyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data.error) throw new Error(error.response.data.error);
    });
};

export const addStory = (data, userId, token) => {
  return axios
    .post(`${API}/story/create/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data.error) throw new Error(error.response.data.error);
    });
};
