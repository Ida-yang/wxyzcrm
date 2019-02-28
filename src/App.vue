
<script>
import config from './config'
export default {
  created () {
    // wx.request({
    //   url: config.host + 'customerOne/query.do',  //接口地址
    //   data: {
    //     limit: 2
    //   },
    //   header: {
    //     'content-type': 'application/json'  //默认值
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* padding: 200rpx 0; */
    box-sizing: border-box;
    font-size: 28rpx;
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
  /* 添加按钮 */
  .btn-add{
    width:100%; 
    background-color: #d9d9d9;
    position:fixed; 
    bottom:0; 
  }
  /* 确认按钮 */
  .btn-sure{
    /* margin-top: 30rpx; */
    /* margin-bottom: 20rpx; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* 自定义的按钮（白色的按钮） */
  .btn-custom{
    width: 40%;
    background-color: #ff5722;
    color: #ffffff;
  }
  /* 详情页 */
  .details{
    width: 100%;
    background-color: #f0f0f0;
  }
  /* 详情页的联系人和跟进记录有多个 */
  .detail-contact,.detail-follow{
    margin-bottom: 10rpx;
    background-color: #ffffff;
  }
  .detail-info{
    background-color: #ffffff;
  }
  .weui-btn{
    font-size: 34rpx;
  }
  .details_bd{
    background-color: #ffffff;
    margin-bottom: 50rpx;
  }
  .weui-media-box__desc{
    line-height: 40rpx;
    text-align: left;
  }
  .weui-form-preview__value{
    color: #000000;
    text-align: right
  }
  .weui-navbar{
    background-color: #ffffff;
  }
  .weui-tab__panel {
    padding-top:110rpx;
  }
  .weui-tab__content{
    text-align: center;
  }
</style>
