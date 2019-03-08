<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="clue">
            <header class="weui-search-bar">
                <div class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                        <input type="text" v-model="inputVal" class="weui-search-bar__input" placeholder="搜索" @input="showIcon" />
                        <div class="weui-icon-clear" v-if="iconShowed" @click="clearInput">
                            <icon type="clear" size="14"></icon>
                        </div>
                    </div>
                </div>
                <div class="weui-search-bar__cancel-btn" @click="search">搜索</div>
                <div class="weui-search-bar__cancel-btn" @click="showScreen">
                    <img src="/static/images/user.png" class="btn-icon" />
                </div>
            </header>

            <div class="screens" v-if="showScreens">
                <view class="weui-cells__title">线索状态</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn-radio" v-for="item in stateList" :key="item.id">{{item.name}}</div>
                </view>
                <view class="weui-cells__title">线索来源</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn-radio" v-for="item in cueList" :key="item.id">{{item.name}}</div>
                </view>
                <view class="weui-cells__title">数据权限</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn-radio" v-for="item in pIdList" :key="item.id">{{item.name}}</div>
                </view>
                <view class="weui-cells__title">更新时间</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn-radio">状态</div>
                    <div class="btn-radio">状态</div>
                    <div class="btn-radio">状态</div>
                    <div class="btn-radio">状态</div>
                </view>
                <!-- <button class="btn-cancer" type="default" @click="toAddClue">取消</button>
                <button class="btn-custom" type="default" @click="toAddClue">确认</button> -->
            </div>
            
            <div class="weui-panel__bd page-body">
                <div class="weui-media-box weui-media-box_text" v-for="item in clueList" :key="item.id" @click="toClueDetails($event,item)">
                    <div class="weui-media-box__title weui-media-box__title_in-text">{{item.name}}</div>
                    <div class="weui-media-box__desc">{{item.address || '无'}}</div>
                    <div class="weui-media-box__info">
                        <div class="weui-media-box__info__meta">负责人：{{item.privateUser[0].private_employee}}</div>
                        <div class="weui-media-box__info__meta weui-media-box__info__meta_extra">状态：{{item.state}}</div>
                        <div class="weui-media-box__info__meta weui-media-box__info__meta_extra">未联系天数：{{item.dayNum}} 天</div>
                    </div>
                </div>
                <div class="weui-footer page-footer" v-if="noMore">
                    <div class="weui-footer__text">-----  我是有底线的  -----</div>
                </div>
            </div>
            <footer class="btn-bottom">
                <button class="weui-btn" type="default" @click="toAddClue">新增</button>
            </footer>
        </div>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data(){
            return{
                msg:'线索详情',
                iconShowed: false,
                inputVal: "",

                showScreens:false,
                stateList:[
                    {id:'1',name:'未联系'},
                    {id:'2',name:'不想联系'},
                    {id:'3',name:'要去联系'},
                    {id:'4',name:'不能联系'},
                    {id:'5',name:'联系了'},
                    {id:'6',name:'还联系吗'},
                ],
                cueList:[],
                pIdList:[
                    {id:'1',name:'全部线索'},
                    {id:'2',name:'我的线索'},
                    {id:'3',name:'本组线索'},
                    {id:'4',name:'本机构线索'},
                ],
                
                clueList: [],
                page: 1,
                limit: 15,
                init:true,
                noMore: false
            }
        },
        // mounted(){
        //     this.loadData()
        // },
        onReachBottom(){
            // console.log('碰到底部啦')
            this.page = this.page + 1
            this.loadData()
        },
        onPullDownRefresh(){
            this.init = true
            this.noMore = false
            this.page = 1
            this.loadData()
            // wx.stopPullDownRefresh()
        },
        onShow(){
            this.init = true
            this.noMore = false
            this.page = 1
            this.loadData()
        },
        methods:{
            async loadData(){
                const _this = this
                // if(this.init !== true){
                //     this.page = this.page + 1
                // }
                wx.request({
                    url: config.host + 'customerTwo/query.do?cId=' +'201901973891' + '&pId=' + '93',  //接口地址
                    data: {
                        page: _this.page,
                        limit: _this.limit,
                        searchName: _this.inputVal
                    },
                    success:function(res) {
                        console.log(res.data.map.success)
                        let cluedata = res.data.map.success
                        if(_this.init == true){
                            _this.clueList = cluedata
                            _this.init = false
                            wx.stopPullDownRefresh()
                            // console.log('我是第一次加载')
                        }else{
                            _this.clueList = _this.clueList.concat(cluedata)
                            // console.log('我不是第一次加载了')
                        }
                        // console.log(_this.clueList)
                        if(cluedata.length < 15 && _this.page !== 1){
                            _this.noMore = true
                            return false
                        }
                    }
                })
            },
            clearInput() {
                this.inputVal = ""
                this.init = true
                this.page = 1
                this.iconShowed = false
                this.loadData()
            },
            showIcon() {
                this.iconShowed = true
            },
            search(){
                // console.log(this.inputVal)
                this.init = true
                this.page = 1
                this.noMore = false
                this.loadData()
            },
            showScreen(){
                if(this.showScreens == false){
                    this.showScreens = true
                }else{
                    this.showScreens = false
                }
            },
            toClueDetails(e,val){
                // console.log(val)
                mpvue.navigateTo({
                    url:'../cluedetails/main?id=' + val.id + '&name=' + val.privateUser[0].private_employee,
                    success:function(res){
                        console.log(res)
                    }
                })
            },
            toAddClue(){
                mpvue.navigateTo({
                    url:'../clueadd/main',
                    success:function(res){
                        console.log(res)
                    }
                })
            },
        }
    }
</script>

<style>
    .clue{
        width: 100%;
        overflow: hidden;
    }
    .weui-search-bar__form{
        height: 56rpx;
    }
    .btn-icon{
        width: 50rpx;
        height: 50rpx;
    }
    .screens{
        width: 80%;
        font-size: 26rpx;
        position: fixed;
        right: 0;
        background-color: #f0f0f0;
        z-index: 9999;
        border-left: 1rpx solid #cccccc
    }
    .weui-cells__title{
        line-height: 50rpx;
        margin: 0
    }
    .radio-group{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10rpx;
    }
    .btn-radio{
        /* width:  */
        flex: 0 0 30%;
        text-align: center;
        border: 1rpx solid #cccccc;
        border-radius: 10rpx;
        font-size: 28rpx;
        padding: 6rpx 0;
        margin-top: 10rpx;
        margin-left: 10rpx;
    }
    .btn-cancer{
        width: 40%;
    }
    .page-body{
        margin-bottom: 80rpx;
    }
    .page-footer{
        height: 40rpx;
        background-color: #f0f0f0;
    }
</style>