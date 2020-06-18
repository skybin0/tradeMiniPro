<template>
  <view class="content">
    <uni-list>
      <uni-list-item
        v-for="item in list"
        @tap="openDetail(item)"
        :title="item.saleName+' ⇦ '+item.buyerName"
        :note="$options.filters.formatDate(item.billDate)"
        :rightText="$options.filters.formatAmount(item.paymentAmounts)"
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
        url:
          'http://192.168.3.166:8080/Trade/co/coReport/receiptNotice/listByPage',
        method: 'post',
        header: { Cookie: uni.getStorageSync('sessionid') },
        data: {
          pageSize: 30,
          pageNum: 1,
          currentCustomerPkid: 'YZ00001',
          otherCustomerPkid: '',
          dateFrom: '2019-06-01',
          dateTo: '2020-06-16',
          flagFinished: '',
          payReceiptType: '',
          departPkid: '',
          empPkid: ''
        },
        success: res => {
          this.list = []
          if (res.data.obj) {
            this.list = res.data.obj.list.results
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    openDetail(item) {
      uni.navigateTo({
        url:
          './collectionDetail?TabCur=' +
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
