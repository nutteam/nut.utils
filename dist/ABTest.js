!function(t,e){"function"==typeof define&&define.amd?define(["$"],e):"object"==typeof exports?module.exports=e(require("$")):t.ABTest=e($)}(this,function(t){"use strict";var e=function(t){if(!t)throw new Error("need A/B test name.");return this instanceof e?(this.name=t,void(this.sources=[])):new e(t)};return e.prototype={constructor:e,standard:function(t){return this.sources.push(t),this},variant:function(t){return this.sources.push(t),this},start:function(){var t,n,r,s,o=this,a=this.sources.length,i=localStorage.getItem("abtest");if(i){for(var n=JSON.parse(i),u=0,c=n.length;c>u;u++){r=n[u];var f=r.name;if(f===o.name){s=!0,t=r.random;break}}if(!s){t=e.createRandom(a);var h={name:o.name,random:t};n.push(h),localStorage.setItem("abtest",JSON.stringify(n))}}else a=this.sources.length,t=e.createRandom(a),n=[{name:o.name,random:t}],localStorage.setItem("abtest",JSON.stringify(n));var m=this.sources[t];return"function"==typeof m&&m(),this}},e.createRandom=function(t){return Math.floor(Math.random()*t)},e});