<template>
    <div class="widget">
        <div class="cover-title">
            <div class="cover">
                <img :src="info.cover | resetImage(base.url,60,60)" alt="">
            </div>
            <div class="title-mate">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="mate">
                    <div class="mix">
                        <div class="text">
                            帖子:
                        </div>
                        <div class="num">
                            {{info.posts | resetNum}}
                        </div>
                    </div>
                    <div class="mix">
                        <div class="text">
                            互动:
                        </div>
                        <div class="num">
                            {{info.hots| resetNum}}
                        </div>
                    </div>
                    <div class="mix">
                        <div class="text">
                            成员:
                        </div>
                        <div class="num">
                            {{info.members | resetNum}}
                        </div>
                    </div>
                </div>
                <div class="desc">
                    {{info.description}}
                </div>
            </div>
        </div>
        <div class="action">
            <div @click="join" class="btn follow mr20">
                <span class="text">
                    {{info.isJoin ? '退出圈子' : '加入圈子'}}
                </span>
            </div>
            <div @click="createPost" class="btn create">
                <span class="text">
                    发布帖子
                </span>
            </div>
        </div>
        <div class="fiex">
            <!-- <div class="op" @click="join" v-if="this.info.manger.id != this.accountInfo.id">
                <FIcon :size="16" type="icon-jiaruqunzu"/>
                <span class="text">{{info.isJoin ? '退出' : '加入'}}</span>
            </div> -->
            <div @click="share" class="op">
                <FIcon :size="15" type="icon-icon-fenxiang"/>
            </div>
            <div class="op">
                <a-dropdown>
                    <FIcon :size="15" type="icon-icmore"/>
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
import FIcon from "@/components/icon/FIcon"
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    components:{
        FIcon
    },
    props:{
        info:{
            type: Object,
            default: null
        },
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["token","accountInfo"]),
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
            this.$CreateForum(this.info.id)
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
                    "您是创建者，不需要加入啦",
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
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    .cover-title{
        margin-top: 24px;
        display: flex;
        .cover{
            width: 60px;
            height: 60px;
            border-radius: 4px;
            margin-right: 10px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 4px;
                object-fit: cover;
            }
        }
        .title-mate{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title{
                font-size: @font-big;
                color: @font-gray-color;
                line-height: 16px;
                cursor: pointer;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            .mate{
                display: flex;
                align-items: center;
                .mix{
                    margin-right: 10px;
                    display: flex;
                    font-size: @font-small;
                    .text{
                        margin-right: 5px;
                    }
                }
            }
            .desc{
                font-size: @font-small;
                color: @font-desc-color;
                line-height: 16px;
                cursor: pointer;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
    .action{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .follow{
            border: 1px solid @color-blue-main;
            color: @color-blue-main;
        }
        .create{
            border: 1px solid #ff5473;
            color: #ff5473;
        }
        .btn{
            user-select: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 20px;
            font-size: @font-normal;
            border-radius: 4px;
        }
    }
    .fiex{
        position: absolute;
        right: 15px;
        top: 15px;
        display: flex;
        align-items: center;
        .op{
            user-select: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-left: 10px;
            .text{
                margin-left: 5px;
            }
        }
    }
}
</style>