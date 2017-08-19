<template>
  <menu>
    <div class="logo"></div>
    <div class="account">
      <h5>admin</h5>
      <p>【超级管理员】</p>
    </div>
    <ul>
      <router-link tag="li" v-for= "menu in menus" :key="menu.path" v-once :to="{path: menu.path}" v-text="menu.meta.menu"></router-link>
    </ul>
    <div class="logout">
      退出账号
    </div>
  </menu>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    menus: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~scss/core/mixins';

  menu {
    width: 194px;
    color: #a4a9b6;
    background-color: #32353a;
    text-align: center;
    user-select: none;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    .logo {
      width: 130px;
      height: 46px;
      margin: 25px auto;
      background: url('~assets/ic_logo.png') center;
    }
    .account {
      p {
        font-size: .85rem;
      }
      h5 {
        font-size: .9rem;
      }
    }
    > ul {
      > li {
        cursor: pointer;
        @include vertical-align(60px);
        &.active {
          background: linear-gradient(#3a66a3, #12b2fa);
          color: #ffffff;
        }
        &:hover {
          color: #ffffff;
        }
      }
    }
    .logout {
      width: 100%;
      background-color: #363d47;
      position: absolute;
      bottom: 0;
      @include vertical-align(60px);
    }
  }
</style>
