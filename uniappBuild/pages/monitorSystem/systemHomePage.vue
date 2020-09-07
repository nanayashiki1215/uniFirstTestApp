<template>
	<view class="content" style="padding: 0rpx;background-color: #F4F4F4;">
		<!-- <view class="image-content">
		   <image style="width: 100%; height: 250rpx;background-color: #02A8A6;"  src="../../static/homeIcon/headPic.jpg"
						   @error="imageError"></image>
		</view>
		
		<view class="example-body">
			<uni-grid :column="3" :show-border="false" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="titletext">{{ item.text }}</text>
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view class="index-coupon">
				<view class="coupon-page" v-for="(item,index) in list" :key="index" @tap="toGoodsInfo(item.itemid)" style="display: inline;">
					<view class="imageUrl">
						<image style="width:150rpx;height:150rpx" :src="item.url"></image>
					</view>
					<view class="listcontent"  style="display: inline;">
						<uni-grid :column="3" :show-border="false" :highlight="true" @change="change">
							<uni-grid-item v-for="(item, index) in list" :index="index" :key="index" style="height: 35rpx;">
								<view class="grid-item-box2">
									<text class="titletext">{{ item.text }}</text>
								</view>
							</uni-grid-item>
						</uni-grid>
					</view>
			</view>
		</view> -->
		
		<!-- <view class="content_box" >
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
		<view class="goods-item"  v-for="(item, index) in list" :index="index" >
			<view class="activity-goods-box">
				<view class="img-box">
					<slot name="tag"></slot>
					<image class="img" :src="item.img" mode="aspectFill"></image>
				</view>
					<view class="goods-right">
						<uni-grid :column="3" class="gridClass" :show-border="false" :highlight="true" @change="change">
							<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
								<view class="grid-item-box2">
									<text class="titletext">{{ item.text }}</text>
								</view>
							</uni-grid-item>
						</uni-grid>
					</view>
				</view>
		 </view>
		</scroll-view>
		</view> -->
	</view>
	
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"

	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				dynamicList: [],
				list: [{
						url: '../../static/homeIcon/Gateway.png',
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '../../static/homeIcon/Report.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
					{
						url: '../../static/homeIcon/Gateway.png',
						text: 'Grid 3',
						badge: '99',
						type: "warning"
					},
					{
						url: '../../static/homeIcon/Gateway.png',
						text: 'Grid 4',
						badge: '2',
						type: "error"
					},
					{
						url: '../../static/homeIcon/Gateway.png',
						text: 'Grid 5'
					},
					{
						url: '../../static/homeIcon/Gateway.png',
						text: 'Grid 6'
					}
				]
			}
		},
		methods: {
			change(e) {
	// 			let {
	// 				index
	// 			} = e.detail
	// 			this.list[index].badge && this.list[index].badge++
	
				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			},
			add() {
				if (this.dynamicList.length < 9) {
					// this.dynamicList.push({
					// 	url: `/static/c${this.dynamicList.length+1}.png`,
					// 	text: `Grid ${this.dynamicList.length+1}`,
					// 	color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
					// })
				} else {
					uni.showToast({
						title: '最多添加9个',
						icon: 'none'
					});
				}
			},
			del() {
				// this.dynamicList.splice(this.dynamicList.length - 1, 1)
			}
		}
	}
</script>

<style lang="scss">
		page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #efeff4;
			min-height: 100%;
			height: auto;
		}
	
	.goods-item {
		margin-bottom: 2rpx;
		.cu-progress {
			width: 225rpx;
			height: 16rpx;
			.progress--color {
				background: #e6b873;
			}
		}
		.progress-text {
			color: #999999;
			font-size: 20rpx;
			margin-left: 25rpx;
		}
		.buy-btn {
			position: absolute;
			right: 0;
			bottom: -20rpx;
			width: 140rpx;
			height: 60rpx;
			border-radius: 30rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
	
			padding: 0;
		}
		.btn-end,
		.btn-nostart {
			background: rgba(238, 238, 238, 1);
			color: #999999;
		}
		.btn-ing {
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			color: rgba(255, 255, 255, 1);
		}
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
			background-color: #252525;
		}
	
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
			/* position: relative;
	*/
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15rpx 0;
			background-color: #FFFFFF;
			margin: 5rpx 5rpx 5rpx 5rpx ;
			border-radius:15rpx;
		}
	
		.titletext{
			color: #555555;
		}
	
		.grid-dot {
			position: absolute;
			top: 5px;
			right: 15px;
		}
	
		.example-body{
			background-color: #F4F4F4;
		}
		
		.swiper {
			height: 420px;
		}
		
		.activity-goods-box {
			padding: 40rpx 20rpx;
			background: #fff;
		
			.img-box {
				margin-right: 20rpx;
				width: 200rpx;
				height: 200rpx;
				overflow: hidden;
				position: relative;
		
				.img {
					width: 200rpx;
					height: 200rpx;
					background-color: #ccc;
				}
			}
		
			.goods-right {
				width: 450rpx;
				min-height: 200rpx;
				align-items: flex-start;
				position: relative;
				.title {
					font-size: 28rpx;
					line-height: 28rpx;
					width: 450rpx;
				}
		
				.tip {
					font-size: 22rpx;
					color: #a8700d;
					width: 500rpx;
				}
		
				.price-box {
					.current {
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(225, 33, 43, 1);
					}
		
					.original {
						font-size: 22rpx;
						font-weight: 400;
						text-decoration: line-through;
						color: rgba(153, 153, 153, 1);
						margin-left: 14rpx;
					}
				}
			}
		}
		
		/*三方商场 */ 
		
		
		.index-coupon{
			background-color: #FFFFFF;
			margin: 100rpx 0;
			display: flex;
			flex-wrap: wrap;
			.coupon-page{
				background-color: #007AFF;
				
				.imageUrl{
					width: 150rpx;
					height: 150rpx;
				}
				.listcontent{
					display: inline;
					flex-wrap: wrap;
					width: 350rpx;
					height: 200rpx;
				}
			}
		}
</style>
