<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    <b-nav is-nav-bar class="d-md-down-none">
      <!--<b-nav-item class="px-3">Dashboard</b-nav-item>-->
      <!--<b-nav-item class="px-3">Users</b-nav-item>-->
      <!--<b-nav-item class="px-3">Settings</b-nav-item>-->
    </b-nav>
    <b-nav is-nav-bar class="ml-auto">
      <!--<b-nav-item class="d-md-down-none">-->
        <!--<i class="icon-bell"></i><span class="badge badge-pill badge-danger">5</span>-->
      <!--</b-nav-item>-->
      <!--<b-nav-item class="d-md-down-none">-->
        <!--<i class="icon-list"></i>-->
      <!--</b-nav-item>-->
      <!--<b-nav-item class="d-md-down-none">-->
        <!--<i class="icon-location-pin"></i>-->
      <!--</b-nav-item>-->
      <b-nav-item-dropdown right style="margin-right: 1rem">
        <template slot="button-content">
          <img :src="renderAvatar(user.avatar)" class="img-avatar" alt="">
          <span class="d-md-down-none">{{user.nickname}}</span>
        </template>
        <!--<b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>-->
        <!--<b-dropdown-item><i class="fa fa-bell-o"></i> Updates<span class="badge badge-info">42</span></b-dropdown-item>-->
        <!--<b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<span class="badge badge-success">42</span></b-dropdown-item>-->
        <!--<b-dropdown-item><i class="fa fa-tasks"></i> Tasks<span class="badge badge-danger">42</span></b-dropdown-item>-->
        <!--<b-dropdown-item><i class="fa fa-comments"></i> Comments<span class="badge badge-warning">42</span></b-dropdown-item>-->
        <b-dropdown-header tag="div" class="text-center"><strong>设置</strong></b-dropdown-header>
        <!--<b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>-->
        <!--<b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>-->
        <!--<b-dropdown-item><i class="fa fa-usd"></i> Payments<span class="badge badge-default">42</span></b-dropdown-item>-->
        <!--<b-dropdown-item><i class="fa fa-file"></i> Projects<span class="badge badge-primary">42</span></b-dropdown-item>-->
        <!--<b-dropdown-divider></b-dropdown-divider>-->
        <!--<b-dropdown-item><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>-->
        <b-dropdown-item @click.prevent="logout()" ><i class="fa fa-lock"></i>登出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <div style="width: 1rem"></div>
    <!--<button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">&#9776;</button>-->
  </header>
</template>
<script>
import { post } from '@/js/rest'
import cookie from '@/js/cookie'
import {mapGetters} from 'vuex'

export default {
  name: 'header',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    click () {
      // do nothing
    },
    renderAvatar (img) {
      return img && img.replace(/^img([1-9]|10)$/g, 'http://alibo.gvrcraft.com/img/$&.png')
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    logout () {
      return post('/api/logout').then(() => {
        cookie.remove('token')
        this.$router.replace('/login')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~scss/core/mixins';

  header {
    @include box-shadow
  }
</style>
