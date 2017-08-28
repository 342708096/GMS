<template>
  <button type="button" class="btn" :class="{'btn-primary': !time}" :disabled="!!time" @click="onClick()">{{text}}</button>
</template>
<script>
  export default {
    name: 'SendCodeButton',
    props: {
      waitTime: {
        type: Number,
        default: 60
      }
    },
    data () {
      return {
        time: 0
      }
    },
    computed: {
      text () {
        return this.time ? `(${this.time}) 秒后重发` : '发送验证码'
      }
    },
    methods: {
      onClick () {
        if (this.time) {
          return
        }
        this.$emit('send')
        this.time = this.waitTime
        let clear = setInterval(() => {
          this.time--
          if (this.time === 0) {
            clearInterval(clear)
          }
        }, 1000)
      }
    }
  }
</script>
