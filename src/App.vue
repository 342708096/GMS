<template>
  <main>
    <g-menu :menus="menus"></g-menu>
    <div style="margin-left: 194px;" class="container-fluid">
      <nav class="breadcrumb sticky-top">
          <a class="breadcrumb-item" href="#">系统管理</a>
          <a class="breadcrumb-item active" href="#">企业管理</a>
      </nav>
      <div class="raw">
        <div class="content-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import routes from '@/router/config'
import GMenu from '@/components/menu/g-menu'

export default {
  data () {
    return {
      menus: routes.filter((route) => route.meta && route.meta.menu)
    }
  },
  components: {
    GMenu
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  main {
    nav {
      margin-left: -15px;
      margin-right: -15px;
    }
  }
</style>
