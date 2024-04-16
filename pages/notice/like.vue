<template>
    <div class="notice-page">
        <div v-if="!loading">
            <div class="list">
                <div v-for="(item,index) in list" :key="index" class="item">
                    <div @click="goPath(`/user/${item.userInfo.id}`)" v-if="item.userInfo" class="img">
                        <img :src="item.userInfo.avatar" :alt="item.userInfo.nickName" srcset="">
                    </div>
                    <div class="info">
                        <div class="title-date">
                            <h2 @click="goPath(`/user/${item.userInfo.id}`)">{{item.userInfo.nickName}}</h2>
                            <span>{{item.createTime | resetData}}</span>
                        </div>
                        <div v-if="item.module == 'wiki'" class="content">
                            赞了我的玩家信息
                        </div>
                        <div v-if="item.module == 'post'" class="content">
                            赞了我的帖子
                        </div>
                        <div v-if="item.module == 'comment'" class="content">
                            赞了我的评论
                        </div>
                    </div>
                    <div @click="goPath(`/wiki/${item.detail.id}`)" v-if="item.module == 'wiki'" class="cover">
                        <img :src="item.detail.cover" alt="">
                    </div>
                    <div @click="goPath(`/post/${item.detail.id}`)"  v-if="item.module == 'post'" class="cover">
                        <span>{{item.detail.title}}</span>
                    </div>
                    <div @click="goCommentPath(item.detail)" v-if="item.module == 'comment'" class="cover">
                        <span>{{item.detail.content}}</span>
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
    middleware: 'auth',
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            locale: zhCN,
            loading: true,
            query:{
                page: 1,
                limit: 8,
                type: 4,
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
    destroyed () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        goCommentPath(e){
            switch (e.module) {
                case "article":
                    this.$router.push(`/article/${e.detail.id}`)
                    break;
                case "post":
                    this.$router.push(`/post/${e.detail.id}`)
                    break;
                default:
                    this.$router.push(`/notice/like`)
                    break;
            }
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
            const res = await this.$axios.get(api.getNoticeList,{params: this.query})
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
    },
}
</script>

<style lang="less" scoped>
.notice-page{
    background-color: white;
    border-radius: 4px;
    padding: 20px;
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
        .nomore{
            display: flex;
            justify-content: center;
            font-size: 12px;
            color: #888;    
            padding: 20px 0;
        }
        .item{
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(50, 50, 50, 0.06);
            .img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                img{
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            .info{
                flex: 1;
                margin: 0 10px;
                .title-date{
                    display: flex;
                    align-items: center;
                    h2{
                        cursor: pointer;
                        user-select: none;
                        font-size: 13px;
                        font-weight: bold;
                    }
                    span{
                        color: #8590A6;
                        margin-left: 10px;
                        font-size: 12px;
                    }
                }
                .content{
                    cursor: pointer;
                    user-select: none;
                    line-height: 14px;
                    margin-top: 10px;
                    font-size: 12px;
                    color: #8590A6;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
            }
            .cover{
                cursor: pointer;
                width: 60px;
                height: 60px;
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    object-fit: cover;
                }
                span{
                   color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-word;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    line-height: 15px;
                }
            }
        }
    }
}
</style>