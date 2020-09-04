module.exports = (params) => {
	// 获取自定义的code
	// let code = uni.getStorageSync('token')
	var server = uni.getStorageSync('ipAddress');
	// var versionNo = uni.getStorageSync('versionNo');
	var global_url = '';
	if(server != null && server.search("http") != -1){
	 global_url = server;
	}else{
	 global_url = 'http://116.236.149.165:8090';
	}  
	// if(versionNo == null || versionNo == undefined){
	// 	versionNo = 'v5'
	// }
	let url = global_url+'/SubstationWEBV2' + params.url;	
	let method = params.method;	
	let header = params.header || {};	
	 // var header = obj.header || {
	 //     'Content-Type': obj.contentType || 'application/json',
	 //  'auth-token':code
	 // }; 
	let data = params.data || {};
	
	//	请求方式 GET POST
	if	(method) {
		method = method.toUpperCase();	//	小写转大写
		if (method == "POST") {
			header = {"content-type":"application/x-www-form-urlencoded"}
		}
	}
	//	发起请求 加载动画
	if (!params.hideLoading){
		uni.showLoading({
			title:"加载中"
		})
	}
	//	发起网络请求
	uni.request({
		url:url,
		method:method || "GET",
		header:header,
		data:data,
		dataType:"json",
		sslVerify:false,	//	是否验证ssl证书
		success: res => {
			if	(res.statusCode && res.statusCode != 200){
				//	api错误
				var errMsg;
				if(res.msg != null){
					errMsg =res.msg
				}else if(res.errMsg != null){
					errMsg =res.errMsg
				}else{
					errMsg = "服务器异常，访问失败"
				}
				uni.showModal({
				   content:errMsg
				})
				return;
			}
			typeof params.success == "function" && params.success(res.data);
		},
		fail: err => {
			uni.showModal({
				content:err.msg
			})
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			if(e.data.code == 200){
				console.log("请求完成");
				uni.hideLoading()
				typeof params.complete == "function" && params.complete(e.data.data);
				return;
			}else{
				console.log("失败");
				return;
			}
			
		}
	})
}