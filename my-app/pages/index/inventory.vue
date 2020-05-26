<template>
	<view class="content">			
			<uni-list>
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" :data-id="1"/>
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />
				<uni-list-item @tap="openDetail" title="中储南大路257库/上海鑫抚源" rightText="铝锭" />				
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
			openDetail(e){
				// console.log(e)
				// let id = e.currentTarget.dataset.id
				uni.navigateTo({
					// url: '../detail/detail?id='+id
					url: './kcDetail'
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
