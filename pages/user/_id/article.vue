<template>
    <div class="author-page">
        <div  v-if="!loading">
            <div   v-if="list.length > 0" class="list">
                <div v-for="(item,index) in list" :key="index" class="item">
                    <div class="header">
                        <div class="avatar-nickname-tag">
                            <div  class="avatar-nickname">
                                <div @click="goPath(`/user/${item.userInfo.id}`)" class="avatar">
                                    <img  :src="item.userInfo.avatar" :alt="item.userInfo.nickName" srcset="">
                                </div>
                                <h2 @click="goPath(`/user/${item.userInfo.id}`)" class="nickname">{{item.userInfo.nickName}}</h2>
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
                        <h2 class="title"  @click="goPath(`/article/${item.id}`)">{{item.title}}</h2>
                        <div class="cover-desc">
                            <p @click="goPath(`/article/${item.id}`)" class="desc">
                            {{item.description}}
                            </p>
                            <div @click="goPath(`/article/${item.id}`)" v-if="item.cover" class="cover">
                                <img :src="item.cover | resetImage(140,75)" alt="" srcset="">
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="date-action">
                            <div class="date">
                                {{item.createTime | resetData}}
                            </div>
                        </div>
                        <div class="action">
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
export default {
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
            const res = await this.$axios.get(api.getArticleList,{params: this.query})
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
                    const res = await this.$axios.post(api.postArticleRemove,query) 
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
            
            border-bottom: 1px solid rgba(212, 212, 212, 0.494);
            padding: 15px 20px;
            .header{
                .avatar-nickname-tag{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    
                    .tags{
                        display: flex;
                        align-items: center;
                        .cate{
                            cursor: pointer;
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
                    .avatar-nickname{
                        display: flex;
                        align-items: center;
                        .avatar{
                            cursor: pointer;
                            height: 30px;
                            width: 30px;
                            border-radius: 50%;
                            img{
                                height: 100%;
                                width: 100%;
                                border-radius: 50%;
                            }
                        }
                        .nickname{
                            cursor: pointer;
                            margin-left: 10px;
                            font-size: 16px;
                            color: #999;
                        }
                    }
                }
                
                .title{
                    cursor: pointer;
                    font-size: 18px;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-all;
                    margin: 11px 0px;
                }
                .cover-desc{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    .cover{
                        cursor: pointer;
                        margin-left: 10px;
                        min-width: 160px;
                        max-width: 160px;
                        display: block;
                        height: 100px;
                        border-radius: 4px;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                            object-fit: cover;
                        }
                    }
                    .desc{
                        cursor: pointer;
                        width: 100%;
                        line-height: 24px;
                        font-size: 15px;
                        color: #494b4d;
                        color: #797C80;
                        -webkit-line-clamp: 3;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        word-break: break-all;
                    }
                }
            }
            .footer{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .date-action{
                    display: flex;
                    align-items: center;
                    .date{
                        font-size: 12px;
                        color: #999;
                    }
                    .btn{
                        cursor: pointer;
                        user-select: none;
                        margin-left: 20px;
                        display: flex;
                        align-items: center;
                        border-radius: 4px;
                        font-size: 14px;
                        .tag{
                            padding: 5px 10px;
                            display: inline-block;
                            margin-right: 10px;
                            letter-spacing: 1px;
                            white-space: nowrap;
                        }
                    }
                }
                .action{
                    display: flex;
                    align-items: center;
                    .action-btn{
                        padding: 3px 4px;
                        cursor: pointer;
                        margin-left: 10px;
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