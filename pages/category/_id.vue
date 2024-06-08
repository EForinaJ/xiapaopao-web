<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="18">
                    <div class="content">
                        <div  class="header" >
                            <div class="cover" >
                                <img :src="info.cover | resetImage(500,300)" alt="">
                            </div>
                            <div class="mask"></div>
                            <div class="info">
                                <div class="right">
                                    <div v-if="info.forum" class="tag">
                                        {{info.forum.title}}
                                    </div>
                                    <div class="title">
                                        {{info.title}}
                                    </div>
                                    <div class="mate">
                                        <div class="item">
                                            <span>今日</span>
                                            <span class="num">{{info.todayPosts | resetNum}}</span>
                                        </div>
                                        <div class="item">
                                            <span>帖子</span>
                                            <span class="num">{{info.allPosts | resetNum}}</span>
                                        </div>
                                    </div>
                                    <div class="desc">
                                        {{info.description}}
                                    </div>
                                </div>
                                <div class="left">
                                    <div class="thumb">
                                        <img :src="info.cover | resetImage(100,100)" alt="">
                                    </div>
                                </div>
                            </div>

                            <div  class="btn-box">
                                <div @click="goPath(`/post/create`)" class="item">
                                    <a-icon type="plus" />
                                    发布
                                </div>
                            </div>
                        </div>

                        <div class="center">
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
                                                            <!-- <FIcon :size="15" type="icon-renzheng"/> -->
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
                                                            <!-- <FIcon :size="15" type="icon-renzheng"/> -->
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
                        </div>
                    </div>
                </a-col>
                <a-col :span="24" :md="6">
                    <HotPost />
                    <!-- <About /> -->
                </a-col>
            </a-row>
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
export default {
    components:{
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
        const res = await $axios.get(api.getCategoryInfo,{params:{id:id}})
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

            topList:[],
        }
    },
    mounted(){
        (this.info)
        this.query.categoryId = this.id
        this.loading = true
        this.getTopList()
        this.getList()
        this.loading = false
        window.addEventListener('scroll', this.scrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
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
        .content{
            .header{
                height: 300px;
                position: relative;
                background-color: #eff1f3;
                overflow: hidden;
                border-radius: 4px;
                .cover{
                    position: absolute;
                    left: -50px;
                    top: -50px;
                    width: calc(100% + 100px);
                    height: calc(100% + 100px);
                    border-radius: 4px;
                    filter: blur(30px);
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 4px;
                    }
                }
                .mask{
                    
                    border-radius: 4px;
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
                    .right{
                        flex: 1;
                        .tag{
                            color: white;
                            font-size: 11px;
                            font-style: normal;
                            display: inline-block;
                            background-color: #155bd5;
                            transform: scale(1);
                            padding: 6px 8px;
                            border-radius: 3px;
                            text-transform: capitalize;
                        }
                        .title{
                            margin-top: 20px;
                            font-size: 16px;
                            color: white;
                            font-weight: 700;
                        }
                        .mate{
                            margin-top: 20px;
                            display: flex;
                            align-items: center;
                            .item{
                                display: flex;
                                align-items: center;
                                margin-right: 10px;
                                color: #ddd;
                                font-size: 13px;
                                .num{
                                    margin-left: 5px;
                                }
                            }
                        }
                        .desc{
                            color: #ddd;
                            margin-top: 20px;
                            padding: 0 2px;
                            font-size: 12px;
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
                    .left{
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
                        cursor: pointer;
                        user-select: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                        font-size: 12px;
                        padding: 10px 18px;
                        color: white;
                        background-color: rgba(255, 255, 255, 0.1);
                        i{
                            margin-right: 5px;
                        }
                    }
                    .item:hover{
                        opacity: .8;
                    }
                }
            }

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
}
</style>