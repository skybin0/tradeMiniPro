<template>
  <view class="content">
    <uni-list>
      <uni-list-item
        v-for="item in list"
        :title="'账号 : '+item.bankAccount"
        :note="'开户行 : '+item.bankFullName+'\\n所属行 : '+item.bankFullName+'\\n开户公司 : '+item.customerName+'\\n账户类别 : '+$options.filters.formatStyle(item.accountStyle)+'\\n银行存款 : '+$options.filters.formatAmount(item.accountBalance)"
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
        url: 'http://192.168.2.203:8000/Bankroll/baseinfo/getBanksxh',
        method: 'get',
        header: {
          Cookie: uni.getStorageSync('sessionid')
        },
        data: {
          pageSize: 30,
          currentPage: 1
        },
        success: res => {
          this.list = []
          if (res.data.items) {
            this.list = res.data.items
          }
        },
        fail: () => {},
        complete: () => {}
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
