(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ipLogin/ipLogin"],{"0d00":function(e,n,t){"use strict";t.r(n);var o=t("7024"),i=t("701c");for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t("9d72");var c,s=t("f0c5"),a=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=a.exports},"701c":function(e,n,t){"use strict";t.r(n);var o=t("9d0a"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},7024:function(e,n,t){"use strict";var o,i=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}))},"9d0a":function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;r(t("2931"));var i=t("2f62");function r(e){return e&&e.__esModule?e:{default:e}}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var l=function(){t.e("components/m-input").then(function(){return resolve(t("c1ab"))}.bind(null,t)).catch(t.oe)},u={components:{mInput:l},data:function(){return{loginType:0,loginTypeList:["密码登录"],mobile:"",code:"",providerList:[],hasProvider:!1,username:"",password:"",positionTop:0,isDevtools:!1,codeDuration:0}},computed:(0,i.mapState)(["forcedLogin"]),methods:s({},(0,i.mapMutations)(["login"]),{initProvider:function(){var n=this,t=["weixin","qq","sinaweibo"];e.getProvider({service:"oauth",success:function(e){if(e.provider&&e.provider.length){for(var o=0;o<e.provider.length;o++)~t.indexOf(e.provider[o])&&n.providerList.push({value:e.provider[o],image:"../../static/img/"+e.provider[o]+".png"});n.hasProvider=!0}},fail:function(e){console.error("获取服务供应商失败："+JSON.stringify(e))}})},initPosition:function(){this.positionTop=e.getSystemInfoSync().windowHeight-100},sendSmsCode:function(){var n=this;this.codeDuration&&e.showModal({content:"请在".concat(this.codeDuration,"秒后重试"),showCancel:!1}),/^1\d{10}$/.test(this.mobile)?o.callFunction({name:"user-center",data:{action:"sendSmsCode",params:{mobile:this.mobile}},success:function(t){0==t.result.code?(e.showModal({content:"验证码发送成功，请注意查收",showCancel:!1}),n.codeDuration=60,n.codeInterVal=setInterval((function(){n.codeDuration--,0===n.codeDuration&&n.codeInterVal&&(clearInterval(n.codeInterVal),n.codeInterVal=null)}),1e3)):e.showModal({content:"验证码发送失败："+t.result.msg,showCancel:!1})},fail:function(n){e.showModal({content:"验证码发送失败",showCancel:!1})}}):e.showModal({content:"手机号码填写错误",showCancel:!1})},loginByPwd:function(){this.username.length<1?e.showToast({icon:"none",title:"域名不能为空"}):(e.setStorageSync("ipAddress",this.username),e.setStorageSync("login_type","online"),this.toMain(this.username))},loginBySms:function(){if(/^1\d{10}$/.test(this.mobile))if(/^\d{6}$/.test(this.code)){e.setStorageSync("ipAddress",this.username.length),e.setStorageSync("login_type","online")}else e.showModal({title:"验证码为6位纯数字",showCancel:!1});else e.showModal({content:"手机号码填写错误",showCancel:!1})},bindLogin:function(){switch(this.loginType){case 0:this.loginByPwd();break;case 1:this.loginBySms();break;default:break}},oauth:function(n){var t=this;console.log("三方登录只演示登录api能力，暂未关联云端数据"),e.login({provider:n,success:function(o){e.getUserInfo({provider:n,success:function(e){t.loginLocal(e.userInfo.nickName)},fail:function(){e.showToast({icon:"none",title:"登陆失败"})}})},fail:function(e){console.error("授权登录失败："+JSON.stringify(e))}})},getUserInfo:function(n){var t=n.detail;console.log("三方登录只演示登录api能力，暂未关联云端数据"),t.userInfo?this.loginLocal(t.userInfo.nickName):e.showToast({icon:"none",title:"登陆失败"})},loginLocal:function(n){e.setStorageSync("login_type","local"),e.setStorageSync("username",n),this.toMain(n)},toMain:function(n){this.forcedLogin?e.navigateBack():e.reLaunch({url:"../login/login"})}}),onReady:function(){this.initPosition(),this.initProvider(),this.isDevtools="devtools"===e.getSystemInfoSync().platform}};n.default=u}).call(this,t("543d")["default"],t("a9ff")["default"])},"9d72":function(e,n,t){"use strict";var o=t("d760"),i=t.n(o);i.a},d760:function(e,n,t){},fe88:function(e,n,t){"use strict";(function(e){t("edfa");o(t("66fd"));var n=o(t("0d00"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["fe88","common/runtime","common/vendor"]]]);