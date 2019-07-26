import axios from 'axios'

const service = axios.create({
    headers:{
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 10000,
})

service.interceptors.request.use(
  config => {
    // let token = ''
    // if (!process.server) {
    // token = localStorage.getItem('token') || '' 
    // }
    // if (token) {
    //   config.headers.auth = token 
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回结果处理
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    let url = error.response && error.response.config.url
    // 防止登录错误时返回的401对tokenExpired造成的影响
    console.log('---> error', error.response)
    if (url !== process.env.baseUrl + '/login' && error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
        //   window.location.replace('/login')
          break
        case 404:
        case 500:
        case 502:
          console.log('接口异常:' + error.response.status)
          break
      }
    }
    return Promise.reject(error)
  }
)

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
        ...option
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, { ...option }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del (url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, { data, ...option }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}, option = {}) {
  console.log(data)
  return new Promise((resolve, reject) => {
    service.put(url, data, { ...option }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}



export default {
  get,
  post,
  put,
  delete: del
}