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
            <div 
                v-if="info.authority == 1"
                @click="goPath(`/post/${info.id}`)"  
                class="title"
            >
                {{info.title != "" ? info.title : info.content}}
            </div>
            <div 
               v-if="info.authority != 1"
                @click="goPath(`/post/${info.id}`)"  
                class="title"
            >
                {{info.title}}
            </div>


            <div
                @click="goPath(`/post/${info.id}`)" 
                v-if="info.content != '' && info.isView" 
                class="content"
            >
                <!-- <span class="topic">
                    <FIcon class="icon" :size="12" type="icon-huati1"/>
                    <span>话题</span>
                    <FIcon class="icon" :size="12" type="icon-huati1"/>
                </span> -->
                <span>
                    {{info.content}}
                </span>
            </div>

            <div v-if="info.images.length > 0 && info.isView" class="images">
                <ImageAdaptation :list="info.images"/>
            </div>

            <div 
                v-if="!info.isView" 
                class="resource"
            >
                <div class="desc-text">
                    <div class="icon">
                        <FIcon :size="14" type="icon-lock1-copy"/>
                    </div>
                    <div class="text">
                        该帖子部分内容已隐藏
                    </div>
                </div>
                <div v-if="info.authority == 2" class="hide-c">
                    <a-divider>登录后刷新查看</a-divider>
                    <div class="act">
                        <div @click="login" class="btn">
                            登录
                        </div>
                    </div>
                </div>
                <div v-if="info.authority == 3" class="hide-c">
                    <a-divider>评论后继续查看</a-divider>
                    <div class="act">
                        <div @click="goPath(`/post/${info.id}?#comment`)" class="btn">
                            评论
                        </div>
                    </div>
                </div>
                <div v-if="info.authority == 4" class="hide-info">
                    <div class="info">
                        <div class="price">
                            <span class="ot">$</span>
                            <span class="text">
                                {{info.authorityDetail.price}}
                            </span>
                        </div>
                        <div class="action">
                            <div class="count">
                                此内容为付费阅读，请付费后查看
                            </div>
                            <div @click="pay" class="btn">
                                立即购买
                            </div>
                        </div>
                    </div>
                    <div class="num">
                        已售{{info.authorityDetail.count | resetNum}}
                    </div>
                    <div class="type">
                        付费阅读
                    </div>
                </div>
                <div v-if="info.authority == 5" class="hide-info">
                    <div class="info">
                        <div class="integral">
                            <span class="ot">
                                <FIcon :size="14" type="icon-jifen-copy"/>
                            </span>
                            <span class="text">
                                {{info.authorityDetail.integral}}
                            </span>
                            <span>
                                积分
                            </span>
                        </div>
                        <div class="action">
                            <div class="count">
                                此内容为积分兑换，请兑换后查看
                            </div>
                            <div @click="exchange" class="btn in">
                                立即兑换
                            </div>
                        </div>
                    </div>
                    <div class="num">
                        已售{{integralCount}}
                    </div>
                    <div class="type">
                        付费阅读
                    </div>
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
        login(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
        },

        pay(){
            const product = {
                detailId: this.info.id,
                detailModule:"post",
                orderMoney: this.info.authorityDetail.price,
                orderType: 3,
            }

            this.$Pay("支付帖子隐藏内容",product).then(async (res)=>{
                this.goPath(`/post/${this.info.id}`)
            }).catch((err)=>{
                (err)
                // this.createForm.cover = undefined
            })
        },
        exchange(){
            this.$confirm({
                title: '使用积分',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:this.info.id
                    }
                    const res = await this.$axios.post(api.postPostExchange,query) 
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.goPath(`/post/${this.info.id}`)
                },
                onCancel() {

                },
            });
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
            background: rgba(0, 0, 0, 0.03);
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
            .desc-text{
                display: flex;
                align-items: center;
                .icon{
                    margin-right: 5px;
                }
                .text{
                    font-size: @font-normal;
                    color: @font-desc-color;
                }
            }
            .hide-info{
                margin-top: 10px;
                border-radius: 4px;
                background: #fff;
                padding: 15px;
                position: relative;
                .info{
                    margin-top: 20px;
                    // display: flex;
                    .price{
                        color: #ff5473;
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 1.4;
                        .ot{
                           margin-right: 1px;
                        }
                        .text{
                            font-size: 3em;
                        }
                    }
                    .integral{
                        color: #ff6f06;
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 1.4;
                        .ot{
                           margin-right: 1px;
                        }
                        .text{
                            font-size: 3em;
                        }
                    }
                    .action{
                        display: flex;
                        align-items: center;
                        .count{
                            flex: 1;
                            font-size: @font-small;
                        }
                        .btn{
                            user-select: none;
                            cursor: pointer;
                            border-radius: 4px;
                            color: white;
                            padding: .5em 3em;
                            background:  linear-gradient(135deg, #fd7a64 10%, #fb2d2d 100%);
                        }
                        .in{
                             background:linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
                        }
                    }
                }
                .num{
                    color: #fff;
                    position: absolute;
                    font-size: @font-small;
                    top: .6em;
                    right: 0;
                    border-radius: 50px 0 0 50px;
                    text-shadow: none;
                    box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
                    z-index: 1;
                    margin-top: 6px;
                    padding: .25em .6em;
                    background: linear-gradient(135deg, #60e464 10%, #5cb85b 100%);
                }
                .type{
                    position: absolute;
                    transform: translateY(-50%);
                    font-size: 13px;
                    padding: 3px 10px;
                    right: auto;
                    left: 0px;
                    width: auto;
                    top: 10px;
                    color: #fff;
                    border-radius: 4px 0 4px 0;
                    line-height: 1.4;
                    z-index: 1;
                    background: linear-gradient(135deg, #ff74cd 10%, #ec7d0b 100%);
                }
            }
            .hide-c{
                .act{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .btn{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: .6em 1.4em !important;
                        cursor: pointer;
                        color: white;
                        border-radius: 24px;
                        font-size: 14px;
                        background: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
                    }
                }
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