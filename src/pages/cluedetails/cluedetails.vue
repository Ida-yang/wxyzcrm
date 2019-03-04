<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="details">
            <div class="details_bd">
                <div class="weui-media-box weui-media-box_text">
                    <div class="weui-media-box__title weui-media-box__title_in-text">{{detailsList.name}}</div>
                    <div class="weui-media-box__desc">联系人姓名 &nbsp;&nbsp;{{decontactsList.coName || '无'}}</div>
                    <div class="weui-media-box__desc">联系人手机 &nbsp;&nbsp;{{decontactsList.phone || '无'}}</div>
                    <div class="weui-media-box__desc">详细地址 &nbsp;&nbsp;{{detailsList.address || '无'}}</div>
                </div>
            </div>
            <div class="weui-tab">
                <div class="weui-navbar">
                    <block v-for="item in tabs" :key="item.name">
                        <div :id="index" @click="tabClick" class="weui-navbar__item">
                            <div class="weui-navbar__title">{{item.name}}</div>
                        </div>
                    </block>
                    <div class="weui-navbar__slider" :style="sliderstyle"></div>
                </div>
                <div class="weui-tab__panel">
                    <div class="weui-tab__content" :hidden="activeIndex != 0">
                        <div class="weui-media-box weui-media-box_text" v-for="item in followList" :key="item.id">
                            <div class="weui-media-box__title weui-media-box__title_in-text">
                                {{item.coName}}
                                <span class="weui-cell__ft weui-cell__ft_in-access"></span>
                                <span class="_name">&nbsp;&nbsp;&nbsp;{{item.followType}}</span>
                            </div>
                            <div class="weui-media-box__desc">{{item.followContent}}</div>
                            <div class="weui-media-box__info">
                                <div class="weui-media-box__info__meta">{{item.createTime}}</div>
                            </div>
                        </div>
                        <!-- <div class="detail-follow" v-for="item in followList" :key="item.id">
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">联系人</div>
                                <div class="weui-form-preview__value">{{item.coName}}</div>
                            </div>
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">时间</div>
                                <div class="weui-form-preview__value">{{item.createTime}}</div>
                            </div>
                            <div class="weui-media-box">
                                <div class="weui-media-box__desc">{{item.followContent}}</div>
                            </div>
                        </div> -->

                        <div style="height:80rpx;background-color:#fff;"></div>

                        <div class="jump_content" v-if="showJump">
                            <button class="weui-btn btn-white" @click="toCustomer">转移至客户</button>
                            <button class="weui-btn btn-white" @click="toCluePool">转移至线索池</button>
                        </div>

                        <div class="btn-bottom">
                            <button class="weui-btn btn-white btn-left" @click="toAddFollow">添加跟进记录</button>
                            <div class="weui-cell weui-cell_access" @click="toJump">
                                <view class="weui-cell__bd">更多</view>
                                <view class="weui-cell__ft weui-cell__ft_in-access"></view>
                            </div>
                        </div>
                    </div>

                    <div class="weui-tab__content" :hidden="activeIndex != 1">
                        <div class="detail-contact" v-for="item in contactsList" :key="item.id">
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">联系人</div>
                                <div class="weui-form-preview__value">{{item.name || '无'}}</div>
                            </div>
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">电话</div>
                                <div class="weui-form-preview__value">{{item.telphone || '无'}}</div>
                            </div>
                        </div>
                        <div style="height:80rpx;background-color:#fff;"></div>
                    </div>

                    <div class="weui-tab__content" :hidden="activeIndex != 2">
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">线索</div>
                            <div class="weui-form-preview__value">{{detailsList.name}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">负责人</div>
                            <div class="weui-form-preview__value">{{optionName}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">线索状态</div>
                            <div class="weui-form-preview__value">{{detailsList.state}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">未联系天数</div>
                            <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">创建时间</div>
                            <div class="weui-form-preview__value">{{detailsList.createTime}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">创建人</div>
                            <div class="weui-form-preview__value">{{optionName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data(){
            return{
                msg:'线索详情',
                optionId: '',
                optionName: '',

                detailsList: {},
                decontactsList: {},
                contactsList: {},
                followList: {},

                tabs: [
                    {name:"跟进记录"}, 
                    {name:"联系人"}, 
                    {name:"基本信息"}
                ],
                activeIndex: 0,
                sliderOffset: 0,
                sliderLeft: 0,
                sliderstyle: null,

                showJump:false
            }
        },
        onShow(){
            this.getItems()
            this.LoadData()
            this.loadInfo()
        },
        methods:{
            //获取URL数据
            getItems(){
                let pages = getCurrentPages()    //获取加载的页面
                let currentPage = pages[pages.length-1]    //获取当前页面的对象
                let url = currentPage.route    //当前页面url
                this.optionId = currentPage.options.id      //上个页面带过来的参数
                this.optionName = currentPage.options.name
                // console.log(this.optionId)
            },
            LoadData(){
                const _this = this
                this.showJump = false
                //获取线索详情
                wx.request({
                    url: config.host + 'customerTwo/selectByPrimaryKey.do?cId=' +'201901973891',  //接口地址
                    data: {
                        id: this.optionId
                    },
                    success: function (res) {
                        console.log(res.data)
                        _this.detailsList = res.data
                        _this.decontactsList = res.data.contacts[0]
                    }
                })
                //获取详情页联系人
                wx.request({
                    url: config.host + 'customerTwo/getClueContacts.do?cId=' +'201901973891',  //接口地址
                    data: {
                        customeroneId: this.optionId,
                        limit: 10000
                    },
                    success: function (res) {
                        console.log(res.data.map.success)
                        _this.contactsList = res.data.map.success
                    }
                })
                //获取详情页跟进记录
                wx.request({
                    url: config.host + 'getFollowStaff.do?cId=' +'201901973891',  //接口地址
                    data: {
                        customertwoId: this.optionId
                    },
                    success: function (res) {
                        console.log(res.data.map.success)
                        let datamap = res.data.map.success
                        _this.followList = datamap
                        datamap.forEach((el,index) => {
                            // console.log(el.contacts[0].name)
                            _this.followList[index].coName = el.contacts[0].name
                            // console.log(index)
                        });
                    }
                })
            },
            //获取点击屏幕的位置
            loadInfo() {
                let _this = this;
                let sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
                wx.getSystemInfo({
                    success: function(res) {
                        // console.log(res)
                        _this.sliderLeft = (res.windowWidth / _this.tabs.length - sliderWidth) / 2 + 10,
                        _this.sliderOffset = (res.windowWidth / _this.tabs.length * _this.activeIndex)
                        _this.sliderstyle = 'left: '+ _this.sliderLeft + 'px;' + 'transform: translateX(' + _this.sliderOffset + 'px);' + '-webkit-transform: translateX(' + _this.sliderOffset + 'px);'
                        // console.log("_this.sliderLeft："+_this.sliderLeft,"_this.sliderOffset："+_this.sliderOffset)
                    }
                });
            },
            //选项卡切换
            tabClick(e) {
                // console.log(e)
                this.sliderOffset = e.mp.currentTarget.offsetLeft,
                this.sliderstyle = 'left: '+ this.sliderLeft + 'px;' + 'transform: translateX(' + this.sliderOffset + 'px);' + '-webkit-transform: translateX(' + this.sliderOffset + 'px);'
                this.activeIndex = e.mp.currentTarget.id
            },
            toAddContact(){
                mpvue.navigateTo({
                    url:'../customerCoadd/main?id=' + this.optionId,
                    success:function(res){
                        console.log(res)
                    }
                })
            },
            toAddFollow(){
                mpvue.navigateTo({
                    url:'../cluefollowadd/main?id=' + this.optionId,
                    success:function(res){
                        console.log(res)
                    }
                })
            },
            //打开更多操作
            toJump(){
                this.showJump = !this.showJump
            },
            toCustomer(){
                const _this = this
                wx.request({
                    method: 'post',
                    url: config.host + 'customerTwo/insert.do?cId=' + '201901973891' + '&pId=' + '93',  //接口地址
                    data: {
                        id: _this.optionId,
                    },
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:function(res) {
                        console.log(res)
                        if(res.data && res.data == 'success'){
                            wx.showToast({
                                title: '已完成',
                                icon: 'success',
                                image: '../../../static/images/user.png',
                                duration: 2000
                            });
                            wx.navigateBack({
                                delta: 1
                            })
                        }else{
                            wx.showModal({
                                content: res.data.msg,
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    }
                                }
                            });
                        }
                    }
                })
            },
            toCluePool(){
                const _this = this
                wx.request({
                    method: 'post',
                    url: config.host + 'customerTwo/updateState.do?cId=' + '201901973891',  //接口地址
                    data: {
                        id: _this.optionId,
                    },
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:function(res) {
                        console.log(res)
                        if(res.data && res.data == 'success'){
                            wx.showToast({
                                title: '已完成',
                                icon: 'success',
                                duration: 2000
                            });
                            wx.navigateBack({
                                delta: 1
                            })
                        }else{
                            wx.showModal({
                                content: res.data.msg,
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    }
                                }
                            });
                        }
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .weui-media-box__desc,.weui-media-box__title{
        text-align: left;
        font-size: 30rpx;
    }
    .weui-media-box__desc{
        line-height: 40rpx;
    }
    .btn-bottom,.weui-media-box{
        background-color: #ffffff;
    }
    .btn-left{
        width: 40%;
        float: left;
    }
    .jump_content{
        width: 60%;
        position: fixed;
        bottom: 80rpx;
        right: 0;
    }
    .weui-btn{
        font-size: 30rpx
    }
    .weui-btn + .weui-btn{
        margin: 0;
    }
    ._name{
        color: #999
    }
    .weui-navbar__slider{
        background-color: #ff5722;
        border-bottom: 1rpx solid #ff5722
    }
</style>