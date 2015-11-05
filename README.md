# 工具库
- ABTest
- Affix

## ABTest
使用示例：
```javascript
ABTest('you abtest name')
// standard,only one
.standard(function() {

})
// variant,one or more
.variant(function() {

})
.variant(function() {

})
// start the A/B test
.start();
```

## Affix
polyfill for [position:sticky](http://caniuse.com/#feat=css-sticky)
使用：直接引用affix.js
