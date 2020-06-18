<template>
  <view>
    <!-- 	{{id}} -->
    <uni-list>
      <uni-list-item :show-arrow="false" title="箱号 : " :rightText="data.containerNum" />
      <uni-list-item
        :show-arrow="false"
        title="重量 : "
        :rightText="$options.filters.formatWeight(data.cargoQuantitys)"
      />
      <uni-list-item :show-arrow="false" title="货品 : " :rightText="data.cargoName" />
      <uni-list-item :show-arrow="false" title="规格 : " :rightText="data.specification" />
      <uni-list-item :show-arrow="false" title="型号 : " :rightText="data.cargoModel" />
      <uni-list-item :show-arrow="false" title="品牌 : " :rightText="data.brand" />
      <uni-list-item :show-arrow="false" title="当前仓库 : " :rightText="data.warehouseName" />
      <uni-list-item :show-arrow="false" title="铝厂 : " :rightText="data.aluminumPlant" />
      <uni-list-item
        :show-arrow="false"
        title="采购价 : "
        :rightText="$options.filters.formatAmount(data.unitPrice)"
      />
      <uni-list-item :show-arrow="false" title="当前状态 : " :rightText="data.currentState" />
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
    this.TabCur = option.TabCur
    this.id = option.id
    uni.request({
      url:
        'http://192.168.3.166:8080/Trade/run/asset/history/detail/selectAssetHistory',
      method: 'post',
      header: { Cookie: uni.getStorageSync('sessionid') },
      data: { inventoryPkid: option.inventoryPkid },
      success: res => {
        this.data = res.data.obj.assetHistory
        if (this.data.cargoQuantityAvailable) {
          this.data.currentState = '可排货'
        } else if (this.data.quantityLock) {
          this.data.currentState = '已冻结'
        } else {
          this.data.currentState = '已出库'
        }
        // this.data.remark = this.data.remark === null ? '' : this.data.remark
      },
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
