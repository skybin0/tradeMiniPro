<template>
	<view class="content">
			<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
				<view class="uni-media-list" @tap="openDetail" :data-id="item.id">
					<image class="uni-media-list-logo" :src="item.author_avatar"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.content}}</view>
					</view>
				</view>
			</view> -->
			<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" > -->
				<!-- <view class="uni-media-list" @tap="openDetail">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">上海鑫抚源>上海欧冶</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">1,193.2190</view>
					</view>
				</view> -->
				
			<!-- </view> -->
			
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			
			<uni-list>
				<uni-list-item v-for="item in list" @tap="openDetail(item)" :title="item.shortCompName+'>'+item.shortTargetCustomer" :rightText="item.amount" :data-id="1"/>
			</uni-list>
	</view>
</template>
<script>
	// import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	var _self;
	var canvaLineA=null;
	var lastMoveTime=null;//最后执行移动的时间戳
	export default {
		// components: { WucTab },
		data() {
			return {
				list:[],
				TabCur: 0,
				tabList: [{ name: '待审批' }, { name: '已同意' }, { name: '已驳回' }],
			}
		},
		onLoad() {			
		 this.taskListMini('auditer')		 
		},
		methods: {
			openDetail(item){
				uni.navigateTo({
					url: './spDetail?TabCur='+this.TabCur+'&billCode='+item.billCode+'&id='+item.id
				});
			},
			taskListMini(type){
				uni.request({
					url: 'http://192.168.3.166:8080/Trade/act/mini/taskListMini',
					method: 'GET',
					header:{Cookie:uni.getStorageSync("sessionid")},
					data: {actKey:type},
					success: res => {
								this.list = []
								if(res.data.obj ){
									this.list = res.data.obj.actInfos
								}
								
								
							},
					fail: () => {},
					complete: () => {}
				});
			},
			tabChange(index) {
				this.TabCur = index;
				console.log(this.TabCur,'sss')
				if(index === 0){
					this.taskListMini('auditer')
				}
				if(index === 1){
					this.taskListMini('ta_modifyBill')
				}
				if(index === 2){
					this.taskListMini('listCheckByPage')
				}
			}
		}
	}
</script>

<style>
	.uni-media-list-body{
		height: auto;
	}
	.uni-media-list-text-top{
		line-height: 1.6em;
	}
	._div{
		display: flex;
		justify-content: space-between;
	}
	.wuc-tab-item{
		width: 30%;
		text-align: center;
	}
	
</style>
