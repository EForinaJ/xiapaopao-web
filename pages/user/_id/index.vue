<template>
    <div class="author-page">
        <div  v-if="!loading">
            <div   v-if="list.length > 0" class="list">
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
</template>

<script>
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
import ImageAdaptation from "@/components/adaptation/image"
export default {
    components:{
        ImageAdaptation
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            locale: zhCN,
            loading: false,
            query:{
                page: 1,
                limit: 8,
                mode: 2,
                author: 0,
            },
            total: 0,
            list: [],
            isShow:false
        }
    },
    mounted(){
        this.query.author = parseInt(this.$route.params.id)
        this.loading = true
        this.getList()
        this.loading = false
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
        },
        remove(id,index){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$confirm({
                title: '删除内容',
                content: '请注意，是否真的要删除内容',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:id
                    }
                    const res = await this.$axios.post(api.postPostRemove,query) 
                        if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.list.splice(index,1)
                },
                onCancel() {

                },
            });
        },
    },
}
</script>

<style lang="less" scoped>
.author-page{
    background-color: white;
    border-radius: 4px;
    min-height: 500px;
    .loading{
        padding: 10px 20px;
        .skeleton-item{
            margin-bottom: 20px;
        }
    }
    .list{
        margin-bottom: 20px;
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
    .empty{
        min-height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>