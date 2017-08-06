<template>
  <ol class="breadcrumb sticky-top">
    <li class="breadcrumb-item" v-for="(item, index) in list">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <router-link :to="item.path" v-else>{{ showName(item) }}</router-link>
    </li>
  </ol>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true,
        default: () => []
      },
      separator: String
    },
    methods: {
      isLast (index) {
        return index === this.list.length - 1
      },
      showName (item) {
        if (item.meta && item.meta.menu) {
          item = item.meta && item.meta.menu
        }
        if (item.name) {
          item = item.name
        }
        return item
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .breadcrumb {
    border-radius:0.25rem;
    top:0.5rem;
    margin-bottom: 1.5rem;
  }
</style>
