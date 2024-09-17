<template>
    <div class="widget">
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
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    props:{ 
        info:{
            type: Object, //指定传入的类型
            default: null //这样可以指定默认的值
        },
        module:{
            type: String, //指定传入的类型
            default: '' //这样可以指定默认的值
        }
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    methods:{
        share(){
            this.$Share(`${this.base.url}/${this.module}/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
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
                this.info.isLike = !this.info.isLike
                if (this.info.isLike) {
                    this.info.likes =  this.info.likes + 1
                } else {
                    this.info.likes =  this.info.likes - 1
                }
                return
            }
        },
        goAnchor(selector) {
            document.querySelector(selector).scrollIntoView({
                behavior: "smooth"
            });
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
                this.info.isFavorite = !this.info.isFavorite
                if (this.info.isFavorite) {
                    this.info.favorites =  this.info.favorites + 1
                } else {
                    this.info.favorites =  this.info.favorites - 1
                }
                return
            }
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    position: fixed;
    left: 420px;
    top: 150px;
    width: 49px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column;
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
</style>