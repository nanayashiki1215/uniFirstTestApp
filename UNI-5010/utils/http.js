
function req(obj) {
  return new Promise((resolve, reject) => {
	let global_url = '';
	// 获取自定义的code
	let code = uni.getStorageSync('auth-token')
	
	var server = uni.getStorageSync('server');
	
	if(server != null){
		global_url = server;
	}else{
		global_url = 'http://116.236.149.165:18090';
	}  
	  
	var method = obj.method || "GET"; 
	var url = global_url + obj.url || ""; 
	var data = obj.data || {}; 
	var header = obj.header || {
	    'Content-Type': obj.contentType || 'application/json',
		'auth-token':code
	}; 
	var success = obj.success; // 成功回调函数
	var fail = obj.fail; //表示失败后，要执行的回调函数
	uni.request({
		url: url,
		data: data,
        method: method,
		header: header,
		success: ((res) => {
		    if (res.statusCode === 403 || res.statusCode === 401) {
			  // 错误处理，返回登录页
               uni.reLaunch({url:'/pages/index/index.vue'})
		    } else if (res.statusCode === 200) {
		         resolve(res)
		    }
		}),
		fail: ((err) => {
			reject(err)
		})
	})
  })
}
export default req