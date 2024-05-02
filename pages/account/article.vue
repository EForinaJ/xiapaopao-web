<template>
    <div class="account-page">
        <div class="menu-data">
            <ul class="menu-list">
                <li @click="changeSelectKey(0)" :class="selectKey == 0 ? 'item active':'item'">
                    全部
                </li>
                <li @click="changeSelectKey(1)" :class="selectKey == 1 ? 'item active':'item'">
                    待审核
                </li>
                <li @click="changeSelectKey(2)" :class="selectKey == 2 ? 'item active':'item'">
                    已通过
                </li>
                <li @click="changeSelectKey(3)" :class="selectKey == 3 ? 'item active':'item'">
                    未通过
                </li>
            </ul>
            <!-- <div class="data">
                <a-input-search 
                placeholder="请输入标题" 
                style="width: 200px" />
            </div> -->
        </div>
        <div class="content">
            <div v-if="!loading">
                <div  v-if="list.length > 0"  class="list">
                    <div v-for="(item,index) in list" :key="index" class="item">
                        <div class="header">
                            <div class="avatar-nickname-tag">
                                <div   class="avatar-nickname">
                                    <div @click="goPath(`/user/${item.userInfo.id}`)" class="avatar">
                                        <img :src="item.userInfo.avatar" :alt="item.userInfo.nickName" srcset="">
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
                                    <div class="date">
                                        {{item.createTime | resetData}}
                                    </div>
                                </div>
                            </div>
                            <h2 class="title"  @click="goPath(`/wiki/${item.id}`)">{{item.title}}</h2>
                            <div class="cover-desc">
                                <p @click="goPath(`/wiki/${item.id}`)" class="desc">
                                    {{item.description}}
                                </p>
                                <div @click="goPath(`/wiki/${item.id}`)" class="cover">
                                    <img :src="item.cover | resetImage(140,75)" alt="" srcset="">
                                </div>
                            </div>
                        </div>
                        <div v-if="item.status == 3 || item.deleteTime != null" class="remark">
                            原因是: {{item.remark}}
                        </div>

                        <div class="footer">
                            <div class="date-action">
                                <div class="meta">
                                    <div class="action-btn">
                                        <a-icon type="eye" />
                                        <span>{{item.views}}</span>
                                    </div>
                                    <div class="action-btn">
                                        <a-icon type="heart" />
                                        <span>{{item.likes}}</span>
                                    </div>
                                    <div class="action-btn">
                                        <a-icon type="message" />
                                        <span>{{item.comments}}</span>
                                    </div>
                                </div>
                                <div class="btn">
                                    <div v-if="item.status == 1" class="tag" style="color: rgb(79, 157, 218);">
                                        待审核
                                    </div>
                                    <div v-if="item.status == 3" class="tag"  style="color: rgb(180, 143, 170);">
                                        未通过
                                    </div>
                                    <div v-if="item.status == 2" class="tag"  style="color: rgb(89, 190, 101);">
                                        已通过
                                    </div>
                                    <div v-if="item.deleteTime != null" class="tag"  style="color: rgb(180, 143, 170);">
                                        被移除
                                    </div>
                                </div>
                            </div>
                            <div class="action">
                                <div @click="remove(item.id,index)" class="action-btn">
                                    <a-icon type="delete" />
                                    <span>删除</span>
                                </div>
                                <div @click="goPath(`/wiki/edit?id=${item.id}`)" class="action-btn">
                                    <a-icon type="highlight" />
                                    <span>编辑</span>
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
</template>

<script>
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
import FIcon from '@/components/icon/FIcon'

export default {
    middleware: 'auth',
    components:{
        FIcon,
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            selectKey:0,

            locale: zhCN,
            loading: false,
            query:{
                page: 1,
                limit: 8,
                mode: 0,
            },
            total: 0,
            list: [],
            isShow:false
        }
    },
    mounted(){
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
            const res = await this.$axios.get(api.getAccountArticleList,{params: this.query})
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
        changeSelectKey(e){
            this.selectKey = e
            this.query.page = 1
            this.query.status = e
            this.list = []
            this.total = 0
            this.isShow = false
            this.getList()
        }
    }
}
</script>

<style lang="less" scoped>
.account-page{
    .menu-data{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .menu-list{
            display: flex;
            .item{
                user-select: none;
                cursor: pointer;
                display: inline-block;
                padding: 10px 10px;
                margin-right: 20px;
                border-radius: 4px;
                background-color: #cee4f8;
                font-size: 14px;
                color: #155bd5;
                font-weight: 600;
            }
            .active{
                background-color: #155bd5;
                color: white;
            }
        }
        .data{
            line-height: 34px;
            font-size: 12px;
            .text{
                color: #999;  
            }
            em{
                margin-left: 5px;
                font-weight: 700;
                color: #000;
            }
        }
    }
    .content{
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
                            .date{
                                margin-left: 10px;
                                font-size: 12px;
                                color: #999;
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
                    }
                }
                .remark{
                    color: red;
                    margin: 10px 0;
                    border-radius: 4px;
                    padding: 5px 15px;
                    background: rgba(136, 136, 136, 0.1);
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
                                padding: 3px 8px;
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
                    .action{
                        display: flex;
                        align-items: center;
                        .action-btn{
                            padding: 6px 8px;
                            cursor: pointer;
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                            i{
                                font-size: 18px;
                            }
                            span{
                                
                                user-select: none;
                                color: #999;
                                font-size: 12px;
                                margin-left: 5px;
                            }
                        }
                        .action-btn:hover{
                            border-radius: 4px;
                            background: rgba(145, 145, 145, 0.083);
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
                margin-top: 10px;
            }
        }
    }
}
</style>