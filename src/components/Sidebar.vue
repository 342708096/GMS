<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link">
            <i class="icon-speedometer"></i> Dashboard <span class="badge badge-info">NEW</span>
          </router-link>
        </li>
        <li class="nav-title text-center">
          <span>UI Elements</span>
        </li>
        <li class="nav-item" :class="{'nav-dropdown': menu.children}" v-for="menu in menus" :key="menu.path" v-once>
          <div v-if="menu.children" class="nav-link nav-dropdown-toggle"
               @click="$event.currentTarget.parentElement.classList.toggle('open')">
            <i :class="menu.meta.icon"></i> {{menu.meta.menu}}
          </div>
          <router-link tag="div" v-else class="nav-link" :to="{path: '/' + menu.path }" exact>
            <i :class="menu.meta.icon"></i> {{menu.meta.menu}}
          </router-link>
          <ul class="nav-dropdown-items" @click.stop>
            <li class="nav-item" v-for="menul2 in menu.children" :key="menul2.path">
              <router-link tag="div" class="nav-link" :to="{path: '/' + menu.path +'/'+ menul2.path}" exact>
                <i :class="menul2.meta.icon"></i> {{menul2.meta.menu}}
              </router-link>
            </li>
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
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/core/mixins";

  .nav-link {
    cursor:pointer;
  }
  .sidebar {
    @include box-shadow(4px,0)
  }
</style>
