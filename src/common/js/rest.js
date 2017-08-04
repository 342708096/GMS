import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:8080';
export default function rest (method, url, params, data) {
  return axios.request({
    url,
    method,
    params,
    data
  }).then(res => res.data)
}

export function get (url, params) {
  return rest('get', url, params)
}

export function post (url, data, params) {
  return rest('post', url, params, data)
}

export function put (url, data, params) {
  return rest('put', url, params, data)
}

export function del (url, params) {
  return rest('delete', url, params)
}
