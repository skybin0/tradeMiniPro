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
			
			<!-- <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab> -->
			
			<uni-list>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00" :data-id="1"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
				<uni-list-item @tap="openDetail" title="上海鑫抚源→江铜国际贸易" rightText="39,273,100.00"/>
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
		 uni.request({
		 	url: 'https://unidemo.dcloud.net.cn/api/news',
		 	method: 'GET',
		 	data: {},
		 	success: res => {
				console.log(res)
				this.list = res.data
			},
		 	fail: () => {},
		 	complete: () => {}
		 });
		},
		methods: {
			openDetail(e){
				// console.log(e)
				// let id = e.currentTarget.dataset.id
				uni.navigateTo({
					// url: '../detail/detail?id='+id
					url: './paydetail'
				});
			},
			tabChange(index) {
				this.TabCur = index;
				console.log(this.TabCur,'sss')
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
