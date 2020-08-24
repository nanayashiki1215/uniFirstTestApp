(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{"645b":function(t,e,n){"use strict";n.r(e);var u=n("b134"),a=n("cd96");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("9f4e");var i,r=n("f0c5"),f=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,"4a7ccc8f",null,!1,u["a"],i);e["default"]=f.exports},"99b9":function(t,e,n){},"9f4e":function(t,e,n){"use strict";var u=n("99b9"),a=n.n(u);a.a},a2cb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};e.default=u},b134:function(t,e,n){"use strict";var u,a=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return u}))},cd96:function(t,e,n){"use strict";n.r(e);var u=n("a2cb"),a=n.n(u);for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);e["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("645b"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);
