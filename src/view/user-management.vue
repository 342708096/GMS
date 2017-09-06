<template>
  <div>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#">企业管理</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">用户认证</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">企业用户</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="nickname">
        </el-table-column>
        <el-table-column
          prop="datetime"
          label="注册日期"
          width="240">
        </el-table-column>
        <el-table-column
          label="角色"
          width="120"
          show-overflow-tooltip>
          <template scope="scope">{{renderRole(scope.row.priv)}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope"><a href="javascript:void(0)" @click="onEdit(scope.row.id)"><i
            class="icon-note icons"></i></a></template>
        </el-table-column>
      </el-table>


    </div>
  </div>
  <b-modal title="Modal title" size="lg" class="modal-info" v-model="show" @ok="save(userData.id)">
    <div class="container-fluid">
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>ID</span></label>
        <div class="col-sm-9"><input disabled :value="userData.id" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>头像</span></label>
        <div class="col-sm-9"><input type="text" :value="userData.avatar" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>昵称</span></label>
        <div class="col-sm-9"><input type="text" :value="userData.nickname" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>权限</span></label>
        <div class="col-sm-9"><input type="number" :value="userData.priv" placeholder="" class="form-control">

        </div>
      </div>
    </div>
  </b-modal>
  </div>
</template>

<script>
  import { get, put, encodeUrl } from '@/js/rest'
  const url = '/api/user'
  export default {
    mounted () {
      this.getUsers().then((data) => {
        console.log(data)
        this.tableData = data.users
      })
    },
    data () {
      return {
        show: false,
        loading: false,
        tableData: [],
        multipleSelection: [],
        userData: {}
      }
    },

    methods: {
      save (id) {
        return put(url + encodeUrl`/${id}`,
          {info: this.userData.info, nickname: this.userData.nickname})
          .then(() => { this.show = false }, () => { this.show = false })
      },
      onEdit (id) {
        this.loading = true
        return get(url + encodeUrl`/${id}`).then((data) => {
          this.loading = false
          this.show = true
          this.userData = data
        })
      },
      renderRole (priv) {
        if (priv <= 0) {
          return '被禁用'
        }
        if (priv >= 3) {
          return 'Super Admin'
        }
        switch (priv) {
          case 1:
            return '普通用户'
          case 2:
            return 'Admin'
        }
        return null
      },
      getUsers () {
        this.loading = true
        return get('/api/users').then((res) => {
          this.loading = false
          return res
        }, (res) => {
          this.loading = false
          return res
        })
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
