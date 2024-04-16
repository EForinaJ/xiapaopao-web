<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="author-info">
                <div class="left">
                    <div class="setting-menu">
                        <div @click="goRouter('/')" :class="selectedKeys == '/' ? 'active item' : 'item'">
                            <div class="item-info">
                                <a-badge :count="systemCount" :overflow-count="10">
                                    <img src="/img/notice/msg-system.svg" alt="" srcset="">
                                </a-badge>
                                <p>
                                    系统通知
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/comment')" :class="selectedKeys == '/comment' ? 'active item' : 'item'">
                            <div class="item-info">
                                <a-badge :count="commentCount" :overflow-count="10">
                                    <img src="/img/notice/msg-comment.svg" alt="" srcset="">
                                </a-badge>
                                <p>
                                    评论通知
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/like')" :class="selectedKeys == '/like' ? 'active item' : 'item'">
                            <div class="item-info">
                                <a-badge :count="likeCount" :overflow-count="10">
                                    <img src="/img/notice/msg-followed.svg" alt="" srcset="">
                                </a-badge>
                                <p>
                                    点赞通知
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/follow')" :class="selectedKeys == '/follow' ? 'active item' : 'item'">
                            <div class="item-info">
                                <a-badge :count="followCount" :overflow-count="10">
                                    <img src="/img/notice/msg-private.svg" alt="" srcset="">
                                </a-badge>
                              
                                <p>
                                    关注通知
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/message')" :class="selectedKeys == '/message' ? 'active item' : 'item'">
                            <div class="item-info">
                                <a-badge :count="messageCount" :overflow-count="10">
                                    <img src="/img/notice/msg-news.svg" alt="" srcset="">
                                </a-badge>
                                
                                <p>
                                    我的私信
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <transition name="page-transition">
                        <Nuxt />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"

import FIcon from '@/components/icon/FIcon'
export default {
    middleware: 'auth',
    components:{
        FIcon,
    },
    head () {
        return {
            title: `个人资料-${this.base.title} - ${this.base.childTitle}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            selectedKeys: "/",
            likeCount: 0,
            commentCount: 0,
            systemCount: 0,
            followCount: 0,
            messageCount: 0,
        }
    },
    mounted(){
        this.updateMenu()
        this.getNoticeCount()
    },
    methods:{
        async getNoticeCount(){
            const res = await this.$axios.get(api.getNoticeCount,{params: this.query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.likeCount = res.data.info.like
            this.commentCount = res.data.info.comment
            this.systemCount = res.data.info.system
            this.followCount = res.data.info.follow
            this.messageCount = res.data.info.message
        },
        updateMenu () {
            if (this.$route.path != "/404") {
                const routes = this.$route.matched.concat()
                this.selectedKeys = routes.pop().path.slice(7)
            }
        },
        goRouter(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
            }else{
                this.selectedKeys = e
                this.$router.push('/notice'+e)
            }
        },
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
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

        .author-info{
            display: flex;
            margin-top: 20px;
            .left{
                width: 260px;
                .setting{
                    background-color: white;
                    border-radius: 4px;
                    padding: 10px;
                    margin-bottom: 20px;
                    .text{
                        margin-bottom: 10px;
                        font-size: 16px;
                        font-weight: 700;
                        color: #777;
                    }
                    .list{
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        .item{
                            cursor: pointer;
                            user-select: none;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            .title{
                                margin-top: 10px;
                                font-size: 12px;
                                color: #777;
                            }
                        }
                    }
                }

                .setting-menu{
                    margin-bottom: 20px;
                    background-color: white;
                    border-radius: 4px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    box-shadow: 0px 0px 2px rgba(98, 124, 153, 0.1);
                    position: relative;
                    .item{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        padding: 10px;
                        .item-info{
                            user-select: none;
                            font-size: 14px;
                            font-weight: 700;
                            position: relative;
                            display: flex;
                            align-items: center;
                            color: #8590A6;
                            img{
                                width: 22px;
                                height: 22px;
                                border-radius: 100px;
                                margin-right: 10px;
                            }
                            p{
                                margin-left: 5px;
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                    .active{
                        p{
                            color: #2997f7;
                        }
                        i{
                            color: #2997f7;
                        }
                        border-radius: 4px;
                        background: rgba(0, 102, 255, 0.04);
                    }
                    .item:hover{
                        border-radius: 4px;
                        background: rgba(0, 102, 255, 0.04);
                    }
                }

            }
            .right{
                margin-left: 20px;
                flex: 1;
                .page-transition-enter-active ,.page-transition-leave-active{
                    transition: opacity 1s;
                }
                .page-transition-enter ,.page-transition-leave-to{
                    opacity: 0;
                }
            }
        }
    }
}

</style>