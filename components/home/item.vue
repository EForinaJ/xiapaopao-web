<template>
    <div class="item">
        <div class="avatar">
            <a-avatar @click="goPath(`/user/${info.userInfo.id}`)" :size="55" :src="info.userInfo.avatar" />
        </div>
        <div class="post-info">
            <div class="user-info">
                <div class="name-grade">
                    <div class="name-mate">
                        <div @click="goPath(`/user/${info.userInfo.id}`)" class="name">
                            {{info.userInfo.nickName}}
                        </div>
                        <div v-if="info.userInfo.grade != null" class="grade">
                            <img :src="info.userInfo.grade.icon">
                        </div>
                    </div>
                    <div class="date-view">
                        <a-tooltip>
                            <template slot="title">
                                {{info.createTime}}
                            </template>
                            {{info.createTime | resetData}}
                        </a-tooltip>
                        <a-divider type="vertical" />
                        <span>{{info.views | resetNum }}次阅读</span>
                    </div>
                </div>
                <div class="report">
                    <a-dropdown placement="bottomCenter">
                        <a-icon type="more" />
                        <a-menu slot="overlay">
                            <a-menu-item @click="report" key="0">
                                <a-icon type="exclamation-circle" /> 举报
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </div>
            <div @click="goPath(`/post/${info.id}`)" v-if="info.title != ''" class="title">
                {{info.title}}
            </div>
            <div @click="goPath(`/post/${info.id}`)" v-if="info.content != ''" class="content">
                <!-- <span class="topic">
                    <FIcon class="icon" :size="12" type="icon-huati1"/>
                    <span>话题</span>
                    <FIcon class="icon" :size="12" type="icon-huati1"/>
                </span> -->
                <span>
                    {{info.content}}
                </span>
            </div>
            <div v-if="info.images.length > 0" class="images">
                <ImageAdaptation :list="info.images"/>
            </div>
            <div @click="goPath(`/post/${info.id}`)" v-if="info.setResource == 2" class="resource">
                <div class="icon">
                    <FIcon :size="18" type="icon-xiazai"/>
                </div>
                <div class="text">
                    查看资源
                </div>
            </div>
            <div class="footer">
                <div @click="goPath(`/forum/${info.forum.id}`)" v-if="info.forum != null" class="forum">
                    <FIcon class="icon" :size="16" type="icon-a-faxianquanzi"/>
                    <span class="forum-text">
                        {{info.forum.title}}
                    </span>
                </div>
                <div class="action">
                    <div @click="like" class="btn">
                        <div class="icon">
                            <a-icon v-if="info.isLike" type="dislike" />
                            <a-icon v-if="!info.isLike" type="like" />
                        </div>
                        <div v-if="info.likes > 0" class="text">
                            {{info.likes | resetNum }}
                        </div>
                        <div v-if="info.likes == 0" class="text">
                            点赞
                        </div>
                    </div>
                    <div @click="goPath(`/post/${info.id}?#comment`)" class="btn">
                        <div class="icon">
                            <a-icon type="message" />
                        </div>
                        <div v-if="info.comments > 0" class="text">
                            {{info.comments | resetNum }}
                        </div>
                        <div v-if="info.comments == 0" class="text">
                            评论
                        </div>
                    </div>
                    <div @click="share" class="btn">
                        <div class="icon">
                            <a-icon type="share-alt" />
                        </div>
                        <div class="text">
                            分享
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ImageAdaptation from "@/components/adaptation/image"
import FIcon from '@/components/icon/FIcon'
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    props:{ 
        info:{
            type: Object, //指定传入的类型
            default: null //这样可以指定默认的值
        },
    },
    components:{
        ImageAdaptation,
        FIcon
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    methods:{
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
                id:this.info.id
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
                id:this.info.id
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
        report(){
            this.$Report(this.info.id,"post")
        },
    }
}
</script>

<style lang="less" scoped>
.item{
    background: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    margin-bottom: 20px;
    .avatar{
        margin-right: 20px;
        cursor: pointer;
    }
    .post-info{
        flex: 1;
        .user-info{
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .name-grade{
                flex: 1;
                .name-mate{
                    display: flex;
                    align-items: center;
                    .name{
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 600;
                    }
                    .grade{
                        margin-left: 10px;
                        height: 1em;
                        max-width: 5em;
                        vertical-align: -0.15em;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        display: inline-block;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .date-view{
                    color: #8a919f;
                    font-size: 12px;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                }
            }
            .report{
                cursor: pointer;
            }
        }
        .title{
            cursor: pointer;
            font-size: 16px;
            color: #333;
            margin-bottom: 10px;
        }
        .content{
            color: #8a919f;
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 16px;
            cursor: pointer;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .topic{
                font-size: 12px;
                height: 20px;
                display: inline-block;
                line-height: 20px;
                padding: 0 5px 0 2px;
                margin-right: 5px;
                border-radius: 3px;
            }
            .topic:hover{
                color: #1890ff;
            }
        }
        .images{
            margin-bottom: 10px;
        }
        .resource{
            display: flex;
            margin-bottom: 10px;
            cursor: pointer;
            align-items: center;
            width: 200px;
            background: #e1edff;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            .icon{
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                background: #4289fa;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                width: 40px;
            }
            .text{
                margin: 10px;
                flex: 1;
                cursor: pointer;
                display: -webkit-box;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
        .footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .action{
                flex: 1;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .btn{
                    user-select: none;
                    cursor: pointer;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    padding: 4px 0px;
                    border-radius: 4px;
                    margin-left: 20px;
                    .icon{
                        margin-right: 5px;
                    }
                    .text{
                        font-size: 12px;
                    }
                }
            }
            .forum{
                margin-right: 5px;
                user-select: none;
                cursor: pointer;
                width: fit-content;
                background: #eaf2ff;
                line-height: 20px;
                border-radius: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2px 10px;
                .icon{
                    margin-right: 5px;
                }
                .forum-text{
                    color: #1e80ff;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>