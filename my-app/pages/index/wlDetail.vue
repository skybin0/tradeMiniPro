<template>
	<view>
<!-- 	{{id}} -->
	<uni-list>
		<uni-list-item :show-arrow="false" title="单据号:SHXFY-P-20200313-0001" />
		<uni-list-item :show-arrow="false" title="单据日期:2020-03-13" />
		<uni-list-item :show-arrow="false" title="部门:现货部" />
		<uni-list-item :show-arrow="false" title="业务员:纪天宇" />
		<uni-list-item :show-arrow="false" title="付款公司:上海鑫抚源国际贸易有限公司" />
		<uni-list-item :show-arrow="false" title="收款公司:上海欧冶资源电子商务有限公司" />
		<uni-list-item :show-arrow="false" title="合同总金额:20,151,289.42" />
		<uni-list-item :show-arrow="false" title="本次预计付款:17,201,197.76" />
		<uni-list-item :show-arrow="false" title="备注:啊啊啊啊啊啊啊啊啊啊" />
		<uni-list-item :show-arrow="false" title="附件" @tap="fujian" />
		<list ref="list">
		    <cell>
		      <text>啊啊啊啊啊啊啊啊啊啊</text>
		    </cell>
		  </list>
	</uni-list>
<!-- 	<view class="uni-flex uni-row btn">
		<button type="warn" class="btn-left">拒绝</button>
		<button type="primary" class="btn-right">同意</button>
	</view> -->
	</view>
</template>

<script>
	export default {
		props:['id'],
		data() {
			return {
				
			}
		},
		onLoad(e) {
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news/36kr/'+this.id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			fujian(){
				// uni.downloadFile({
				//   url: 'http://192.168.2.202/Trade/sys/sysAttachment/download?pkId=f46e83fca1d24d8d9bb0db6933e2e47b',
				//   success: function (res) {
				//     var filePath = res.tempFilePath;
				//     uni.openDocument({
				//       filePath: filePath,
				//       success: function (res) {
				//         console.log('打开文档成功');
				//       }
				//     });
				//   }
				// });
			}
		}
	}
</script>

<style>
.btn{
	width: 750upx;
	position: fixed;
	left: 0px;
	bottom: 0px;
	width: 100%;
	height: 80px;
	background-color: #fff;
	z-index: 9999;
}
	
.btn button{
	width: 300upx;
	height: 50px;
}
	
</style>
