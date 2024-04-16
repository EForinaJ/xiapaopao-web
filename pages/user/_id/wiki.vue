<template>
    <div class="author-page">
        <div  v-if="!loading">
            <div   v-if="list.length > 0" class="list">
                <div v-for="(item,index) in list" :key="index" class="item">
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
                    const res = await this.$axios.post(api.postWikiRemove,query) 
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
        padding: 10px;
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
        .nomore{
            display: flex;
            justify-content: center;
            font-size: 12px;
            color: #888;    
            padding: 20px 0;
            margin-top: 10px;
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