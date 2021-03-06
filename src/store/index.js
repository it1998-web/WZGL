import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    topNav:[],
    topActive:'',
    openLeftMenuItem:[],
    leftMenu:'',
    leftMenuActive:'',
    iconName:'',
    clickActive:null,
    submitData:{},
    menu:[],
  },
  getters:{
    topNav(state){
      state.topNav = JSON.parse(localStorage.getItem('topNav'))
      return state.topNav
    },
    topActive(state){
      state.topActive = JSON.parse(localStorage.getItem('topActive'))
      return state.topActive
    },
    openLeftMenuItem(state){
      state.openLeftMenuItem = JSON.parse(localStorage.getItem('openLeftMenuItem'))
      return state.openLeftMenuItem
    },
    leftMenu(state){
      state.leftMenu = JSON.parse(localStorage.getItem('leftMenu'))
      return state.leftMenu
    },
    leftMenuActive(state){
      state.leftMenuActive = JSON.parse(localStorage.getItem('leftMenuActive'))
      return state.leftMenuActive
    },
    iconName(state){
      state.iconName = JSON.parse(localStorage.getItem('iconName'))
      return state.iconName
    },
    clickActive(state){
      state.clickActive = JSON.parse(localStorage.getItem('clickActive'))
      return state.clickActive
    },
    submitData(state){
      state.submitData = JSON.parse(localStorage.getItem('submitData'))
      return state.submitData//sessionStorage
    },
    menu(state){
      state.menu = JSON.parse(localStorage.getItem('menu'))
      return state.menu
    },
  },
  mutations:{
    topNav(state,msg){
      localStorage.setItem('topNav',JSON.stringify(msg))
      state.topNav = msg
    },
    topActive(state,msg){
      localStorage.setItem('topActive',JSON.stringify(msg))
      state.topActive = msg
    },
    openLeftMenuItem(state,msg){
      localStorage.setItem('openLeftMenuItem',JSON.stringify(msg))
      state.openLeftMenuItem = msg
    },
    leftMenu(state,msg){
      localStorage.setItem('leftMenu',JSON.stringify(msg))
      state.leftMenu = msg
    },
    leftMenuActive(state,msg){
      localStorage.setItem('leftMenuActive',JSON.stringify(msg))
      state.leftMenuActive = msg
    },
    iconName(state,msg){
      localStorage.setItem('iconName',JSON.stringify(msg))
      state.iconName = msg
    },
    clickActive(state,msg){
      localStorage.setItem('clickActive',JSON.stringify(msg))
      state.clickActive = msg
    },
    submitData(state,msg){
      localStorage.setItem('submitData',JSON.stringify(msg))
      state.submitData = msg
    },
    menu(state,msg){
      localStorage.setItem('menu',JSON.stringify(msg))
      state.menu = msg
    },
  }
})

export default store
