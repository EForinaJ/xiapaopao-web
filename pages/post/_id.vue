<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="left">

                <Content :info="info"/>

                <Reward 
                    module="post" 
                    :relatedId="info.id"
                />

                <div class="content-adv">
                    <img 
                    :src="'https://oss.zibll.com/zibll.com/2020/03/安装教程.jpg'" 
                    alt="asdasd">
                </div>

                <div id="comment"  ref="comment" class="comment">
                    <CommentList
                    @updataCount="updataCount"
                    :count="info.comments"
                    module="post" 
                    :relatedId="info.id"/>
                </div>
            </div>
            <div class="right">
                <Anthor 
                 :info="info.userInfo"/>
                <HotPost />
            </div>
        </div>
        <Action 
            :info="info"
            module="post"
        />
        <Affix />
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"

import Action from "@/components/post/info/action"
import Content from "@/components/post/info/content"
import Affix from "@/components/widget/affix"
import CommentList from "@/components/commnet"

import Anthor from "@/components/widget/anthor"
import Reward from "@/components/widget/reward"
import About from "@/components/widget/about"
import HotPost from "@/components/widget/hotPost"
export default {
    components:{
        Action,
        Affix,
        Content,
        Anthor,
        About,
        Reward,
        HotPost,
        
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
        if (this.$route.hash != '') {
            setTimeout(() => {
                document.querySelector(this.$route.hash).scrollIntoView({
                    behavior: "smooth"
                });
            }, 100);
        }
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
        display: flex;
        .left{
            margin-left: 180px;
            flex: 1;
            margin-right: 20px;
            .content{
                position: relative;
                background: white;
                border-radius: 4px;
                padding: 20px;
                
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
       
        }
        .right{
            width: 280px;
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