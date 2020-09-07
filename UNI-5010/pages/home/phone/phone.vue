<template>
	<view style="height: 100%;">
		<view class="DMY">
		  <button @tap="selectState" data-state="day" :class="[whichSelected=='day'?'btn_active':'']">日</button>
		  <button @tap="selectState" data-state="month" :class="[whichSelected=='month'?'btn_active':'']">月</button>
		  <button @tap="selectState" data-state="year" :class="[whichSelected=='year'?'btn_active':'']">年</button>
		  <view class="dateTime">
			  <picker mode="date" :value="date"  @change="bindDateChange">
				  <view class="uni-input">{{date}}</view>
			  </picker>
		  </view>
		</view>
		<!-- 内容 -->
		<view class="warp">
		   <view class="bar"></view>
		   <view class="pie"></view>
		</view>
		<!-- end -->
		<uni-drawer :mask="true" :maskClick="false" mode="right" ref="drawer">
			<view>
				<view class="drawer_picker">
					<h2>采集配置项列表</h2>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<picker @change="bindPickerChange2" :value="arr" :range="typeList">
						<view class="uni-input">{{typeList[index]}}</view>
					</picker>
				</view>
				<button type="default" @click="close">关闭抽屉</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import {energyType} from '@/api/api.js'
	export default {
		components:{uniDrawer},
		
		data() {
			const currentDate = this.getDate()
			return {
				timeValue:'',
				whichSelected:'day',
				date: currentDate,
				format:'DD',
				time:'',
				array: ['全厂', '工序', '工序单位', '重点耗能设备'],
				index: 0,
				typeList:[],
				arr:0
			}
		},
		onLoad() {
			
		},
		created(){
			this.energyType()
		},
		onNavigationBarButtonTap(e) {  
			this.$refs.drawer.open()
		},
		methods: {
			energyType(){
				let num = 10
				console.log(num.toString(16))
				
				energyType().then(res =>{
					console.log(res)
				})
			},
			close(){
				this.$refs.drawer.close()
			},
			selectState(e){
				this.whichSelected=e.currentTarget.dataset.state
				switch (this.whichSelected){
					case 'day':
						this.format = 'DD'
						this.time = this.date
						break;
					case 'month':
						this.format = 'MM'
						this.time = this.date.substring(0,7)
						break;
					case 'year':
						this.format = 'YY'
						this.time = this.date.substring(0,4)
						break;
					default:
						break;
				}
				this.date = this.time
			},
			bindDateChange: function(e) {
				switch (this.format){
					case 'DD':
						this.date = e.target.value
						break;
					case 'MM':
						this.date = e.target.value.substring(0,7)
						break;
					case 'YY':
						this.date = e.target.value.substring(0,4)
						break;
					default:
						break;
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`
			},
			bindPickerChange(e){
				this.index = e.target.value
			},
			bindPickerChange2(e){
				this.arr = e.target.value
			},
		}
	}
</script>

<style scoped>
	.DMY{
		height: 2rem;
		margin: 0.4rem;
	}
	.DMY button{
		float: left;
		height: 1.6rem;
		width: 2.4rem;
		margin-left: 0.2rem;
		margin-top: 0.15rem;
	}
	uni-button{
		font-size: 15px;
		line-height: 2;
	}
	.btn_active{
		background: rgb(0,173,169);
		color :#fff
	}
	.dateTime{
		width: 150px;
		height: 1.6rem;
		margin-top: 0.2rem;
		float: left;
		color: #fff;
		line-height: 1.5rem;
		margin-left: 20px;
		text-align: center;
		background-image: url(../../../image/time.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.warp{
		height: calc(100% - 3.6rem);
		margin: 0.2rem;
	}
	.bar{
		height: 48%;
		background-image: url(../../../image/whole1.png);
		background-repeat:no-repeat;
		background-size: 100% 100%;
	}
	.pie{
		height: 48%;
		margin-top: 2%;
		background-image: url(../../../image/whole1.png);
		background-repeat:no-repeat;
		background-size: 100% 100%;
	}
	.drawer_picker{
		height: 180px;
		background-color: #B6DAF4;
		padding: 10px;
	}
	.drawer_picker > uni-picker{
		text-align: center;
		border: 1px solid #D3E9F8;
		border-radius: 20px;
		color: #666666;
		margin-top: 20px;
		height: 30px;
		line-height: 30px;
	}
</style>
