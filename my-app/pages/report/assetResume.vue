<template>
  <view class="content">
    <uni-list>
      <uni-list-item
        v-for="item in list"
        @tap="openDetail(item)"
        :title="'箱号 : '+item.containerNum"
        :rightText="'货品 : '+item.cargoName"
        :data-id="1"
      />
    </uni-list>
  </view>
</template>
<script>
var _self
var canvaLineA = null
var lastMoveTime = null //最后执行移动的时间戳
export default {
  data() {
    return {
      list: [],
      TabCur: 0
    }
  },
  onLoad() {
    this.listByPage()
  },
  methods: {
    listByPage() {
      uni.request({
        url: 'http://192.168.3.166:8080/Trade/run/asset/history/selectByPageC',
        method: 'post',
        header: { Cookie: uni.getStorageSync('sessionid') },
        data: {
          pageSize: 30,
          pageNum: 1,
          warehousePkid: '',
          customerPkid: 'YZ00001',
          yearStr: '2020',
          monthStr: '06',
          brand: '',
          containerNum: '',
          bdmCategoryPkid: '',
          cargoStatus: 10
        },
        success: res => {
          this.list = []
          if (res.data.obj) {
            this.list = res.data.obj.pages.results
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    openDetail(item) {
      uni.navigateTo({
        url:
          './assetResumeDetail?TabCur=' +
          this.TabCur +
          '&inventoryPkid=' +
          item.inventoryPkid
      })
    },
    tabChange(index) {
      this.TabCur = index
      console.log(this.TabCur, 'this.TabCur')
    }
  }
}
</script>

<style>
.uni-media-list-body {
  height: auto;
}
.uni-media-list-text-top {
  line-height: 1.6em;
}
._div {
  display: flex;
  justify-content: space-between;
}
.wuc-tab-item {
  width: 30%;
  text-align: center;
}
</style>
