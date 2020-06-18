<template>
  <view class="content">
    <view class="center-list">
      <navigator url="inventorySummary" hover-class="navigator-hover">
        <view class="center-list-item">
          <text class="list-icon">&#xe606;</text>
          <text class="list-text">库存汇总</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
    <view class="center-list">
      <navigator url="dailyInventory" hover-class="navigator-hover">
        <view class="center-list-item">
          <text class="list-icon">&#xe606;</text>
          <text class="list-text">每日库存明细</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
    <view class="center-list">
      <navigator url="assetResume" hover-class="navigator-hover">
        <view class="center-list-item border-bottom">
          <text class="list-icon">&#xe606;</text>
          <text class="list-text">资产履历</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
    <view class="center-list">
      <navigator url="cashPool" hover-class="navigator-hover">
        <view class="center-list-item">
          <text class="list-icon">&#xe701;</text>
          <text class="list-text">现金池</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
    <view class="center-list">
      <navigator url="billPool" hover-class="navigator-hover">
        <view class="center-list-item border-bottom">
          <text class="list-icon">&#xe701;</text>
          <text class="list-text">票据池</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
    <view class="center-list">
      <navigator url="payment" hover-class="navigator-hover">
        <view class="center-list-item">
          <text class="list-icon">&#xe670;</text>
          <text class="list-text">付款申请</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
    <view class="center-list">
      <navigator url="collection" hover-class="navigator-hover">
        <view class="center-list-item">
          <text class="list-icon">&#xe6b7;</text>
          <text class="list-text">收款通知</text>
          <text class="navigat-arrow">&#xe62b;</text>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
// import WucTab from '@/components/wuc-tab/wuc-tab.vue';
export default {
  // components: { WucTab },
  data() {
    return {
      list: [],
      TabCur: 0,
      tabList: [{ name: '待审批' }, { name: '已同意' }, { name: '已驳回' }]
    }
  },
  onLoad() {
    uni.request({
      url: 'https://unidemo.dcloud.net.cn/api/news',
      method: 'GET',
      data: {},
      success: res => {
        console.log(res)
        this.list = res.data
      },
      fail: () => {},
      complete: () => {}
    })
  },
  methods: {
    openReport(e) {
      // console.log(e)
      // let id = e.currentTarget.dataset.id
      uni.navigateTo({
        // url: '../detail/detail?id='+id
        url: './inventory'
      })
    },
    openInventory(e) {
      uni.navigateTo({
        url: './inventory'
      })
    },
    openCash(e) {
      uni.navigateTo({
        url: './cash'
      })
    },
    openPayment(e) {
      uni.navigateTo({
        url: './payment'
      })
    },
    openCollection(e) {
      uni.navigateTo({
        url: './collection'
      })
    },
    tabChange(index) {
      this.TabCur = index
      console.log(this.TabCur, 'sss')
    }
  }
}
</script>

<style lang="scss">
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
.home-header {
  height: 100px;
  background-color: #ffffff;
  margin: 20upx;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.home-header .btn {
  width: 50px;
  height: 50px;

  border-radius: 50%;
}
.home-header .btn1 {
  background-color: #ccccff;
}
.home-header .btn2 {
  background-color: #ccffcc;
}
.home-header .btn3 {
  background-color: #ff88c2;
}
@font-face {
  font-family: texticons;
  font-weight: normal;
  font-style: normal;
  src: url('//at.alicdn.com/t/font_1801650_kjk887fh3yk.ttf') format('truetype');
}
.center-list {
  background-color: #ffffff;
  margin-top: 20upx;
  width: 750upx;
  flex-direction: column;
}

.center-list-item {
  height: 100upx;
  width: 750upx;
  box-sizing: border-box;
  flex-direction: row;
  padding: 0upx 20upx;
}

.border-bottom {
  border-bottom-width: 1upx;
  border-color: #c8c7cc;
  border-bottom-style: solid;
}

.list-icon {
  height: 100upx;
  line-height: 100upx;
  width: 40upx;
  font-size: 40upx;
  color: #898989;
  text-align: center;
  font-family: texticons;
  margin-right: 30upx;
}

.list-text {
  height: 100upx;
  line-height: 100upx;
  font-size: 34upx;
  color: #555;
  flex: 1;
  text-align: left;
}

.navigat-arrow {
  height: 100upx;
  line-height: 100upx;
  width: 40upx;
  font-size: 34upx;
  color: #555;
  text-align: right;
  font-family: texticons;
  float: right;
}
.content > .center-list:nth-child(1),
.content > .center-list:nth-child(5) {
  .list-icon {
    color: #fa9d3b;
  }
}
.content > .center-list:nth-child(2),
.content > .center-list:nth-child(6) {
  .list-icon {
    color: #1677d2;
  }
}
.content > .center-list:nth-child(3),
.content > .center-list:nth-child(7) {
  .list-icon {
    color: #20c5c1;
  }
}
.content > .center-list:nth-child(4),
.content > .center-list:nth-child(8) {
  .list-icon {
    color: #fe0021;
  }
}
</style>
