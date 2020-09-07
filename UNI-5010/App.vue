<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync('auth-token') != '' ){
			  uni.reLaunch({
			  	url:'/pages/home/home',
				success: () => {
					 console.log('跳转首页，关闭启动页')
					 plus.navigator.closeSplashscreen();
				 },
			  })
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "plug/colorui/icon.css";
	@import "plug/colorui/main.css";
	
	page{
		height: 100%;
		background-color: #FFFFFF;
	}
</style>

