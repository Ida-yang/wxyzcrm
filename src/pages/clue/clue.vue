<template>
    <div class="container">
        <!-- <h1>{{msg}}</h1> -->
        <div class="clue">
            <div class="weui-search-bar">
                <div class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                        <input type="text" v-model="inputVal" class="weui-search-bar__input" placeholder="搜索" @input="showIcon" />
                        <div class="weui-icon-clear" v-if="iconShowed" @click="clearInput">
                            <icon type="clear" size="14"></icon>
                        </div>
                    </div>
                </div>
                <div class="weui-search-bar__cancel-btn" @click="search">搜索</div>
            </div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text" v-for="item in clueList" :key="item.id" @click="toClueDetails($event,item)">
                    <div class="weui-media-box__title weui-media-box__title_in-text">线索：{{item.name}}</div>
                    <div class="weui-media-box__desc">{{item.address}}}</div>
                    <div class="weui-media-box__info">
                        <div class="weui-media-box__info__meta">负责人：{{item.privateUser[0].private_employee}}</div>
                        <div class="weui-media-box__info__meta">状态：{{item.state}}</div>
                    </div>
                </div>
                <div class="weui-media-box weui-media-box_text">
                    <div class="weui-media-box__title weui-media-box__title_in-text">标题一</div>
                    <div class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</div>
                    <div class="weui-media-box__info">
                        <div class="weui-media-box__info__meta">文字来源</div>
                        <div class="weui-media-box__info__meta">时间</div>
                        <div class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</div>
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
                iconShowed: false,
                inputVal: "",
                clueList: {},
                // clueList:[
                //     {id:'001',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'002',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'003',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'004',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'005',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'006',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'007',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'},
                //     {id:'008',name:'江苏卫视',address:'江苏省某某市某某区某某街道某某写字楼1309号',user:'Ida',state:'拜访'}
                // ]
            }
        },
        mounted(){
            const _this = this
            wx.request({
                url: config.host + 'customerTwo/query.do?cId=' +'201901973891',  //接口地址
                data: {
                    limit: 20,
                    searchName: _this.inputVal
                },
                header: {
                    'content-type': 'application/json'  //默认值
                },
                success: function (res) {
                    console.log(res)
                    _this.clueList = res.data.map.success
                }
            })
        },
        methods:{
            clearInput() {
                this.inputVal = ""
                this.iconShowed = false
            },
            showIcon() {
                this.iconShowed = true
            },
            search(){
                console.log(this.inputVal)
            },
            toClueDetails(e,val){
                console.log(val)
                mpvue.navigateTo({
                    url:'../cluedetails/main?id=' + val.id + '&name=' + val.name,
                    success:function(res){
                        console.log(res)
                    }
                })
            }
        }
    }
</script>

<style>
    .clue{
        width: 100%;
        overflow: hidden;
    }
</style>