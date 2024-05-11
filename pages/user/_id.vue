<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="header">
                <div class="mask-cover" :style="{ backgroundImage: `url(${info.cover})` }"></div>
                <div class="panel">
                    <div class="avatar">
                        <img :src="info.avatar" :alt="info.nickName">
                    </div>
                    <div class="info">
                        <div class="nickname-desc">
                            <h1 class="nickname">
                                <span>{{info.nickName}}</span>
                                <img :src="info.grade.icon">
                                <!-- <b>Lv1</b> -->
                                <!-- <FIcon :size="15" type="icon-renzheng"/> -->
                            </h1>
                            <p class="desc">
                                {{info.description}}
                            </p>
                        </div>
                        <div v-if="info.id != accountInfo.id" class="user-panel-button">
                            <div class="user-follow">
                                <a-space>
                                    <a-button @click="follow" :icon="info.isFollow ? 'minus' : 'plus'" type="primary">
                                        {{info.isFollow ? '取消关注': '关注Ta'}}
                                    </a-button>
                                    <a-button @click="message" v-if="token != null"  icon="message">
                                        发私信
                                    </a-button>
                                </a-space>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="author-info">
                <div class="left">
                    <div class="setting-menu">
                        <div @click="goRouter('/')" :class="selectedKeys == '/' ? 'active item' : 'item'">
                            <div class="item-info">
                                <!-- <FIcon :size="24" type="icon-tiezi"/> -->
                                
                                <p>
                                    帖子
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/article')" :class="selectedKeys == '/article' ? 'active item' : 'item'">
                            <div class="item-info">
                                <p>
                                    文章
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/follow')" :class="selectedKeys == '/follow' ? 'active item' : 'item'">
                            <div class="item-info">
                                <!-- <FIcon :size="24" type="icon-yonghu"/> -->
                                <p>
                                    关注({{info.follows}})
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/fans')" :class="selectedKeys == '/fans' ? 'active item' : 'item'">
                            <div class="item-info">
                                <!-- <FIcon :size="24" type="icon-yonghu"/> -->
                                <p>
                                    粉丝({{info.fans}})
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <transition name="page-transition">
                        <Nuxt />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"

import FIcon from '@/components/icon/FIcon'
import HotPost from "@/components/widget/hotPost"
import Anthor from "@/components/widget/anthor"
export default {
    components:{
        HotPost,Anthor,FIcon,
    },
    head () {
        return {
            title: `${this.info.nickName} - ${this.base.title}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    validate({ params }) {
        if (params.id != null && params.id != undefined && params.id != NaN) {
            return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            selectedKeys: "/",
        }
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getUserInfo,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }
        
        return {
            base:store.state.base,
            id:id,
            info:res?.data?.info,
        }
    },
    mounted(){
        // this.getData()
        this.updateMenu()
    },
    methods:{
        async getData(){
            const res = await this.$axios.get(api.getUserInfo,{params: {id:this.id}})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            
        },
        message(){
            if (!this.accountInfo.grade.auth.includes("like")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            this.$Message(this.info.id)
        },
        async follow(){
            if (!this.token) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("follow")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            if (this.info.isFollow) {
                this.info.fans -= 1
            }else{
                this.info.fans += 1
            }
            this.info.isFollow = !this.info.isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:this.info.id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                 if (this.info.isFollow) {
                this.info.fans -= 1
                }else{
                    this.info.fans += 1
                }
                this.info.isFollow = !this.info.isFollow
                return
            }
        },
        goRouter(e){
            this.selectedKeys = e
            this.$router.push(`/user/${this.id}`+e)
        },
        updateMenu () {
          if (this.$route.path != "/404") {
            const routes = this.$route.matched.concat()
            this.selectedKeys = routes.pop().path.slice(10)
          }
        },
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
    }
}
</script>

<style lang="less" scoped>
.page{
    background-color: #eff1f3;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    .container{
        margin-top: 20px;
        .header{
            border-radius: 4px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0px 0px 2px rgba(220, 229, 238, 0.212);
            position: relative;
            .mask-cover{
                position: relative;
                display: flex;
                align-items: flex-end;
                background-color: #ccc;
                width: 100%;
                height: 0;
                padding-top: 20%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .panel{
                position: relative;
                width: 100%;
                margin-top: -73px;
                padding: 0 20px 20px 20px;
                display: flex;
                box-sizing: border-box;
                .avatar{
                    height: 150px;
                    width: 150px;
                    border: 4px solid white;
                    border-radius: 4;
                    img{
                        height: 100%;
                        width: 100%;
                        border-radius: 4;
                    }
                }
                .info{
                    font-size: 24px;
                    font-weight: 600;
                    padding-top: 45px;
                    padding-left: 20px;
                    display: flex;
                    justify-content: space-between;
                    flex-grow: 1;
                    align-items: flex-end;
                    .nickname-desc{
                        .nickname{
                            display: flex;
                            align-items: center;
                            img{
                                margin-left: 10px;
                                height: 1.1em;
                                max-width: 6em;
                                vertical-align: -0.15em;
                                backface-visibility: hidden;
                                display: inline-block;
                            }
                            b{  
                                margin-right: 3px;
                                color: #797C80;
                                font-size: 12px;
                                font-style: normal;
                                display: inline-block;
                                background-color: rgba(80, 80, 80, 0.15);
                                transform: scale(1);
                                height: 17px;
                                line-height: 17px;
                                padding: 0 6px;
                                border-radius: 3px;
                                text-transform: capitalize;
                            }
                        }
                        .desc{
                            align-items: center;
                            font-size: 13px;
                            color: #797C80;
                            font-weight: 400;
                            margin-top: 15px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            text-justify: inter-ideograph;
                            word-break: break-all;
                            margin-right: 300px;
                            margin-bottom: 4px;
                        }
                    }
                    .user-panel-button{
                        text-align: center;
                        position: absolute;
                        right: 24px;
                        top: 105px;
                        .user-follow{
                            margin-top: 10px;
                            width: 220px;
                        }
                    }
                }
            }
        }
        .author-info{
            display: flex;
            margin-top: 20px;
            .left{
                width: 240px;
                .setting-menu{
                    margin-bottom: 20px;
                    background-color: white;
                    border-radius: 4px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    box-shadow: 0px 0px 2px rgba(98, 124, 153, 0.1);
                    position: relative;
                    .item{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        padding: 10px;
                        .item-info{
                            user-select: none;
                            font-size: 14px;
                            font-weight: 700;
                            position: relative;
                            display: flex;
                            align-items: center;
                            color: #8590A6;
                            p{
                                margin-left: 5px;
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                    .active{
                        
                        border-radius: 4px;
                        background: rgba(0, 102, 255, 0.04);
                        p{
                            color: #2997f7;
                        }
                        i{
                            color: #2997f7;
                        }
                    }
                    .item:hover{
                        border-radius: 4px;
                        background: rgba(0, 102, 255, 0.04);
                    }
                }
            }
            .right{
                margin-left: 20px;
                flex: 1;
                .page-transition-enter-active ,.page-transition-leave-active{
                    transition: opacity 1s;
                }
                .page-transition-enter ,.page-transition-leave-to{
                    opacity: 0;
                }
            }
        }
    }
}

</style>