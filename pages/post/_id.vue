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
                                </div>
                                <div class="date-report">
                                    <span class="date">{{info.createTime | resetData}}</span>
                                    <div class="report">
                                        <a-dropdown placement="bottomCenter">
                                            <a-icon type="ellipsis" />
                                            <a-menu slot="overlay">
                                                <a-menu-item @click="report()">
                                                    <a-icon type="warning" />
                                                    <span>举报</span>
                                                </a-menu-item>
                                                <a-menu-item @click="remove()" v-if="accountInfo.id == info.userInfo.id">
                                                    <a-icon type="delete" />
                                                    <span>删除</span>
                                                </a-menu-item>
                                            </a-menu>
                                        </a-dropdown>
                                    </div>
                                </div>
                            </div>
            
                            <!-- 内容 -->
                            <div @click="showImg($event)" class="post-content entry-content" v-html="info.content"> </div>



                            <!-- 标签 -->
                            <div class="report-tags">
                                <div class="post-tag">
                                    <div v-if="info.category != null" @click="goPath(`/category/${info.category.id}`)" class="tag category">
                                        <span class="title">{{info.category.title}}</span>
                                    </div>
                                    <div v-if="info.forum != null" class="tag forum">
                                        <span class="title">{{ info.forum.title}}</span>
                                    </div>
                                    <div class="tag" v-for="(item,index) in info.tagList" :key="index">
                                        <span class="title">{{item.title}}</span>
                                    </div>
                                </div>
                                
                            </div>
                            

                            <!-- 隐藏资源 -->
                            <div class="post-hide" v-if="info.setResource == 2">
                                <div class="title">
                                    {{info.resource.title}}
                                </div>
                                <div @click="viewExample" class="example">
                                    <span>查看演示</span>
                                    <a-icon type="right" />
                                </div>
                                <div v-if="info.resource.attr.length > 0" class="attr">
                                    <a-row :gutter="[20,20]">
                                        <a-col v-for="(item,index) in info.resource.attr" :key="index" :span="24" :md="12">
                                            <div class="item">
                                                <span class="key">
                                                    {{item.key}}
                                                </span>
                                                <span class="mou">
                                                    :
                                                </span>
                                                <span class="value">
                                                    {{item.value}}
                                                </span>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                                <div :class="info.resource.isView ? 'auth sucsse' : 'auth'">
                                    <div class="info">
                                        <span class="text">所需要权限为:</span>
                                        <a-tag color="pink">
                                            {{info.resource.mode | resetMode}}
                                        </a-tag>
                                    </div>
                                    <div v-if="info.resource.grade && info.resource.mode == 3" class="grade mode-text">
                                        <span>你的等级还未达到</span>
                                        <img :src="info.resource.grade.icon" alt="">
                                    </div>
                                    <div v-if="info.resource.mode == 1" class="mode-text">
                                        请在注册登录之后，方可阅读隐藏内容
                                    </div>
                                    <div  v-if="info.resource.mode == 2" class="mode-text">
                                        请在下面参与讨论之后，方可阅读隐藏内容
                                    </div>
                                    <div v-if="info.resource.mode == 4" class="mode-text">
                                        使用{{info.resource.integral}}积分，方可阅读隐藏内容
                                    </div>
                                    <div v-if="info.resource.mode == 5" class="mode-text">
                                        支付{{info.resource.money}}购买，方可阅读隐藏内容
                                    </div>
                                    <div class="hide">
                                        <div class="view" @click="viewLink">
                                            点击查看
                                        </div>
                                        <div class="code">
                                            <span class="text">提取码（点击复制）:</span>
                                            <span class="info">{{info.resource.gainCode != "" ? info.resource.gainCode : "******"}}</span>
                                        </div>
                                        <div class="code">
                                            <span class="text">解压码（点击复制）:</span>
                                            <span class="info">{{info.resource.untieCode!= "" ? info.resource.untieCode : "******"}}</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>


                            <!-- 打赏 -->
                            <Reward 
                                module="post" 
                                :relatedId="info.id"
                            />
                        </div>
                    </div>

                    <!-- <div class="content-adv">
                        <img 
                        :src="'https://oss.zibll.com/zibll.com/2020/03/安装教程.jpg'" 
                        alt="asdasd">
                    </div> -->

                    <div id="comment"  class="comment">
                        <CommentList
                        @updataCount="updataCount"
                        :count="info.comments"
                        module="post" 
                        :relatedId="info.id"/>
                    </div>
                </a-col>
                <a-col :span="24" :md="6">
                    <Anthor @follow="follow" :info="info.userInfo"/>
                    <HotPost />
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


import Anthor from "@/components/widget/anthor"
import Reward from "@/components/widget/reward"
import About from "@/components/widget/about"
import HotPost from "@/components/widget/hotPost"
export default {
    components:{
        Anthor,About,Reward,HotPost,
        
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
    filters:{
        resetMode(e){
            switch (e) {
                case 1:
                    return "登录后查阅";
                case 2:
                    return "评论后查阅";
                case 3:
                    return "按等级查阅";
                case 4:
                    return "积分查阅";
                case 5:
                    return "付费查阅";
                default:
                    break;
            }
        },
    },
    data(){
        return{
        }
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getPostInfo,{params:{id:id}})
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
        console.log(this.info)
    },
    methods:{
        async follow(){
            if (this.token == null) {
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
            if (this.info.userInfo.isFollow) {
                this.info.userInfo.fans -= 1
            }else{
                this.info.userInfo.fans += 1
            }
            this.info.userInfo.isFollow = !this.info.userInfo.isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:this.info.userInfo.id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                 if (this.info.userInfo.isFollow) {
                this.info.userInfo.fans -= 1
                }else{
                    this.info.userInfo.fans += 1
                }
                this.info.userInfo.isFollow = !this.info.userInfo.isFollow
                return
            }
        },
        showImg(e){
            if (e.target.tagName == 'IMG') {
                this.$ImgPreview([e.target.src],0)
            }
        },
        report(){
            this.$Report(this.info.id,"post")
        },
        remove(){
            this.$confirm({
                title: '删除内容',
                content: '请注意，是否真的要删除内容',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:this.id
                    }
                    const res = await this.$axios.post(api.postPostRemove,query) 
                        if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.$router.go(-1)
                },
                onCancel() {

                },
            });
        },
        viewLink(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (this.info.resource.isView) {
                window.open(this.info.resource.link,"_blank")
                return
            }
            if (this.info.resource.mode ==  2) {
                document.querySelector('#comment').scrollIntoView({
                    behavior: "smooth"
                });
                return
            }
            if (this.info.resource.mode == 3 && this.accountInfo.grade.id != this.info.resource.grade.id) {
                this.$message.error(
                    "等级还不足努力升级吧少年",
                    3
                )
                return
            }
            if (this.info.resource.mode ==  4) {
                this.$confirm({
                    title: '使用积分',
                    content: '请注意，使用积分兑换资源内容',
                    okText:"确定",
                    cancelText:"取消",
                    onOk:async () => {
                        const query = {
                            id:this.id
                        }
                        const res = await this.$axios.post(api.postPostExchange,query) 
                         if (res.code != 1) {
                            this.$message.error(
                                res.message,
                                3
                            )
                            return
                        }
                        this.info = res?.data?.info
                    },
                    onCancel() {

                    },
                });
                return
            }
            if (this.info.resource.mode ==  5) {
                const product = {
                    detailId: this.id,
                    detailModule:"post",
                    orderMoney: this.info.resource.money,
                    orderType: 3,
                }

                this.$Pay("支付帖子隐藏内容",product).then(async (res)=>{
                    this.info = res
                }).catch((err)=>{
                    (err)
                    // this.createForm.cover = undefined
                })
                return
            }

        },

        viewExample(){
            window.open(this.info.resource.example,"_blank")
        },
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
            if (!this.accountInfo.grade.auth.includes("like")) {
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
            const res = await this.$axios.post(api.postPostLike,query)
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
            const res = await this.$axios.post(api.postPostFavorite,query)
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
            this.$Share(`${this.base.url}/post/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
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
                    margin-bottom: 20px;
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
                
                
                .post-content{
                    margin-bottom:  20px;
                }
                .post-meta{
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .cate-view-like{
                        display: flex;
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
                    .date-report{
                        display: flex;
                        align-items: center;
                        .date{
                            margin-right: 10px;
                            font-size: 12px;
                            color: #8590A6;
                        }
                        .report{
                            cursor: pointer;
                            user-select: none;
                            font-size: 16px;
                        }
                    }
                }
                .adaptation{
                    margin-bottom: 20px;
                }
                .post-hide{
                    padding: 20px;
                    background: rgba(167, 167, 167, 0.08);
                    margin-bottom: 20px;
                    .title{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    .example{
                        cursor: pointer;
                        user-select: none;
                        margin: 20px 0;
                        color: #0066ff;
                        display: flex;
                        align-items: center;
                        span{
                            margin-right: 5px;
                        }
                    }
                    .attr{
                        background: rgba(167, 167, 167, 0.08);
                        margin-bottom: 20px;
                        padding: 15px 20px;
                        border-radius: 4px;
                        .item{
                            font-size: 12px;
                            color: #8590A6;
                            display: flex;
                            align-items: center;
                            .mou{
                                margin: 0 5px;
                            }
                        }
                    }
                    .auth{
                        background: rgba(244, 67, 54, 0.04);
                        border-radius: 4px;
                        margin-top: 10px;
                        padding: 20px;
                        border: 2px dashed rgba(255, 0, 0, 0.26);
                        .info{
                            display: flex;
                            align-items: center;
                            .text{
                                font-weight: 700;
                                margin-right: 10px;
                            }
                        }
                        .grade{
                            display: flex;
                            align-items: center;
                            margin: 10px 0;
                            img{
                                margin-left: 10px;
                                height: 1.5em;
                                max-width: 6em;
                                vertical-align: -0.15em;
                                -webkit-backface-visibility: hidden;
                                backface-visibility: hidden;
                                display: inline-block;
                            }
                            
                        }
                        .mode-text{
                            margin: 10px 0;
                            font-size: 12px;
                            color: #8590A6;
                        }
                        .integral{
                            margin-top: 5px;
                            font-size: 12px;
                            color: #8590A6;
                        }
                        .pay{
                            margin-top: 5px;
                            font-size: 12px;
                            color: #8590A6;
                        }
                        .hide{
                            margin-top: 10px;
                            display: flex;
                            align-items: center;
                            .view{
                                user-select: none;
                                margin-right: 10px;
                                display: inline-block;
                                cursor: pointer;
                                font-size: 12px;
                                border: 1px solid #0066ff;
                                border-radius: 4px;
                                padding: 5px 16px;
                                color: #0066ff;
                            }
                            .code{
                                display: flex;
                                align-items: center;
                                background-color: #f0f2f5;
                                padding: 8px 20px;
                                font-size: 12px;
                                margin-right: 10px;
                                cursor: pointer;
                                .text{
                                    margin-right: 5px;
                                }
                                .info{
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                    .sucsse{
                        background: rgba(139,195,74, 0.05);
                        border: 2px dashed rgb(0 128 0 / 28%);
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


<style>
@import "~static/tinymce/skins/content/default/content.css";
</style>