<template>
	<view>
		 <!-- <web-view :webview-styles="webviewStyles" src="http://116.236.149.165:8090/fileVersion/v5/H5-2/alarms.html"></web-view> #52C378 -->
		<uni-list>
			<uni-list-item v-for="(item,index) in listData"
			 v-if="index>0" :show-extra-icon="true" :extra-icon="alarmPic"
			  :show-badge="true" showArrow :title="item.fMessinfotypeexplain" 
			  :num="item.fMessinfotypeid" style="color: #52C378;"
			  :badge-text="unreadCount[index]['unConfirmNum']" badgeType="error" 
			  link :to="`../Alarms/alarmDetailNew?clickid=` + item.fMessinfotypeid" @click="selectAlarm($event,item)" >
				<template slot="header">
					<image class="slot-image" src="../../static/img/alarmPic.png" mode="widthFix"></image>
				</template>
			</uni-list-item>
			<!-- <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon" :show-badge="true" badge-text="99" showArrow title="禁用状态" @switchChange="switchChange" /> -->
		</uni-list>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				listData: [],
				unreadCount:[]
			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.getListData()
				uni.stopPullDownRefresh()
			},1000)
		},
		onLoad() {
			this.getListData()
		},
		methods: {
			//回调方法块
			selectAlarm(e,id) {
				// uni.navigateTo({        //点击跳转的方法
				// 	url:'../Alarms/alarmDetailNew?clickid='+ id    //需要跳转的页面路径，使用问号进行id的传值，然后再拼接一个要传入的id
				// })
			},
			getUnreadData(){
				//未读数
				this.http({
					url:"/v5/getUnConfirmedEventsNum",
					method:"GET",
					header:{"Authorization":uni.getStorageSync('token')},
					// data:{"english":0},
					success:res => {
						this.unreadCount = res.data.unConfirmedEventsNum
						
					},
					fail:err => {
						// console.log(err);
					}
				})
			},
			getListData(){
				this.http({
					url:"/v5/getMessInfoType",
					method:"GET",
					header:{"Authorization":uni.getStorageSync('token')},
					data:{"english":0},
					success:res => {
						this.listData = res.data.tDtMessInfoType;
						this.getUnreadData();
						// uni.setStorageSync('username', this.username)
						// uni.setStorageSync('token',res.data.token)
						// uni.setStorageSync('login_type', 'online')
						// _self.toMain(_self.username);
					},
					fail:err => {
						// console.log(err);
					}
				})
			},
			
			// avatar(count) {
			// 	let arr = []
			// 	this.avatarList.forEach((item, index) => {
			// 		if (index < count) {
			// 			arr.push(item)
			// 		}
			// 	})
			// 	return arr
			// },
			// getList() {
			// 	var data = {
			// 		column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
			// 	};
		
		
				// uni.request({
				// 	url: 'https://getMessInfoType',
				// 	data: data,
				// 	success: data => {
				// 		if (data.statusCode == 200) {
				// 			let list = this.setTime(data.data);
				// 			list = this.reload ? list : this.listData.concat(list);
				// 			list.map(item => {
				// 				item.text = Math.floor(Math.random() * (1 - 20) + 20)
				// 				return item
				// 			})
				// 			this.listData = this.getRandomArrayElements(list, 3)
				// 		}
				// 	},
				// 	fail: (data, code) => {
				// 		console.log('fail' + JSON.stringify(data));
				// 	}
				// });
			// },
			// setTime(items) {
			// 	var newItems = [];
			// 	items.forEach(e => {
			// 		newItems.push({
			// 			author_name: e.author_name,
			// 			cover: e.cover,
			// 			id: e.id,
			// 			post_id: e.post_id,
			// 			published_at: this.format(e.published_at),
			// 			title: e.title
			// 		});
			// 	});
			// 	return newItems;
			// },
			// format(dateStr) {
			// 	var date = this.parse(dateStr)
			// 	var diff = Date.now() - date.getTime();
			// 	if (diff < this.UNITS['天']) {
			// 		return this.humanize(diff);
			// 	}
			// 	var _format = function(number) {
			// 		return (number < 10 ? ('0' + number) : number);
			// 	};
			// 	return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) + ' ' +
			// 		_format(date.getHours()) + ':' + _format(date.getMinutes());
			// },
			// parse(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
			// 	var a = str.split(/[^0-9]/);
			// 	return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
			// },
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
	
	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>
