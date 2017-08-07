<template>
  <footer class="app-footer">
    <a href="https://genesisui.com">Clever</a> &copy; 2017 creativeLabs.
    <span class="float-right">Powered by <a href="https://genesisui.com">GenesisUI</a></span>
  </footer>
</template>
<script>
export default {
  name: 'footer'
}
</script>
<style lang="scss" scoped>
  @import "~scss/mixin";

  footer {
    @include box-shadow(0, -1px)
  }
</style>
