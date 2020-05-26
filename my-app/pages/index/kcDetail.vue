<template>
	<view>
<!-- 	{{id}} -->
	<uni-list>
		<uni-list-item :show-arrow="false" title="所属仓库:中储南大路257库" />
		<uni-list-item :show-arrow="false" title="所属公司:上海鑫抚源" />
		<uni-list-item :show-arrow="false" title="货品:铝锭" />
		<uni-list-item :show-arrow="false" title="现有库存:49.7880" />
		<uni-list-item :show-arrow="false" title="上期结存:49.7880" />
		<uni-list-item :show-arrow="false" title="本期入库:0.0000" />
		<uni-list-item :show-arrow="false" title="本期出库:0.0000" />
		<uni-list-item :show-arrow="false" title="本期在途:0.0000" />
		<uni-list-item :show-arrow="false" title="可派货量:0.0000" />
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
