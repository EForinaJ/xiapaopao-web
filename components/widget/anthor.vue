<template>
    <div class="siber-box">
        <div class="author">
            <div class="cover">
                <img :src="info.cover | resetImage(300,150)" :alt="info.nickName">
            </div>
            <div class="info">
                <div class="avatar-box">
                    <div class="avatar">
                        <img :src="info.avatar | resetImage(50,50)" alt="">
                    </div>                       
                </div>
                <div class="nickname">
                    {{info.nickName}}
                </div>
                <div class="grade-follow"> 
                    <div v-if="info.grade" class="grade">
                        <img :src="info.grade.icon">
                    </div>
                    <div @click="follow" class="follow">
                        <a-icon :type="info.isFollow ? 'user-delete':'user-add'" />
                        <span>{{info.isFollow ? "取消关注" : "关注"}}</span>
                    </div>
                </div>
                <div class="mate">
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>获赞{{info.likes}}</span>
                        </template>
                        <div class="box like">
                            <a-icon type="heart" />
                            <span>{{info.likes}}</span>
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>浏览{{info.views}}</span>
                        </template>
                        <div class="box view">
                            <a-icon type="eye" />
                            <span>{{info.views}}</span>
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>粉丝{{info.fans}}</span>
                        </template>
                        <div class="box fans">
                            <a-icon type="team" />
                            <span>{{info.fans}}</span>
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template slot="title">
                        <span>关注{{info.follows}}</span>
                        </template>
                        <div class="box follow">
                            <a-icon type="user" />
                            <span>{{info.follows}}</span>
                        </div>
                    </a-tooltip>
                </div>
                <div class="description">
                    <p>{{info.description != "" ? info.description : "这个很懒，什么都没写。。。。。"}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import FIcon from '@/components/icon/FIcon'
export default {
    props:{ 
        info: {
            type: Object, //指定传入的类型
            default: {
                id: 0,
                avatar:"",
                cover:"",
                nickName:"用户昵称",
                grade:{
                    icno:""
                },
                likes: 0,
                views: 0,
                fans: 0,
                follows:0,
                list: [],
                isFollow: false
            } //这样可以指定默认的值
        },
    },
    components:{
        FIcon,
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    methods:{
        follow(){
            if (!this.token) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$emit("follow")
        }
    }
}
</script>
<style lang="less" scoped>
.siber-box{
    background: white;
    border-radius: 4px;
    margin-bottom: 15px;
    .author{
        position: relative;
        .cover{
            width: 100%;
            height: 150px;
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            img{
                object-fit: cover;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
                width: 100%;
                height: 100%;
            }
        }
        .info{
            background: white;
            padding: 20px;
            margin-top: -55px;
            .avatar-box{
                display: flex;
                align-items: center;
                justify-content: center;
                .avatar{
                    cursor: pointer;
                    user-select: none;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    img{
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                
            }
            .nickname{
                margin-top: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                user-select: none;
                color: #4e5358;
                font-size: 16px;
                font-weight: 700;
                margin-right: 5px;
            }
            .grade-follow{
                margin-top: 5px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                
                .grade{
                    margin-left: 5px;
                    img{
                        height: 1.1em;
                        max-width: 6em;
                        vertical-align: -0.15em;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        display: inline-block;
                    }
                }
                .follow{
                    text-align: center;
                    font-size: 14px;
                    border-radius: 4px;
                    cursor: pointer;
                    user-select: none;
                    color: #0066ff !important;
                    padding: 0 10px;
                    font-weight: 500;
                }
            }
            .mate{
                display: flex;
                justify-content: center;
                align-items: center;
                .box{
                    cursor: pointer;
                    user-select: none;
                    border-radius: 4px;
                    padding: 4px 8px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    span{
                        margin-left: 5px;
                    }
                }
                .like{
                    color: #eb2f96;
                    background: #fff0f6;
                }
                .view{
                    margin: 0 5px;
                    color: #52c41a;
                    background: #b7eb8f;
                }
                .fans{
                    margin-right: 5px;
                    color: #1890ff;
                    background: #e6f7ff;
                }
                .follow{
                    color: #722ed1;
                    background: #f9f0ff;
                }
            }
            .description{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10px;
                p{
                    font-size: 13px;
                    color: #8590a6;
                    line-height: 16px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    word-break: break-all;
                }
            }
        }
    }
}
</style>