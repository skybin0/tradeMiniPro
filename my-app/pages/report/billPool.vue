<template>
  <view class="content">
    <uni-list>
      <uni-list-item
        v-for="item in list"
        @tap="openDetail(item)"
        :title="item.stiffNo"
        :note="item.stiffTypeName"
        :rightText="$options.filters.formatAmount(item.stiffAmount)"
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
        url: 'http://192.168.2.203:8000/Bankroll/stiffxh/getStiffPoolxh',
        method: 'get',
        header: { Cookie: uni.getStorageSync('sessionid') },
        data: {
          pageSize: 30,
          currentPage: 1,
          areaType: '',
          outCompName: '',
          outBank: '',
          accountStyleOut: ''
        },
        success: res => {
          this.list = []
          if (res.data.data) {
            this.list = res.data.data
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    openDetail(item) {
      uni.navigateTo({
        url:
          './billPoolDetail?TabCur=' +
          this.TabCur +
          '&item=' +
          encodeURIComponent(JSON.stringify(item))
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
