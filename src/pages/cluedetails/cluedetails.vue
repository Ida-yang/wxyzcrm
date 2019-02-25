<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="details">
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <div class="weui-media-box__title weui-media-box__title_in-text">{{detailsList.name}}</div>
                    <div class="weui-media-box__desc">联系人姓名 &nbsp;&nbsp;{{contactsList.coName}}</div>
                    <div class="weui-media-box__desc">联系人手机 &nbsp;&nbsp;{{contactsList.phone}}</div>
                    <div class="weui-media-box__desc">详细地址 &nbsp;&nbsp;{{detailsList.address}}</div>
                </div>
            </div>
            <div class="details-head">
                基本信息
            </div>
            <div class="details-body">
                <div class="weui-panel__hd">
                    <div class="weui-form-preview__label">线索</div>
                    <div class="weui-form-preview__value">{{detailsList.name}}</div>
                </div>
                <div class="weui-panel__hd">
                    <div class="weui-form-preview__label">线索编号</div>
                    <div class="weui-form-preview__value">{{detailsList.id}}</div>
                </div>
                <div class="weui-panel__hd">
                    <div class="weui-form-preview__label">负责人</div>
                    <div class="weui-form-preview__value">电动打蛋机</div>
                </div>
                <div class="weui-panel__hd">
                    <div class="weui-form-preview__label">线索状态</div>
                    <div class="weui-form-preview__value">{{detailsList.state}}</div>
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
                option: '',
                detailsList: {},
                contactsList: {}
            }
        },
        mounted(){
            this.getItems()
            this.LoadData()
        },
        methods:{
            getItems(){
                var pages = getCurrentPages()    //获取加载的页面
                var currentPage = pages[pages.length-1]    //获取当前页面的对象
                var url = currentPage.route    //当前页面url
                this.option = currentPage.options.id      //上个页面带过来的参数
                console.log(this.option)
            },
            LoadData(){
                const _this = this
                wx.request({
                    url: config.host + 'customerTwo/selectByPrimaryKey.do?cId=' +'201901973891',  //接口地址
                    data: {
                        id: this.option
                    },
                    header: {
                        'content-type': 'application/json'  //默认值
                    },
                    success: function (res) {
                        console.log(res.data)
                        _this.detailsList = res.data
                        _this.contactsList = res.data.contacts[0]
                    }
                })
            },
        },
    }
</script>

<style>
    .details{
        width: 100%;
        background-color: #f0f0f0;
    }
    .weui-panel__bd,.details-head{
        background-color: #ffffff;
        margin-bottom: 50rpx;
    }
    .details-head{
        height: 80rpx;
        line-height: 80rpx;
        color: #999999;
        padding-left: 30rpx;
    }
    .weui-media-box__desc{
        line-height: 40rpx;
    }
    .details-body{
        background-color: #ffffff;
    }
    .weui-form-preview__value{
        color: #000000;
        text-align: right
    }
</style>