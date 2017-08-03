<template>
  <main>
    <g-menu></g-menu>
    <router-view></router-view>
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
