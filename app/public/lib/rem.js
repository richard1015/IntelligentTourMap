var deviceWidth = window.screen.width;
console.log(deviceWidth)
if (deviceWidth > 750) deviceWidth = 750;
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';

// 获取url上的参数，可以直接获取到参数name的值
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

var env = 'https://xx-activity.xiaoxiedu.com/'
// var env = 'http://192.168.12.220:7051/'


//判断是否是微信浏览器的函数
function is_weixin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
//解决ios 微信浏览器中 键盘弹起后不收缩问题
$(document).ready(function () {
  if (is_weixin()) {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      //这个是安卓操作系统
    }
    if (isIOS) {
      //这个是ios操作系统
      $('input,textarea').on('blur', function () {
        // window.scroll(0, document.documentElement.clientHeight);
        document.activeElement.scrollIntoViewIfNeeded(true)
      });
      $('select').on('change', function () {
        // window.scroll(0, document.documentElement.clientHeight);
        document.activeElement.scrollIntoViewIfNeeded(true)
      });
    }

  }
});