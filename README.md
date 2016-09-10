# partimation

基于canvas的一个粒子动画库

通过配置文字或者图片以及相关动画参数，只需简单的函数调用就能进行期望的粒子动画

[在线demo](http://www.kmhaoshuai.com/demos/partimation/)

# 本地demo
```bash
clone git@github.com:kmCha/partimation.git
cd partimation
node index.js
```

# 使用方法

1. 通过在html中引入partimation.js
```js
typeof window.Partimate === 'function'
```
2. 通过在node中用commonJS的require引入partimation.js
```js
var Partimate = require('partimation')
```

初始化动画对象
```js
var particle = new Partimate('#canvas') // 输入参数为canvas元素的id
```

配置文字
```js
particle.textConfig({
  text: '哈哈哈哈哈哈',  // 必填
  font: '50px sans-serif',  // 文字样式
  fontColor: '#000',   // 文字颜色
  textX: 200,   // 文字起始X位置
  textY: 200    // 文字起始Y位置
})
```
其中`textX`可以为function，文字的宽度会作为参数传入该函数中，方便定位
```js
{
  textX: function(width) {
    return width + 200
  }
}
```

配置图片
```js
particle.imageConfig({ // 同canvas.context.drawImage() API的9个参数
  imgUrl: './blog-title.png', // 必填
  sx: 0,  // 以下属性都为选填，下列值为默认值
  sy: 0,
  sWidth: image.width,
  sHeight: image.height,
  dx: 0,
  dy: 0,
  dWidth: image.width,
  dHeight: image.height
  contain: false,   // 图片在canvas中平铺
  cover: false  // 图片在canvas中全部显示
})
```

配置动画
```js
particle.animationConfig({  // 所有都为选填
  dataXOffset: canvas.width * 0.2, // 画布data的x偏移值
  dataYOffset: 0, // 画布data的y偏移值
  dataWidth: canvas.width * 0.5, // 画布data的宽度, 默认canvas宽度
  dataHeight: 200, // 画布data的高度, 默认canvas高度
  cols: 500,  // 采样列数，默认canvas宽度
  rows: 500,  // 采样行数，默认canvas高度
  initialX: canvasWidth / 2 + parseInt((Math.random() - 0.5) * 10), // 动画起始x坐标，默认canvas宽度一半加一个随机偏移值
  initialY: Math.floor(canvasHeight / 2) + parseInt((Math.random() - 0.5) * 10), // 动画起始y坐标，默认canvas高度一半加一个随机偏移值
  totalFrame: 500, // 动画总时间，默认500帧
  animationType: 'easeInOutExpo', // 动画曲线类型，默认easeOutExpo,支持的动画：http://easings.net/zh-cn#
  blur: function(r, g, b, a) {  // 对于不同像素设置不同的目标点偏移值，像素的rgba分量作为4个参数传入函数
    if (r < 20 && g < 20 && b < 20 && a > 0) {
      return 0
    }
    return 10
  },
  filter: function (r, g, b, a) { // 像素filter，滤出rgba满足条件的像素
    return (g > 180 || r > 200 || b > 200) && a > 0
  },
  delay: function (index) { // particle动画执行延时，输入参数为该粒子在所有粒子数组里的index
    return parseInt(Math.random() * 500)
  }
})
```

绘制静态图
```js
particle.draw()
```
该方法返回一个promise对象，方便在静态图绘制完成之后进行某些操作
```js
particle.draw().then(function () {
  console.log('draw finished')
})
```

开始粒子动画
```js
particle.animate()
```
该方法返回一个promise对象，方便在粒子动画完成之后进行某些操作
```js
particle.animate().then(function () {
  console.log('animation finished')
})
```

清除画布
```js
particle.clearCtx()
```

清除文本、图像配置
```js
particle.clearText()
particle.clearImage()
```
