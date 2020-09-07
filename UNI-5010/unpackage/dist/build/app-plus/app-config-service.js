
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/class/class","pages/my/my","pages/class/timetable/timetable","pages/class/checking/checking","pages/my/setting/setting","pages/my/transcript/transcript","pages/my/transcriptDesc/transcriptDesc","pages/home/course_arrangement/course_arrangement","pages/home/scholastic_attainment/scholastic_attainment","pages/home/phone/phone","pages/home/exam/exam","pages/home/disengaged_classroom/disengaged_classroom"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#666666","selectedColor":"#5677FC","backgroundColor":"#FFFFFF","list":[{"text":"首页","pagePath":"pages/home/home","iconPath":"static/tabar/h.png","selectedIconPath":"static/tabar/h1.png"},{"text":"课程表","pagePath":"pages/class/class","iconPath":"static/tabar/kcb.png","selectedIconPath":"static/tabar/kcb1.png"},{"text":"我的","pagePath":"pages/my/my","iconPath":"static/tabar/my.png","selectedIconPath":"static/tabar/my1.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"教务系统页面示例","compilerVersion":"2.8.3","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/class/class","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"课程表"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/class/timetable/timetable","meta":{},"window":{}},{"path":"/pages/class/checking/checking","meta":{},"window":{}},{"path":"/pages/my/setting/setting","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/my/transcript/transcript","meta":{},"window":{"navigationBarTitleText":"成绩单"}},{"path":"/pages/my/transcriptDesc/transcriptDesc","meta":{},"window":{"navigationBarTitleText":"补考详情"}},{"path":"/pages/home/course_arrangement/course_arrangement","meta":{},"window":{"navigationBarTitleText":"课程安排"}},{"path":"/pages/home/scholastic_attainment/scholastic_attainment","meta":{},"window":{"navigationBarTitleText":"学业成绩"}},{"path":"/pages/home/phone/phone","meta":{},"window":{}},{"path":"/pages/home/exam/exam","meta":{},"window":{}},{"path":"/pages/home/disengaged_classroom/disengaged_classroom","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});