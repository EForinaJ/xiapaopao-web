<template>
    <div :class="design.theme ? 'page' : 'page dark'">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="left">
                <Menu 
                    @changeForum="changeForum"
                    @changeMode="changeMode"
                />

                <About />
            </div>
            <div class="right">
                <div class="content">
                    <div class="alert">
                        <a-alert
                        message="本站只作功能演示之用。严禁发布低俗、违法、涉及政治的内容。"
                        banner
                        closable
                        />
                    </div>
                    <LoginPanel  v-if="token == null"/>
                    <Create 
                    v-if="token != null"
                        @createPost="create"
                    />
                    <div v-if="!loading" class="center">
                        <div v-if="list.length > 0" class="list">
                            <Item 
                                v-for="(item,index) in list"
                                :key="index"
                                :info="item"
                            />
                            <div v-if="isShow" class="nomore">
                                加载完了！已经没有了
                            </div>
                        </div>
                        <div v-if="list.length == 0" class="empty">
                            <a-empty >
                                <span slot="description"> 还没帖子 </span>
                            </a-empty>
                        </div>
                    </div>
                    <div v-if="loading" class="center">
                        <Skeleton :loading="loading"/>
                    </div>
                </div>
                <div class="sidebar">
                    <Welcome v-if="token == null"/>

                    <User v-if="token != null"/>

                    <HotUser/>

                    <Comment/>
                </div>
            </div>
        </div>
        <Affix />
    </div>
</template>

<script>
import Welcome from "@/components/home/welcome"
import About from "@/components/home/about"
import Menu from "@/components/home/menu"
import Create from "@/components/home/create"
import LoginPanel from "@/components/home/login"
import Item from "@/components/home/item"
import User from "@/components/home/user"
import Comment from "@/components/widget/comment"
import HotUser from "@/components/widget/hotUser"
import Affix from "@/components/widget/affix"
import Skeleton from "@/components/widget/skeleton"


import FIcon from '@/components/icon/FIcon'
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
export default {
    components:{
        Welcome,
        LoginPanel,
        Skeleton,
        About,
        FIcon,
        Menu,
        Create,
        Item,
        User,
        Comment,
        HotUser,
        Affix,
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
        ...mapState("forum",["forumInfo"]),
    },
    head () {
        return {
            title: `${this.base.title} - ${this.base.childTitle}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    data(){
        return{
            locale: zhCN,
            loading: false,
            query: {
                page: 1,
                limit: 8,
                forumId:0,
                mode:2,
            },
            total: 0,
            list: [],
            isShow: false,
        }
    },
    mounted(){
        this.loading = true
        this.getList()
        window.addEventListener('scroll', this.scrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
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
            this.loading = false
        },
        changeMode(e){
            this.loading = true
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            if (e == 0) {
                this.query.mode = 2
            }
            if (e == 1) {
                this.query.mode = 6
            }
            if (e == 2) {
                this.query.mode = 1
            }
            this.query.forumId = 0
            
            this.getList()
            
        },
        changeForum(e){
            this.loading = true
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.query.forumId = e
            this.getList()
            
        },
        
        create(e){
            this.list = [e,...this.list]
           
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
        .left{
            width: 180px;
            margin-right: 20px;
        }
        .right{
            display: flex;
            flex: 1;
            .content{
                flex: 1;
                margin-right: 20px;
                .center{
                    margin-top: 20px;
                    .empty{
                        border-radius: 4px;
                        background: white;
                        min-height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .nomore{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-bottom: 20px;
                    }
                }
            }
            .sidebar{
                width: 260px;
            }
        }
    }
}
.dark{
    background-color: #101214;
}
</style>
