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
                            <picker @change="bindCountryChange" :value="countryIndex" :range="countries">
                                <div class="weui-select">{{countries[countryIndex]}}</div>
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
                            <input class="weui-input" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">联系人<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">电话<text class="__text"> * </text></div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">手机</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" />
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">地址</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" />
                        </div>
                    </div>
                </div>

                <div class="weui-cells__title">备注</div>
                <div class="weui-cells weui-cells_after-title">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <textarea class="weui-textarea" style="height: 5.3em; line-height: 1.5em" />
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
export default {
    data(){
        return{
            msg:'线索新增',

            countries: ["中国", "美国", "英国"],
            countryIndex: 0,
        }
    },
    methods:{
        bindCountryChange(e){
            console.log('picker country 发生选择改变，携带值为', e.mp.detail.value);
            this.countryIndex = e.mp.detail.value
        },
        addClick(){
            console.log('我点确定了')
        },
    }
}
</script>

<style scoped>
    .clueadd{
        width: 100%;
        padding-top: 100rpx;
    }
    .weui-cells{
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