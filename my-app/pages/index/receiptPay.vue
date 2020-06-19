<template>
	<view class="content">		
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			<payment v-if="TabCur === 0"></payment>
			<collection v-if="TabCur === 1"></collection>
	</view>
</template>
<script>
	// import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import Payment from '../report/payment.vue'
	import Collection from '../report/collection.vue'
	
	var _self;
	var canvaLineA=null;
	var lastMoveTime=null;//最后执行移动的时间戳
	export default {
		components: { Payment ,Collection},
		data() {
			return {
				tabList: [{ name: '付款申请' }, { name: '收款通知' }],
				list:[],
				TabCur: 0,
			}
		},
		onLoad() {
		 // uni.request({
		 // 	url: 'https://unidemo.dcloud.net.cn/api/news',
		 // 	method: 'GET',
		 // 	data: {},
		 // 	success: res => {
			// 	console.log(res)
			// 	this.list = res.data
			// },
		 // 	fail: () => {},
		 // 	complete: () => {}
		 // });
		},
		methods: {
			tabChange(index) {
				console.log(this.TabCur,22)
				this.TabCur = index;
				
			},
			openDetail(e){
				// let id = e.currentTarget.dataset.id
				uni.navigateTo({
					// url: '../detail/detail?id='+id
					url: './wlDetail'
				});
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
