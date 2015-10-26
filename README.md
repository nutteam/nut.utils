# 工具库
- ABTest

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
