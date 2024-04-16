<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="18">
                    <div class="content">
                        <div class="post-footer">
                            <div class="inner-wrapper-sticky">
                                <div class="post-content-footer-in">
                                    <div class="post-footer-content">
                                        <a-tooltip placement="left">
                                            <template slot="title">
                                            <span>分享</span>
                                            </template>
                                            <button @click="share" class="poster-span b2tooltipbox">
                                                <a-icon type="share-alt" />
                                            </button>
                                        </a-tooltip>
                                        <a-tooltip placement="left">
                                            <template slot="title">
                                            <span>评论</span>
                                            </template>
                                            <button @click="goAnchor('#comment')" class="poster-span b2tooltipbox">
                                                <a-icon type="message"  theme="filled"/>
                                            </button>
                                        </a-tooltip>
                                        <a-tooltip placement="left">
                                            <template slot="title">
                                            <span>收藏</span>
                                            </template>
                                            <button @click="favorite" class="poster-span b2tooltipbox">
                                                <a-icon type="star" v-if="!info.isFavorite"/>
                                                <a-icon v-if="info.isFavorite"  style="color: #ff7800" type="star"  theme="filled"/>
                                            </button>
                                        </a-tooltip>
                                    </div>
                                    <div class="post-footer-like">
                                        <a-tooltip placement="left">
                                            <template slot="title">
                                            <span>点赞</span>
                                            </template>
                                            <div @click="like" class="like">
                                                <a-icon type="heart" 
                                                   v-if="!info.isLike"
                                                />
                                                 <a-icon v-if="info.isLike"  style="color: #eb2f96" type="heart"  theme="filled"/>
                                                <span :style="info.isLike ? 'color: #eb2f96' : ''">{{info.likes | resetNum}}</span>
                                            </div>
                                        </a-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="post-top">
                            <div class="post-left">
                                <div class="post-cover">
                                    <img :src="info.cover | resetImage(150,150)" alt="asdasd">
                                </div>
                                <div @click="goLive(info.live)" class="live">
                                    访问直播间
                                </div>
                            </div>
                            <div class="post-rghit">
                                <!-- 帖子标题 -->
                                <h1 class="post-title">{{info.title}}</h1>

                                

                                <!-- 帖子相关 -->
                                <div class="post-meta">
                                    <div class="cate-view-like">
                                        <a-space>
                                            <div class="meta-icon">
                                                <a-icon theme="filled"  type="eye" />
                                                <b>{{info.views | resetNum}}</b>
                                            </div>
                                            <div class="meta-icon">
                                                <a-icon theme="filled" type="heart" />
                                                <b>{{info.likes | resetNum}}</b>
                                            </div>
                                        </a-space>
                                        <div class="date">
                                            {{info.createTime | resetData}}
                                        </div>
                                    </div>
                                   <div class="category-forum">
                                        <div  class="tag category">
                                            <span class="title">{{info.category.title}}</span>
                                        </div>
                                        <div class="tag forum">
                                            <span class="title">{{info.forum.title}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 帖子描述 -->
                                <div class="post-description">
                                    {{info.description}}
                                </div>

                                <!-- 标签 -->
                                <div class="post-tag">
                                    <div class="tag" v-for="(item,index) in info.tagList" :key="index">
                                        <span class="title">{{item.title}}</span>
                                    </div>
                                </div>
                                <!-- 打赏 -->
                                <Reward 
                                    module="article" 
                                    :relatedId="info.id"
                                />
                            </div>
                        </div>

                        
                    </div>

                    <div class="content-adv">
                        <img src="/img/home/h2-slider1-background-img.jpg" alt="asdasd">
                    </div>

                    <div class="attr">
                        <div class="top-text">
                            <h2>详细内容</h2>
                        </div>
                        <div class="info" v-html="info.content"> </div>
                    </div>

                    <div id="comment"  class="comment">
                        <CommentList
                        @updataCount="updataCount"
                        :count="info.comments"
                        module="article" 
                        :relatedId="info.id"/>
                    </div>
                </a-col>
                <a-col :span="24" :md="6">
                    <Anthor :info="info.userInfo"/>

                    <HotArticle />

                    <About />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
import CommentList from "@/components/commnet"

import HotArticle from "@/components/widget/hotArticle"
import Anthor from "@/components/widget/anthor"
import About from "@/components/widget/about"
import Reward from "@/components/widget/reward"
export default {
    components:{
        HotArticle,Anthor,About,Reward,
        
        CommentList,
    },
   head () {
        return {
            title: `${this.info.title} - ${this.base.title}`,
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
        }
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getArticleInfo,{params:{id:id}})
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
        
    },
    methods:{
        updataCount(e){
            if (e == "add") {
                this.info.comments += 1
            }
            if (e == "sub") {
                this.info.comments -= 1
            }
            // this.info.comments = e
        },
        goLive(path){
            window.open(path, '_blank');
        },
        goPath(path){
            this.$router.push(path)
        },
        async like(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("favorite")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }

            this.info.isLike = !this.info.isLike
            this.info.likes = parseInt(this.info.likes)
            if (this.info.isLike) {
                this.info.likes =  this.info.likes + 1
            } else {
                this.info.likes =  this.info.likes - 1
            }
            const query = {
                id:this.id
            }
            const res = await this.$axios.post(api.postArticleLike,query)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                if (this.info.id == this.id) {
                    this.info.isLike = !this.info.isLike
                        if (this.info.isLike) {
                            this.info.likes =  this.info.likes + 1
                        } else {
                            this.info.likes =  this.info.likes - 1
                        }
                    }
                return
            }
        },
        async favorite(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("favorite")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }

            this.info.isFavorite = !this.info.isFavorite
            if (this.info.isFavorite) {
                this.info.favorites =  this.info.favorites + 1
            } else {
                this.info.favorites =  this.info.favorites - 1
            }
            const query = {
                id:this.id
            }
            const res = await this.$axios.post(api.postArticleFavorite,query)
            if (res.code != 1) {
                 this.$message.error(
                    res.message,
                    3
                )
                if (this.info.id == this.id) {
                this.info.isFavorite = !this.info.isFavorite
                    if (this.info.isFavorite) {
                        this.info.favorites =  this.info.favorites + 1
                    } else {
                        this.info.favorites =  this.info.favorites - 1
                    }
                }
                return
            }
        },
        share(){
            this.$Share(`${this.base.url}/article/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },
        goAnchor(selector) {
            document.querySelector(selector).scrollIntoView({
                behavior: "smooth"
            });
        },
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
        .content{
            position: relative;
            background: white;
            border-radius: 4px;
            padding: 20px;

            .post-top{
                display: flex;
                .post-left{
                    margin-right: 20px;
                    .post-cover{
                        height: 150px;
                        width: 150px;
                        border-radius: 4px;
                        margin-bottom: 10px;
                        img{
                            height: 100%;
                            width: 100%;
                            border-radius: 4px;
                            object-fit: cover;
                        }
                    }
                    .live{
                        text-align: center;
                        font-size: 12px;
                        border-radius: 4px;
                        cursor: pointer;
                        user-select: none;
                        background-color: rgba(0, 102, 255, 0.1);
                        color: #0066ff !important;
                        height: 30px;
                        line-height: 30px;
                        padding: 0 16px;
                        font-weight: 500;
                    }
                }
                .post-rghit{
                    flex: 1;
                    .post-title{
                        font-size: 21px;
                        font-weight: 600;
                        line-height: 36px;
                        margin-bottom: 10px;
                    }
                    
                    .post-tag{
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                        .tag{
                            margin-right: 10px;
                            cursor: pointer;
                            user-select: none;
                            display: flex;
                            padding: 4px 10px;
                            color: #8590a6;
                            border-radius: 15px;
                            background: rgba(173, 173, 173, 0.16);
                            .icon{
                                color: #8590a6;
                                margin-right: 6px;
                                font-size: 12px;
                                border-radius: 80%;
                            }
                            .title{
                                font-size: 12px;
                            }
                        }
                        .category{
                            background-color: rgba(0, 102, 255, 0.1);
                            color: #0066ff !important;
                        }
                        .forum{
                            background-color: rgba(255, 0, 0, 0.1);
                            color: #ff0051 !important;
                        }
                    }

                    .post-meta{
                        margin-bottom: 12px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .cate-view-like{
                            display: flex;
                            
                            .date{
                                letter-spacing: 2px;
                                font-size: 12px;
                                color: #8590A6;
                            }
                            .meta-icon{
                                margin-right: 15px;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                                color: #8590A6;
                                b{
                                    margin-left: 5px;
                                    font-size: 12px;
                                    font-weight: 700;
                                    display: flex;
                                    line-height: 1;
                                }
                            }
                        }
                       
                        .category-forum{
                            display: flex;
                            align-items: center;
                            margin-bottom: 15px;
                            .tag{
                                margin-left: 10px;
                                cursor: pointer;
                                user-select: none;
                                display: flex;
                                padding: 4px 10px;
                                color: #8590a6;
                                border-radius: 15px;
                                background: rgba(173, 173, 173, 0.16);
                                .icon{
                                    color: #8590a6;
                                    margin-right: 6px;
                                    font-size: 12px;
                                    border-radius: 80%;
                                }
                                .title{
                                    font-size: 12px;
                                }
                            }
                            .category{
                                background-color: rgba(0, 102, 255, 0.1);
                                color: #0066ff !important;
                            }
                            .forum{
                                background-color: rgba(255, 0, 0, 0.1);
                                color: #ff0051 !important;
                            }
                        }
                    }

                    .post-description{
                        border-radius: 4px;
                        font-size: 13px;
                        line-height: 1.8em;
                        padding: 10px;
                        background: #eef7ff;
                        margin-bottom: 12px;
                    }
                }
            }
            
            
            

            

            .post-ds{
                display: flex;
                justify-content: center;
                flex-flow: column;
                margin-bottom: 12px;
                padding: 20px;
                border-radius: 3px;
                position: relative;
                background: #fffcf7;
                .count{
                    font-size: 12px;
                    margin: 17px 0 5px;
                    color: #515A6E;
                }
                .users{
                    max-width: 50%;
                    display: flex;
                    margin: 0;
                    flex-wrap: wrap;
                    .item{
                        padding: 0;
                        border: 0;
                        margin: 2px;
                        position: unset;
                        img{
                            display: block;
                            width: 32px;
                            height: 32px;
                            object-fit: cover;
                            border-radius: 3px;
                        }
                    }
                }
                .ds-btn{
                    position: absolute;
                    right: 20px;
                    top: 8px;
                    #con{
                        width: 320px;
                        height: 85px;
                        position: relative;
                        border-radius: 4px;
                        margin: 50px auto;
                        #TA-con{
                            width: 122px;
                            height: 45px;
                            background-color: #f25d8e;
                            position: absolute;
                            top: 50%;
                            left: 14%;
                            transform: translateY(-50%);
                            border-radius: 4px;
                            cursor: pointer;
                            z-index: 2;
                            #text-icon{
                                width: 100px;
                                height: 100%;
                                margin: 0 auto;
                                position: relative;
                                display: flex;
                                align-items: center;
                                .icon{
                                    font-size: 18px;
                                    color: #fff;
                                }
                                #TA{
                                    margin-left: 5px;
                                    float: right;
                                    line-height: 45px;
                                    font-size: 15px;
                                    color: #fff;
                                }
                            }
                        }
                        #tube-con{
                            width: 157px;
                            height: 55px;
                            position: absolute;
                            right: -5px;
                            top: 15px;
                            svg{
                                width: 100%;
                                height: 100%;
                            }

                            #mask{
                                width: 0px;
                                height: 100%;
                                overflow: hidden;
                                position: absolute;
                                top: 0;
                                left: 0;
                                transition: all 0.5s;
                                svg{
                                    width: 157px;
                                    height: 55px;
                                }
                            }
                            #orange-mask{
                                width: 18px;
                                height: 100%;
                                overflow: hidden;
                                position: absolute;
                                left: -15px;
                                top: 0px;
                                svg{
                                    position: absolute;
                                    top: 0;
                                    left: 15px;
                                    width: 157px;
                                    height: 55px;
                                }
                            }
                            #people {
                                position: absolute;
                                right: 10px;
                                top: 18px;
                                font-size: 12px;
                                font-family: "雅黑";
                                color: #aaa;
                            }
                        }
                        #TA-con:hover{
                            background-color: #ff6b9a;
                        }
                        #TA-con:hover+#tube-con>#mask {
                            width: 157px;
                        }
                        #TA-con:hover+#tube-con>#orange-mask {
                            animation: move1 0.5s linear 0.2s infinite;
                        }
                        #TA-con:hover+#tube-con>#orange-mask svg {
                            animation: movetwo 0.5s linear 0.2s infinite;
                        }
                    }
                }


            }

            

            .post-footer{
                position: absolute !important;
                left: -80px;
                flex-flow: column;
                top: 80px;
                padding-top: 0;
                width: 49px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
                .inner-wrapper-sticky{
                    .post-content-footer-in{
                        .post-footer-content{
                            display: flex;
                            flex-flow: column;
                            .poster-span{
                                cursor: pointer;
                                user-select: none;
                                margin-right: 0;
                                margin-bottom: 20px;
                                width: 48px;
                                height: 48px;
                                padding: 0;
                                text-align: center;
                                display: block;
                                border-radius: 100%;
                                box-shadow: 0 4px 16px 0 rgba(13, 39, 91, 0.033);
                                background: #fff;
                                color: inherit;
                                border: 0;
                                font-size: 20px;
                            }
                        }
                        .post-footer-like{
                            cursor: pointer;
                            user-select: none;
                            .like{
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                i{
                                    font-size: 26px;
                                    margin-bottom: 10px;
                                }
                                span{
                                    color: #999;
                                    font-size: 12px;
                                    font-weight: 700;
                                }
                            }
                        }
                    }
                }
            }
        }
        .attr{
            background: white;
            border-radius: 4px;
            padding: 20px;
            margin-top: 20px;
            .top-text{
                h2{
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    font-weight: 600;
                }
            }
            .info{
                margin-top: 20px;
            }
        }
        .content-adv{
            height: 80px;
            width: 100%;
            border-radius: 4px;
            margin-top: 20px;;
            img{
                height: 100%;
                width: 100%;
                border-radius: 4px;
                object-fit: cover;
            }
        }
        .comment{
            margin-top: 20px;
            background: white;
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 20px;
        }
    }
}
@keyframes move1 {
    0% {
        left: -15px;
    }

    100% {
        left: 140px;
    }
}
@keyframes movetwo {
    0% {
        left: 15px;
    }
    100% {
        left: -140px;
    }
}
</style>