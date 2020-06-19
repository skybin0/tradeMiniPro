<template>
  <view class="content">
    <view class="example-body">
      <view
        class="word-btn draw-cotrol-btn"
        hover-class="word-btn--hover"
        :hover-start-time="20"
        :hover-stay-time="70"
        @click="showDrawer('showLeft')"
      >
        <text class="word-btn-white">添加查询条件</text>
      </view>
      <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
        <form @submit="formSubmit">
          <view class="uni-form-item uni-column">
            <view class="uni-list">
              <view class="uni-list-cell">
                <view class="uni-list-cell-left">当前公司</view>
                <view class="uni-list-cell-db">
                  <!-- <input class="uni-input" v-model="query.currentCustomerPkid" placeholder="付款公司" /> -->
                  <picker @change="compChange" :value="index" :range="array" range-key="name">
                    <view class="uni-input">{{array[index].name}}</view>
                  </picker>
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
          <!-- <view class="uni-btn-v">
            <button form-type="submit">查询</button>
          </view>-->
        </form>
        <view class="close">
          <view
            class="word-btn"
            hover-class="word-btn--hover"
            :hover-start-time="20"
            :hover-stay-time="70"
            @click="closeDrawer('showLeft')"
          >
            <text class="word-btn-white">查询</text>
          </view>
        </view>
      </uni-drawer>
    </view>
    <!-- 列表 -->
    <uni-list>
      <uni-list-item
        v-for="item in list"
        @tap="openDetail(item)"
        :title="'箱号 : '+item.containerNum"
        :rightText="'货品 : '+item.cargoName"
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
      showRight: false,
      showLeft: false,
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
        customerPkid: 'YZ00001',
        yearStr: '2020',
        monthStr: '06',
        dateFrom: '2020-06-01',
        dateTo: getDate({ format: true })
      },
      startDate: getDate('start'),
      endDate: getDate('end'),
      index: 0,
      array: [
        { name: '上海鑫抚源', id: 'YZ00001' },
        {
          name: '大连晨茂源',
          id: 'e5f6344c35904ed6851a6bd04f904078'
        },
        {
          name: '上海大业永顺',
          id: '7660ec5302d240d4a4ae84043c185414'
        },
        {
          name: '天津万鑫',
          id: '8c3e0ab60eda4780b2d33acddd11bf88'
        },
        {
          name: '南通钥鑫',
          id: 'd6f91e1c383c4ef68cd78c7a39e637c0'
        },
        {
          name: '南通钧鉴',
          id: 'dcc5143fd48943ab94e11dcf8ba83b93'
        },
        {
          name: '南通钧炬',
          id: '64c2cdd2e77141c59c26dbcbc00de7ea'
        }
      ]
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
  onNavigationBarButtonTap(e) {
    if (this.showLeft) {
      this.$refs.showLeft.close()
    } else {
      this.$refs.showLeft.open()
    }
  },
  // app端拦截返回事件 ，仅app端生效
  onBackPress() {
    if (this.showRight || this.showLeft) {
      this.$refs.showLeft.close()
      this.$refs.showRight.close()
      return true
    }
  },
  methods: {
    confirm() {},
    // 打开窗口
    showDrawer(e) {
      this.$refs[e].open()
    },
    // 关闭窗口
    closeDrawer(e) {
      this.$refs[e].close()
      this.formSubmit()
    },
    // 抽屉状态发生变化触发
    change(e, type) {
      console.log(
        (type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭')
      )
      this[type] = e
    },
    // 表单
    // dateFromChange(e) {
    //   this.query.yearStr = e.target.value
    // },
    // dateToChange(e) {
    //   this.query.monthStr = e.target.value
    // },
    dateFromChange(e) {
      this.query.dateFrom = e.target.value
    },
    dateToChange(e) {
      this.query.dateTo = e.target.value
    },
    compChange(e) {
      this.index = e.detail.value
      this.query.customerPkid = this.array[this.index].id
    },
    formSubmit() {
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
        url: 'http://192.168.3.166:8080/Trade/run/asset/history/selectByPageC',
        method: 'post',
        header: {
          Cookie: uni.getStorageSync('sessionid'),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: this.query,
        success: res => {
          if (res.data.obj) {
            let data = res.data.obj.pages.results
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
          './assetResumeDetail?TabCur=' +
          this.TabCur +
          '&inventoryPkid=' +
          item.inventoryPkid
      })
    },
    tabChange(index) {
      this.TabCur = index
    }
  }
}
</script>

<style>
/* 头条小程序组件内不能引入字体 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  font-weight: normal;
  font-style: normal;
  src: url('~@/static/uni.ttf') format('truetype');
}

/* #endif */

/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

view {
  font-size: 14px;
  line-height: inherit;
}

.example {
  padding: 0 15px 15px;
}

.example-info {
  padding: 15px;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  font-size: 14px;
  background-color: #ffffff;
}

/* #endif */
.example {
  padding: 0 15px;
}

.example-info {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 15px;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 20px;
}

.example-info-text {
  font-size: 14px;
  line-height: 20px;
  color: #3b4144;
}

.example-body {
  flex-direction: column;
  padding: 15px;
  background-color: #ffffff;
}

.word-btn-white {
  font-size: 18px;
  color: #263b63;
}

.word-btn {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 48px;
  margin: 15px;
  background-color: #f3f3f3;
}

.word-btn--hover {
  background-color: #f3f3f3;
}

.header {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: 10px 15px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #f5f5f5;
  border-top-style: solid;
  background-color: #ffffff;
}

.input-view {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  flex-direction: row;
  background-color: #e7e7e7;
  height: 30px;
  border-radius: 15px;
  padding: 0 10px;
  flex: 1;
  background-color: #f5f5f5;
}

.uni-drawer-info {
  background-color: #ffffff;
  padding: 15px;
  padding-top: 5px;
  color: #3b4144;
}

.uni-padding-wrap {
  padding: 0 15px;
  line-height: 1.8;
}

.input {
  flex: 1;
  padding: 0 5px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  background-color: transparent;
}

.close {
  padding: 15px;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: 0;
}

.draw-cotrol-btn {
  flex: 1;
}

.info {
  padding: 15px;
  color: #666;
}

.info-text {
  font-size: 14px;
  color: #666;
}

.scroll-view {
  /* #ifndef APP-NVUE */
  width: 100%;
  height: 100%;
  /* #endif */
  flex: 1;
}

/* 处理抽屉内容滚动 */
.scroll-view-box {
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.info-content {
  padding: 5px 15px;
}

/* *************************** */
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
