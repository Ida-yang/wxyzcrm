<template>
    <div class="container">
        <div class="showinfo">
            <ul class="showinfo-ul">
                <li>今日新增线索：100</li>
                <li>今日新增客户：100</li>
            </ul>
            <ul class="showinfo-ul">
                <li>今日联系：30</li>
                <li>联系目标：100</li>
                <li>差额：70</li>
            </ul>
            <ul class="showinfo-ul">
                <li>今日拜访：7</li>
                <li>拜访目标：10</li>
                <li>差额：3</li>
            </ul>
            <ul class="showinfo-ul">
                <li>商机：6</li>
                <li>商机目标：10</li>
                <li>差额：4</li>
            </ul>
            <ul class="showinfo-ul">
                <li>合同金额：30000</li>
                <li>目标金额：50000</li>
                <li>差额：20000</li>
            </ul>
        </div>

        <div class="home">
            <div class="home-query"></div>
            <div class="home-funnel">
                <table border="1">
                    <tr>
                        <th>Month</th>
                        <th>Savings</th>
                    </tr>
                    <tr>
                        <td>January</td>
                        <td>$100</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="userinfo" @click="bindViewTap">
            <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

            <div class="userinfo-nickname">
                <card :text="userInfo.nickName"></card>
            </div>
        </div>

        <div class="usermotto">
            <div class="user-motto">
                <card :text="motto"></card>
            </div>
        </div>

        <form class="form-container">
            <input type="text" class="form-control" :value="motto" placeholder="v-model" />
            <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
            <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
        </form>

        <div class="all">
            <div class="left">
                1
            </div>
            <div class="middle">
                2
            </div>
            <div class="right">
                3
            </div>
        </div>
    </div>
</template>

<script>
    import card from '@/components/card'

    export default {
        data(){
            return{
                msg: '首页',
                motto: 'Hello miniprograme',
                userInfo: {
                    nickName: 'mpvue',
                }
            }
        },
        components: {
            card
        },
        methods: {
            bindViewTap () {
                const url = '../logs/main'
                if (mpvuePlatform === 'wx') {
                    mpvue.switchTab({ url })
                } else {
                    mpvue.navigateTo({ url })
                }
            },
            clickHandle (ev) {
                console.log('clickHandle:', ev)
                // throw {message: 'custom test'}
            }
        },

        created () {
            // let app = getApp()
        }
    }
</script>

<style scoped>
    .showinfo{
        width: 100%;
    }
    ul.showinfo-ul{
        display: flex;
        border-bottom: 3rpx solid #cccccc;
    }
    ul.showinfo-ul li{
        flex: 1;
        height: 60rpx;
        line-height: 60rpx;
        padding-left: 20rpx;
        border-right: 3rpx solid #cccccc;
    }
    .userinfo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .userinfo-avatar {
        width: 128rpx;
        height: 128rpx;
        margin: 20rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }

    .usermotto {
        margin-top: 50px;
    }

    .form-control {
        display: block;
        padding: 0 12px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }
    .all{
        width:7.5rem;
        height:1rem;
        background-color:blue;
    }
    .all:after{
        display:block;
        content:'';
        clear:both;
    }
    .left{
        float:left;
        width:2.5rem;
        height:1rem;
        background-color:yellow;
    }
    .middle{
        float: left;
        width: 2.5rem;
        height: 1rem;
        background-color: red;
    }
    .right{
        float:left;
        width:2.5rem;
        height:1rem;
        background-color:green;
    }
</style>
