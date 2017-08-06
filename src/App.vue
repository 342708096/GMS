<template>
  <main>
    <g-menu :menus="menus"></g-menu>
    <div style="margin-left: 194px;" class="container-fluid">
      <breadcrumb :list="breadcrumb"></breadcrumb>
      <transition enter-active-class="fadeIn animated" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
import routes from '@/router/config'
import GMenu from '@/components/Gmenu'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  data () {
    return {
      menus: routes.filter((route) => route.meta && route.meta.menu)
    }
  },
  computed: {
    breadcrumb () {
      return this.$route.matched.filter((route) => route.meta && route.meta.menu)
    }
  },
  components: {
    GMenu, Breadcrumb
  }
}
</script>
