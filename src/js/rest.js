import axios from 'axios'
import cookie from './cookie'

axios.defaults.baseURL = 'https://api.gvrcraft.com'

function errHandle (res) {
  if (res.code && res.code !== '200') {
    throw res
  }
  return res
}

function rest (method, url, params, data) {
  return axios.request({
    url,
    method,
    params,
    data
  }).then(res => res.data).then(errHandle)
}

export function get (url, params) {
  return rest('get', url, {...{token: cookie.get('token')}, ...params})
}

export function post (url, data, params) {
  return rest('post', url, {...{token: cookie.get('token')}, ...params}, data)
}

export function put (url, data, params) {
  return rest('put', url, {...{token: cookie.get('token')}, ...params}, data)
}

export function del (url, params) {
  return rest('delete', url, {...{token: cookie.get('token')}, ...params})
}

export function encodeUrl (tempArray, ...tempData) {
  let result = tempArray[0]
  for (let i = 1; i < tempArray.length; i++) {
    result += encodeURIComponent(tempData[i - 1])
    result += tempArray[i]
  }
  return result
}

rest.get = get
rest.post = post
rest.put = put
rest.del = del
rest.encodeUrl = encodeUrl

export default rest
