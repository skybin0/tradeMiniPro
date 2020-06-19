<template>
  <view class="content">
    <!-- 查询 -->
    <form @submit="formSubmit">
      <view class="uni-form-item uni-column">
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">付款公司</view>
            <view class="uni-list-cell-db">
              <input class="uni-input" v-model="query.currentCustomerPkid" placeholder="付款公司" />
            </view>
          </view>
        </view>
      </view>
      <view class="uni-form-item uni-column">
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">开始日期</view>
            <view class="uni-list-cell-db">
              <picker
                mode="date"
                :value="date"
                :start="startDate"
                :end="endDate"
                @change="dateFromChange"
              >
                <view class="uni-input">{{query.dateFrom}}</view>
              </picker>
            </view>
          </view>
        </view>
      </view>
      <view class="uni-form-item uni-column">
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">结束日期</view>
            <view class="uni-list-cell-db">
              <picker
                mode="date"
                :value="date"
                :start="startDate"
                :end="endDate"
                @change="dateToChange"
              >
                <view class="uni-input">{{query.dateTo}}</view>
              </picker>
            </view>
          </view>
        </view>
      </view>
      <view class="uni-btn-v">
        <button form-type="submit">查询</button>
      </view>
    </form>
    <!-- 列表 -->
    <uni-list>
      <uni-list-item
        v-for="item in list"
        @tap="openDetail(item)"
        :title="item.buyerName+' ⇨ '+item.saleName"
        :note="$options.filters.formatDate(item.billDate)"
        :rightText="$options.filters.formatAmount(item.paymentAmounts)"
        :data-id="1"
      />
    </uni-list>
    <!-- 上拉加载 -->
    <uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
  </view>
</template>
<script>
function getDate(type) {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (type === 'start') {
    year = year - 60
  } else if (type === 'end') {
    year = year + 2
  }
  month = month > 9 ? month : '0' + month
  day = day > 9 ? day : '0' + day
  return `${year}-${month}-${day}`
}
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
        pageNum: 1,
        pageSize: 30,
        currentCustomerPkid: 'YZ00001',
        dateFrom: '2020-06-01',
        dateTo: getDate({ format: true })
      },
      startDate: getDate('start'),
      endDate: getDate('end')
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
    // 表单
    dateFromChange(e) {
      this.query.dateFrom = e.target.value
    },
    dateToChange(e) {
      this.query.dateTo = e.target.value
    },
    formSubmit(e) {
      console.log(e.detail.value)
      this.query.pageNum = 1
      this.last_id = ''
      this.getList()
    },
    // 列表
    getList() {
      if (this.last_id) {
        //说明已有数据，目前处于上拉加载
        this.status = 'loading'
        this.query.pageNum = this.last_id + 1
      }
      uni.request({
        url:
          'http://192.168.3.166:8080/Trade/co/coReport/paymentNotice/listByPage',
        method: 'post',
        header: {
          Cookie: uni.getStorageSync('sessionid'),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: this.query,
        success: res => {
          if (res.data.obj) {
            let data = res.data.obj.list.results
            this.list = this.reload ? data : this.list.concat(data)
            this.last_id = this.query.pageNum
            this.reload = false
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    openDetail(item) {
      uni.navigateTo({
        url:
          './paymentDetail?TabCur=' +
          this.TabCur +
          '&item=' +
          encodeURIComponent(JSON.stringify(item))
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
