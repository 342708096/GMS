<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-4">
            <div class="card-block p-4">
              <h1>注册GMS</h1>
              <p class="text-muted">注册用户</p>
              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-phone"></i></span>
                <input type="text" class="form-control" placeholder="手机号" v-model.trim="phoneNum">
                <span class="input-group-btn"><send @send="getCode(phoneNum)"></send></span>
            </div>

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-key"></i></span>
                <input type="text" class="form-control" placeholder="验证码" v-model.trim="code">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control" placeholder="密码" v-model.trim="password">
              </div>

              <div class="input-group mb-4">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control" placeholder="确认密码" v-model.trim="repeat">
              </div>

              <button type="button" class="btn btn-block btn-success" @click="register(phoneNum, code, password)">创建用户</button>
            </div>
            <div class="card-footer p-4">
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                </div>
                <div class="col-6">
                  <button class="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
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
import rest, { encodeUrl} from '@/js/rest'
import cookie from '@/js/cookie'
import { Base64 as base64 } from 'js-base64'
import Send from '@/components/SendCodeButton'

export default {
  name: 'Register',
  components: {Send},
  data () {
    return {
      phoneNum: '',
      code: '',
      password: '',
      repeat: ''
    }
  },
  methods: {
    register (phoneNum, code, password) {
      password = base64.encode(password)
      return rest('post', encodeUrl`/api/login/${phoneNum}/${code}`, null, {password}).then((response) => {
        response.data && cookie.set('token', response.data.token, 24 * 30)
        this.$router.push('/')
      })
    },
    getCode (phoneNum) {
      return rest('post', encodeUrl`/api/sendcode/${phoneNum}`)
    }
  }
}
</script>
