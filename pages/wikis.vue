<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
        <a-row :gutter="[{md:20}]">
            <a-col :span="24" :md="18">
                <div class="select-tpye">
                    <div class="category">
                        <div class="text">
                            栏目:
                        </div>
                        <div v-if="categoryList.length > 0" class="list">
                            <div @click="changeCategory(0)" :class="0 == query.categoryId ? 'item active' : 'item'">
                                不限
                            </div>
                            <div @click="changeCategory(item.id)" v-for="(item,index) in categoryList" :key="index" :class="item.id == query.categoryId ? 'item active' : 'item'">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                    <div class="orderby">
                        <div class="text">
                            排序:
                        </div>
                        
                        <div class="list">
                            <div @click="changeMode(0)" :class="0 == query.mode ? 'item active' : 'item'">
                                全部
                            </div>
                            <div @click="changeMode(5)" :class="5 == query.mode ? 'item active' : 'item'">
                                浏览
                            </div>
                            <div @click="changeMode(4)" :class="4 == query.mode ? 'item active' : 'item'">
                                点赞
                            </div>
                            <div @click="changeMode(1)" :class="1 == query.mode ? 'item active' : 'item'">
                                热门
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div v-if="!loading" class="list">
                        <div v-for="(item,index) in list" :key="index" class="item">
                            <div @click="goPath(`/article/${item.id}`)" class="cover">
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
                                    <h2 class="title"  @click="goPath(`/article/${item.id}`)">{{item.title}}</h2>
                                    <p @click="goPath(`/article/${item.id}`)" class="desc">
                                        {{item.description}}
                                    </p>
                                </div>
                                <div class="footer">
                                    <div class="tags">
                                        <div  v-if="item.forum" class="game">
                                            {{item.forum.title}}
                                        </div>
                                        <div v-if="item.category" class="cate">
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
            </a-col>
            <a-col :span="24" :md="6">
                <CreateWiki />
                <!-- 热门帖子 -->
                <HotArticle/>

                <!-- 热门用户 -->
                <Comment />
                
                <!-- 热门用户 -->
                <HotUser />
                

                <!-- 助手 -->
                <About/>
            </a-col>
        </a-row>
        </div>
    </div>
</template>

<script>
import CreateWiki from "@/components/widget/createWiki"
import HotArticle from "@/components/widget/hotArticle"
import HotUser from "@/components/widget/hotUser"
import About from "@/components/widget/about"
import Comment from "@/components/widget/comment"


import FIcon from '@/components/icon/FIcon'
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
export default {
    components:{
        FIcon,HotArticle,HotUser,About,Comment,CreateWiki
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token","accountInfo"]),
        ...mapState("forum",["forumInfo"]),
    },
    async asyncData({$axios,redirect,store}){
    

        const queryParam = {
            page: 1,
            limit: 8,
            categoryId:0,
            mode:0,
        }
        const res = await $axios.get(api.getArticleList,{params:queryParam})
        if (res.code != 1) {
            redirect("/404")
        }
        res.data.list = res.data.list ?? []
        return {
            categoryList:[],
            base:store.state.base,
            loading: false,
            query:queryParam,
            total: res.data.total ?? 0,
            list: [...res.data.list],
            isShow: res.data.list.length > 0 ? false : true,
        }
    },
    data(){
        return{
            locale: zhCN,
        }
    },

    mounted(){
        this.loading = true
        this.getCategroy()
        this.loading = false
        window.addEventListener('scroll', this.scrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
        changeMode(e){
            this.loading = true
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.query.mode = e
            this.getList()
            this.loading = false
        },
        changeCategory(e){
            this.loading = true
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.query.categoryId = e
            this.getList()
            this.loading = false
        },
        async getCategroy(){
            const res = await this.$axios.get(api.getCategoryAll,
                {
                    params:{module:"article",forumId:this.forumInfo.id}
                }
            )     
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.categoryList = res.data.list ?? []
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
        .select-tpye{
            padding: 15px 20px;
            background-color: white;
            border-radius: 4px;
            margin-bottom: 20px;
            .category{
                display: flex;
                align-items: center;
                .text{
                    text-align: end;
                    width: 88px;
                    font-size: 18px;
                    margin-right: 10px;
                    color: #b2bac2;
                }
                .list{
                    display: flex;
                    align-items: center;
                    .item{
                        cursor: pointer;
                        padding: 0 10px;
                        margin-right: 5px;
                        border: 1px solid rgba(255, 255, 255, 0);
                        max-width: 120px;
                        height: 24px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        line-height: 24px;
                        font-size: 13px;
                        // margin-bottom: 10px;
                        background: #f6f7f8;
                        border-radius: 3px;
                    }
                    .active{
                        color: #0066ff;
                        background-color: rgba(0, 102, 255, 0.18);
                    }
                }
            }
            .orderby{
                margin-top: 10px;
                display: flex;
                align-items: center;
                .text{
                    text-align: end;
                    width: 88px;
                    margin-right: 10px;
                    font-size: 14px;
                    color: #b2bac2;
                }
                .list{
                    display: flex;
                    align-items: center;
                    .item{
                        cursor: pointer;
                        padding: 0 8px;
                        margin-right: 10px;
                        border: 1px solid rgba(255, 255, 255, 0);
                        max-width: 120px;
                        height: 24px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        line-height: 24px;
                        // margin-bottom: 10px;
                        background: #f6f7f8;
                        border-radius: 3px;
                        color: #999;
                        font-size: 12px;
                    }
                    .active{
                        color: #0066ff;
                        background-color: rgba(0, 102, 255, 0.18);
                    }
                }
            }
        }
        .content{
            background-color: white;
            padding: 15px 20px;
            border-radius: 4px;
            margin-bottom: 20px;
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
                .item{      
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
                .item:hover{
                    border-radius: 4px;
                    background: rgba(145, 145, 145, 0.083);
                }
            }
            .nomore{
                display: flex;
                justify-content: center;
                font-size: 12px;
                color: #888;    
                padding: 20px 0;
                margin-top: 10px;
            }
        }
    }
}
</style>
