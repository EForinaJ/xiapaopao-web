<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
        <a-row :gutter="[{md:20}]">
            <a-col :span="24" :md="18">
                <div class="search-input">
                    <div class="from">
                        <a-input-search 
                            size="large"
                            v-model="keyword"
                            placeholder="请输入搜索内容" 
                            @search="onSearch"
                            />
                    </div>
                    <div class="hot-tags">
                        <div class="text">热门搜索</div>
                        <div class="tags-list">
                            <div class="item">
                                sdfsd
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <ul class="menu-list">
                        <li @click="changeSelectKey(1)" :class="selectKey == 1 ? 'item active' : 'item' ">
                            <span>
                                帖子
                            </span>
                        </li>
                        <!-- <li @click="changeSelectKey(3)"  :class="selectKey == 3 ? 'item active' : 'item' ">
                            <span>
                                文章
                            </span>
                        </li> -->
                        <li @click="changeSelectKey(4)" :class="selectKey == 4 ? 'item active' : 'item' ">
                            <span>
                                用户
                            </span>
                        </li>
                    </ul>

                    <div class="document-list">
                        <div v-if="!loading" class="list">
                            <div v-if="selectKey == 1">
                                <div v-for="(item,index) in list" :key="index" class="post-item">
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
                                        <div @click="goPath(`/post/${item.id}`)" class="post-content">
                                            {{item.content}}
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

                            <div v-if="selectKey == 3">
                                <div v-for="(item,index) in list" :key="index" class="wiki-item">
                                    <div @click="goPath(`/wiki/${item.id}`)" class="cover">
                                        <img :src="item.cover | resetImage(140,75)" alt="" srcset="">
                                    </div>
                                    <div class="item-info">
                                        <div class="header">
                                            <div class="user-info-date">
                                                <div   class="avatar-nickname">
                                                    <div @click="goPath(`/user/${item.userInfo.id}`)" class="avatar">
                                                        <img :src="item.userInfo.avatar" :alt="item.userInfo.nickName" srcset="">
                                                    </div>
                                                    <div class="nickname-grade">
                                                        <h2 @click="goPath(`/user/${item.userInfo.id}`)" class="nickname">{{item.userInfo.nickName}}</h2>
                                                        <!-- <img :src="item.userInfo.grade.icon" alt=""> -->
                                                    </div>
                                                </div>
                                                <div class="date">
                                                    {{item.createTime | resetData}}
                                                </div>
                                            </div>
                                            <h2 class="title"  @click="goPath(`/wiki/${item.id}`)">{{item.title}}</h2>
                                            <p @click="goPath(`/wiki/${item.id}`)" class="desc">
                                                {{item.description}}
                                            </p>
                                        </div>
                                        <div class="footer">
                                            <div class="tags">
                                                <div  v-if="item.forum" class="game">
                                                    {{item.forum.title}}
                                                </div>
                                                <div  v-if="item.category" class="cate">
                                                    {{item.category.title}}
                                                </div>
                                            </div>
                                            <div class="date-action">
                                                <div class="meta">
                                                    <div class="action-btn">
                                                        <a-icon type="eye" />
                                                        <span>{{item.views | resetNum}}</span>
                                                    </div>
                                                    <div class="action-btn">
                                                        <a-icon type="heart" />
                                                        <span>{{item.likes | resetNum}}</span>
                                                    </div>
                                                    <div class="action-btn">
                                                        <a-icon type="message" />
                                                        <span>{{item.comments | resetNum}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isShow" class="nomore">
                                    加载完了！已经没有了
                                </div>
                            </div>


                            <div v-if="selectKey == 4">
                                <a-row :gutter="[10,10]">
                                    <a-col v-for="(item,index) in list" :key="index" :span="12">
                                        <div class="user-item">
                                            <div class="avatar">
                                                <img :src="item.cover" :alt="item.nickName">
                                            </div>
                                            <div class="nickName-desc-action">
                                                <div class="nickName-grade-btn">
                                                    <div class="nickName-grade">
                                                        <h2>{{item.nickName}}</h2>
                                                        <div v-if="item.grade" class="grade">
                                                            <img :src="item.grade.icon" alt="">
                                                        </div>
                                                    </div>
                                                    <div class="btn">
                                                        <a-icon type="user-add" />
                                                        <span>关注</span>
                                                    </div>
                                                </div>
                                                <div class="desc">
                                                    {{item.description != '' ? item.description : '这个人很懒什么都没写...'}}
                                                </div>
                                            </div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>

                            <div v-if="list.length == 0 && !loading" class="empty">
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
            </a-col>
            <a-col :span="24" :md="6">
                <!-- 助手 -->
                <About/>
                
                <!-- 热门用户 -->
                <HotUser />


                <!-- 热门帖子 -->
                <HotPost/>
            </a-col>
        </a-row>
        </div>
    </div>
</template>

<script>
import HotPost from "@/components/widget/hotPost"
import HotUser from "@/components/widget/hotUser"
import About from "@/components/widget/about"
import ImageAdaptation from "@/components/adaptation/image"
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
export default {
    components:{
        HotPost,HotUser,About,ImageAdaptation
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token","accountInfo"]),
    },
    async asyncData({query,$axios,redirect,store}){
    
        const keyword = query.keyword
        const queryParam = {
            page: 1,
            limit: 8,
            title: keyword,
        }
        const res = await $axios.get(api.getPostList,{params:queryParam})
        if (res.code != 1) {
            redirect("/404")
        }
        res.data.list = res.data.list ?? []
       

        return {
            base:store.state.base,
            keyword:keyword,
            loading: false,
            query:queryParam,
            total: res.data.total ?? 0,
            list: [...res.data.list],
            isShow: res.data.list.length > 0 ? false : true,
            selectKey:1,
        }
    },
    data(){
        return{
            locale: zhCN,
        }
    },

    mounted(){
        window.addEventListener('scroll', this.scrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
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
            if (this.selectKey == 1) {
                const res = await this.$axios.get(api.getPostList,{params: this.query})
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                res.data.list = res.data.list ?? [] 
                this.isShow = res.data.list.length > 0 ? false : true
                this.list = [...this.list,...res.data.list]
                this.total = res.data.total
            }

            if (this.selectKey == 2) {
                const res = await this.$axios.get(api.getArticleList,{params: this.query})
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                res.data.list = res.data.list ?? [] 
                this.isShow = res.data.list.length > 0 ? false : true
                this.list = [...this.list,...res.data.list]
                this.total = res.data.total
            }

            if (this.selectKey == 3) {
                const res = await this.$axios.get(api.getWikiList,{params: this.query})
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                res.data.list = res.data.list ?? [] 
                this.isShow = res.data.list.length > 0 ? false : true
                this.list = [...this.list,...res.data.list]
                this.total = res.data.total
            }
            
            if (this.selectKey == 4) {
                const res = await this.$axios.get(api.getUserList,{params: this.query})
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                res.data.list = res.data.list ?? [] 
                this.isShow = res.data.list.length > 0 ? false : true
                this.list = [...this.list,...res.data.list]
                this.total = res.data.total
            }
        },
        changeSelectKey(e){
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.selectKey = e
            if (e == 4) {
                this.query.nickName = this.keyword
            }
            
            this.loading = true
            this.getList()
            this.loading = false
        },
        onSearch(){
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.query.title = this.keyword
            if (this.selectKey == 4) {
                this.query.nickName = this.keyword
            }
            this.loading = true
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
        .search-input{
            background-color: white;
            padding: 40px 150px;
            border-radius: 4px;
            margin-bottom: 20px;
            .from{
                /deep/.ant-input{
                    color: #999;
                    fill: #999;
                    background-color: rgba(204,204,204,0.21);
                    border: 0;
                }
                /deep/.ant-input:focus{
                    box-shadow: none;
                }
                /deep/ .ant-input-search-icon{
                    color: #999;
                }
                margin-bottom: 10px;
            }
            .hot-tags{
                .text{
                    margin: 10px 0;
                    font-size: 15px;
                    color: #999;
                }
                .tags-list{
                    .item{
                        border-radius: 4px;
                        display: inline-block;
                        border-radius: 4px;
                        transition: .15s;
                        border: 1px solid var(--this-border);
                        vertical-align: middle;
                        padding: 0.3em 0.6em;
                        text-align: center;
                        font-weight: 400;
                        box-shadow: var(--this-shadow);
                        background: var(--this-bg);
                        color: var(--this-color);
                        --main-color: var(--this-color);
                        --this-bg: rgba(136, 136, 136, .1);
                        --this-border: transparent;
                        --this-shadow: none;
                        --this-color: #888;
                        text-shadow: 0 0 0;
                        line-height: 1.44;
                        margin-right: 6px;
                        margin-bottom: 6px;
                        cursor: pointer;
                        transition: color .2s, background .3s, opacity .3s, box-shadow .3s, transform .3s;
                        font-size: 0.4em;
                    }
                }
            }
        }
        .content{
            background-color: white;
           
            border-radius: 4px;
            margin-bottom: 20px;
            .menu-list{
                padding: 15px 20px;
                border-bottom: 1px solid rgba(50, 50, 50, 0.06);
                display: flex;
                align-items: center;
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


            .document-list{
                background-color: white;
                border-radius: 4px;
                min-height: 500px;
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
                    background-color: white;
                    border-radius: 4px;
                    margin-bottom: 20px;
                    .post-item{
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
                    .post-item:hover{
                        border-radius: 4px;
                        background: rgba(145, 145, 145, 0.083);
                    }
                    .wiki-item{      
                        border-bottom: 1px solid rgba(212, 212, 212, 0.494);
                        padding: 15px 20px;
                        display: flex;
                        .cover{
                            cursor: pointer;
                            width: 160px;
                            display: block;
                            height: 120px;
                            border-radius: 4px;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 4px;
                                object-fit: cover;
                            }
                        }
                        .item-info{
                            margin-left: 10px;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .header{
                                .user-info-date{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .date{
                                        font-size: 12px;
                                        color: #999;
                                    }
                                    .avatar-nickname{
                                        display: flex;
                                        align-items: center;
                                        .avatar{
                                            cursor: pointer;
                                            height: 20px;
                                            width: 20px;
                                            border-radius: 50%;
                                            img{
                                                height: 100%;
                                                width: 100%;
                                                border-radius: 50%;
                                            }
                                        }
                                        .nickname-grade{
                                            margin-left: 5px;
                                            img{
                                                height: 0.8em;
                                                max-width: 6em;
                                                vertical-align: -0.15em;
                                                backface-visibility: hidden;
                                                display: inline-block;
                                            }
                                            .nickname{
                                                
                                                cursor: pointer;
                                                font-size: 13px;
                                                color: #999;
                                            }
                                        }
                                    }
                                }
                                .title{
                                    color: #494b4d;
                                    cursor: pointer;
                                    font-size: 18px;
                                    font-weight: bold;
                                    -webkit-line-clamp: 1;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    word-break: break-all;
                                    margin: 11px 0px;
                                }
                                .desc{
                                    width: 100%;
                                    cursor: pointer;
                                    line-height: 24px;
                                    font-size: 12px;
                                    flex: 1;
                                    color: #797C80;
                                    -webkit-line-clamp: 1;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    word-break: break-all;
                                }
                            }
                            .footer{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .date-action{
                                    display: flex;
                                    align-items: center;
                                    .meta{
                                        display: flex;
                                        align-items: center;
                                        .action-btn{
                                            margin-left: 10px;
                                            display: flex;
                                            align-items: center;
                                            i{
                                                font-size: 14px;
                                            }
                                            span{
                                                color: #999;
                                                font-size: 12px;
                                                margin-left: 5px;
                                            }
                                        }
                                    }
                                    .btn{
                                        display: flex;
                                        align-items: center;
                                        border-radius: 4px;
                                        font-size: 14px;
                                        .tag{
                                            padding: 5px 10px;
                                            display: inline-block;
                                            letter-spacing: 1px;
                                            white-space: nowrap;
                                        }
                                    }
                                }
                                .tags{
                                    display: flex;
                                    align-items: center;
                                    .cate{
                                        cursor: pointer;
                                        user-select: none;
                                        margin-right: 10px;
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
                                        margin-right: 10px;
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
                    .wiki-item:hover{
                        border-radius: 4px;
                        background: rgba(145, 145, 145, 0.083);
                    }
                    .nomore{
                        display: flex;
                        justify-content: center;
                        font-size: 12px;
                        color: #888;    
                        padding: 20px 0;
                        margin-top: 10px;
                    }
                    .user-item{
                        margin-top: 10px;
                        display: flex;
                        padding: 15px;
                        border-radius: 4px;
                        background: rgba(0, 0, 0, 0.03);
                        .avatar{
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .nickName-desc-action{
                            flex: 1;
                            margin-left: 10px;
                            .nickName-grade-btn{
                                display: flex;
                                align-items: center;
                                .nickName-grade{
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                    h2{
                                        font-weight: bold;
                                        font-size: 14px;
                                        color: #4e5358;
                                    }
                                    .grade{
                                        margin-left: 10px;
                                        img{
                                            height: 1.1em;
                                            max-width: 6em;
                                            vertical-align: -0.15em;
                                            -webkit-backface-visibility: hidden;
                                            backface-visibility: hidden;
                                            display: inline-block;
                                        }
                                    }    
                                }
                                .btn{
                                    padding: 4px 8px;
                                    font-size: 13px;
                                    margin-left: 10px;
                                    color: #155bd5;
                                    display: flex;
                                    align-items: center;
                                    i{
                                        margin-right: 5px;
                                    }
                                }
                            }
                            .desc{
                                font-size: 12px;
                                color: #999;
                                margin-top: 5px;
                            }
                        }
                    }
                }
            }

        }
    }
}
</style>
