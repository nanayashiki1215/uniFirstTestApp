<template>
	<view style="background-color: #FFFFFF;">
		<view style="margin-top: 10rpx;">
			<image src="../../static/img/i-jiancedian.png" mode="aspectFill" style="width: 30rpx;height:30rpx;margin-left: 10rpx;"/>
			<text style="margin: 15rpx;5rpx;5rpx;5rpx;font-size: 18px;">{{subName}}</text>
			<button class="mini-btn" type="primary" size="mini" style="background-color:#52C378;" @click="clickSelect">筛选</button>
		</view>
		<view class="example-body" v-if="list.length>0" style="background-color: #FFFFFF;">
			<uni-grid :column="3" :show-border="true" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<image src="../../static/img/sj.png" class="image" mode="aspectFill" />
						<text class="titletext">{{ item.fMeterName }}</text>
						<text class="text">{{ item.fStatus }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view v-else>
			<text style="text-align: center;">---暂无数据---</text>
		</view>
		<!-- end -->
		<uni-drawer :mask="true" :maskClick="true" mode="right" ref="drawer">
			<view>
				<view class="drawer_picker">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<button type="default" @click="close" style="background-color: #52C378;color: #FFFFFF;">关闭侧边栏</button>
						<h2>筛选变电所</h2>
						<uni-search-bar placeholder="输入变电所名称" @confirm="search" />
						<uni-list>
							<uni-list-item v-for="(item,index) in listData"
							   showArrow :title="item.fSubname" link @click="selectSubId($event,item)" >
								<!-- <template slot="header">
									<image class="slot-image" src="../../static/img/alarmPic.png" mode="widthFix"></image>
								</template> -->
							</uni-list-item>
						</uni-list>
						<button type="default" @click="close" style="background-color: #52C378;color: #FFFFFF;">关闭侧边栏</button>
						</scroll-view>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniDrawer,
			uniSearchBar
		},
		data() {
			return {
				list: [],
				listData:[],
				subID:'',
				subName:'',
				searchVal: ''
			}
		},
		onNavigationBarButtonTap(e) {
			this.$refs.drawer.open();
			this.getSubstationList();
		},
		onLoad() {
			
		},
		onShow(){
			if(this.subID == "" || this.subID == undefined){
				this.$refs.drawer.open();
			}else{
				this.getListData();
			}
		},
		onPullDownRefresh(){
				setTimeout(()=>{
					this.getListData()
					uni.stopPullDownRefresh()
				},1000)
			},
			//页面初始加载
			mounted() {
			        let that = this;
			        //缓存的账号
			        const subID = uni.getStorageSync('subID');
					const subName = uni.getStorageSync('subName');
			        //有缓存就赋值给文本没有就清空
			        if (subID) {
			            that.subID = subID;
						that.subName = subName;
			        } else {
			            that.subID = '';
						that.subName = '';
			        }
			},
		methods:{
			clickSelect(){
				//点击筛选
				this.$refs.drawer.open();
				this.getSubstationList();
			},
			close(){
				this.$refs.drawer.close()
			},
			opendrawer(){
				this.$refs.drawer.open();
			},
			search(res) {
				this.getSubstationList(res.value)
			},
			input(res) {
				this.searchVal = res.value
			},
			cancel(res) {
				
			},
			//回调方法块
			selectSubId(e,item) {
				uni.setStorageSync('subID', item.fSubid)
				uni.setStorageSync('subName', item.fSubname);
				this.subID = item.fSubid;
				this.subName = item.fSubname;
				this.close()
				this.getListData()
			},
			getListData(){
				//水浸
				this.http({
					url:"/v5/listWaterInStatus",
					method:"GET",
					header:{"Authorization":uni.getStorageSync('token')},
					data:{"fSubid": this.subID},
					success:res => {
						 if (res.data != null) {
							  if (res.data.length > 0) {
								this.list = res.data;
							  }else{
								this.list = [];
							  }
						 }else{
							 this.list = [];
						 }
					},
					fail:err => {
						// console.log(err);
					}
				})
			},
			getSubstationList(val){
				 var searchKey = val;
				 var params = {
				    key: searchKey
				 };
				//获取变电所列表
				this.http({
					url:"/v5/getSubstationListByUser",
					method:"GET",
					header:{"Authorization":uni.getStorageSync('token')},
					data:params,
					success:res => {
						console.log(res);
						 if (res.data != null) {
							if (res.data.list.length > 0) {
								this.listData = res.data.list;
							}
						 }
					},
					fail:err => {
						// console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.hello {
			display: flex;
			flex: 1;
			flex-direction: column;
		}
		// page{
		// 	.cate-section{
		// 		position:relative;
		// 		z-index:4;
		// 		border-radius:16upx 16upx 0 0;
		// 		margin-top:-20upx;
		// 	}
		// }
		// 产品分类
		.menu-category-box {
			padding: 30rpx 30rpx 0 30rpx;
			background: #fff;
		}
		.menu-category-box,
		.menu-swiper-box {
			position: relative;
			background: #fff;
			.menu-swiper-item {
				background: #fff;
				height: 100%;
				width: 100%;
			}
			.menu-tab-box {
				display: flex;
				flex-wrap: wrap;
				.tab-list {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					padding-bottom: 30rpx;
		
					.tab-img {
						border-radius: 25rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		
			.menu-category-dots {
				display: flex;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 20rpx;
		
				.category-dot {
					width: 40rpx;
					height: 3rpx;
					background: #eeeeee;
					margin-right: 10rpx;
				}
		
				.category-dot-active {
					width: 40rpx;
					height: 3rpx;
					background: #a8700d;
					margin-right: 10rpx;
				}
			}
		}
		.scroll-view {
			flex: 1
		}
		
		/* 处理抽屉内容滚动 */
		.scroll-view-box {
			flex: 1;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
		
	/* 分类 */
		.cate-section {
			display: flex;
			// justify-content: space-around;
			align-items: center;
			flex-wrap:wrap;
			padding: 30upx 22upx; 
			background: #fff;
			
			.cate-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				// font-size: $font-sm + 2upx;
				// color: $font-color-dark;
			}
			/* 原图标颜色太深,不想改图了,所以加了透明度 */
			image {
				width: 98upx;
				height: 98upx;
				margin-bottom: 14rpx;
				border-radius: 10%;
				/* opacity: .7; */
				/* box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3); */
			}
		}
		
		.title {
			color: #8f8f94;
			margin-top: 25px;
		}
	
		.ul {
			font-size: 15px;
			color: #8f8f94;
			margin-top: 25px;
		}
	
		.ul>view {
			line-height: 25px;
		}
		/* 头条小程序组件内不能引入字体 */
			/* #ifdef MP-TOUTIAO */
			@font-face {
				font-family: uniicons;
				font-weight: normal;
				font-style: normal;
				src: url('~@/static/uni.ttf') format('truetype');
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
		
			.image {
				width: 100rpx;
				height: 100rpx;
			}
		
			.text {
				font-size: 26rpx;
				margin-top: 10rpx;
			}
		
			.example-body {
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */
			}
		
			.grid-dynamic-box {
				margin-bottom: 15px;
			}
		
			.grid-item-box {
				flex: 1;
				/* position: relative;*/
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 5px 0;
				background-color: #FFFFFF;
				margin: 5rpx 5rpx 5rpx 5rpx ;
				border-radius:15rpx;
				// height: 350rpx;
			}
		
			.grid-dot {
				position: absolute;
				top: 5px;
				right: 15px;
			}
		
			.swiper {
				height: 420px;
			}
</style>
