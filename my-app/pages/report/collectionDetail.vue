<template>
  <view>
    <!-- 	{{id}} -->
    <uni-list>
      <uni-list-item
        :show-arrow="false"
        title="日期 : "
        :rightText="$options.filters.formatDate(data.billDate)"
      />
      <uni-list-item :show-arrow="false" title="收款客商 : " :rightText="data.saleName" />
      <uni-list-item :show-arrow="false" title="付款客商 : " :rightText="data.buyerName" />
      <uni-list-item
        :show-arrow="false"
        title="金额 : "
        :rightText="$options.filters.formatAmount(data.paymentAmounts)"
      />
      <uni-list-item :show-arrow="false" title="付款类型 : " :rightText="data.typePay" />
      <uni-list-item :show-arrow="false" title="合同类型 : " :rightText="data.categoryName" />
      <uni-list-item :show-arrow="false" title="部门 : " :rightText="data.organName" />
      <uni-list-item :show-arrow="false" title="单据申请人 : " :rightText="data.userName" />
      <uni-list-item
        :show-arrow="false"
        title="单据状态 : "
        :rightText="$options.filters.formatFinished(data.flagFinished)"
      />
    </uni-list>
  </view>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      data: {}
    }
  },
  onLoad(option) {
    this.data = JSON.parse(decodeURIComponent(option.item))
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
