<template>
  <view class="qiun-columns">
    <!--#ifdef H5 -->
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt">
      <view class="qiun-title-dot-light">页面地址</view>
    </view>
    <view class="qiun-bg-white qiun-padding">
      <text>pages/basic/column/stack</text>
    </view>
    <!--#endif-->
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt">
      <view class="qiun-title-dot-light">每日库存明细</view>
    </view>
    <view class="qiun-charts-rotate">
      <!--#ifdef MP-ALIPAY -->
      <canvas
        canvas-id="canvasColumnStack"
        id="canvasColumnStack"
        class="charts-rotate"
        :width="cWidth2*pixelRatio"
        :height="cHeight2*pixelRatio"
        :style="{'width':cWidth2+'px','height':cHeight2+'px'}"
        @touchstart="touchColumn"
      ></canvas>
      <!--#endif-->
      <!--#ifndef MP-ALIPAY -->
      <canvas
        canvas-id="canvasColumnStack"
        id="canvasColumnStack"
        class="charts-rotate"
        @touchstart="touchColumn"
      ></canvas>
      <!--#endif-->
    </view>
    <!--#ifdef H5 -->
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt">
      <view class="qiun-title-dot-light">标准数据格式</view>
    </view>
    <view class="qiun-bg-white qiun-padding">
      <textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea" />
    </view>
    <view class="qiun-text-tips">Tips：修改后点击更新图表</view>
    <button class="qiun-button" @tap="changeData()">更新图表</button>
    <!--#endif-->
  </view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js'
import { isJSON } from '@/common/checker.js'
var _self
var canvaColumn = null
export default {
  data() {
    return {
      cWidth2: '',
      cHeight2: '',
      pixelRatio: 1,
      textarea: '',
      query: {
        pageNum: 1,
        pageSize: 30,
        customerPkid: 'YZ00001',
        yearStr: '2020',
        monthStr: '06'
      }
    }
  },
  onLoad() {
    _self = this
    //#ifdef MP-ALIPAY
    uni.getSystemInfo({
      success: function(res) {
        if (res.pixelRatio > 1) {
          //正常这里给2就行，如果pixelRatio=3性能会降低一点
          //_self.pixelRatio =res.pixelRatio;
          _self.pixelRatio = 2
        }
      }
    })
    //#endif
    this.cWidth2 = uni.upx2px(700)
    this.cHeight2 = uni.upx2px(1100)
    this.getServerData()
  },
  methods: {
    getServerData() {
      uni.request({
        url: 'http://192.168.3.166:8080/Trade/run/stat/inventory/selectByPageC',
        method: 'post',
        header: {
          Cookie: uni.getStorageSync('sessionid'),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: this.query,
        success: function(res) {
          let ColumnStack = { categories: [], series: [] }
          //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
          // ColumnStack.categories = [
          //   '辽宁兰德',
          //   '辽宁亿泽',
          //   '忠旺集团',
          //   '弘丰铝业',
          //   '荣新金属材料',
          //   '锦文贸融供应链'
          // ]
          // ColumnStack.series = [
          //   {
          //     name: '中外运张华浜库',
          //     data: [15.45, 20.248, 45.679, 37.679, 43.5679, 34.4324]
          //   },
          //   {
          //     name: '广东中金小塘西库',
          //     data: [15.45, 20.248, 45.679, 37.679, 43.5679, 34.4324]
          //   },
          //   {
          //     name: '广东南储小塘西库',
          //     data: [15.45, 20.248, 45.679, 37.679, 43.5679, 34.4324]
          //   }
          // ]
          ColumnStack.categories = [
            '现有库存',
            '上期结存',
            '本期入库',
            '本期出库',
            '本期在途',
            '可派货量'
          ]
          let list = res.data.obj.pages.results
          list.forEach((obj, index) => {
            ColumnStack.series.push({
              name: obj.warehouseName,
              data: [
                obj.currentBalance,
                obj.lastBalance,
                obj.currentIn,
                obj.currentOut,
                obj.currentRoute,
                obj.canPlan
              ]
            })
          })
          console.log('ColumnStack.series', ColumnStack.series)
          _self.textarea = JSON.stringify(ColumnStack)
          _self.showColumnStack('canvasColumnStack', ColumnStack)
        },
        fail: () => {
          _self.tips = '网络错误，小程序端请检查合法域名'
        }
      })
    },
    showColumnStack(canvasId, chartData) {
      canvaColumn = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        padding: [15, 15, 0, 15],
        legend: {
          show: true,
          padding: 5,
          lineHeight: 11,
          margin: 0
        },
        rotate: true,
        // #ifdef MP-ALIPAY
        rotateLock: true, //百度及支付宝需要锁定旋转
        // #endif
        fontSize: 11,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          //disabled:true
        },
        dataLabel: false,
        width: _self.cWidth2 * _self.pixelRatio,
        height: _self.cHeight2 * _self.pixelRatio,
        extra: {
          column: {
            type: 'stack',
            width:
              (_self.cWidth2 * _self.pixelRatio * 0.5) /
              chartData.categories.length
          }
        }
      })
    },
    touchColumn(e) {
      canvaColumn.touchLegend(e)
      canvaColumn.showToolTip(e, {
        format: function(item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      })
    },
    changeData() {
      if (isJSON(_self.textarea)) {
        let newdata = JSON.parse(_self.textarea)
        canvaColumn.updateData({
          series: newdata.series,
          categories: newdata.categories
        })
      } else {
        uni.showToast({
          title: '数据格式错误',
          image: '../../../static/images/alert-warning.png'
        })
      }
    }
  }
}
</script>

<style>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
  width: 750upx;
  height: 500upx;
  background-color: #ffffff;
}

.charts {
  width: 750upx;
  height: 500upx;
  background-color: #ffffff;
}
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts-rotate {
  width: 700upx;
  height: 1100upx;
  background-color: #ffffff;
  padding: 25upx;
}

.charts-rotate {
  width: 700upx;
  height: 1100upx;
  background-color: #ffffff;
}
</style>
