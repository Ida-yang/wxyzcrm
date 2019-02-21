<template>
  <div @click="clickHandle" class="container">
    <div class="showinfo">
      <ul>
        <li>今日新增线索：100</li>
        <li>今日新增客户：100</li>
        <li>今日联系：100</li>
        <li>目标：100</li>
      </ul>
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

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

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
  data () {
    return {
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
.showinfo ul{
  display: flex;
  flex-wrap: wrap;
}
.showinfo ul li{
  flex: 33% 1 0;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  margin: 0 5rpx 5rpx 0;
  background-color: #ccc;
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
.counter{
  height: 60rpx;
  padding: 20rpx;
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
