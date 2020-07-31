import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import ViewUI from 'view-design';
import qs from 'qs';
axios.defaults.timeout =30000;


axios.defaults.headers.post['Content-Type'] ='application/json';
Vue.prototype.$axios = axios;

/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
  Vue.$load.show();

  return config;
}, error => {  //请求错误处理
  return Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
  response => {  //成功请求到数据
    Vue.$load.hide();
    if(response.data){
      if(response.data.code !=undefined){
        switch (response.data.code) {
          case 10102:
            ViewUI.Modal.error({
              title: '错误',
              content: response.data.message,
              width: '400px',
              okText: '返回登陆',
              loading:true,
              onOk() {
                ViewUI.Modal.remove();
                localStorage.clear()
                router.push({
                  path: '/login',
                })
              }
            })
            break;
          default:
            if(response.data.code!=200){
              ViewUI.Message.error(response.message);
            }
        }
      }
      return response;
    }
    return response;
  },
  error => {  //响应错误处理
    Vue.$load.hide();
    return Promise.reject(error.response.data.message)
  }
);


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err)
    })
  });}



/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err)
      })
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postUrl(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      params: params,
      data: data
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}


/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params,data) {
  return new Promise((resolve, reject) => {
    axios.put(url, params,data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function putUrl(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: url,
      params: params,
      data: data,
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}


/**
 * $delete，对应delete请求
 */
export function $delete(url, params){
  return new Promise((resolve, reject) =>{
    axios.delete(url, {
      params: params,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  });
}
