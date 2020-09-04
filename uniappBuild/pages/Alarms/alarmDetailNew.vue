<template>
	<view>
		<!-- <page-head :title="title" style="color: #52C378;></page-head> -->
		 <!-- <web-view :webview-styles="webviewStyles" src="http://116.236.149.165:8090/fileVersion/v5/H5-2/alarms.html"></web-view> #52C378 -->
		<uni-list :border="false">
			<!-- <uni-list-item v-for="(item,index) in listData" :title="item.fSubname" :note='"仪表名称:" + item.fDevicename +"\n事件类型：" + item.fMessInfoTypeExplain' link> -->
			<uni-list-item v-for="(item,index) in listData" :title="item.fSubname" :note='"仪表名称：" + item.fDevicename+"\n事件类型：" + item.fMessInfoTypeExplain' link>	
				<template slot="header">
					<image class="slot-image" src="../../static/img/i-jiancedian.png" mode="widthFix"></image>
				</template>
				<!-- <view class="chat-custom-right">
					<text class="chat-custom-text">刚刚</text>
					<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
				</view> -->
				<template slot="footer" class="chat-custom-right">
					<text style="font-size: 22rpx;color: #999999;">{{item.fAlarmtime}}</text>
				</template>
			</uni-list-item>
			<!-- <uni-list-item v-for="(item,index) in listData" @switchChange="switchChange">
				<view slot="body" class="slot-box">
					<image class="slot-image" src="../../static/img/alarmPic.png" mode="widthFix"></image>
					<text>{{item.fSubname}}</text>
					<view class="text-box" scroll-y="true">
						<label>
							<text>仪表名称：</text>
						</label>
							<text>{{item.fDevicename}}</text>
					</view>
					<view>
						<label>
							<text>事件类型：</text>
						</label>
						<text>{{item.fMessInfoTypeExplain}}</text>
					</view>
				</view>
					<template slot="footer">
						<text>{{item.fMessInfoTypeExplain}}</text> 
						<image class="slot-image" src="/static/logo.png" mode="widthFix"></image>
						<text class="chat-custom-text">刚刚</text>
						<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
					</template>
			</uni-list-item> -->
			<!-- <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon" :show-badge="true" badge-text="99" showArrow title="禁用状态" @switchChange="switchChange" /> -->
		</uni-list>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				title:'',
				listData: [],
				checkedArr:[], //复选框选中的值
				clickID:'',
				pageNum:1,
				number:10,
				allChecked:false //是否全选
			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.getListData(this.clickID)
				uni.stopPullDownRefresh()
			},1000)
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			
			console.log(option.clickid); //打印出上个页面传递的参数。
			// clickID = ;
			this.clickID = option.clickid;
			this.getListData(option.clickid);
		},
		// onShow(){
			
		// },
		methods: {
			
			//回调方法块
			onClick() {
				uni.showToast({
					title: '列表被点击'
				})
			},
			getListData(clickid){
				//报警列表
				this.http({
					url:"/v5/getAlarmEventLogList",
					method:"GET",
					header:{"Authorization":uni.getStorageSync('token')},
					data:{"fMessinfotypeID": clickid,
							"pageNo": this.pageNum,
							"pageSize": this.number},
					success:res => {
						this.listData = res.data.alarmEventLogList.list;
						this.title = res.data.tDtMessInfoType.fMessinfotypeexplain;
						uni.setNavigationBarTitle({
						    title: this.title
						});
					},
					fail:err => {
						// console.log(err);
					}
				})
			}
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}
	
	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.inView{
		background-color:#F8F8F8;
		margin: 30rpx;
		padding: 15rpx 15rpx 15rpx 15rpx;
		/* height: 130rpx; */
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	
	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		margin-top: 3rpx;
		width: 30rpx;
		height: 30rpx;
	}
	
	.timeText{
		display: block;
		word-wrap: break-word;
		word-break: normal;
	}
	
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #000000;
		margin-right: 10px;
	}
</style>
