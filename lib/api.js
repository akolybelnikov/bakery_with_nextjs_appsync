import axios from 'axios';

const API = axios.create({
  baseURL: process.env.URL_SERVICE
});

export const handleURLRequest = async(size, name) => {
  const response = await API.get(`/encoded?name=${name}&size=${size}`)
  return response.data
}