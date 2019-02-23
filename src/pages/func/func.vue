<template>
    <div class="container func">
        <!-- <h1>{{msg}}</h1> -->
        <div class="func-master">
            <p class="weui-article__title">客户管理</p>
            <div class="func-block">
                <div class="block-item" @click="toClue">
                    <img class="block-img" src="../../../static/images/user.png" alt="出不来">
                    <p class="block-text">线索</p>
                </div>
                <div class="block-item">
                    <img class="block-img" src="../../../static/images/user.png" alt="出不来">
                    <p class="block-text">客户</p>
                </div>
                <div class="block-item">
                    <img class="block-img" src="../../../static/images/user.png" alt="出不来">
                    <p class="block-text">联系人</p>
                </div>
            </div>
        </div>
        <div class="func-master">
            <p class="weui-article__title">销售管理</p>
            <div class="func-block">
                <div class="block-item" v-for="item in srcImg" :key="item.id">
                    <img class="block-img" :src="item.src" alt="出不来">
                    <p class="block-text">{{item.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'功能',
            srcImg:[
                {id:1,src:'/static/images/user.png',text:'客户'},
                {id:2,src:'/static/tabs/home-active.png',text:'客户'},
                {id:3,src:'/static/images/user.png',text:'客户'},
                {id:4,src:'/static/tabs/func.png',text:'客户'},
                {id:5,src:'/static/tabs/mine.png',text:'客户'},
                {id:6,src:'/static/tabs/report.png',text:'客户'},
                {id:7,src:'/static/tabs/orders-active.png',text:'客户'},
            ]
        }
    },
    methods:{
        toClue(){
            wx.redirectTo({
                url:'../index/index',
                success:function(res){
                    console.log(res)
                }
            })
        }
    }
}
</script>

<style>
    .func{
        width: 100%;
        background-color: #f0f0f0;
    }
    .func-master{
        width: 100%;
    }
    .weui-article__title{
        height: 50rpx;
        line-height: 50rpx;
        color: #6e6e6e;
    }
    .func-block{
        width: 100%;
        background-color: #ffffff;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: start;
    }
    .block-item{
        flex: 0 0 25%;
        height: 187.5rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .block-img{
        width: 80rpx;
        height: 80rpx;
    }

</style>

