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

  export default {
    data () {
      return {
        menus: routes[0].children.filter((route) => route.meta && route.meta.menu)
      }
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
