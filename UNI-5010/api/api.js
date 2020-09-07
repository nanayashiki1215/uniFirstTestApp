import request from '@/utils/http.js'

export function login(data){
	return request({
		url:'/login',
		method:'post',
		contentType:'application/x-www-form-urlencoded',
		data: data
	})
}
export function getEnergyValueByTime(){//全厂用能计算/日/月/年
	return request({
		url:'/v1/getEnergyValueByTime',
		method:'get',
	})
}
export function getMonthEnergyValue(data){//用能趋势
	return request({
		url:'/v1/getMonthEnergyValue',
		method:'get',
		data:data
	})
}
export function selectUploadRecord(){//上传信息
	return request({
		url:'/v1/selectUploadRecord',
		method:'get',
	})
}
export function selectEnterprise(){//企业信息
	return request({
		url:'/v1/selectEnterprise',
		method:'get',
	})
}
export function getTypeName(){//获取用能趋势分类
	return request({
		url:'/v1/getTypeName',
		method:'get',
	})
}
export function energyType(){//能源分类
	return request({
		url:'/v1/energyType',
		method:'get',
	})
}





