<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="left">
                <div class="content">
                    <Header :info="info"
                        @joinCount="joinCount"
                        @getData="getData"
                        @showCreate="showCreate"
                        @setData="setData"
                        :list="mangerList"
                    />
                    <div class="center">
                        <Menu @changeSelectKey="changeSelectKey"/>
                        <div v-if="!loading" class="top-list">
                            <div v-if="topList.length > 0"  class="list">
                                <Item
                                 :index="index"
                                @remove="remove"
                                :isTop="true"
                                v-for="(item,index) in topList" 
                                :key="index"
                                :info="item"
                                :isManger="isManger"
                                />
                            </div>
                            <div v-if="list.length > 0"  class="list">
                                <Item
                                :index="index"
                                @remove="remove"
                                :isTop="false"
                                v-for="(item,index) in list" 
                                :key="index"
                                :info="item"
                                :isManger="isManger"
                                />
                            </div>
                            <div v-if="isShow && list.length > 0" class="no-more">
                                已经到底了，没有啦。。。。。
                            </div>
                            <div class="empty" v-if="list.length == 0">
                                <a-empty :description="false" />
                            </div>
                        </div>
                        <div v-if="moreLoading" class="more">
                            <a-spin size="large">
                            </a-spin>
                        </div>
                        <div v-if="loading">
                            <Skeleton :loading="loading"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <HotPost />
                <!-- <About /> -->
            </div>
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

import Skeleton from "@/components/widget/skeleton"


import Header from "@/components/forum/info/header"
import Menu from "@/components/forum/info/menu"
import Item from "@/components/forum/info/item"
export default {
    components:{
        Header,
        Menu,
        Item,
        Skeleton,
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
        const res = await $axios.get(api.getForumInfo,{params:{id:id}})
        
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
            moreLoading: false,
            showCreatePanle: false,

            query:{
                page: 1,
                limit: 8,
                mode: 0,
                forumId: 0,
            },
            total: 0,
            list: [],
            isShow:false,

            topList: [],
            mangerList:[],
            isManger: false
        }
    },
    async mounted(){
        this.loading = true
        await this.getManger()
        await this.getTopList()
        await this.getList()
        this.loading = false
        
        window.addEventListener('scroll', this.scrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
        setData(e){
            if (e != null) {
                this.$message.success(
                    "发布成功",
                    3
                )
                this.list = [e,...this.list]
            }else{
                this.$message.success(
                    "该版块发布内容需要审核，等待管理员人审核",
                    3
                )
            }
        },
        async getManger(){
            const query = {
                id : this.id,
            }
            const res = await this.$axios.get(api.getForumManger,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.mangerList = res.data.list ?? []

            this.mangerList.forEach(item => {
                
                if (item.id == this.accountInfo.id) {
                    this.isManger = true
                    return
                }
            });
            
            if (this.info.manger.id == this.accountInfo.id) {
                this.isManger = true
                return
            }
        },
        async getData(){
            const res = await this.$axios.get(api.getForumInfo,{params:{id:this.id}})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.info = res.data.info
        },
        joinCount(e){
            this.info.members = e
        },
        showCreate(){
            this.showCreatePanle = !this.showCreatePanle
        },
        

        async getTopList(){
            // this.loading = true
            const query = {
                page : 1,
                limit: 5,
                mode: 7,
                forumId: this.id,
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
            // this.loading = false
        },
        
        async scrollList(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

            //滚动条到底部的条件
            if (scrollTop+windowHeight > scrollHeight-50 && !this.isShow) {
                this.query.page += 1
                this. moreLoading = true
                await this.getList()
                this. moreLoading = false
                return
            }
        },
        async getList(){
            this.query.forumId = this.id
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
        async changeSelectKey(e){
            this.loading = true
            this.query.page = 1
            this.list = []
            this.total = 0
            this.isShow = false
            this.query.mode = e
            await this.getList()
            this.loading = false
        },
        remove(index,isTop){
            if (isTop) {
                this.topList.splice(index,1)
            }else{
                this.list.splice(index,1)
            }
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
        display: flex;
        padding: 0 50px;
        .left{
            flex: 1;
            margin-right: 20px;
            .content{
                .center{
                    margin-top: 20px;
                    margin-bottom: 20px;
                    background-color: white;
                    padding: 20px;
                    border-radius: 4px;
                    min-height: 500px;

                    .empty{
                        width: 100%;
                        min-height: 500px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .more{
                        padding-top: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .no-more{
                        padding-top: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
        .right{
            width: 280px;
        }
    }
}
</style>