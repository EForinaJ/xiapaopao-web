<template>
<div class="widget">
    <div class="text">
        <h2>管理员</h2>
        <div @click="forumManger" class="create-forum">
            查看所有用户
        </div>
    </div>
    <div class="hot-user">
        <ul class="list">
            <li  class="item">
                <div @click="goPath(`/user/${info.manger.id}`)" class="avatar">
                    <img :src="info.manger.avatar | resetImage(base.url,40,40)" alt="">
                </div>
                <div class="info-ac">
                    <div class="info">
                        <div @click="goPath(`/user/${info.manger.id}`)" class="nickname-grade">
                            <h2>{{info.manger.nickName}}</h2>
                            <div class="grade">
                                <img :src="info.manger.grade.icon">
                            </div>
                        </div>
                        <div class="manger">
                            <div class="mtext">
                                超级版主
                            </div>
                        </div>
                    </div>
                    <div v-if="this.accountInfo.id != info.manger.id" @click="superMnagerfollow(info.manger.id)" class="ac">
                        <div class="x-text">
                            {{info.manger.isFollow ? '取消关注' : '关注'}}
                        </div>
                    </div>
                </div>
            </li>
            <li v-for="(item,index) in mangerList" :key="index" class="item">
                <div @click="goPath(`/user/${item.id}`)" class="avatar">
                    <img :src="item.avatar | resetImage(base.url,40,40)" alt="">
                </div>
                <div class="info-ac">
                    <div class="info">
                        <div @click="goPath(`/user/${item.id}`)" class="nickname-grade">
                            <h2>{{item.nickName}}</h2>
                            <div class="grade">
                                <img :src="item.grade.icon">
                            </div>
                        </div>
                        <div class="manger">
                            <div class="mtext">
                                管理员
                            </div>
                        </div>
                    </div>
                    <div @click="mangerFollow(item.id,index)" class="ac">
                        <div class="x-text">
                            {{item.isFollow ? '取消关注' : '关注'}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    props:{
        info:{
            type:Object,
            default: {}
        },
        isManger:{
            type:Boolean,
            default: false
        },
        mangerList:{
            type:Array,
            default: []
        }
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            list: [],

        }
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        forumManger(){
            this.$ForumManger(this.info.id,this.info.manger).then((res)=>{
                if (res != false) {
                //    this.$emit("getData")
                }
            }).catch((err)=>{
               
            })
        },
        async superMnagerfollow(id){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (this.accountInfo.id == id) {
                this.$message.error(
                    "自己不要关注自己",
                    3
                )
                return
            }
            if (!this.accountInfo.grade.auth.includes("follow")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            
            this.info.manger.isFollow = !this.info.manger.isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                this.info.manger.isFollow = !this.info.manger.isFollow
                return
            }
        },
        async mangerFollow(id,index){
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
            
            this.mangerList[index].isFollow = !this.mangerList[index].isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                this.mangerList[index].isFollow = !this.mangerList[index].isFollow
                return
            }
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    background: white;
    border-radius: 4px;
    margin-bottom: 15px;
    .text{
        border-bottom: 1px solid #eeeeee;
        position: relative;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 20px ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2{
            padding: 4px 0px;
        }
        .create-forum{
            user-select: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            padding: 4px 10px;
            font-size: 13px;
            border-radius: 4px;
            color: @color-blue-main;
            border: 1px solid @color-blue-main;
        }
    }
    .text::before{
        content: '';
        width: 4px;
        height: 18px;
        position: absolute;
        left: 10px;
        top: 17px;
        background-color: #0066ff;
        border-radius: 4px;
    }
    .hot-user{
        .list{
            padding-top: 15px;
            .item{
                cursor: pointer;
                padding: 0px 15px;
                padding-bottom: 15px;
                display: flex;
                .avatar{
                    height: 38px;
                    width: 38px;
                    border-radius: 4px;
                    img{
                        border-radius: 4px;
                        width: 100%;
                        height: 100%;
                    }
                }
                .info-ac{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    .info{
                        height: 35px;
                        flex: 1;
                        margin-left: 8px;
                        flex-direction: column;
                        justify-content: space-between;
                        display: flex;
                        .nickname-grade{
                            display: flex;
                            align-items: center;
                            h2{
                                font-size: 13px;
                                font-weight: 600;
                                max-width: 100%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                            }
                            .grade{
                                margin-left: 5px;
                                img{
                                    height: 0.8em;
                                    max-width: 6em;
                                    vertical-align: -0.15em;
                                    backface-visibility: hidden;
                                    display: inline-block;
                                }
                            }
                        }
                        .manger{
                            display: flex;
                            .mtext{
                                background: @bg-blue-main;
                                color: @color-blue-main;
                                padding: 2px 4px;
                                border-radius: 4px;
                                font-size: @font-small;
                            }
                        }
                    }
                    .ac{
                        .x-text{
                            font-size: @font-small;
                        }
                        .x-text:hover{
                            color: @color-blue-main;
                        }
                    }
                }
            }
        }
    }
}
</style>