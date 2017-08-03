<template>
  <main>
    <g-menu></g-menu>
    <div id="main">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import GMenu from '@/components/menu/g-menu'

export default {
  components: {
    GMenu
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #main {
    margin-left: 194px;
  }
</style>
