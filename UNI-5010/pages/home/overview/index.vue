<template>
    <view class="content">
		<view class="head">
			<button type="default" size="mini" @click="click">{{text}}</button>
			<view class="head_img">
				<view class="head_img1">
					<image src="../../../image/company1.png" mode="top"></image>
					<label style="color: #666666;">企业名称</label>
					<p>{{name}}</p>
				</view>
				<view class="head_img1 dengji">
					<image src="../../../image/company2.png" mode="top"></image>
					<label style="color: #666666;">能耗等级</label>
					<p>{{energyConsumeLevel}}</p>
				</view>
			</view>
			<view class="head_all" v-show="show">
				<view class="head_img1">
					<image src="../../../image/company3.png" mode="top"></image>
					<label style="color: #666666;">企业地址</label>
					<p>{{address}}</p>
				</view>
				<view class="head_img1">
					<image src="../../../image/company4.png" mode="top"></image>
					<label style="color: #666666;">所属行业</label>
					<p>{{industryName}}</p>
				</view>
				<view class="head_img1">
					<image src="../../../image/company5.png" mode="top"></image>
					<label style="color: #666666;">企业社会信用代码</label>
					<p>{{code}}</p>
				</view>
			</view>
		</view>
		<view class="cu-card">
			<image src="../../../image/suxian.png" mode="top"></image>
			<text>全厂用能</text>
			<view class="card_one">
				<view class="card_one_left">
					<button class="cu-btn bg-green  round" @click="monthClick">月用能</button>
					<button class="cu-btn bg-brown  round" @click="yearClick">年用能</button>
					<button class="cu-btn  round" @click="dayClick">日用能</button>
				</view>
				<view class="card_one_right">
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
				</view>
			</view>
		</view>
		<view class="card1">
			<text style="margin: 15px;">折标煤</text>
			<view class="card_two">
				<view class="card_two_in">
					<view class="card_two_yuan">
						<h2 style="color: #f488ec;">{{monthValue.toFixed(2)}}</h2>
						<p>总吨标煤耗</p>
						<label>(当月)</label>
					</view>
					<view class="card_two_yuan2">
						<h2 style="color: #662d91;">{{yearValue.toFixed(2)}}</h2>
						<p>总吨标煤耗</p>
						<label>(当年)</label>
					</view>
					<view class="card_two_yuan3">
						<h2 style="color: #edec24;">{{dayValue.toFixed(2)}}</h2>
						<p>总吨标煤耗</p>
						<label>(当日)</label>
					</view>
				</view>
			</view>
		</view>
		<view class="card1">
			<image src="../../../image/suxian.png" mode="top"></image>
			<text>上传信息</text>
			<view class="card_three">
				<view class="card_three_one upload1">
					<h3>{{uploadRecord}}</h3>
					<p>本日上传次数</p>
				</view>
				<view class="card_three_one upload2">
					<h3>{{errorInfo}}</h3>
					<p>失败次数</p>
				</view>
				<view class="card_three_one upload3">
					<h3>{{lastUploadTime}}</h3>
					<p>最近上传时间</p>
				</view>
			</view>
		</view>
		<view class="card1">
			<image src="../../../image/suxian.png" mode="top"></image>
			<text>用能趋势</text>
			<view class="card_four">
				<view class="">
					<ul style="display: flex;padding-left:0;float:right;">
						<li v-for="(item,index) in energyList" :key="item.dataCode" @click="selectEnergy(index,item.dataCode)"
						v-bind:class="{active:index == currentItem}" class="dash_tab_p">{{item.name}}</li>
					</ul>
				</view>
				<view class="card_four_image">
					<canvas canvas-id="bar" id="bar" class="charts1" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
				</view>
			</view>
		</view>
    </view>
</template>
<script>
	import {getEnergyValueByTime,getMonthEnergyValue,selectUploadRecord,selectEnterprise,getTypeName} from '@/api/api.js'
	import uCharts from '@/components/u-charts/u-charts/u-charts.js';
	
	var _self;
	var canvaRing=null;
	var bar = null
    export default {
        data() {
          return {
			text:'展 开',
			show:false,
			
			date:'M',
			cWidth:'',
			cHeight:'',
			
			Width:'',
			Height:'',
			pixelRatio:1,
			
			monthValue:0,
			yearValue:0,
			dayValue:0,
			
			uploadRecord:'',
			errorInfo:'',
			lastUploadTime:'',
			
			address:'',
			code:'',
			energyConsumeLevel:'',
			industryName:'',
			name:'',
			
			energyList:[],
			currentItem:0
          }
        },
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(500);
			this.cHeight=uni.upx2px(410);
			
			this.Width=uni.upx2px(680);
			this.Height=uni.upx2px(390);
		},
		created() {
			/*全厂用能计算/日/月/年*/
			this.getEnergyValueByTime()
			//上传信息
			this.selectUploadRecord()
			//企业信息
			this.selectEnterprise()
			//获取用能趋势分类
			this.getTypeName()
		},
        methods:{
			click(){
				this.show = !this.show
				if(this.text == '展 开'){
					this.text = '收 起'
				}else{
					this.text = '展 开'
				}
			},
			monthClick(){
				this.date = 'M'
				this.getEnergyValueByTime()
			},
			yearClick(){
				this.date = 'Y'
				this.getEnergyValueByTime()
			},
			dayClick(){
				this.date = 'D'
				this.getEnergyValueByTime()
			},
			getEnergyValueByTime(){
				let names = []
				let values = []
				getEnergyValueByTime().then(res =>{
					if(this.date == 'M'){
						if(res.data.data.monthEnergyTotalByDay.length>0){
							let Ring = {series:[]}
							for (let i=0;i<res.data.data.monthEnergyTotalByDay.length;i++) {
								Ring.series.push({name: res.data.data.monthEnergyTotalByDay[i].energyTypeName,
								data:parseFloat(parseFloat(res.data.data.monthEnergyTotalByDay[i].calValue).toFixed(2))})
							}
						this.showRing('canvasRing',Ring)
					  }
					  res.data.data.monthEnergyTotalByDay.forEach( o =>{
						   if(o.calValue != undefined)
						   _self.monthValue += parseFloat(o.calValue)
					  })
					  res.data.data.yearEnergyTotalByMonth.forEach( o =>{
						   if(o.calValue != undefined)
						   _self.yearValue += parseFloat(o.calValue)
					  })
					  res.data.data.todayTotalByEnergyHour.forEach( o =>{
						   if(o.calValue != undefined)
						   _self.dayValue += parseFloat(o.calValue)
					  })
					}
					if(this.date == 'Y'){
						if(res.data.data.yearEnergyTotalByMonth.length>0){
							let Ring = {series:[]}
							for (let i=0;i<res.data.data.yearEnergyTotalByMonth.length;i++) {
								Ring.series.push({name: res.data.data.yearEnergyTotalByMonth[i].energyTypeName,
								data:parseFloat(parseFloat(res.data.data.yearEnergyTotalByMonth[i].calValue).toFixed(2))})
							}
						this.showRing('canvasRing',Ring)
					  }
					}
					if(this.date == 'D'){
						if(res.data.data.todayTotalByEnergyHour.length>0){
							let Ring = {series:[]}
							for (let i=0;i<res.data.data.todayTotalByEnergyHour.length;i++) {
								Ring.series.push({name: res.data.data.todayTotalByEnergyHour[i].energyTypeName,
								data:parseFloat(parseFloat(res.data.data.todayTotalByEnergyHour[i].calValue).toFixed(2))})
							}
						this.showRing('canvasRing',Ring)
					  }
					}
				})
			},
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:true,
					extra: {
						pie: {
						  offsetAngle: -45,
						  labelWidth:15
						}
					},
					series: chartData.series,
					animation: true,
					width: _self.cWidth,
					height: _self.cHeight
				});
			},
			touchRing(e){
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			selectUploadRecord(){
				selectUploadRecord().then(res =>{
					if(res.data.data.uploadRecords)
					  this.uploadRecord = res.data.data.uploadRecords[0].uploadRecord
					if(res.data.data.errorInfo)
					  this.errorInfo = res.data.data.errorInfo[0].uploadRecord
					if(res.data.data.lastUploadTime)
					  this.lastUploadTime = res.data.data.lastUploadTime[0].uploadTime
				})
			},
			selectEnterprise(){
				selectEnterprise().then(res =>{
					if(res.data.data.enterpriseInfos.length > 0){
						this.address = res.data.data.enterpriseInfos[0].address
						this.code = res.data.data.enterpriseInfos[0].code
						this.name = res.data.data.enterpriseInfos[0].name
						this.industryName = res.data.data.enterpriseInfos[0].industryName
						switch ( res.data.data.enterpriseInfos[0].energyConsumeLevel) {
						  case 1:
							_self.energyConsumeLevel = '5000 吨以下'
							break;
						  case 2:
							_self.energyConsumeLevel = '5000 ~ 10000 吨'
							break;
						  case 3:
							_self.energyConsumeLevel = '1万 ~ 10万吨'
							break;
						  case 4:
							_self.energyConsumeLevel = '10万 ~ 50万吨'
							break;
						  case 5:
							_self.energyConsumeLevel = '50万 ~ 300万吨'
							break;
						  case 6:
							_self.energyConsumeLevel = '300万吨以上'
							break;
						  default:
							break;
						}
					}
				})
			},
			getTypeName(){
			  getTypeName().then(res =>{
				if(res.data.data.name.length > 0){
				  this.energyList = res.data.data.name
				  this.dataCode = res.data.data.name[0].dataCode
				  this.getMonthEnergyValue(this.dataCode)
				}
			  })
			},
			selectEnergy(index,id){
			  this.currentItem = index
			  this.getMonthEnergyValue(id)
			},
			getMonthEnergyValue(dataCode){
			  getMonthEnergyValue({dataCode:dataCode}).then(res =>{
				if(res.data.data.dayValueByPower.length > 0){
				  this.showBar(res.data.data.dayValueByPower)
				}
			  })
			},
			showBar(data){
			  let timesLine = []
			  let valuesLine = []
			  var dataArray = [];
			  let title
			  if(data.length > 0 ){
				title = data[0].qualityUnit
			  }
			  
			  let curDate = new Date()
			  curDate.setDate(curDate.getDate()-30)
			  var startDate = new Date(curDate.getFullYear(),curDate.getMonth(),curDate.getDate())
		
			  //生成时间数组
			  for(var i=0;i<=30;i++){
				i==0?1+1:startDate.setDate(startDate.getDate()+1);
				var tempDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),0,0,0)
				timesLine.push((tempDate.getMonth()+1)+'-'+(tempDate.getDate()))
			  }

			data.forEach(function(val){
				//判断当前时间 刻度位置
				var locationTime = new Date(val.time)
				var locationX = (locationTime.getMonth()+1)+'-'+locationTime.getDate()
		
				let locationindex = timesLine.findIndex(function(o){
				  return o == locationX
				})
		
				if(locationindex != -1){
				  valuesLine[locationindex] = (val.value)
				}
			})
			  let series = {categories:timesLine,series:[{name:'',data:valuesLine}]};
			  this.showBarChart('bar',series)
			},
			showBarChart(canvasId,chartData){
				bar=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'column',
					legend:{show:false},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:1,
					animation: true,
					enableScroll: true,//开启图表拖拽功能
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						type:'grid',
						gridType:'dash',
						itemCount:7,//x轴单屏显示数据的数量，默认为5个
						scrollShow:true,//新增是否显示滚动条，默认false
						scrollAlign:'left',//滚动条初始位置
						scrollBackgroundColor:'#F7F7FF',//默认为 #EFEBEF
						scrollColor:'#DEE7F7',//默认为 #A6A6A6
					},
					yAxis: {
						
					},
					width: this.Width,
					height: this.Height,
					extra: {
						column: {
							type:'group',
							width: 20
						}
					  }
				});
			},
			touchLineA(e){
				bar.scrollStart(e);
			},
			moveLineA(e) {
				bar.scroll(e);
			},
			touchEndLineA(e) {
				bar.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				bar.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
        }
    }
</script>

<style scoped>
	.content{height: 100%; overflow: auto;background-color: #f5f5f5;}
	.cu-card{
		/* height: 40%; */
		height: 270px;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		margin-top: 16%;
		padding: 8px;
	}
	.card1{
		/* height: 40%; */
		height: 270px;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		padding: 8px;
	}
	.head{
		z-index: 999;
		position: absolute;
		height: 8%;
		width: 100%;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		box-shadow:2px 2px 3px #eeeeee;
		background-color: #fff;
	}
	.head_img1{
		width: 50%;
		font-size: 13px;
		line-height: 22px;
		float: left;
	}
	.dengji{
		width: 140px;
	}
	.head_img1 uni-image{
		width: 30px;
		height: 40px;
		float: left;
		margin: 5px;
	}
	.head_all{
		height: 180px;
		/* border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		box-shadow:2px 2px 3px #000; */
		background-color: #FFFFFF;
		background-image: url(../../../image/overview_header.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.head uni-button {
	    display: inline-block;
	    line-height: 1.3;
	    font-size: 10px;
	    padding: 0 0.34em;
		float: right;
		margin-top: 20px;
		margin-right: 10px;
	}
	uni-image{
		width: 3px;
		height: 15px;
		margin-right: 15px;
	}
	uni-text{
		font-size: 15px;
	}
	.card_img{
		height: 15px;
		margin-right: 10px;
		margin-top: 3px;
	}
	.card_one{
		height: 88%;
		/* border-radius: 7px;
		margin: 5px;
		background-color: #F2F9FE;
		box-shadow:2px 2px 3px #000; */
		background-image: url(../../../image/whole1.png);
		background-size: 102% 104%;
		background-repeat: no-repeat;
	}
	.card_one_left{
		width: 26%;
		float: left;
		height: 100%;
	}
	.card_one_left uni-button{
		margin-top: 30px;
		margin-left: 15px;
	}
	.card_one_right{
		width: 70%;
		float: left;
		height: 100%;
	}
	.card_two{
		height: 88%;
		background-image: url(../../../image/card_two.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.card_two_in{
		height: 100%;
		width: 100%;
		background-image: url(../../../image/yuanhuan.png);
		background-size: 85% 75%;
		background-repeat: no-repeat;
		background-position: center;
	}
	.card_two_in label{
		color: #1b1c64;
	}
	.card_three{
		height: 90%;
		background-image: url(../../../image/yuanbing.png);
		background-size: 98% 88%;
		background-repeat: no-repeat;
		background-position: center;
		margin: 10px;
	}
	.card_three_one{
		float: left;
		width: 29%;
		text-align: center;
		color: #FFFFFF;
	}
	.upload1{
		padding-top: 58px;
		padding-left: 30px;
	}
	.upload2{
		padding-top: 140px;
	}
	.upload3{
		padding-top: 65px;
		padding-left: 11px;
	}
	.card_three p{
		font-size: 12px;
		margin-top: 5px;
	}
	.charts{
		width: 500upx; 
		height:410upx;
	}
	.charts1{
		width: 650upx;
		height:410upx;
	}
	.card_two_yuan{
		float: left;
		width: 28%;
		position: relative;
		padding-top: 32%;
		margin-left: 9%;
		text-align: center;
	}
	.card_two_yuan2{
		float: left;
		width: 28%;
		position: relative;
		padding-top: 17%;
		margin-right: 5px;
		text-align: center;
	}
	.card_two_yuan3{
		float: left;
		width: 24%;
		position: relative;
		padding-top: 32%;
		margin-right: 5px;
		text-align: center;
	}
	ul li{
		cursor: pointer;
		list-style: none;
		padding: 10px 0;
		color: #a4b5ff;
		margin: 0 10px;
	  }
	  .active{
		color: #ffc54f;
		border-bottom: 2px solid #ffc54f;
	  }
	.card_four{height: 95%;}
	.card_four_image{ 
		height: 100%;
		padding-top: 41px;
		background-image: url(../../../image/card_4.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>