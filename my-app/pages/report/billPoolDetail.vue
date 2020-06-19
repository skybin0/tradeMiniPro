<template>
  <view>
    <!-- 	{{id}} -->
    <uni-list>
      <uni-list-item :show-arrow="false" title="票号 : " :rightText="data.stiffNo" />
      <uni-list-item :show-arrow="false" title="票据类型 : " :rightText="data.stiffTypeName" />
      <uni-list-item
        :show-arrow="false"
        title="票面金额 : "
        :rightText="$options.filters.formatAmount(data.stiffAmount)"
      />
      <uni-list-item
        :show-arrow="false"
        title="出票日期 : "
        :rightText="$options.filters.formatDate(data.ticketTime)"
      />
      <uni-list-item :show-arrow="false" title="开票费率 : " :rightText="data.stiffRate" />
      <uni-list-item :show-arrow="false" title="当前持票人 : " :rightText="data.currentCompName" />
      <uni-list-item :show-arrow="false" title="持票人银行 : " :rightText="data.currentBankName" />
      <uni-list-item :show-arrow="false" title="银行账户 : " :rightText="data.currentBankAccountName" />
      <uni-list-item :show-arrow="false" title="出票人 : " :rightText="data.outCompName" />
      <uni-list-item :show-arrow="false" title="出票人银行 : " :rightText="data.outBankName" />
      <uni-list-item :show-arrow="false" title="账号 : " :rightText="data.outBankAccountName" />
      <uni-list-item :show-arrow="false" title="收票人 : " :rightText="data.inCompName" />
      <uni-list-item :show-arrow="false" title="收票人银行 : " :rightText="data.inBankName" />
      <uni-list-item :show-arrow="false" title="账号 : " :rightText="data.inBankAccountName" />
      <uni-list-item :show-arrow="false" title="是否使用 : " rightText="否" />
      <uni-list-item
        :show-arrow="false"
        title="当前状态 : "
        :rightText="$options.filters.formatStatus(data.flagStatus)"
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
