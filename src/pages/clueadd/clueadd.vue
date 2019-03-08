<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="clueadd">
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
                            <input class="weui-input" :value="InfoList.poolname" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">联系人<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" :value="InfoList.coName" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">手机<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" :value="InfoList.phone" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">电话</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" :value="InfoList.telphone" @input="inputval" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">地址</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" :value="InfoList.address" @input="inputval" />
                        </div>
                    </div>
                </div>

                <div class="weui-cells__title">备注</div>
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <textarea class="weui-textarea" :value="InfoList.remark" style="height: 5.3em; line-height: 1.5em" @input="inputval" />
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
                msg:'线索新增',

                cues: [],
                cueId: [],
                cueIndex: 0,

                InfoList:{
                    cueid:'',
                    poolname:'',
                    coName:'',
                    telphone:'',
                    phone:'',
                    address:'',
                    remark:'',
                }
            }
        },
        mounted(){
            this.loaddata()
        },
        methods:{
            loaddata(){
                const _this = this
                wx.request({
                    url: config.host + 'typeInfo/getTypeInfoGroupByType.do?cId=' +'201901973891',  //接口地址
                    data: {
                        type: '客户来源'
                    },
                    success: function (res) {
                        console.log(res.data)
                        let cueData = res.data
                        cueData.forEach((el,i) => {
                            // console.log(el.typeName)
                            _this.cues.push(el.typeName)
                            _this.cueId.push(el.id)
                        });
                        _this.InfoList.cueid = _this.cueId[_this.cueIndex]
                    }
                })
            },
            cueChange(e){
                console.log('picker country 发生选择改变，携带值为', e.mp.detail.value);
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
            inputName(e){
                console.log(e.mp.detail.value)
            },
            addClick(){
                // console.log(this.InfoList)
                let InfoList = this.InfoList
                // console.log(InfoList)
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
                        url: config.host + 'customerTwo/saveClue.do?cId=' + '201901973891' + '&pId=' + '93',  //接口地址
                        data: {
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
                }
            },
        }
    }
</script>

<style scoped>
    .clueadd{
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