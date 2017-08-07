<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link"><i class="icon-speedometer"></i> Dashboard <span class="badge badge-info">NEW</span></router-link>
        </li>
        <li class="nav-title text-center">
          <span>UI Elements</span>
        </li>
        <li class="nav-item" :class="{'nav-dropdown': menu.children}" v-for="menu in menus" :key="menu.path" v-once>
          <div class="nav-link" :class="{'nav-dropdown-toggle': menu.children}" @click="handleClick($event, menu)"><i :class="menu.meta.icon"></i> {{menu.meta.menu}}</div>
          <ul class="nav-dropdown-items" @click.stop>
            <router-link tag="li" class="nav-item" v-for="menul2 in menu.children" :key="menul2.path" :to="{path: '/' + menu.path +'/'+ menul2.path}" exact>
              <div class="nav-link" ><i :class="menul2.meta.icon"></i> {{menul2.meta.menu}}</div>
            </router-link>
          </ul>
        </li>
        <li class="divider"></li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    menus: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleClick (e, menu) {
      if (menu.children) {
        e.target.parentElement.classList.toggle('open')
      } else {
        this.$router.replace('/' + menu.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/mixin";

  .nav-link {
    cursor:pointer;
  }
  .sidebar {
    @include box-shadow(5px,0)
  }
</style>
