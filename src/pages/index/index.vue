<template>
    <div class="container" @click="clickHandle">
        <div class="showinfo">
            <ul class="showinfo-ul">
                <li>今日新增线索：100</li>
                <li>今日新增客户：100</li>
            </ul>
            <ul class="showinfo-ul">
                <li>今日联系：30</li>
                <li>联系目标：100</li>
                <li>差额：70</li>
            </ul>
            <ul class="showinfo-ul">
                <li>今日拜访：7</li>
                <li>拜访目标：10</li>
                <li>差额：3</li>
            </ul>
            <ul class="showinfo-ul">
                <li>商机：6</li>
                <li>商机目标：10</li>
                <li>差额：4</li>
            </ul>
            <ul class="showinfo-ul">
                <li>合同金额：30000</li>
                <li>目标金额：50000</li>
                <li>差额：20000</li>
            </ul>
        </div>

        <div class="home">
            <div class="home-query">
                <picker mode="date" :value="date" bindchange="bindDateChange">
                    <div class="picker-btn">
                        {{date}}
                    </div>
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
                    <div class="tr" v-for="item in listData" :key="item.id">
                        <div class="td">{{item.text}}</div>
                        <div class="td">{{item.code}}</div>
                        <div class="td">{{item.num}}</div>
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
            <div class="left">
                1
            </div>
            <div class="middle">
                2
            </div>
            <div class="right">
                3
            </div>
        </div>
    </div>
</template>

<script>
    import card from '@/components/card'

    export default {
        data(){
            return{
                msg: '首页',
                motto: 'Hello miniprograme',
                userInfo: {
                    nickName: 'mpvue',
                },
                date: '2016-09',
                listData:[
                    {id:1,text:'展现',code:'200',num:'30000'},
                    {id:2,text:'点击',code:'200',num:'30000'},
                    {id:3,text:'访问',code:'200',num:'30000'},
                    {id:4,text:'咨询',code:'200',num:'30000'},
                ],
                ec: {
                    // 传 options
                    options: {
                        title: {
                            text: '商机漏斗',
                            left: 'center',
                            top: 10
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}{a}：{c}"
                        },
                        legend: {
                            data: ['展现','点击','访问','咨询','订单'],
                            bottom: 30
                        },
                        calculable: true,
                        series: [
                            {
                                name:'数量',
                                type:'funnel',
                                left: '10%',
                                top: 60,
                                bottom: 80,
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
                                data: [
                                    {value: 80, name: '访问'},
                                    {value: 40, name: '咨询'},
                                    {value: 20, name: '订单'},
                                    {value: 80, name: '点击'},
                                    {value: 100, name: '展现'}
                                ]
                            }
                        ]
                    },
                    
                }
            }
        },
        components: {
            card
        },
        methods: {
            bindViewTap () {
                const url = '../logs/main'
                if (mpvuePlatform === 'wx') {
                    mpvue.switchTab({ url })
                } else {
                    mpvue.navigateTo({ url })
                }
            },
            clickHandle (ev) {
                console.log('clickHandle:', ev)
                // throw {message: 'custom test'}
            },
            bindDateChange: function(e) {
                console.log(e)
                this.setData({
                    date: e.detail.value
                })
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
        border-bottom: 3rpx solid #cccccc;
    }
    ul.showinfo-ul li{
        flex: 1;
        height: 60rpx;
        line-height: 60rpx;
        padding-left: 20rpx;
        border-right: 3rpx solid #cccccc;
    }
    ul.showinfo-ul li:last-child{
        border-right: none;
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
    .picker-btn{
        display: block;
        margin: 0 auto;
        /* width: 100%; */
        line-height: 30px;
        text-align: center;
        background-color: #ffffff;
        border-bottom: 1rpx solid #cccccc;
    }
    .home-funnel{
        width: 100%;
        height: 400px;
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
    
    .table {
        /* border: 0px solid darkgray; */
        color: #2d2d2d;
    }
    .tr {
        display: flex;
        width: 100%;
        justify-content: center;
        height: 60rpx;
        align-items: center;
    }
    
    .th,.td {
        width: 40%;
        height: 60rpx;
        line-height: 60rpx;
    }
    .th{
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        /* border-top: 1rpx solid darkgray; */
    }
    .td {
        text-align: center;
        border-right: 1rpx solid darkgray;
        border-bottom: 1rpx solid darkgray;
    }
    .td:first-child{
        border-left: 1rpx solid darkgray;
        font-weight: bold;
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
</style>
