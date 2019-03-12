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
                <div class="weui-search-bar__cancel-btn btn-icon" @click="showScreen">
                    <i class="icon iconfont icon-add"></i>
                </div>
            </header>

            <div class="screens" v-if="showScreens">
                <view class="weui-cells__title clue_title">线索状态</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn_radio" :class="[index == stateActive ? 'isActive':'']" v-for="(item,index) in stateList" :key="item.id" @click="checkstate(item,index)">{{item.typeName}}</div>
                </view>
                <view class="weui-cells__title clue_title">线索来源</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn_radio" :class="[index == cueActive ? 'isActive':'']" v-for="(item,index) in cueList" :key="item.id" @click="checkcue(item,index)">{{item.typeName}}</div>
                </view>
                <view class="weui-cells__title clue_title">数据权限</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn_radio" :class="[index == pIdActive ? 'isActive':'']" v-for="(item,index) in pIdList" :key="item.id" @click="checkpId(item,index)">{{item.name}}</div>
                </view>
                <view class="weui-cells__title clue_title">更新时间</view>
                <view class="weui-cells weui-cells_after-title radio-group">
                    <div class="btn_radio" :class="[index == dateActive ? 'isActive':'']" v-for="(item,index) in dateList" :key="item.id" @click="checkdate(item,index)">{{item.name}}</div>
                </view>
                <button class="btn-reset bl" @click="checkreset">重置</button>
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
                searchList:{
                    inputVal: '',
                    stateid:'',
                    cuesid:'',
                    pId: '93',
                    secondid:'',
                    deptid:'',
                    date:''
                },

                showScreens:false,
                stateList:[],
                stateActive: '-1',
                
                cueList:[],
                cueActive: '-1',

                pIdList:[
                    {id:'11',name:'全部线索'},
                    {id:'12',name:'我的线索'},
                    {id:'13',name:'本组线索'},
                    {id:'14',name:'本机构线索'},
                ],
                pIdActive: '1',

                dateList:[
                    {id:'1',name:'昨天'},
                    {id:'2',name:'今天'},
                    {id:'3',name:'本周'},
                    {id:'4',name:'本月'}
                ],
                dateActive: '-1',
                
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
            this.getSearchList()
        },
        methods:{
            async loadData(){
                const _this = this

                wx.request({
                    url: config.host + 'customerTwo/query.do?cId=' +'201901973891',  //接口地址
                    data: {
                        page: _this.page,
                        limit: _this.limit,
                        searchName: _this.searchList.inputVal,
                        stateid: _this.searchList.stateid,
                        cuesid: _this.searchList.cuesid,
                        pId: _this.searchList.pId,
                        secondid: _this.searchList.secondid,
                        deptid: _this.searchList.deptid,
                        example: _this.searchList.date
                    },
                    success:function(res) {
                        // console.log(res.data.map.success)
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
            getSearchList(){
                const _this = this

                wx.request({
                    url: config.host + 'typeInfo/getTypeInfoByType.do?cId=' +'201901973891',  //接口地址
                    success:function(res) {
                        // console.log(res.data)
                        _this.stateList = res.data.name1001
                        _this.cueList = res.data.name3001
                    }
                })
            },
            checkstate(item,index){
                this.stateActive = index
                this.searchList.stateid = item.id
                this.init = true
                this.noMore = false
                this.page = 1
                this.loadData()
            },
            checkcue(item,index){
                this.cueActive = index
                this.searchList.cuesid = item.id
                this.init = true
                this.noMore = false
                this.page = 1
                this.loadData()
            },
            checkpId(item,index){
                this.pIdActive = index
                if(item.id == 11){
                    this.searchList.pId = ''
                }else if(item.id == 12){
                    this.searchList.pId = '93'
                }else if(item.id == 13){
                    this.searchList.secondid = '64'
                }else if(item.id == 14){
                    this.searchList.deptid = '2'
                } 
                this.init = true
                this.noMore = false
                this.page = 1
                this.loadData()
            },
            checkdate(item,index){
                this.dateActive = index
                this.searchList.date = item.id
                this.init = true
                this.noMore = false
                this.page = 1
                this.loadData()
            },
            checkCancer(){
                this.showScreens = false
            },
            checkreset(){
                this.searchList = {inputVal: '',stateid:'',cuesid:'',pId: '93',secondid:'',deptid:'',date:''}
                this.stateActive = '-1'
                this.cueActive = '-1'
                this.pIdActive = '1'
                this.dateActive = '-1'
                this.init = true
                this.noMore = false
                this.page = 1
                this.loadData()
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
        color: black
    }
    .screens{
        width: 80%;
        height: 100%;
        font-size: 26rpx;
        position: fixed;
        right: 0;
        background-color: #f0f0f0;
        z-index: 9999;
        border-left: 1rpx solid #dddddd
    }
    .clue_title{
        line-height: 60rpx;
        font-size: 30rpx;
        margin: 0
    }
    .radio-group{
        display: flex;
        flex-wrap: wrap;
        padding-top: 20rpx;
    }
    .btn_radio{
        /* width:  */
        flex: 0 0 30%;
        text-align: center;
        border: 1rpx solid #cccccc;
        border-radius: 10rpx;
        font-size: 30rpx;
        padding: 8rpx 0;
        margin-bottom: 20rpx;
        margin-left: 2%;
    }
    .isActive{
        color: #ff5722;
        border: 1rpx solid #ff5722;
    }
    .btn-reset{
        line-height: 60rpx;
        font-size: 34rpx;
        margin-top: 60rpx;
    }
    .page-body{
        margin-bottom: 80rpx;
    }
    .page-footer{
        height: 40rpx;
        background-color: #f0f0f0;
    }
</style>