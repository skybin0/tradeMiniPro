<template>
	<view class="content">
			<view class="home home-header">
				<navigator url="approval" hover-class="navigator-hover">
					<view class="btn-box">
						<view class=" btn btn1">
						</view>
						<text class="btn-text">审批</text>
					</view>
				</navigator>
				<navigator url="receiptPay" hover-class="navigator-hover">
					<view class="btn-box">
						<view class=" btn btn2">
						</view>
						<text class="btn-text">往来</text>
					</view>
				</navigator>
				<navigator url="inventory" hover-class="navigator-hover">
					<view class="btn-box">
						<view class=" btn btn3">
						</view>
						<text class="btn-text">库存</text>
					</view>	
				</navigator>
			</view>
			<view class="example-body">
				<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" text="欢迎使用商贸小程序端!" />
			</view>
			<view class="home">
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
						<view class="qiun-title-dot-light">现货走势图</view>
					</view>
					<!-- <view class="qiun-bg-white qiun-padding">
						<text>交互数据：{{Interactive}}</text>
					</view> -->
					<view class="qiun-charts" >
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
					</view>
				</view>
			</view>
			<view class="home">
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
						<view class="qiun-title-dot-light">环形图</view>
					</view>
					<view class="qiun-charts" >
						<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing2"></canvas>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	var _self;
	var canvaLineA=null;
	var lastMoveTime=null;//最后执行移动的时间戳
	var canvaRing=null;
	export default {
		data() {
			return {
				//图表
				cWidth:'',
				cHeight:'',
				cWidth2:'',
				cHeight2:'',
				pixelRatio:1,
				textarea:'',
				Interactive:'',//交互显示的数据
				
			}
		},
		onLoad() {
		 //图表
		 _self = this;
		 this.cWidth=uni.upx2px(750);
		 this.cHeight=uni.upx2px(500);
		 this.getServerData();
		 this.cWidth2=uni.upx2px(750);
		 this.cHeight2=uni.upx2px(500);
		 this.getServerData2();
		},
		methods: {
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						// console.log(res.data.data)
						let LineA={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories=res.data.data.LineA.categories;
						LineA.series=res.data.data.LineA.series;
						
						//第二根线为虚线的设置
						LineA.series[1].lineType='dash';
						LineA.series[1].dashLength=10;
						_self.textarea = JSON.stringify(res.data.data.LineA);
						_self.showLineA("canvasLineA",LineA);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					colors:['#facc14', '#f04864', '#8543e0', '#90ed7d'],
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						//disableGrid:true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			},
			touchLineA(e) {
				lastMoveTime=Date.now();
			},
			moveLineA(e){
				let currMoveTime = Date.now();
				let duration = currMoveTime - lastMoveTime;
				if (duration < Math.floor(1000 / 60)) return;//每秒60帧
				lastMoveTime = currMoveTime;
				
				let currIndex=canvaLineA.getCurrentDataIndex(e);
				if(currIndex>-1&&currIndex<canvaLineA.opts.categories.length){
					let riqi=canvaLineA.opts.categories[currIndex];
					let leibie=canvaLineA.opts.series[0].name;
					let shuju=canvaLineA.opts.series[0].data[currIndex];
					this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
				}
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchEndLineA(e){
				let currIndex=canvaLineA.getCurrentDataIndex(e);
				if(currIndex>-1&&currIndex<canvaLineA.opts.categories.length){
					let riqi=canvaLineA.opts.categories[currIndex];
					let leibie=canvaLineA.opts.series[0].name;
					let shuju=canvaLineA.opts.series[0].data[currIndex];
					this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
				}
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchRing(e){
				canvaRing.touchLegend(e, {
					animation : false
				});
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			getServerData2(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let Ring={series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Ring.series=res.data.data.Ring.series;
						//自定义文案示例，需设置format字段
						for(let i = 0 ;i < Ring.series.length;i++){
							Ring.series[i].format=()=>{return Ring.series[i].name+Ring.series[i].data};
						}
						_self.textarea = JSON.stringify(res.data.data.Ring);
						_self.showRing("canvasRing",Ring);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					padding:[5,5,5,5],
					legend:{
						show:true,
						position:'right',
						float:'center',
						itemGap:10,
						padding:5,
						lineHeight:26,
						margin:5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth :1
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth*_self.pixelRatio-50,
					height: _self.cHeight*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
					subtitle: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25*_self.pixelRatio,
					},
					title: {
						name: '收益率',
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
					},
					extra: {
						pie: {
						  offsetAngle: 0,
						  ringWidth: 40*_self.pixelRatio,
						  labelWidth:5
						}
					},
				});
			},
			touchRing2(e){
				canvaRing.touchLegend(e, {
					animation : false
				});
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 710upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 710upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.home{
		background-color: #ffffff;
		margin: 20upx;
		box-sizing: border-box;
		border-radius: 10px;
	}
	.home-header{
		height: 300upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 10px 10px 10px 2px #E5E5E5;
		
	}
	.home-header .btn-box{
		width: 100upx;
		height: 150upx;
	}
		
	.home-header .btn{
		width: 100upx;
		height: 100upx;
		margin-bottom: 15upx;
		border-radius: 50%;
	}
	.home-header .btn-text{
		width: 100%;
		text-align: center;
		display:block ;
		line-height: 50upx;
	}
		
	.home-header .btn1{
		background:url(../../static/title-sp.png);
		background-color: #CCCCFF;
		background-repeat:no-repeat;
		background-size:50% 50%;
		background-position:50% 50%;
		background-origin:content-box;
	}
	.home-header .btn2{		
		background:url(../../static/title-wl.png);
		background-color: #CCFFCC;
		background-repeat:no-repeat;
		background-size:50% 50%;
		background-position:50% 50%;
		background-origin:content-box;
	}
	.home-header .btn3{
		background:url(../../static/title-kc.png);
		background-color: #FF88C2;
		background-repeat:no-repeat;
		background-size:50% 50%;
		background-position:50% 50%;
		background-origin:content-box;
	}
	
</style>
