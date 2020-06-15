<template>
	<view style="margin-bottom: 80px;">
<!-- 	{{id}} -->
	<uni-list>
		<uni-list-item :show-arrow="false" :title="'单据号：'+data.bill_code" />
		<uni-list-item :show-arrow="false" :title="'单据日期：'+data.bill_date" />
		<uni-list-item :show-arrow="false" :title="'部门：'+data.organ_name" />
		<uni-list-item :show-arrow="false" :title="'业务员：'+data.user_name" />
		<uni-list-item :show-arrow="false" :title="'付款公司：'+data.buyer_customer_name" />
		<uni-list-item :show-arrow="false" :title="'收款公司：'+data.customer_name" />
		<uni-list-item :show-arrow="false" :title="'合同总金额：'+data.total_amount" />
		<uni-list-item :show-arrow="false" :title="'本次预计付款：'+data.payment_amount" />
		<uni-list-item :show-arrow="false" :title="'备注：'+data.remark" />
		
	</uni-list>
	<view class="uni-title uni-common-pl">普通选择器</view>
	<view class="uni-list">
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">
				驳回级别
			</view>
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{array[index].name}}</view>
				</picker>
			</view>
		</view>
	</view>
	<view class="uni-textarea"style="margin-top:20px;">
		<textarea @blur="bindTextAreaBlur" auto-height placeholder="审批备注" v-model="rejectReason"/>
	</view>
		
	<view class="uni-flex uni-row btn" v-if="TabCur ==0">
		<button type="warn" class="btn-left" @tap="refuse(item)">拒绝</button>
		<button type="primary" class="btn-right" @tap="consent(item)">同意</button>
	</view>
	</view>
</template>

<script>
	export default {
		// props:['id'],
		data() {
			return {
				data:{},
				TabCur:'',
				id:'',
				array: [{name:'发起者'},{name: '上一级'}],
				index:0,
				rejectReason:'',
			}
		},
		onLoad(option) {
			console.log(option,88)
			this.TabCur = option.TabCur
			this.id = option.id
			uni.request({
				url: 'http://192.168.3.166:8080/Trade/act/mini/detailedDocumentData',
				method: 'GET',
				header:{Cookie:uni.getStorageSync("sessionid")},
				data: {billCode:option.billCode},
				success: res => {
					this.data = res.data.obj
					this.data.remark = this.data.remark === null ? '':this.data.remark
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			consent(){
				uni.request({
					url: 'http://192.168.3.166:8080/Trade/act/actMyTask/completeTask/' + this.id,
					method: 'POST',
					header:{'content-type':'multipart/form-data; boundary=XXX', 'Cookie':uni.getStorageSync("sessionid")},
					data:'\r\n--XXX' +
							'\r\nContent-Disposition: form-data; name="keys"' +
							'\r\n' +
							'\r\nauditPass,rejectReason' +
							'\r\n--XXX' +
							'\r\nContent-Disposition: form-data; name="values"' +
							'\r\n' +
							'\r\ntrue,'+this.data.remark+ 
							'\r\n--XXX' +
							'\r\nContent-Disposition: form-data; name="types"' +
							'\r\n' +
							'\r\nB,S' +
							'\r\n--XXX--',
					success: res => {	
						let pages = getCurrentPages(); //页面栈
						let beforePage = pages[pages.length - 2];
						uni.navigateBack({
							url: '/' + beforePage.route,
							success: ()=> {
								if(this.TabCur === '0'){
									beforePage.$vm.taskListMini('auditer')
								}
								if(this.TabCur === '1'){
									beforePage.$vm.taskListMini('ta_modifyBill')
								}
								if(this.TabCur === '2'){
									beforePage.$vm.taskListMini('listCheckByPage')
								}
							},
						})
						uni.showToast({
							title: res.data.resMsg
						})
					},
					fail: () => {},
					complete: () => {}
				});
			},
			refuse(){
				if(this.rejectReason ==''){
					uni.showToast({
						icon: "loading",
						title: "请填写审批备注！"
					})
					return
				}
				let grade = ''
				if(this.index == 0){
					grade = 'starter'
				} else if(this.index == 1){
					grade = 'previous'
				}
				uni.request({
					url: 'http://192.168.3.166:8080/Trade/act/actMyTask/rejectTask/' + this.id,
					method: 'POST',
					header:{'content-type':'multipart/form-data; boundary=XXX', 'Cookie':uni.getStorageSync("sessionid")},
					data:'\r\n--XXX' +
							'\r\nContent-Disposition: form-data; name="keys"' +
							'\r\n' +
							'\r\nauditPass,rejectTo,rejectReason' +
							'\r\n--XXX' +
							'\r\nContent-Disposition: form-data; name="values"' +
							'\r\n' +
							'\r\nfalse,'+grade+','+this.rejectReason+
							'\r\n--XXX' +
							'\r\nContent-Disposition: form-data; name="types"' +
							'\r\n' +
							'\r\nB,S,S' +
							'\r\n--XXX--',
					success: res => {
						let pages = getCurrentPages(); //页面栈
						let beforePage = pages[pages.length - 2];
						uni.navigateBack({
							url: '/' + beforePage.route,
							success: ()=> {
								if(this.TabCur === '0'){
									beforePage.$vm.taskListMini('auditer')
								}
								if(this.TabCur === '1'){
									beforePage.$vm.taskListMini('ta_modifyBill')
								}
								if(this.TabCur === '2'){
									beforePage.$vm.taskListMini('listCheckByPage')
								}
							},
						})
						uni.showToast({
							icon: "loading",
							title: res.data.resMsg
						})
					},
					fail: () => {},
					complete: () => {}
				});
			},
			bindPickerChange(e){
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
			
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
	background-color: #E0E0E0;
	z-index: 9999;
	align-items: center; 
	justify-content: space-around;
	border-top: 1px solid #223766;
}
.btn button{
	display: inline-block;
	width: 300upx;
	height: 50px;
}
	
</style>
