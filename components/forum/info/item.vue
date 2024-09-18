<template>
    <div class="widget">
        <div @click="goPath(`/user/${info.userInfo.id}`)" class="avatar">
            <a-avatar :size="50" :src="info.userInfo.avatar" />
        </div>
        <div class="title-nickname">
            <div @click="goPath(`/post/${info.id}`)" class="title">
                <h2 v-if="info.authority == 1">{{info.title != "" ? info.title : info.content}}</h2>
                <h2 v-if="info.authority != 1">{{info.title}}</h2>
                
                <span v-if="info.isRecommend" class="recommend">
                    <span class="icon" >
                        <FIcon :size="14" type="icon-zuanshix"/>
                    </span>
                    <span class="text">
                        精华
                    </span>
                </span>

                <span v-if="info.type == 1 && info.images.length > 0" class="images">
                    <span class="icon" >
                        <FIcon :size="14" type="icon-tupian_huaban"/>
                    </span>
                    <span class="text">
                        {{info.images.length}}
                    </span>
                </span>
                <span v-if="info.authority != 1" class="images">
                    <span class="icon" >
                        <FIcon :size="14" type="icon-lock1"/>
                    </span>
                    <span v-if="info.authority == 2" class="text">
                        登录可看
                    </span>
                    <span v-if="info.authority == 3" class="text">
                        评论可看
                    </span>
                    <span v-if="info.authority == 4" class="text">
                        付费可看
                    </span>
                    <span v-if="info.authority == 5" class="text">
                        积分兑换
                    </span>
                </span>
                <span v-if="isTop" class="top">
                    置顶
                </span>
            </div>
            <div class="nickname-mate">
                <div class="nickname-data">
                    <h1 @click="goPath(`/post/${info.userInfo.id}`)" class="nickname">
                        <span>{{info.userInfo.nickName}}</span>
                        <img :src="info.userInfo.grade.icon" alt="">
                        
                    </h1>
                    <span v-if="info.createTime != null && info.replyTime == null" class="date">
                        {{info.createTime | resetData}}
                    </span>
                    <span v-if="info.replyTime != null && info.createTime == null" class="date">
                        {{info.replyTime | resetData}}回复
                    </span>
                </div>
                <div class="tags">
                    <div class="meta">
                        <div class="icon">
                            <FIcon :size="16" type="icon-eye"/>
                        </div>
                        <div class="num">
                            {{info.views | resetNum}}
                        </div>
                    </div>
                    <div class="meta">
                        <div class="icon">
                            <FIcon :size="16" type="icon-pinglun"/>
                        </div>
                        <div class="num">
                            {{info.comments | resetNum}}
                        </div>
                    </div>
                    <div class="meta">
                        <div class="icon">
                            <FIcon :size="16" type="icon-like"/>
                        </div>
                        <div class="num">
                            {{info.likes | resetNum}}
                        </div>
                    </div>
                    <div v-if="isManger" class="meta">
                        <div class="act">
                            <a-dropdown>
                                <a-icon type="more" />
                                <a-menu slot="overlay">
                                    <a-menu-item @click="remove" key="0">
                                        删除
                                    </a-menu-item>
                                    <a-menu-item @click="setRecommend" key="1">
                                        推荐
                                    </a-menu-item>
                                    <a-menu-item @click="setTop" key="2">
                                        置顶
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import FIcon from '@/components/icon/FIcon'
import { mapState } from "vuex"
export default {
    components:{
        FIcon,
    },
    props:{
        index:{
            type:Number,
            default: 0
        },
        info:{
            type:Object,
            default: null
        },
        isTop:{
            type:Boolean,
            default: false
        },
        isManger:{
            type:Boolean,
            default: false
        },
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        setRecommend(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.isManger) {
                this.$message.error(
                    "无权操作",
                    3
                )
            }
            this.$confirm({
                title: '推荐内容',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:this.info.id
                    }
                    const res = await this.$axios.post(api.postForumRecommendPost,query) 
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.info.isRecommend = true
                },
                onCancel() {

                },
            });
        },
        setTop(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.isManger) {
                this.$message.error(
                    "无权操作",
                    3
                )
            }
            this.$confirm({
                title: '置顶内容',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:this.info.id
                    }
                    const res = await this.$axios.post(api.postForumTopPost,query) 
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.$message.success(
                        "成功置顶",
                        3
                    )
                    this.isTop = true
                },
                onCancel() {

                },
            });
        },
        remove(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.isManger) {
                this.$message.error(
                    "无权操作",
                    3
                )
            }
            this.$confirm({
                title: '删除内容',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:this.info.id
                    }
                    const res = await this.$axios.post(api.postForumRemovePost,query) 
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.$message.success(
                        "成功删除",
                        3
                    )
                    this.$emit("remove",this.index,this.isTop)
                },
                onCancel() {

                },
            });
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    align-items: center;
    user-select: none;
    padding: 15px 15px;
    display: flex;
    border-bottom: 1px solid rgba(50, 50, 50, 0.06);
    .avatar{
        cursor: pointer;
        
    }
    .title-nickname{
        flex: 1;
        margin-left: 10px;
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        .title{
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-top: -.5em;
            
            h2{
                margin-right: 10px;
                line-height: 2.5em;
                font-size: @font-big;
                font-weight: 500;
                color: #4e5358;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                box-sizing: border-box;
            }
            .recommend{
                margin-right: 10px;
                border-radius: 4px;
                padding: 2px 6px;
                font-size: 12px;
                color: #ff9e54;
                background: rgba(255, 172, 84, 0.1);
            }
            .images{
                font-size: @font-small;
                border-radius: 15px;
                padding: 2px 6px;
                font-size: 12px;
                color: @font-color;
                background: @bg-gray-main;
                display: flex;
                align-items: center;
                .icon{
                    margin-right: 5px;
                }
                margin-right: 10px;
            }
            .top{
                border-radius: 4px;
                padding: 4px 6px;
                font-size: 12px;
                color: #ff5473;
                background: rgba(255, 84, 115, 0.1);
            }
        }
        .nickname-mate{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .nickname-data{

                display: flex;
                align-items: center;
                .nickname{
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    span{
                        color: #4e5358;
                        margin-right: 6px;
                        font-size: 13px;
                    }
                    img{
                        height: 1.1em;
                        max-width: 6em;
                        vertical-align: -0.15em;
                        backface-visibility: hidden;
                        display: inline-block;
                    }
                }
                .date{
                    font-size: 12px;
                    color: #999;
                }
                .date::before{
                    content: '';
                    width: 0.5em;
                    height: 0.5em;
                    border: 0.1em solid #155bd5;
                    border-radius: 1em;
                    margin: 0 0.5em;
                    vertical-align: 0.1em;
                    display: inline-block;
                }
                
            }
            
            .tags{
                display: flex;
                align-items: center;
                .meta{
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
                    .icon{
                        margin-right: 5px;
                    }
                    .act{
                        cursor: pointer;
                    }
                    .num{
                        font-size: @font-small;
                    }
                }
            }
        }
    }
}
.widget:hover{
    border-radius: 4px;
    background: rgba(145, 145, 145, 0.083);
}
</style>