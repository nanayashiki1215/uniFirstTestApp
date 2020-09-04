<template>
	<view class="content" style="padding: 0rpx;background-color: #FFFFFF;">
		<!-- <view v-if="hasLogin" class="hello"> -->
			<view class="image-content">
			   <image style="width: 100%; height: 450rpx; background-color: #FFFFFF;"  src="../../static/img/homeTopBgview.jpeg"
			                   @error="imageError"></image>
			</view>
			<view class="example-body">
				<uni-grid :column="4" :show-border="false" @change="change">
					<uni-grid-item :index="0">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>电力参数</text>
						</view>
					</uni-grid-item>
					<uni-grid-item :index="1">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>最大需量</text>
						</view>
					</uni-grid-item>
					<uni-grid-item :index="2">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>功率因数</text>
						</view>
					</uni-grid-item>
					<uni-grid-item :index="3">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>温湿度</text>
						</view>
					</uni-grid-item>
					<uni-grid-item :index="5">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>水浸</text>
						</view>
					</uni-grid-item>
					<uni-grid-item :index="6">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>烟雾</text>
						</view>
					</uni-grid-item>
					<uni-grid-item :index="7">
						<view class="grid-item-box">
							<image class="image" src="../../static/homeIcon/dsbgl1.png" mode="aspectFill" />
							<text>门状态</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"

	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data(){
			return{
				listData: []
			}
		},
		props: {
			detail: {
				type: Object,
				default: null
			},
			menu: {
				default: 5
			},
			imgW: {
				type: Number,
				default: 88
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			// this.getListData()
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail;
				
			if(index == 0){
				uni.navigateTo({
					url:'../monitorSystem/ElectricData' 
				})
			}else if(index == 1){
				uni.navigateTo({
					url:'../monitorSystem/max' 
				})
			}
			
		
				// this.list[index].badge && this.list[index].badge++
				// uni.showToast({
				// 	title: `点击第${index+1}个宫格`,
				// 	icon: 'none'
				// })
			},
			...mapMutations(['login']),
			pushSystem(e,i){
				uni.navigateTo({        //点击跳转的方法
					url:'../monitorSystem/systemHomePage'   //需要跳转的页面路径，使用问号进行id的传值，然后再拼接一个要传入的id
				})
			},
			getListData(){
				this.http({
					url:"/v5/getRootMenu",
					method:"GET",
					header:{"Authorization":uni.getStorageSync('token')},
					data:{"english":0},
					success:res => {
						this.listData = res.data.rootMenu[0].nodes;
						
						console.log(this.listData);
						// uni.setStorageSync('username', this.username)
						// uni.setStorageSync('token',res.data.token)
						// uni.setStorageSync('login_type', 'online')
						// _self.toMain(_self.username);
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
