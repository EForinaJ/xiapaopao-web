<template>
    <div class="widget">
        <div class="cover" >
            <img :src="info.cover | resetImage(base.url,500,300)" alt="">
        </div>
        <div class="mask"></div>
        <div class="info">
            <div class="info-right">
                <div class="tag">
                    {{info.category.title}}
                </div>
                <div class="title">
                    {{info.title}}
                </div>
                <div class="mate">
                    <div class="item">
                        <span>帖子</span>
                        <span class="num">{{info.posts | resetNum}}</span>
                    </div>
                    <div class="item">
                        <span>互动</span>
                        <span class="num">{{info.hots | resetNum}}</span>
                    </div>
                    <div class="item">
                        <span>成员</span>
                        <span class="num">{{info.members | resetNum}}</span>
                    </div>
                </div>
                <div class="desc">
                    {{info.description}}
                </div>
            </div>
            <div class="info-left">
                <div class="thumb">
                    <img :src="info.cover | resetImage(base.url,100,100)" alt="">
                </div>
            </div>
        </div>
        <div  class="btn-box">
            <div @click="forumManger" class="item">
                <div v-if="info.manger != null" class="avatar">
                    <a-avatar :size="20" :src="info.manger.avatar" />
                </div>
                <div v-if="list.length > 0" class="dot"></div>
                <div v-for="(item,index) in list" :key="index" class="avatar manger">
                    <a-avatar :size="20" :src="item.avatar" />
                </div>
                <div class="count">
                    <span>
                       {{list.length+1}}名版主
                    </span>
                    <a-icon type="right" />
                </div>
            </div>
            <div @click="createPost" class="item">
                <div class="text">
                    发布
                </div>
            </div>
        </div>
        <div class="mate-action">
            <div @click="join" v-if="this.info.manger.id != this.accountInfo.id" class="item">
                <a-icon type="plus" />
                <span class="text">{{info.isJoin ? '退出' : '加入'}}</span>
            </div>
            <div @click="share" class="item">
                <FIcon :size="16" type="icon-icon-fenxiang-lgiht-copy"/>
            </div>
            <div class="item">
                <a-dropdown>
                    <FIcon :size="16" type="icon-icmore-copy"/>
                    <a-menu slot="overlay">
                        <a-menu-item v-if="info.manger.id == accountInfo.id " @click="edit" key="0">
                            编辑
                        </a-menu-item>
                        <a-menu-item @click="create" key="1">
                            创建
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import FIcon from '@/components/icon/FIcon'
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    components:{
        FIcon,
    },
    props:{
        info:{
            type: Object,
            default: null
        },
        list:{
            type: Array,
            default: []
        },
        mangerList:{
            type: Array,
            default: []
        },
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            
        }
    },
    mounted(){
        if (this.list.length > 3) {
            this.list.slice(0,2)
        }
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        edit(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$EditForum(this.info.id).then((res)=>{
                if (res != false) {
                   this.$emit("getData")
                }
            }).catch((err)=>{
               
            })
        },
        create(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$CreateForum(this.info.id).then((res)=>{
                if (res != false) {
                //    this.$emit("getData")
                }
            }).catch((err)=>{
               
            })
        },
        createPost(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$CreatePost(this.info).then((res)=>{
                if (res != false) {
                   this.$emit("setData",res)
                }
            }).catch((err)=>{
               
            })
        },
        forumManger(){
            this.$ForumManger(this.info.id,this.info.manger).then((res)=>{
                if (res != false) {
                //    this.$emit("getData")
                }
            }).catch((err)=>{
               
            })
        },
        share(){
            this.$Share(`${this.base.url}/forum/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },
        async join(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("join")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            if (this.info.manger.id == this.accountInfo.id) {
                this.$message.error(
                    "您已是超级版主",
                    3
                )
                return
            }
            if (this.info.isJoin) {
                this.info.members -= 1
            }else{
                this.info.members += 1
            }
            this.info.isJoin = !this.info.isJoin
            const res = await this.$axios.post(api.postForumJoin,{id:this.info.id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                if (this.info.isJoin) {
                    this.info.members -= 1
                }else{
                    this.info.members += 1
                }
                this.info.isJoin = !this.info.isJoin
                return
            }
            this.$emit("joinCount",this.info.members)
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    height: 300px;
    position: relative;
    background-color: #eff1f3;
    overflow: hidden;
    border-radius: 8px;
    .cover{
        position: absolute;
        left: -50px;
        top: -50px;
        width: calc(100% + 100px);
        height: calc(100% + 100px);
        border-radius: 8px;
        filter: blur(30px);
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
    .mask{
        
        border-radius: 8px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(76, 80, 87, .6);
    }
    .info{
        position: absolute;
        top: 50px;
        width: 100%;
        padding: 15px 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info-right{
            flex: 1;
            .tag{
                color: white;
                font-size: 12px;
                font-style: normal;
                display: inline-block;
                background-color: #155bd5;
                transform: scale(1);
                padding: 2px 10px;
                border-radius: 4px;
                text-transform: capitalize;
            }
            .title{
                margin-top: 6px;
                font-size: 18px;
                color: white;
                font-weight: 600;
            }
            .mate{
                margin-top: 16px;
                display: flex;
                align-items: center;
                .item{
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    color: #ddd;
                    font-size: 14px;
                    .num{
                        margin-left: 5px;
                    }
                }
            }
            .desc{
                color: #ddd;
                margin-top: 6px;
                padding: 0 2px;
                font-size: 14px;
                position: relative;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                height: 20px;
                box-sizing: border-box;
                line-height: 20px;
                margin: 12px 0;
            }
        }
        .info-left{
            .thumb{
                margin-left: 10px;
                height: 100px;
                width: 100px;
                border-radius: 4px;
                img{
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                    border-radius: 4px;
                }
            }
        }
        
    }
    .btn-box{
        position: absolute;
        bottom: 40px;
        width: 100%;
        padding: 15px 80px;
        display: flex;
        align-items: center;
        .item{
            margin-right: 10px;
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            padding: 5px 10px;
            color: white;
            background-color: rgba(255, 255, 255, 0.1);
            i{
                margin-right: 5px;
            }
            .text{
                font-size: 12px;
                // line-height: 20px;
                padding: 5px 18px;
            }
            .avatar{
                margin-right: 5px;
                border-radius: 50%;
                border: 1px solid white;
            }
            .manger{
                margin-right: -8px;
            }
            .dot::before{
                margin: 0 6px;
                opacity: .6;
                content: '';
                width: 4px;
                height: 4px;
                border-radius: 50%;
                display: inline-block;
                background: #fff;
                vertical-align: .2em;
            }
            .count{
                margin-left: 15px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .item:hover{
            opacity: .8;
        }
    }
    .mate-action{
        position: absolute;
        right: 10px;
        top: 5px;
        display: flex;
        align-items: center;
        .item{
            user-select: none;
            margin-left: 5px;
            cursor: pointer;
            font-size: 16px;
            color: #ddd;
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            .text{
                margin-left: 5px;
                font-size: 12px;
            }
        }
    }
}
</style>