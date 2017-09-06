<template>
  <div>
  <div class="card ">
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
          <template scope="scope"><a href="javascript:void(0)" @click="onEdit(scope.row.id, scope.row)"><i
            class="icon-note icons"></i></a></template>
        </el-table-column>
      </el-table>
      <b-pagination align="center" :total-rows="total" style="margin-top: 1rem" v-model="currentPage" :per-page="20">
      </b-pagination>

    </div>
  </div>
  <b-modal :title="'ID: ' + userData.id" size="lg" class="modal-info" v-model="show" @ok="save(userData.id)">
    <div class="container-fluid">
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>头像</span></label>
        <div class="col-sm-9"><input type="text" :value="userData.avatar" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>昵称</span></label>
        <div class="col-sm-9"><input type="text" v-model="userData.nickname" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>权限</span></label>
        <div class="col-sm-9"><input type="number" :value="userData.priv" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>介绍</span></label>
        <div class="col-sm-9"><textarea v-model="userData.info" placeholder="" cols="20" rows="3" class="form-control"></textarea>

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
      this.getUsers()
    },
    data () {
      return {
        show: false,
        loading: false,
        tableData: [],
        multipleSelection: [],
        userData: {},
        curRow: {},
        currentPage: 1,
        total: 0
      }
    },

    methods: {
      save (id) {
        let data = {info: this.userData.info, nickname: this.userData.nickname}
        return put(url + encodeUrl`/${id}`, data)
          .then(() => { Object.assign(this.curRow, data); this.show = false }, () => { this.show = false })
      },
      onEdit (id, row) {
        this.loading = true
        this.curRow = row
        return get(url + encodeUrl`/${id}`).then(({data}) => {
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
      getUsers (page = 1) {
        this.loading = true
        return get('/api/users', {page}).then(({data}) => {
          this.loading = false
          this.total = data.total
          this.tableData = data.users
          return data
        }, (res) => {
          this.loading = false
          return res
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
