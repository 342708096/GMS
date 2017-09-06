import 'scss/style.scss'

import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import {Table, TableColumn, Loading} from 'element-ui'
import 'element-ui/lib/theme-default/table.css'
import 'element-ui/lib/theme-default/table-column.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

