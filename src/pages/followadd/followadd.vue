<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="followadd">
            <div class="page__bd">
                
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell weui-cell_select">
                        <div class="weui-cell__hd weui-cell__hd_in-select-after">
                            <div class="weui-label">联系方式<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker @change="ChangeWay" v-model="InfoList.way" :value="wayIndex" :range="ways">
                                <div class="weui-select">{{ways[wayIndex]}}</div>
                            </picker>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select">
                        <div class="weui-cell__hd weui-cell__hd_in-select-after">
                            <div class="weui-label">联系人<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker @change="ChangeContact" v-model="InfoList.contact" :value="contactIndex" :range="contacts">
                                <div class="weui-select">{{contacts[contactIndex]}}</div>
                            </picker>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select">
                        <div class="weui-cell__hd weui-cell__hd_in-select-after">
                            <div class="weui-label">状态<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker @change="ChangeState" v-model="InfoList.state" :value="stateIndex" :range="states">
                                <div class="weui-select">{{states[stateIndex]}}</div>
                            </picker>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select">
                        <div class="weui-cell__hd weui-cell__hd_in-select-after">
                            <div class="weui-label">下次联系时间</div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker mode="date" :value="InfoList.date" :start="startDate" @change="changeDate">
                                <div class="picker-btn" style="padding-left:30rpx;">
                                    {{InfoList.date}}
                                </div>
                            </picker>
                        </div>
                    </div>
                </div>

                <div class="weui-cells__title">添加跟进内容<text class="__text"> * </text></div>
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <textarea class="weui-textarea" :value="InfoList.followcon" style="height: 5.3em; line-height: 1.5em" @input="inputcon" />
                            <div class="weui-textarea-counter">0/200</div>
                        </div>
                    </div>
                </div>

                <div class="btn-sure">
                    <button class="weui-btn btn-custom" size="mini" @click="addClick">确定</button>
                </div>

                <div class="weui-cells__text"><text class="__text"> * </text>为必填项</div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data(){
            return{
                msg:'添加跟进记录',
                clueId:'',

                ways: ["微信", "电话", "QQ"],
                wayIndex: 0,

                contacts: [],
                contactsId: [],
                contactIndex: 0,

                states: [],
                statesId: [],
                stateIndex: 0,

                startDate: '',

                InfoList:{
                    way: '',
                    contact: '',
                    state: '',
                    date: '',
                    followcon: ''
                }
            }
        },
        onShow(){
            this.getItems()
            this.getDate()
            this.loadData()
        },
        methods:{
            //获取后台接口
            loadData(){
                const _this = this
                this.InfoList.way = this.ways[this.wayIndex]
                this.InfoList.followcon = ''
                //获取联系方式
                wx.request({
                    url: config.host + 'typeInfo/getTypeInfoGroupByType.do?cId=' +'201901973891',  //接口地址
                    data: {
                        type: '线索状态'
                    },
                    success: function (res) {
                        // console.log(res.data)
                        let stateData = res.data
                        stateData.forEach((el,i) => {
                            // console.log(el.typeName)
                            _this.states.push(el.typeName)
                            _this.statesId.push(el.id)
                        });
                        _this.InfoList.state = _this.statesId[_this.stateIndex]
                    }
                })
                //获取联系人
                wx.request({
                    url: config.host + 'customerTwo/getClueContacts.do?cId=' +'201901973891' + '&customeroneId=' + _this.clueId,  //接口地址
                    data: {
                        limit: 1000
                    },
                    success: function (res) {
                        // console.log(res.data)
                        let conData = res.data.map.success
                        conData.forEach((el,i) => {
                            // console.log(el.name)
                            _this.contacts.push(el.name)
                            _this.contactsId.push(el.id)
                        });
                        _this.InfoList.contact = _this.contactsId[_this.contactIndex]
                    }
                })
            },
            //获取URL数据
            getItems(){
                let pages = getCurrentPages()    //获取加载的页面
                let currentPage = pages[pages.length-1]    //获取当前页面的对象
                let url = currentPage.route    //当前页面url
                // this.clueId = currentPage.options.id      //上个页面带过来的参数
                this.clueId = 2785
                // console.log(this.clueId)
            },
            //获取时间
            getDate(){
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                month = (month < 10 ? "0" + month : month);
                day = (day < 10 ? "0" + day : day);
                this.startDate = year + '-' + month + '-' + day
                this.InfoList.date = year + '-' + month + '-' + day
            },
            ChangeWay(e){
                this.wayIndex = e.mp.detail.value
                this.InfoList.way = this.ways[this.wayIndex]
            },
            ChangeContact(e){
                this.contactIndex = e.mp.detail.value
                this.InfoList.contact = this.contactsId[this.contactIndex]
            },
            ChangeState(e){
                this.stateIndex = e.mp.detail.value
                this.InfoList.state = this.statesId[this.stateIndex]
            },
            changeDate(e){
                this.InfoList.date = e.mp.detail.value
            },
            inputcon(e){
                this.InfoList.followcon = e.mp.detail.value
            },
            addClick(){
                const _this = this
                console.log(this.InfoList)
                if(!this.InfoList.followcon){
                    wx.showModal({
                        content: '请填写跟进内容再提交',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                }else{
                    wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
        },
    }
</script>

<style>
    .followadd{
        width: 100%;
        padding-top: 100rpx;
    }
    .weui-cell,.weui-cells__title{
        font-size: 30rpx;
        overflow: hidden;
    }
    .weui-cell__hd{
        color: #999
    }
    .weui-cells__text{
        line-height: 100rpx;
        padding-left: 30rpx;
        color: #999
    }
    .weui-cells_after-title{
        margin-bottom: 30rpx;
        line-height: 80rpx;
    }
    .__text{
        color: red;
    }
</style>