<template>
  <menu>
    <div id="account">
      <h5>admin</h5>
      <p>[超级管理员]</p>
    </div>
    <ul>
      <li class="active">系统管理</li>
      <li>用户管理</li>
      <li>视频直播</li>
      <li>视频点播</li>
      <li>充值中心</li>
      <li>工单管理</li>
    </ul>
    <div id="logout">
      退出账号
    </div>
  </menu>
</template>
<script type="text/ecmascript-6">
export default {
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~scss/variable';
  @import '~scss/mixin';

  menu {
    width: 194px;
    color: $font-color-fade;
    background-color: $color-background-d;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    #account {
      font-size: $fz-xs;
      h5 {
        font-size: $fz-sm;
      }
    }
    > ul {
      > li {
        @include vertical-align(60px);
        &.active {
          background: linear-gradient($color-dark-blue, $color-blue);
          color: $font-color-dark-highlight;
        }
        &:hover {
          color: $font-color-dark-highlight;
        }
      }
    }
    #logout {
      width: 100%;
      background-color: $color-363d47;
      position: absolute;
      bottom: 0;
      @include vertical-align(60px);
    }
  }
</style>
