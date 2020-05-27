<template>
	<view class="content">
		<view class="text">
			总户数: <text class="code">4436</text>
			金额合计: <text class="code">2,748,089,218.92</text> 
		</view>
		<view class="genaral-area">
			<view class="flex-box tc thead">
				<view class="item-2">开户公司</view>
				<view class="item-2">开户银行</view>
				<view class="item-2">银行账号</view>
				<view class="item-2">账户类别</view>
				<view class="item-2">银行存款</view>
			</view>
			<view class="flex-box tc table">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-2">
					辽宁颐和实业有限公司
				</view>
				<view class="item-2">
					辽阳农村商业银行股份有限公司宏伟支行
				</view>
				<view class="item-2">
					4903 1201 0139 439 389
				</view>
				<view class="item-2">
					A
				</view>
				<view class="item-2">
					40,972.00
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
	.flex-box>.item-2 {
		flex: 0 0 20%;
	}
	.genaral-area {
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
			.item-2 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}
</style>