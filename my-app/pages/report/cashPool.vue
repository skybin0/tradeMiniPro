<template>
  <view class="content">
    <!-- 列表 -->
    <uni-list>
      <uni-list-item
        v-for="item in list"
        :title="'账号 : '+item.bankAccount"
        :note="'开户行 : '+item.bankFullName+'\\n所属行 : '+item.bankFullName+'\\n开户公司 : '+item.customerName+'\\n账户类别 : '+$options.filters.formatStyle(item.accountStyle)+'\\n银行存款 : '+$options.filters.formatAmount(item.accountBalance)"
        :data-id="1"
      />
    </uni-list>
    <!-- 上拉加载 -->
    <uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
  </view>
</template>
<script>
var _self
var canvaLineA = null
var lastMoveTime = null //最后执行移动的时间戳
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
export default {
  components: {
    uniLoadMore
  },
  data() {
    return {
      TabCur: 0,
      list: [],
      last_id: '',
      reload: false,
      status: 'more',
      contentText: {
        contentdown: '上拉加载更多',
        contentrefresh: '加载中',
        contentnomore: '没有更多'
      },
      query: {
        currentPage: 1,
        pageSize: 30
      }
    }
  },
  onLoad() {
    this.getList()
  },
  onPullDownRefresh() {
    this.reload = true
    this.last_id = ''
    this.getList()
  },
  onReachBottom() {
    this.status = 'more'
    this.getList()
  },
  methods: {
    getList() {
      if (this.last_id) {
        //说明已有数据，目前处于上拉加载
        this.status = 'loading'
        this.query.currentPage = this.last_id + 1
      }
      uni.request({
        url: 'http://192.168.2.203:8000/Bankroll/baseinfo/getBanksxh',
        method: 'get',
        header: {
          Cookie: uni.getStorageSync('sessionid'),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: this.query,
        success: res => {
          if (res.data.items) {
            let data = res.data.items
            this.list = this.reload ? data : this.list.concat(data)
            this.last_id = this.query.currentPage
            this.reload = false
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    tabChange(index) {
      this.TabCur = index
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
