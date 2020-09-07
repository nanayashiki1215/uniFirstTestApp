<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<!-- end -->
		
		<!-- 跑马灯 -->
		<view class="tui-rolling-news bg-white">
			<tui-icon name="news-fill" :size='28' color='#5677fc'></tui-icon>
			<swiper vertical autoplay circular interval="3000" class="tui-swiper">
				<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item">
					<view class="tui-news-item" @tap='detail'>{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- end -->
		
		<!-- 九宫格 -->
		<view class="">
			<uni-grid :column="3" :showBorder=false @change="even">
				<uni-grid-item v-for="(item, index) in dataList" :index="index" :key="index">
				    <view class="grid-item-box" >
						<image :src="item.image" class="identify-head" mode="aspectFill" ></image>
						<!-- <view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view> -->
				        <p class="gemmologist-name">{{item.text}}</p>
				    </view>
				  </uni-grid-item>
			</uni-grid>
		</view>
		<!-- end -->
		
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import tuiIcon from "../../components/icon/icon.vue"
	
	export default {
		components:{
			tuiIcon,uniGrid,uniGridItem
		},
		data() {
			return {
				// 轮播图
				dotStyle: true,
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: require("@/image/swiper1.jpg")
				}, {
					id: 1,
					type: 'image',
					url: require("@/image/swiper2.jpg")
				}],
				// end 轮播图
				
				// 跑马灯
				newsList: [
					"重点用能监测，承载未来环保之路，实现智能化监测",
					"年综合能源消费量一万吨标准煤及以上的用能单位",
					"安科瑞计划将加大研发投入，增加研发人员的积极性"
				],
				
				dataList:[
					{image:require("@/image/s3.png"),text:'综合看板',url:'/pages/home/overview/index'},
					{image:require("@/image/s2.png"),text:'能耗查询',url:'/pages/home/phone/phone'},
					{image:require("@/image/s1.png"),badge:120,text:'报表下载',url:'/pages/home/download/download'},
					{image:require("@/image/s4.png"),text:'能耗告警',url:''},
					{image:require("@/image/s5.png"),text:'监测点详情',url:''},
				]
			}
		},
		created() {
			
		},
		methods: {
			// 跑马灯点击
			detail(e) {
				uni.showModal({
					title:'详情功能尚未完善'
				})
			},
			even(e){
				let num = e.detail.index;
				let url = this.dataList[num].url;
				uni.navigateTo({
					url: url,
				});
			},
		}
	}
</script>

<style>

/* 跑马灯 */
	.tui-rolling-news {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}
	.tui-swiper-item {
		display: flex;
		align-items: center
	}
	.tui-swiper {
		font-size: 28upx;
		height: 50upx;
		flex: 1;
	}
	.tui-news-item {
		line-height: 28upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/* end */
	
	.identify-head{
		width: 50px;
		height: 50px;
		margin-top: 5px;
	}
	.grid-item-box{text-align: center;}
	.uni-grid-item{
		height: 90px!important;
	}
</style>
