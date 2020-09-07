<template>
	<view>
		<!-- 导航台哦 -->
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索支路信息" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
				
			</view>
	<!-- end -->
	
	<!-- 内容 -->
	<view class="warp">
	       <view class="box">
	           <t-table @change="change">
	               <t-tr>
					   <t-th>支路名称</t-th>
	                   <t-th>电压</t-th>
	                   <t-th>电流</t-th>
	                   <t-th>功率</t-th>
	               </t-tr>
	               <t-tr v-for="item in tableList" :key="item.id">
					   <t-td>{{ item.circuit }}</t-td>
	                   <t-td>{{ item.class }}</t-td>
	                   <t-td>{{ item.name }}</t-td>
	                   <t-td>{{ item.age }}</t-td>
	               </t-tr>
	           </t-table>
	       </view>
	   
	   </view>
	<!-- end -->
	
	<uni-drawer :mask="true" :maskClick="false" mode="left" ref="drawer">
		<view style="padding:30rpx;">
			<button type="default" @click="close">关闭抽屉</button>
		</view>
	</uni-drawer>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	
	export default {
		components:{tTable,tTh,tTr,tTd,uniDrawer},
		data() {
			return {
				tableList: [{
						id: 0,
						circuit:'主进线总表',
						class:'220',
						name: '36',
						age: '1324',
					},
					{
						id: 1,
						circuit:'新风机组',
						class:'230',
						name: '123',
						age: '672311',
					},
				]
			}
		},
		onLoad() {
			
		},
		onNavigationBarButtonTap(e) {  
			this.$refs.drawer.open()
		},
		methods: {
			close(){
				this.$refs.drawer.close()
			},
		}
	}
</script>

<style>

</style>
