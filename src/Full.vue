<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :menus="menus" />
      <main class="main">
        <breadcrumb class="mb-0" :list="breadcrumb"></breadcrumb>
        <div class="container-fluid">
          <transition enter-active-class="fadeIn animated" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
  import routes from './router/config'
  import AppHeader from './components/Header'
  import Sidebar from './components/Sidebar'
  import AppAside from './components/Aside'
  import AppFooter from './components/Footer'
  import Breadcrumb from './components/Breadcrumb'
  import cookie from '@/js/cookie'
  import {get} from '@/js/rest'

  export default {
    data () {
      return {
        menus: routes[0].children.filter((route) => route.meta && route.meta.menu)
      }
    },
    beforeCreate () {
      const token = cookie.get('token')
      if (!token) {
        this.$router.replace('/login')
        return
      }
      get('/api/user').then((res) => {
        console.log(res)
      },
      () => {
        cookie.remove('token')
        this.$router.replace('/login')
      })
    },
    computed: {
      breadcrumb () {
        return this.$route.matched.filter((route) => route.meta && route.meta.menu)
      }
    },
    components: {
      AppHeader, Sidebar, AppAside, AppFooter, Breadcrumb
    }
  }
</script>
