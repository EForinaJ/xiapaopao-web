<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="left">
                <div class="content">
                    <Header :info="info"
                        @joinCount="joinCount"
                        @getData="getData"
                        @showCreate="showCreate"
                        :list="mangerList"
                    />
                    <Create 
                        :collapsed="showCreatePanle"
                    
                    />
                    <!-- <div class="center">
                        <div class="menu">
                            <ul class="list">
                                <li @click="changeSelectKey(0)" :class="selectkey == 0 ? 'item active' : 'item' ">
                                    <span>
                                        全部
                                    </span>
                                </li>
                                <li @click="changeSelectKey(1)" :class="selectkey == 1 ? 'item active' : 'item' ">
                                    <span>
                                        热门
                                    </span>
                                </li>
                                <li @click="changeSelectKey(2)" :class="selectkey == 2 ? 'item active' : 'item' ">
                                    <span>
                                        最新
                                    </span>
                                </li>
                                <li @click="changeSelectKey(3)" :class="selectkey == 3 ? 'item active' : 'item' ">
                                    <span>
                                        精华
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="topList.length > 0" class="top-list">
                            <div v-if="!loading">
                                <div class="list">
                                    <div v-for="(item,index) in topList" :key="index" class="item">
                                        <div @click="goPath(`/user/${item.userInfo.id}`)" class="avatar">
                                            <img :src="item.userInfo.avatar" alt="">
                                        </div>
                                        <div class="title-nickname">
                                            <div class="nickname-mate">
                                                <div class="nickname-data">
                                                    <h1 @click="goPath(`/post/${item.userInfo.id}`)" class="nickname">
                                                        <span>{{item.userInfo.nickName}}</span>
                                                        <img :src="item.userInfo.grade.icon" alt="">
                                                        
                                                    </h1>
                                                    <span class="date">
                                                        {{item.createTime | resetData}}
                                                    </span>
                                                    <span class="date"></span>
                                                    <span class="top">
                                                        置顶
                                                    </span>
                                                </div>
                                                <div class="tags">
                                                    <div  v-if="item.forum" class="game">
                                                        {{item.forum.title}}
                                                    </div>
                                                    <div @click="goPath(`/category/${item.category.id}`)" v-if="item.category" class="cate">
                                                        {{item.category.title}}
                                                    </div>
                                                </div>
                                            </div>
                                            <div @click="goPath(`/post/${item.id}`)" class="title">
                                                <h2>{{item.title}}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="loading" class="loading">
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                            </div>
                        </div>
                        <div class="post-list">
                            <div v-if="!loading">
                                <div v-if="list.length > 0" class="list">
                                    <div v-for="(item,index) in list" :key="index" class="item">
                                        <div @click="goPath(`/user/${item.userInfo.id}`)" class="avatar">
                                            <img :src="item.userInfo.avatar" alt="">
                                        </div>
                                        <div class="title-nickname">
                                            <div class="nickname-mate">
                                                <div class="nickname-data">
                                                    <h1 @click="goPath(`/post/${item.userInfo.id}`)" class="nickname">
                                                        <span>{{item.userInfo.nickName}}</span>
                                                        <img :src="item.userInfo.grade.icon" alt="">
                                                        
                                                    </h1>
                                                    <span class="date">
                                                        {{item.createTime | resetData}}
                                                    </span>
                                                </div>
                                                <div class="tags">
                                                    <div  v-if="item.forum" class="game">
                                                        {{item.forum.title}}
                                                    </div>
                                                    <div @click="goPath(`/category/${item.category.id}`)" v-if="item.category" class="cate">
                                                        {{item.category.title}}
                                                    </div>
                                                </div>
                                            </div>
                                            <div @click="goPath(`/post/${item.id}`)" class="title">
                                                <h2>{{item.title}}</h2>
                                            </div>
                                            <div @click="goPath(`/post/${item.id}`)" v-html="item.content" class="post-content">
                                                
                                            </div>
                                            <div v-if="item.images" class="images">
                                                <ImageAdaptation :list="item.images"/>
                                            </div>
                                            <div class="mate">
                                                <div class="action-btn">
                                                    <a-icon type="like" />
                                                    <span>{{item.likes | resetNum}}</span>
                                                </div>
                                                <div class="action-btn">
                                                    <a-icon type="message" />
                                                    <span>{{item.comments | resetNum}}</span>
                                                </div>
                                                <div class="action-btn">
                                                    <a-icon type="eye" />
                                                    <span>{{item.views | resetNum}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isShow" class="nomore">
                                        加载完了！已经没有了
                                    </div>
                                </div>
                                <div v-if="list.length == 0" class="empty">
                                    <a-config-provider :locale="locale">
                                        <a-empty />
                                    </a-config-provider>
                                </div>
                            </div>
                            <div v-if="loading" class="loading">
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                                <div class="skeleton-item">
                                    <a-skeleton :loading="loading" :title="false" active></a-skeleton>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="right">
                <HotPost />
                <!-- <About /> -->
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import HotPost from "@/components/widget/hotPost"
import About from "@/components/widget/about"
import ImageAdaptation from "@/components/adaptation/image"


import Header from "@/components/forum/info/header"
import Create from "@/components/forum/info/create"
export default {
    components:{
        Header,
        Create,
        HotPost,About,ImageAdaptation
    },
    head () {
        return {
            title: `${this.info.title} - ${this.base.title}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    validate({ params }) {
        if (params.id != null && params.id != undefined && params.id != NaN) {
            return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token","accountInfo"]),
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getForumInfo,{params:{id:id}})
        
        if (res.code != 1) {
            redirect("/404")
        }
        
        return {
            base:store.state.base,
            id:id,
            info:res?.data?.info,
        }
    },
    data(){
        return{
            locale: zhCN,
            loading: false,
            showCreatePanle: false,

            query:{
                page: 1,
                limit: 8,
                mode: 0,
                categoryId: 0,
            },
            total: 0,
            list: [],
            isShow:false,
            selectkey:0,

            mangerList:[],
        }
    },
    mounted(){
        // this.query.categoryId = this.id
        // this.loading = true
        // this.getTopList()
        // this.getList()
        // this.loading = false
        this.getManger()
        window.addEventListener('scroll', this.scrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
        async getManger(){
            const query = {
                id : this.id,
            }
            const res = await this.$axios.get(api.getForumManger,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.mangerList = res.data.list ?? []
        },
        async getData(){
            const res = await this.$axios.get(api.getForumInfo,{params:{id:this.id}})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.info = res.data.info
        },
        joinCount(e){
            this.info.members = e
        },
        showCreate(){
            this.showCreatePanle = !this.showCreatePanle
        },


        async getTopList(){
            const query = {
                page : 1,
                limit: 5,
                mode: 3,
                categoryId: this.id,
            }
            const res = await this.$axios.get(api.getPostList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.topList = res.data.list ?? []
            this.total = res.data.total
        },
        goPath(path){
            this.$router.push(path)
        },
        scrollList(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

            //滚动条到底部的条件
            if (scrollTop+windowHeight > scrollHeight-50 && !this.isShow) {
                this.query.page += 1
                this.getList()
                return
            }
        },
        async getList(){
            const res = await this.$axios.get(api.getPostList,{params: this.query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            res.data.list = res.data.list != null ? res.data.list : []
            this.isShow = res.data.list.length > 0 ? false : true
            this.list = [...this.list,...res.data.list]
            this.total = res.data.total
        },
        changeSelectKey(e){
            this.selectkey = e
            this.loading = true
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.query.mode = e
            this.getList()
            this.loading = false
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
        display: flex;
        padding: 0 80px;
        .left{
            flex: 1;
            margin-right: 20px;
            .content{
               

                .center{
                    margin-top: 20px;
                    margin-bottom: 20px;
                    background-color: white;
                    padding: 20px;
                    border-radius: 4px;
                    min-height: 500px;
                    .menu{
                        .list{
                            display: flex;
                            align-items: center;
                            padding-bottom: 6px;
                            border-bottom: 1px solid rgba(50, 50, 50, 0.06);
                            .item{
                                position: relative;
                                padding-bottom: 8px;
                                cursor: pointer;
                                user-select: none;
                                padding-left: 5px;
                                margin: 0;
                                padding-right: 5px;
                                line-height: 1.4;
                                color: #999;
                                span{
                                    padding: 0 5px;
                                }
                            }
                            .item::before{
                                width: 20px;
                                height: 2px;
                                bottom: 0;
                                opacity: 0;
                                border-radius: 5px;
                                box-shadow: 1px 1px 3px -1px #155bd5;
                                background: #155bd5;
                                position: absolute;
                                content: '';
                                transition: .4s;
                                left: 0;
                                right: 0;
                                margin: auto;
                                transform-origin: center;
                            }
                            .item:hover{
                                color: #155bd5;
                            }
                            .active{
                                color: #155bd5;
                            }
                            .active::before{
                                opacity: 1;
                            }
                        }
                    }
                    .top-list{
                        .list{
                            .item{
                                align-items: center;
                                user-select: none;
                                padding: 15px 20px;
                                display: flex;
                                border-bottom: 1px solid rgba(50, 50, 50, 0.06);
                                .avatar{
                                    cursor: pointer;
                                    height: 50px;
                                    width: 50px;
                                    border-radius: 50%;
                                    img{
                                        object-fit: cover;
                                        height: 100%;
                                        width: 100%;
                                        border-radius: 50%;
                                    }

                                }
                                .title-nickname{
                                    flex: 1;
                                    margin-left: 10px;
                                    .title{
                                        cursor: pointer;
                                        margin-top: 10px;
                                        h2{
                                            // line-height: 2.5em;
                                            font-size: 18px;
                                            font-weight: 500;
                                            color: #4e5358;
                                            word-wrap: break-word;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 1;
                                            overflow: hidden;
                                            box-sizing: border-box;
                                            
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
                                            .top{
                                                border-radius: 4;
                                                padding: 4px 6px;
                                                font-size: 12px;
                                                color: #ff5473;
                                                background: rgba(255, 84, 115, 0.1);
                                            }
                                        }
                                        
                                        .tags{
                                            display: flex;
                                            align-items: center;
                                            .cate{
                                                cursor: pointer;
                                                user-select: none;
                                                margin-left: 10px;
                                                color: #2997f7;
                                                font-size: 11px;
                                                font-style: normal;
                                                display: inline-block;
                                                background-color:rgba(41, 151, 247, 0.1);
                                                transform: scale(1);
                                                padding: 6px 6px;
                                                border-radius: 3px;
                                                text-transform: capitalize;
                                            }
                                            .game{
                                                cursor: pointer;
                                                user-select: none;
                                                margin-left: 10px;
                                                color: #ff3f9f;
                                                font-size: 11px;
                                                font-style: normal;
                                                display: inline-block;
                                                background-color:rgba(255, 63, 159, .1);
                                                transform: scale(1);
                                                padding: 6px 6px;
                                                border-radius: 3px;
                                                text-transform: capitalize;
                                            }
                                        }
                                    }
                                }
                            }
                            .item:hover{
                                border-radius: 4px;
                                background: rgba(145, 145, 145, 0.083);
                            }
                        }
                        .loading{
                            padding: 10px 20px;
                            .skeleton-item{
                                margin-bottom: 20px;
                            }
                        }
                    }
                    .post-list{
                        .loading{
                            padding: 10px 20px;
                            .skeleton-item{
                                margin-bottom: 20px;
                            }
                        }
                        .empty{
                            min-height: 400px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .list{
                            .item{
                                
                                user-select: none;
                                padding: 15px 20px;
                                display: flex;
                                border-bottom: 1px solid rgba(50, 50, 50, 0.06);
                                .avatar{
                                    cursor: pointer;
                                    height: 50px;
                                    width: 50px;
                                    border-radius: 50%;
                                    img{
                                        object-fit: cover;
                                        height: 100%;
                                        width: 100%;
                                        border-radius: 50%;
                                    }

                                }
                                .title-nickname{
                                    flex: 1;
                                    margin-left: 10px;
                                    .title{
                                        cursor: pointer;
                                        margin-top: 10px;
                                        h2{
                                            // line-height: 2.5em;
                                            font-size: 18px;
                                            font-weight: 500;
                                            color: #4e5358;
                                            word-wrap: break-word;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 1;
                                            overflow: hidden;
                                            box-sizing: border-box;
                                            
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
                                                    font-size: 18px;
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
                                            .cate{
                                                cursor: pointer;
                                                user-select: none;
                                                margin-left: 10px;
                                                color: #2997f7;
                                                font-size: 11px;
                                                font-style: normal;
                                                display: inline-block;
                                                background-color:rgba(41, 151, 247, 0.1);
                                                transform: scale(1);
                                                padding: 6px 6px;
                                                border-radius: 3px;
                                                text-transform: capitalize;
                                            }
                                            .game{
                                                cursor: pointer;
                                                user-select: none;
                                                margin-left: 10px;
                                                color: #ff3f9f;
                                                font-size: 11px;
                                                font-style: normal;
                                                display: inline-block;
                                                background-color:rgba(255, 63, 159, .1);
                                                transform: scale(1);
                                                padding: 6px 6px;
                                                border-radius: 3px;
                                                text-transform: capitalize;
                                            }
                                        }
                                    }
                                    .post-content{
                                        margin-top: 10px;
                                        width: 100%;
                                        cursor: pointer;
                                        line-height: 24px;
                                        font-size: 15px;
                                        color: #494b4d;
                                        flex: 1;
                                        color: #797C80;
                                        -webkit-line-clamp: 3;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        word-break: break-all;
                                    }
                                    .mate{
                                        margin-top: 10px;
                                        display: flex;
                                        align-items: center;
                                        .action-btn{
                                            cursor: pointer;
                                            margin-right: 15px;
                                            display: flex;
                                            align-items: center;
                                            i{
                                                font-size: 14px;
                                            }
                                            span{
                                                user-select: none;
                                                color: #999;
                                                font-size: 12px;
                                                margin-left: 5px;
                                            }
                                        }
                                    }
                                }
                            }
                            .item:hover{
                                border-radius: 4px;
                                background: rgba(145, 145, 145, 0.083);
                            }
                            .nomore{
                                display: flex;
                                justify-content: center;
                                font-size: 12px;
                                color: #888;    
                                padding: 20px 0;
                            }
                        }
                    }
                }
            }
        }
        .right{
            width: 280px;
        }
    }
}
</style>