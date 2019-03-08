<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="clueupdate">
            <div class="page__bd">
                
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell weui-cell_select">
                        <div class="weui-cell__hd weui-cell__hd_in-select-after">
                            <div class="weui-label">线索来源<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker @change="cueChange" v-model="InfoList.cueid" :value="cueIndex" :range="cues">
                                <div class="weui-select">{{cues[cueIndex]}}</div>
                            </picker>
                        </div>
                    </div>
                </div>

                <!-- <div class="weui-cells__title">公司名称</div> -->
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">公司名称<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="InfoList.poolname" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">联系人<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="InfoList.coName" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">手机<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="InfoList.phone" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">电话</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="InfoList.telphone" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">地址</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="InfoList.address" @input="inputval" />
                        </div>
                    </div>
                </div>

                <div class="weui-cells__title">备注</div>
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <textarea class="weui-textarea" v-model="InfoList.remark" style="height: 5.3em; line-height: 1.5em" @input="inputval" />
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
                msg:'线索修改',

                cues: [],
                cueId: [],
                cueIndex: 0,

                InfoList:{
                    id:'',
                    csId:'',
                    cueid:'',
                    poolname:'',
                    coName:'',
                    telphone:'',
                    phone:'',
                    address:'',
                    remark:'',
                },
            }
        },
        onShow(){
            this.getItems()
            this.loaddata()
        },
        methods:{
            //获取URL数据
            getItems(){
                this.InfoList = {}
                let pages = getCurrentPages()    //获取加载的页面
                let currentPage = pages[pages.length-1]    //获取当前页面的对象
                let url = currentPage.route    //当前页面url
                // console.log(currentPage.options)
                this.InfoList.id = currentPage.options.id      //上个页面带过来的参数
                this.InfoList.poolname = currentPage.options.name      //上个页面带过来的参数
                this.InfoList.csId = currentPage.options.csId      //上个页面带过来的参数
                this.InfoList.coName = currentPage.options.coName      //上个页面带过来的参数
                this.InfoList.telphone = currentPage.options.tel      //上个页面带过来的参数
                this.InfoList.phone = currentPage.options.phone      //上个页面带过来的参数
                this.InfoList.address = currentPage.options.address      //上个页面带过来的参数
                this.InfoList.remark = currentPage.options.remark      //上个页面带过来的参数
                this.InfoList.cueid = currentPage.options.cuesid      //上个页面带过来的参数
                // console.log(this.id,this.name,this.coName,this.telphone,this.phone,this.address,this.remark)
                console.log('22222222')
            },
            loaddata(){
                const _this = this
                _this.cues = []
                _this.cueId = []
                wx.request({
                    url: config.host + 'typeInfo/getTypeInfoGroupByType.do?cId=' +'201901973891',  //接口地址
                    data: {
                        type: '客户来源'
                    },
                    success: function (res) {
                        // console.log(res.data)
                        let cueData = res.data
                        cueData.forEach((el,i) => {
                            // console.log(el.typeName)
                            _this.cues.push(el.typeName)
                            _this.cueId.push(el.id)
                        });
                        console.log(_this.InfoList.cueid)
                        // _this.InfoList.cueid = _this.cueId[_this.cueIndex]
                        _this.cueId.forEach((el,i) => {
                            if(el == _this.InfoList.cueid){
                                // console.log(el,"true",i)
                                _this.cueIndex = i
                            }
                            return
                            console.log(_this.cueIndex)
                        });
                    }
                })
            },
            cueChange(e){
                // console.log('picker country 发生选择改变，携带值为', e.mp.detail.value);
                this.cueIndex = e.mp.detail.value
                this.InfoList.cueid = this.cueId[this.cueIndex]
            },
            inputval(e){
                // console.log(e.currentTarget.dataset.eventid)
                if(e.currentTarget.dataset.eventid == '1'){
                    this.InfoList.poolname = e.mp.detail.value
                }else if(e.currentTarget.dataset.eventid == '2'){
                    this.InfoList.coName = e.mp.detail.value
                }else if(e.currentTarget.dataset.eventid == '3'){
                    this.InfoList.phone = e.mp.detail.value
                }else if(e.currentTarget.dataset.eventid == '4'){
                    this.InfoList.telphone = e.mp.detail.value
                }else if(e.currentTarget.dataset.eventid == '5'){
                    this.InfoList.address = e.mp.detail.value
                }else if(e.currentTarget.dataset.eventid == '6'){
                    this.InfoList.remark = e.mp.detail.value
                }
            },
            addClick(){
                let InfoList = this.InfoList
                console.log(InfoList)
                let flag = true
                if(!InfoList.poolname){
                    wx.showModal({
                        content: '请填写公司名称再提交',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                    return flag = false
                }
                if(!InfoList.coName){
                    wx.showModal({
                        content: '请填写联系人再提交',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                    return flag = false
                }
                if(!InfoList.phone){
                    wx.showModal({
                        content: '请填写手机号码再提交',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                    return flag = false
                }
                
                if(flag){
                    const _this = this
                    wx.request({
                        method: 'post',
                        url: config.host + 'customerTwo/updateClue.do?cId=' + '201901973891' + '&pId=' + '93',  //接口地址
                        data: {
                            id: _this.InfoList.id,
                            csId: _this.InfoList.csId,
                            secondid: '64',
                            deptid: '2',
                            cuesid: _this.InfoList.cueid,
                            poolName: _this.InfoList.poolname,
                            contactsName: _this.InfoList.coName,
                            telphone: _this.InfoList.telphone,
                            phone: _this.InfoList.phone,
                            address: _this.InfoList.address,
                            remark: _this.InfoList.remark,
                        },
                        header:{
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success:function(res) {
                            console.log(res)
                            if(res.data.code && res.data.code == '200'){
                                wx.showToast({
                                    title: '已完成',
                                    icon: 'success',
                                    duration: 2000
                                });
                                wx.navigateBack({
                                    delta: 2
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
                }
            },
        },
    }
</script>

<style>
    .clueupdate{
        width: 100%;
        padding-top: 100rpx;
    }
    .weui-cells,.weui-cells__title{
        font-size: 30rpx;
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
    .weui-input{
        padding-left: 30rpx;
    }
    .__text{
        color: red;
    }

</style>