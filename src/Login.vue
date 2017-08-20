<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-block">
                <h1>登录</h1>
                <p class="text-muted">登录账号</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" placeholder="手机号" v-model.trim="phoneNum">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" placeholder="密码" v-model.trim="password">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="login(phoneNum, password)">登录</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0">忘记密码?</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-inverse card-primary py-5 d-md-down-none" style="width:44%">
              <div class="card-block text-center">
                <div>
                  <h2>注册</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <router-link tag="button" class="btn btn-primary active mt-3" type="button" :to="{path: '/register'}" >立即注册</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rest, { encodeUrl } from '@/js/rest'
import cookie from '@/js/cookie'
import {Base64 as base64} from 'js-base64'

export default {
  name: 'Login',
  data () {
    return {
      phoneNum: '',
      password: ''
    }
  },
  beforeCreate () {
    const token = cookie.get('token')
    if (token) {
      this.$router.replace('/')
    }
  },
  methods: {
    login (phoneNum, password) {
      return rest('post', encodeUrl`/api/login3/${phoneNum}/${base64.encode(password)}`).then(res => {
        if (res.data && res.data.token) {
          cookie.set('token', res.data.token, 24 * 30)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
