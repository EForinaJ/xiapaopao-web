<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="left">
                <Menu />
            </div>
            <div class="right">
                <div class="content">
                    <Create />
                    <div class="center">
                        <div class="list">
                            <Item />
                        </div>
                    </div>
                </div>
                <div class="sidebar">
                    <User/>

                    

                    <HotUser/>
                    <Comment/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from "@/components/home/menu"
import Create from "@/components/home/create"
import Item from "@/components/home/item"
import User from "@/components/home/user"
import Comment from "@/components/widget/comment"
import HotUser from "@/components/widget/hotUser"

import FIcon from '@/components/icon/FIcon'
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
export default {
    components:{
        FIcon,
        Menu,
        Create,
        Item,
        User,
        Comment,
        HotUser,
    },
    computed:{
        ...mapState(["design"]),
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
    async asyncData({$axios,redirect,store}){
    

        // const queryParam = {
        //     page: 1,
        //     limit: 8,
        //     categoryId:0,
        //     mode:0,
        // }
        // const res = await $axios.get(api.getArticleList,{params:queryParam})
        // if (res.code != 1) {
        //     redirect("/404")
        // }
        // res.data.list = res.data.list != null ? res.data.list : []
        return {
            base:store.state.base,
            // loading: false,
            // query:queryParam,
            // total: res.data.total ?? 0,
            // list: [...res.data.list],
            // isShow: res.data.list.length > 0 ? false : true,
        }
    },
    data(){
        return{
            locale: zhCN,

            categoryList: [],
            categoryKey: 0,
            forumList:[],
            forumIsSearch:false,
            forumSearchText: "",
            contentCount:0,
            selectForumObj: null,
            openForum:false,
            openImages:false,
            openResource: false,
            linkSearchText: "",
            module: "article",
            linkList:[],
            selectLinkObj: null,
            openLink:false,
            form:{
                title:undefined,
                description:undefined,
                images:[],
                categoryId:undefined,
                forumId:undefined,
                tags:[],
                content:"",
                cover: "",
                module: "",
                relatedId: 0,
                setResource: false,
                resource:{
                    title:undefined,
                    example:undefined,
                    mode:undefined,
                    integral:undefined,
                    money:undefined,
                    grade:undefined,
                    attr:[],
                    gainCode:undefined,
                    untieCode:undefined,
                    link:undefined,
                },
                rules:{
                    title:[
                        { required: true, message: '请选输入玩家名称', trigger: 'change' },
                    ],
                    description:[
                        { required: true, message: '请选输入简单描述', trigger: 'change' },
                    ],
                    cateId:[
                        { required: true, message: '请选择分类', trigger: 'change' },
                    ],
                },
            },
        }
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
        },

        // -------------------------
        

        // =====================
        message(){
            this.$Message().then((res)=>{
                if (res != false) {
                    
                }
            }).catch((err)=>{
               
            })
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
            top: 80px;
            max-height: calc(100vh - 40px);
            width: 180px;
            position: sticky;
            margin-right: 20px;
            height: fit-content;
            border-radius: 4px;
            background-color: #fff;
            overflow-x: hidden;
        }
        .right{
            display: flex;
            flex: 1;
            .content{
                flex: 1;
                margin-right: 20px;
                .center{
                    margin-top: 20px;
                }
            }
            .sidebar{
                width: 260px;
            }
        }
    }
}
</style>
