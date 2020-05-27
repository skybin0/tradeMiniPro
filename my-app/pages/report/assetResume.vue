<template>
	<view class="content">
		<!-- <view class="text">
			总户数: <text class="code">4436</text>
			金额合计: <text class="code">2,748,089,218.92</text> 
		</view> -->
		<view class="genaral-area">
			<view class="flex-box tc thead">
				<view class="item-1">箱号</view>
				<view class="item-2">吨位</view>
				<view class="item-2">货品</view>
				<view class="item-2">规格</view>
				<view class="item-2">型号</view>
				<view class="item-2">品牌</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-1" @tap="openDetail">
					al3180009170
				</view>
				<view class="item-2">
					25.4370
				</view>
				<view class="item-2">
					铝锭
				</view>
				<view class="item-2">
					A00
				</view>
				<view class="item-2">
					99.70
				</view>
				<view class="item-2">
					黄河鑫业
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			openDetail(e){
				// console.log(e)
				// let id = e.currentTarget.dataset.id
				uni.navigateTo({
					// url: '../detail/detail?id='+id
					url: './paymentDetail'
				});
			},
		}
	}
</script>

<style lang="scss">
	$color:#e0e0e0;
	.text{
		padding: 10upx;
	}
	.code{
		margin: 20upx 0;
		color: red;
	}
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fbf9fe;
	}
	.flex-box {
		display: flex;
		flex-wrap: wrap;
	}
	.flex-box>.item-1 {
		flex: 0 0 30%;
	}
	.flex-box>.item-2 {
		flex: 0 0 14%;
	}
	.genaral-area {
		.item-1 {
			font-size: 26upx;
			border: 1upx solid $color;
			border-width: 1upx 1upx 0 0;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;
			
			&:first-child {
				border-left-width: 1upx;
			}
			
			&:last-child {
				border-right-width: 1upx;
			}
		}
		.item-2 {
			font-size: 26upx;
			border: 1upx solid $color;
			border-width: 1upx 1upx 0 0;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;
	
			&:first-child {
				border-left-width: 1upx;
			}
	
			&:last-child {
				border-right-width: 1upx;
			}
		}
		.thead {
			.item-1 {
				font-weight: bold;
				box-sizing: border-box;
				background-color: #F8F8F8;
			}
			.item-2 {
				font-weight: bold;
				box-sizing: border-box;
				background-color: #F8F8F8;
			}
		}
		.table {
			&:last-child {
				border-bottom: 1upx solid $color;
			}
			.item-1 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
			.item-2 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}
</style>