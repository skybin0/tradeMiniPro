<template>
	<view class="content">
		<view class='member-top'>
			<view class='member-top-c'>
				<template v-if="hasLogin">
					<image class='user-head-img' mode="aspectFill" :src='userInfo.avatar'></image>
					<view class='user-name'>{{ userInfo.nickname }}</view>
					<view class="fz12 grade" v-if="userInfo.grade_name">
						{{userInfo.grade_name}}
					</view>
				</template>
				<template v-else>
					<!-- #ifdef MP-WEIXIN -->
					<view class="user-head-img">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<!--  #endif -->
					<view>
						<!-- open-type="getUserInfo" @getuserinfo="getUserInfo" -->
						<button class="login-btn" hover-class="btn-hover"  open-type="getUserInfo"  @getuserinfo="mpGetUserInfo">授权登录</button>
					</view>
					
				</template>
			</view>
		</view>
		<!-- <view class="content">
			<uni-list>
				<uni-list-item @tap="openFeedback" title="个人信息"  :data-id="1"/>
				<uni-list-item @tap="openReport" title="意见反馈"  />
			</uni-list>
		</view> -->
		<view class="center-list">
			<view @click="gourl('account')">
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe695;</text>
					<text class="list-text">帐号管理</text>
					<text class="navigat-arrow">&#xe62b;</text>
				</view>
			</view>
			<view @click="gourl('message')">
				<view class="center-list-item">
					<text class="list-icon">&#xe695;</text>
					
					<text class="list-text">新消息通知</text>
					<text class="navigat-arrow">&#xe62b;</text>
				</view>
			</view>
		</view>
		<view class="center-list">
			<navigator url="feedback" hover-class="navigator-hover">
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe60c;</text>
					<text class="list-text">问题反馈</text>
					<text class="navigat-arrow">&#xe62b;</text>
				</view>
			</navigator>
			<navigator url="service" hover-class="navigator-hover">
				<view class="center-list-item">
					<text class="list-icon">&#xe60c;</text>
					<text class="list-text">服务条款及协议</text>
					<text class="navigat-arrow">&#xe62b;</text>
				</view>
			</navigator>
		</view>
		<view class="center-list">
			<navigator url="about" hover-class="navigator-hover">
				<view class="center-list-item">
					<text class="list-icon">&#xe728;</text>
					<text class="list-text">关于应用</text>
					<text class="navigat-arrow">&#xe62b;</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			//获取用户信息
			uni.getUserInfo({
				provider: 'weixin',
				success:  (infoRes)=> {
					console.log( infoRes);
				}
			});
		},
		methods: {
			// 获取openid
			mpGetUserInfo() {
				// 获取code
				uni.login({
					provider: 'weixin',
					success: loginRes=> {	
						console.log(loginRes,888)
						
						// let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4884906061740ce4&secret=49edd121300261a03578613d0e843e26&js_code='+loginRes.code+'&grant_type=authorization_code'
						let url = 'http://192.168.3.166:9528/Trade/system_login'
						uni.request({
							url: url,
							method: 'POST',
							data: {
								logintype:"mini",code:loginRes.code},
							success: res => {
								// console.log("ss",res)
								console.log("1111",res)
								console.log("2222",res)
								console.log("33333",res)
								console.log("4444",res)
								console.log("5555",res)
								console.log("66666",res)
							},
							fail: () => {},
							complete: () => {}
						});
						
					}
				});
				
			},
			openFeedback(e){
				uni.navigateTo({
					url: './feedback'
				});
			},
			openReport(e){
				// console.log(e)
				// let id = e.currentTarget.dataset.id
				uni.navigateTo({
					// url: '../detail/detail?id='+id
					url: '../detail/detail'
				});
			},
			tabChange(index) {
				this.TabCur = index;
				console.log(this.TabCur,'sss')
			}
			
		}
	}
</script>

<style lang="scss">
	.member-top {
		position: relative;
		width: 100%;
		height: 340upx;
		background-color: #223766;
	}

	.bg-img {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.member-top-c {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.user-head-img {
		display: block;
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.7);
		margin: 0 auto 16upx;
	}

	.user-name {
		font-size: 30upx;
		color: #fff;
		margin-bottom: 16upx;
	}

	.grade {
		color: #FFF;
	}

	.member-grid {
		background-color: #fff;
		border-top: 2upx solid #eee;
		padding: 20upx 0;
	}

	.margin-cell-group {
		margin: 20upx 0;
		color: #666666;
	}

	.badge {
		left: 80upx;
		top: -6upx;
	}

	button.cell-item-hd {
		background-color: #fff;
		padding: 0;
		line-height: 1.4;
		color: #333;
	}

	button.cell-item-hd:after {
		border: none;
	}

	.login-btn {
		color: #fff;
		width: 180upx;
		height: 50upx;
		line-height: 50upx;
		border-radius: 25upx;
		background: #ff7159;
		font-size: 12px;
	}
	////////////////////////////
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('//at.alicdn.com/t/font_1801650_kjk887fh3yk.ttf') format('truetype');
	}
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}
	
	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}
	
	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}
	
	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #263B63;
		text-align: center;
		font-family: texticons;
		margin-right: 30upx;
	}
	
	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}
	
	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
		float: right;
	}
	.content>.center-list:nth-child(2){
		.list-icon{
			color: #FE0021;
		}
	}
	.content>.center-list:nth-child(3){
		.list-icon{
			color: #20C5C1;
		}
	}
	.content>.center-list:nth-child(4){
		.list-icon{
			color: #1677D2;
		}
	}
</style>