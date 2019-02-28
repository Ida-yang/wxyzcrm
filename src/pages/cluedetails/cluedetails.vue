<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="details">
            <div class="details_bd">
                <div class="weui-media-box weui-media-box_text">
                    <div class="weui-media-box__title weui-media-box__title_in-text">{{detailsList.name}}</div>
                    <div class="weui-media-box__desc">联系人姓名 &nbsp;&nbsp;{{contactsList.coName || '无'}}</div>
                    <div class="weui-media-box__desc">联系人手机 &nbsp;&nbsp;{{contactsList.phone || '无'}}</div>
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
                        <div class="detail-follow">
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">联系人</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">时间</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                            <div class="weui-media-box">
                                <div class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</div>
                            </div>
                        </div>
                        <div class="detail-follow">
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">联系人</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">时间</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                            <div class="weui-media-box">
                                <div class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</div>
                            </div>
                        </div>
                    </div>

                    <div class="weui-tab__content" :hidden="activeIndex != 1">
                        <div class="detail-contact">
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">联系人</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">电话</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                        </div>
                        <div class="detail-contact">
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">联系人</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                            <div class="weui-panel__hd">
                                <div class="weui-form-preview__label">电话</div>
                                <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-tab__content" :hidden="activeIndex != 2">
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">线索</div>
                            <div class="weui-form-preview__value">{{detailsList.name || '无'}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">负责人</div>
                            <div class="weui-form-preview__value">{{optionName || '无'}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">线索状态</div>
                            <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">未联系天数</div>
                            <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">创建时间</div>
                            <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
                        </div>
                        <div class="weui-panel__hd detail-info">
                            <div class="weui-form-preview__label">创建人</div>
                            <div class="weui-form-preview__value">{{detailsList.state || '无'}}</div>
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
                contactsList: {},

                tabs: [
                    {name:"跟进记录"}, 
                    {name:"联系人"}, 
                    {name:"基本信息"}
                ],
                activeIndex: 0,
                sliderOffset: 0,
                sliderLeft: 0,
                sliderstyle: null,
            }
        },
        mounted(){
            this.getItems()
            this.LoadData()
            this.loadInfo()
        },
        methods:{
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
                wx.request({
                    url: config.host + 'customerTwo/selectByPrimaryKey.do?cId=' +'201901973891',  //接口地址
                    data: {
                        id: this.optionId
                    },
                    success: function (res) {
                        console.log(res.data)
                        _this.detailsList = res.data
                        _this.contactsList = res.data.contacts[0]
                    }
                })
            },
            loadInfo() {
                let _this = this;
                let sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
                wx.getSystemInfo({
                    success: function(res) {
                        console.log(res)
                        _this.sliderLeft = (res.windowWidth / _this.tabs.length - sliderWidth) / 2 + 10,
                        _this.sliderOffset = (res.windowWidth / _this.tabs.length * _this.activeIndex)
                        _this.sliderstyle = 'left: '+ _this.sliderLeft + 'px;' + 'transform: translateX(' + _this.sliderOffset + 'px);' + '-webkit-transform: translateX(' + _this.sliderOffset + 'px);'
                        console.log("_this.sliderLeft："+_this.sliderLeft,"_this.sliderOffset："+_this.sliderOffset)
                    }
                });
            },
            tabClick(e) {
                console.log(e)
                this.sliderOffset = e.mp.currentTarget.offsetLeft,
                this.sliderstyle = 'left: '+ this.sliderLeft + 'px;' + 'transform: translateX(' + this.sliderOffset + 'px);' + '-webkit-transform: translateX(' + this.sliderOffset + 'px);'
                this.activeIndex = e.mp.currentTarget.id
            }
        },
    }
</script>

<style>
</style>