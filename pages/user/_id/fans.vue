<template>
    <div class="author-page">
        <div  v-if="list.length > 0 && !loading" class="list">
            <div v-for="(item,index) in list" :key="index" class="item">
                <div class="info">
                    <div  @click="goPath(`/user/${item.id}`)" class="avatar">
                        <img :src="item.avatar | resetImage(70,70)" alt="" srcset="">
                    </div>
                    <div class="nickname-fans-follows">
                        <h1  class="nickname">
                            <span @click="goPath(`/user/${item.id}`)" >{{item.nickName}}</span>
                            <img v-if="item.grade.icon" :src="item.grade.icon" :alt="item.grade.title" srcset="">
                            <!-- <FIcon :size="15" type="icon-renzheng"/> -->
                        </h1>
                        <div class="fans-follows">
                            <div class="count">
                                <span>关注：</span>
                                <span>{{item.follows |resetNum}}</span>
                            </div>
                            <div class="count">
                                <span>粉丝：</span>
                                <span>{{item.follows|resetNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="item.id != accountInfo.id" class="btn">
                    <a-button @click="follow(item,index)" :icon="item.isFollow ? 'minus' : 'plus'" type="primary">
                        {{item.isFollow ? '取消关注': '关注Ta'}}
                    </a-button>
                </div>
            </div>
            <div v-if="isShow" class="nomore">
                加载完了！已经没有了
            </div>
        </div>
        <div v-if="list.length == 0 && !loading" class="empty">
            <a-config-provider :locale="locale">
                <a-empty />
            </a-config-provider>
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
            const res = await this.$axios.get(api.getUserFansList,{params: this.query})
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
        async follow(id,index){
            if (!this.token) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("follow")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            if (this.list[index].isFollow) {
                this.list[index].fans -= 1
            }else{
                this.list[index].fans += 1
            }
            this.list[index].isFollow = !this.list[index].isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                 if (this.list[index].isFollow) {
                this.list[index].fans -= 1
                }else{
                    this.list[index].fans += 1
                }
                this.list[index].isFollow = !this.list[index].isFollow
                return
            }
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
            display: flex;
            align-items: center;
            .info{
                flex: 1;
                display: flex;
                align-items: center;
                .avatar{
                    cursor: pointer;
                    user-select: none;
                    width: 70px;
                    height: 70px;
                    border-radius: 4px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                    }
                }

                .nickname-fans-follows{
                    flex: 1;
                    height: 100%;
                    margin-left: 10px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    .nickname{
                        
                        display: flex;
                        align-items: center;
                        span{
                            cursor: pointer;
                            user-select: none;
                            font-weight: 500;
                        }
                        img{
                            margin-left: 10px;
                            height: 1.1em;
                            max-width: 6em;
                            vertical-align: -0.15em;
                            backface-visibility: hidden;
                            display: inline-block;
                        }
                    }
                    .fans-follows{
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                        .count{
                            display: flex;
                            align-items: center;
                            color: #999;
                            font-size: 12px;
                            margin-right: 10px;
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
}
</style>