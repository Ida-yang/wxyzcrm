<template>
    <div class="container">
        <div class="showinfo">
            <ul class="showinfo-ul">
                <li>
                    <p>今日新增线索</p>
                    <p>100</p>
                </li>
                <li>
                    <p>今日新增客户</p>
                    <p>100</p>
                </li>
            </ul>
            <ul class="showinfo-ul">
                <li>
                    <p class="follow-p">今日跟进</p>
                    <p>30</p>
                </li>
                <li>
                    <p class="follow-p">跟进目标</p>
                    <p>100</p>
                </li>
                <li>
                    <p class="follow-p">差额</p>
                    <p>70</p>
                </li>
            </ul>
            <ul class="showinfo-ul">
                <li>
                    <p class="visit-p">本周拜访</p>
                    <p>7</p>
                </li>
                <li>
                    <p class="visit-p">拜访目标</p>
                    <p>10</p>
                </li>
                <li>
                    <p class="visit-p">差额</p>
                    <p>3</p>
                </li>
            </ul>
            <ul class="showinfo-ul">
                <li>
                    <p class="opp-p">本周商机</p><p>6</p>
                </li>
                <li>
                    <p class="opp-p">商机目标</p><p>10</p>
                </li>
                <li>
                    <p class="opp-p">差额</p><p>4</p>
                </li>
            </ul>
            <ul class="showinfo-ul">
                <li>
                    <p class="agree-p">本月合同</p><p>30000</p>
                </li>
                <li>
                    <p class="agree-p">合同目标</p><p>50000</p>
                </li>
                <li>
                    <p class="agree-p">差额</p><p>20000</p>
                </li>
            </ul>
        </div>

        <div class="home">
            <div class="home-query">
                <picker mode="date" :value="date" fields="month" start="2000-01" :end="endDate" @change="search">
                    <div class="picker-btn">
                        {{date}}
                        <icon type="success_no_circle" size="10"></icon>
                    </div>
                    <div class="picker-line"></div>
                </picker>
            </div>
            <div class="home-funnel">
                <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
            </div>
            <div class="home-table">
                <div class="table">
                    <div class="tr">
                        <div class="th">阶段</div>
                        <div class="th">数量</div>
                        <div class="th">金额</div>
                    </div>
                    <div class="tr" v-for="item in listData" :key="item.name">
                        <div class="td">{{item.name}}</div>
                        <div class="td">{{item.value}}</div>
                        <div class="td">{{item.value}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="userinfo" @click="bindViewTap">
            <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

            <div class="userinfo-nickname">
                <card :text="userInfo.nickName"></card>
            </div>
        </div>

        <div class="usermotto">
            <div class="user-motto">
                <card :text="motto"></card>
            </div>
        </div>

        <form class="form-container">
            <input type="text" class="form-control" :value="motto" placeholder="v-model" />
            <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
            <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
        </form>

        <div class="all">
            <div class="left" @click="chooseImg">
                相机或相册
            </div>
            <div class="middle" @click="getlocal">
                获取地址
            </div>
            <div class="right">
                3
            </div>
        </div>
        <div>
            <img class="chooseimage" :src="tempFilePaths" v-if="chooseimage" />
        </div>
    </div>
</template>

<script>
    import card from '@/components/card'
    import config from '../../config'

    export default {
        data(){
            return{
                msg: '首页',
                motto: 'Hello miniprograme',
                userInfo: {
                    nickName: 'mpvue',
                },

                date: '',
                endDate: '',

                listData:[],

                amountList:{},

                ec: {// 传 options
                    options: {
                        title: {
                            text: '商机漏斗',
                            left: 10,
                            top: 10,
                            textStyle: {　//标题的文字样式
                                fontSize: 15
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}\n{a}：{c}"
                        },
                        legend: {
                            data: ['初步了解','拜访','需求确认','商务谈判','成功签约','失败关闭'],
                            bottom: 30
                        },
                        calculable: true,
                        series: [
                            {
                                name:'数量',
                                type:'funnel',
                                left: '10%',
                                top: 60,
                                bottom: 100,
                                width: '80%',
                                minSize: '5%',
                                sort: 'none',
                                // gap: 2,
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                emphasis: {
                                    label: {
                                        fontSize: 14
                                    }
                                },
                                data: []
                            }
                        ]
                    },
                    
                },

                tempFilePaths: '',
                chooseimage: false
            }
        },
        components: {
            card
        },
        onShow(){
            this.getDate()
            this.loadData()
        },
        onPullDownRefresh(){
            this.loadData()
            wx.stopPullDownRefresh()
        },
        methods: {
            loadData(){
                const _this = this
                wx.request({
                    method: 'get',
                    url: config.host + 'homePageHeader/getHomePageHeader.do?cId=' + '201901973891' + '&pId=' + '93',  //接口地址
                    success:function(res) {
                        // console.log(res.data)
                        _this.amountList = res.data
                    }
                })
                wx.request({
                    method: 'post',
                    url: config.host + 'getMonthCountByExample.do?cId=' + '201901973891' + '&pId=' + '93',  //接口地址
                    data:{
                        yearMonth: _this.date
                    },
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:function(res) {
                        // console.log(res.data)
                        _this.ec.options.series[0].data = res.data
                        _this.listData = res.data
                    }
                })
            },
            getDate(){
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                month = (month < 10 ? "0" + month : month);
                this.endDate = year + '-' + month
                this.date = year + '-' + month
                // console.log(year + '-' + month)
            },
            bindViewTap () {
                const url = '../logs/main'
                if (mpvuePlatform === 'wx') {
                    mpvue.switchTab({ url })
                } else {
                    mpvue.navigateTo({ url })
                }
            },
            search(e) {
                // console.log(e.mp.detail.value)
                this.date = e.mp.detail.value
            },
            chooseImg(){
                const _this = this
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],
                    success(res) {
                        console.log(res)
                        // tempFilePath可以作为img标签的src属性显示图片
                        _this.chooseimage = true
                        _this.tempFilePaths = res.tempFilePaths[0]
                    }
                })
            },
            getlocal(){
                wx.showModal({
                    content: '允许“云纵CRM”使用我的位置信息',
                    success(res) {
                        if (res.confirm) {
                            wx.getLocation({
                                type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
                                success(res) {
                                    console.log(res)
                                    const latitude = res.latitude
                                    const longitude = res.longitude
                                    wx.openLocation({
                                        latitude,
                                        longitude,
                                        scale: 18
                                    })
                                },
                                fail(err){
                                    // console.log(err)
                                    if(err.errCode && err.errCode == 404){
                                        wx.showModal({
                                            content: 'GPS未开启，未能获取当前位置信息', //提示的内容,
                                            showCancel: false, //是否显示取消按钮,
                                        });
                                    }else{
                                        wx.showModal({
                                            content: err.errMsg, //提示的内容,
                                            showCancel: false, //是否显示取消按钮,
                                        });
                                    }
                                    
                                }
                            })
                        } else if (res.cancel) {
                            return
                        }
                    }
                });
                
            },
        },

        created () {
            // let app = getApp()
        }
    }
</script>

<style>
    .showinfo{
        width: 100%;
    }
    ul.showinfo-ul{
        display: flex;
        border-bottom: 1rpx solid #cccccc;
    }
    ul.showinfo-ul li{
        flex: 1;
        height: 120rpx;
        line-height: 60rpx;
        border-right: 1rpx solid #cccccc;
        text-align: center;
    }
    ul.showinfo-ul li:last-child{
        border-right: none;
    }
    ul.showinfo-ul li .follow-p{
        background-color: #ecf5f2;
        /* color: #ffffff */
    }
    ul.showinfo-ul li .visit-p{
        background-color: #f7f2f0;
        /* color: #ffffff */
    }
    ul.showinfo-ul li .opp-p{
        background-color: #ebecf5;
        /* color: #ffffff */
    }
    ul.showinfo-ul li .agree-p{
        background-color: #f7efef;
        /* color: #ffffff */
    }
    .home{
        width: 100%;
        height:auto;
    }
    .home-query{
        width: 100%;
        height: 30px;
        box-sizing: border-box
    }
    .picker-btn,.picker-line{
        display: block;
        margin: 0 auto;
        width: 30%;
        line-height: 30px;
        text-align: center;
        background-color: #ffffff;
    }
    .picker-line{
        height: 10rpx;
        border-top: 10rpx solid #5e5e5e;
        border-radius: 10rpx
    }
    .home-funnel{
        width: 100%;
        height: 500px;
    }
    .home-funnel ec-canvas {
        width: 400px;
        height: 400px;
    }
    .home-table{
        width: 100%;
        padding: 10px;
        background-color: #ffffff;
        box-sizing: border-box;
    }
    .userinfo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .userinfo-avatar {
        width: 128rpx;
        height: 128rpx;
        margin: 20rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }

    .usermotto {
        margin-top: 50px;
    }

    .form-control {
        display: block;
        padding: 0 12px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }
    .all{
        width:7.5rem;
        height:1rem;
        background-color:blue;
    }
    .all:after{
        display:block;
        content:'';
        clear:both;
    }
    .left{
        float:left;
        width:2.5rem;
        height:1rem;
        background-color:yellow;
    }
    .middle{
        float: left;
        width: 2.5rem;
        height: 1rem;
        background-color: red;
    }
    .right{
        float:left;
        width:2.5rem;
        height:1rem;
        background-color:green;
    }
    .chooseimage{
        width: 570rpx;
        height: 1200rpx;
    }
</style>
