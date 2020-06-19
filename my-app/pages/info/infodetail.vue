<template>
  <view>
    <!-- 	{{id}} -->
    <uni-list>
      <uni-list-item :show-arrow="false" title="单据号 : " :rightText="data.containerNum" />
      <uni-list-item :show-arrow="false" title="单据日期 : " :rightText="data.cargoName" />
      <uni-list-item :show-arrow="false" title="部门 : " :rightText="data.specification" />
      <uni-list-item :show-arrow="false" title="业务员 : " :rightText="data.cargoModel" />
      <uni-list-item :show-arrow="false" title="审核日期 : " :rightText="data.brand" />
      <uni-list-item :show-arrow="false" title="付款公司 : " :rightText="data.warehouseName" />
      <uni-list-item :show-arrow="false" title="收款公司 : " :rightText="data.aluminumPlant" />
      <uni-list-item :show-arrow="false" title="收款公司电话 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="收款公司税号 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="银行账号 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="开户银行 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="合同总金额 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="币种 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="付款方式 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="付款类型 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="本次预计付款 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="银行行号 : " :rightText="data.currentState" />
      <uni-list-item :show-arrow="false" title="备注 : " :rightText="data.currentState" />
    </uni-list>
  </view>
</template>

<script>
export default {
  props: ['pkId', 'billPkid'],
  data() {
    return {
      data: {}
    }
  },
  onLoad(option) {
    this.TabCur = option.TabCur
    this.pkId = option.pkId
    uni.request({
      url: 'http://192.168.3.166:8080/Trade/co/payment/goConfirmDetail',
      method: 'get',
      header: {
        Cookie: uni.getStorageSync('sessionid'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { pkId: option.billPkid },
      success: res => {
        console.log(res)
        // this.data = res.data.obj.m
      },
      fail: () => {},
      complete: () => {}
    })
    uni.request({
      url: 'http://192.168.3.166:8080/Trade/sys/index/read',
      method: 'post',
      header: {
        Cookie: uni.getStorageSync('sessionid'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { pk: option.pkId },
      success: res => {},
      fail: () => {},
      complete: () => {}
    })
  },
  methods: {}
}
</script>

<style>
.btn {
  width: 750upx;
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 80px;
  background-color: #fff;
  z-index: 9999;
}

.btn button {
  width: 300upx;
  height: 50px;
}
</style>
