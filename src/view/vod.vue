<template>
  <div>
    <div class="card ">
      <div class="card-header">
        视频录播
      </div>
      <div class="card-block">
        <div class="row" style="margin-bottom: 1rem">
          <div class="col-sm-3 ">
            <b-input-group  size="sm">
              <b-form-input v-model="filter" @keyup.enter.native="getVideos()"></b-form-input>
              <b-input-group-button slot="right">
                <b-btn variant="info" @click="getVideos()">Search</b-btn>
              </b-input-group-button>
            </b-input-group>
          </div>
          <div class="col-sm-3 offset-sm-6 ">
            <b-button-group class="float-right" size="sm">
              <b-button variant="success" @click="onAdd()">添加</b-button>
              <b-button variant="danger" @click="onRemove()" :disabled="!multipleSelection.length">删除</b-button>
            </b-button-group>
          </div>
        </div>
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
            label="视频ID"
            width="240"
            prop="id">
          </el-table-column>
          <el-table-column
            label="视频标题"
            width="240"
            prop="title">
          </el-table-column>
          <el-table-column
            label="描述"
            prop="description"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="预览(URL)"
            width="136">
            <template scope="scope"><a @click.prevent="url = scope.row.url;preview = true;"><img :src="scope.row.preview" alt=""></a></template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template scope="scope"><a href="javascript:void(0)" @click="onEdit(scope.row.id)"><i
              class="icon-note icons"></i></a></template>
          </el-table-column>
        </el-table>
        <b-pagination align="center" :total-rows="total" style="margin-top: 1rem" v-model="currentPage" :per-page="20">
        </b-pagination>

      </div>
    </div>
    <b-modal :title="'ID: ' + (data.id || '')" size="lg" class="modal-info" v-model="show" @ok="save(data.id)">
      <div role="group" v-if="!data.id" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>ID</span></label>
        <div class="col-sm-9"><input type="text" v-model="data.id" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>标题</span></label>
        <div class="col-sm-9"><input type="text" v-model="data.title" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>类型</span></label>
        <div class="col-sm-9">
          <b-form-select v-model="data.type"
            :options="['game', 'instant', 'performance', 'knowledge' ]" >
        </b-form-select>

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>链接(URL)</span></label>
        <div class="col-sm-9"><input type="url" v-model="data.url" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>预览(URL)</span></label>
        <div class="col-sm-9"><input type="url" v-model="data.preview" placeholder="" class="form-control">

        </div>
      </div>
      <div role="group" class="form-group row"><label class="col-form-label col-sm-2 text-right"><span>描述</span></label>
        <div class="col-sm-9"><textarea v-model="data.description" placeholder="" cols="20" rows="3" class="form-control"></textarea>

        </div>
      </div>
    </b-modal>
    <b-modal :title="url" size="lg" class="modal-info" v-model="preview" @hide="url=null">
      <video :src="url" v-if="url" controls autoplay></video>
    </b-modal>
  </div>
</template>

<script>
  import { get, put, del, encodeUrl } from '@/js/rest'
  const url = '/api/video'
  export default {
    mounted () {
      this.getVideos()
    },
    data () {
      return {
        filter: null,
        preview: false,
        show: false,
        loading: false,
        tableData: [],
        multipleSelection: [],
        data: {},
        currentPage: 1,
        total: 0,
        url: null
      }
    },
    methods: {
      onRemove () {
        return this.del(...this.multipleSelection.map((i) => i.id)).then(() => this.getVideos())
      },
      del (...ids) {
        let promise = Promise.resolve()
        for (let id = ids.shift(); id; id = ids.shift()) {
          promise = promise.then(() => del(url + encodeUrl`/${id}`))
        }
        return promise
      },
      save (id) {
        let data = {
          title: this.data.title,
          type: this.data.type,
          url: this.data.url,
          description: this.data.description,
          preview: this.data.preview}
        return put(url + encodeUrl`/${id}`, data)
          .then(() => { this.show = false }, () => { this.show = false })
          .then(this.getVideos.bind(this))
      },
      onEdit (id) {
        this.loading = true
        return get(url + encodeUrl`/${id}`).then(({data}) => {
          this.loading = false
          this.show = true
          this.data = data
        })
      },
      onAdd () {
        this.show = true
        this.data = {}
      },
      getVideos (page = 1) {
        this.loading = true
        return get('/api/videos/all', {page, filter: this.filter}).then(({data}) => {
          this.loading = false
          this.total = data.total
          this.tableData = data.videos
          return data
        }, (res) => {
          this.loading = false
          return res
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    },
    watch: {
      currentPage (page) {
        this.getVideos(page)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .cell {
    img {
      display: inline-block;
      width: (985px/10);
      height: (549px/10);
    }
  }
  .modal-body {
    video {
      width: 100%;
    }
  }
</style>
