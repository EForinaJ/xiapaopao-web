<template>
    <div class="widget">
        <div class="cover" :style="`background-image: url(${info.cover});`"> </div>
        <div class="info">
            <div class="avatar-name">
                <div @click="goPath(`/user/${accountinfonfo.id}`)" class="avatar">
                    <a-avatar :size="45" :src="info.avatar"/>
                </div>
                <div class="action-btn">
                    <div class="name-grade">
                        <div @click="goPath(`/user/${info.id}`)" class="name">
                            {{info.nickName}}
                        </div>
                        <div v-if="info.grade != null" class="grade">
                            <img :src="info.grade.icon">
                        </div>
                    </div>
                    <div @click="follow" class="btn">
                        <div class="icon">
                            <a-icon v-if="info.isFollow" type="minus" />
                            <a-icon v-if="!info.isFollow" type="plus" />
                        </div>
                        <div class="text">
                            {{info.isFollow ? '取消关注' : '关注'}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mate">
                <div class="dis">
                    <p>帖子</p>
                    <span>{{info.posts | resetNum}}</span>
                </div>
                <div class="dis">
                    <p>获赞</p>
                    <span>{{info.likes | resetNum}}</span>
                </div>
                <div class="dis">
                    <p>粉丝</p>
                    <span>{{info.fans | resetNum}}</span>
                </div>
                <div class="dis">
                    <p>关注</p>
                    <span>{{info.follows | resetNum}}</span>
                </div>
            </div>
        </div>
        <div class="post">
            <ul class="list">
                <li @click="goPath(`/post/${item.id}`)" v-for="(item,index) in list" :key="index" class="item">
                    <span class="text">{{item.title != '' ? item.title : item.content}}</span>
                </li>
            </ul>
        </div>
        <div @click="goPath(`/post`)" class="more">
            全部动态
        </div>
        
    </div>
</template>


<script>
import { mapState,mapActions } from "vuex"
import FIcon from '@/components/icon/FIcon'
import api from "@/api/index"
export default {
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    props:{ 
        info:{
            type: Object, //指定传入的类型
            default: null //这样可以指定默认的值
        },
    },
    components:{
        FIcon
    },
    data(){
        return{
            list:[],
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        ...mapActions("user",["A_UPDATE_SIGN","A_UPDATE_INTEGRAL"]),
        
        async getList(){
            let query = {
                page: 1,
                limit: 3,
                author: this.info.id
            }
            const res = await this.$axios.get(api.getPostList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list ?? [] 
        },
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
        goPath(path){
            this.$router.push(path)
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;
    .cover{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        height: 0;
        padding-top: 38%;
        height: 80px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        image-rendering: -webkit-optimize-contrast;
    }
    .info{
        .avatar-name{
            padding: 10px;
            display: flex;
            align-items: center;
            .avatar{
                cursor: pointer;
                margin-right: 10px;
            }
            .action-btn{
                flex: 1;
                display: flex;
                align-items: center;
                .name-grade{
                    flex: 1;
                    cursor: pointer;
                    .name{
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 20px;
                        max-width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        height: 20px;
                    }
                    .grade{
                        margin-top: 5px;
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
                .btn{
                    margin-right: 5px;
                    user-select: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    .icon{
                        margin-right: 5px;
                    }
                }
                .btn:hover{
                    color: darksalmon;
                }
            }
        }
        .mate{
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            height: 56px;
            box-shadow: inset -13px -48px 80px -35px rgba(17, 58, 93, 0.05);
            overflow: hidden;
            .dis{
                flex-direction: column;
                justify-content: center;
                align-items: center;
                display: flex;
                p{
                    font-weight: 600;
                    margin-bottom: 5px;
                    font-size: 12px;
                    color: #bcbcbc;
                }
                span{
                    font-weight: 600;
                }
            }
        }
    }
    .post{
        padding: 10px 0;
        .list{
            .item{
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 16px 20px;
                .text{
                    flex: 1;
                    color: #8a919f;
                    font-size: 13px;
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
    }
    .more{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
        border-top: 1px solid #f0f0f0;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
    }
    
}
</style>