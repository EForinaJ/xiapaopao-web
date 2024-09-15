<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="left">
                <ul class="menu">
                    <li class="item">
                        <FIcon class="icon" :size="24" type="icon-huxiangguanzhu"/>
                        <span class="title">关注</span>
                    </li>
                    <li class="item">
                        <FIcon class="icon" :size="24" type="icon-faxian1"/>
                        <span class="title">综合</span>
                    </li>
                    <div class="group" >
                        <div :class="'group-text'">
                            <FIcon class="icon" :size="24" type="icon-lanmuguanli"/>
                            <span class="text">栏目分类</span>
                        </div>
                        <ul class="group-menu">
                            <li 
                            :class="'group-item'">
                                APEX
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>
            <div class="right">
                <div class="content">
                    <div class="top">
                        
                        <div class="create-info">
                            <div class="create-title">
                                <a-input
                                    size="large"
                                    placeholder="请写入标题（选填）" 
                                    v-model="form.title"
                                    :maxLength="256"
                                />
                            </div>
                            <div class="create-content">
                                <a-textarea  
                                @change="changeContent"
                                id="editor-box" 
                                :rows="4"
                                :maxLength="256"
                                placeholder="填写内容" 
                                v-model="form.content" />
                            </div>
                            <div class="create-text-num">
                                <div class="select-forum">
                                    <div class="forum-icon">
                                        <div class="icon">
                                            <FIcon class="icon" :size="20" type="icon-a-034_huati"/>
                                        </div>
                                        <div class="title">
                                            请选择版块
                                        </div>
                                    </div>
                                    <div class="byte-popover">
                                        <div class="popover-content">
                                            <div class="forum-picker">
                                                <div class="search">
                                                    <a-input-search 
                                                    placeholder="请输入版块标题" style="width: 100%" 
                                                    @search="onSearch" />
                                                </div>
                                                <div class="wrapper">
                                                    <div class="cate-menu">
                                                        <div class="cate-item active">
                                                            推荐圈子
                                                        </div>
                                                        <div class="cate-item">
                                                            我的圈子
                                                        </div>
                                                        <div @click="selectForum" v-for="(item,index) in categoryList" :key="index" class="cate-item">
                                                            {{item.title}}
                                                        </div>
                                                    </div>
                                                    <div class="forum-list">
                                                        <div class="forum-item">
                                                            <div class="cover">
                                                                <img src="/img/oopz.png" alt="">
                                                            </div>
                                                            <div class="forum-info">
                                                                <p class="forum-title">
                                                                    版块标题
                                                                </p>
                                                                <p class="desc">
                                                                    1.4k掘友 · 1.1k沸点
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="search-list">
                                                    <div class="forum-item">
                                                        <div class="cover">
                                                            <img src="/img/oopz.png" alt="">
                                                        </div>
                                                        <div class="forum-info">
                                                            <p class="forum-title">
                                                                版块标题
                                                            </p>
                                                            <p class="desc">
                                                                1.4k掘友 · 1.1k沸点
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div class="empty">
                                                        <a-empty >
                                                            <span slot="description"> 搜不到版块 </span>
                                                        </a-empty>
                                                    </div>
                                                </div> -->
                                                <div class="btn-box">
                                                    <div class="no-select">
                                                        不选择
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="popper-arrow"></div>
                                    </div>
                                </div>
                                <a-progress type="circle"  :percent="contentCount" :width="20" >
                                    <template #format="percent">
                                        <span v-if="contentCount < 100">{{ percent }}</span>
                                        <span v-if="contentCount > 100">{{ contentCount }}</span>
                                    </template>
                                </a-progress>

                                
                            </div>
                        </div>
                        <div class="">

                        </div>
                    </div>
                </div>
                <div class="sidebar">

                </div>
            </div>
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
        res.data.list = res.data.list != null ? res.data.list : []
        return {
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

            categoryList: [],
            forumList:[],
            contentCount:0,
            form:{
                title:undefined,
                description:undefined,
                images:[],
                categoryId:undefined,
                forumId:undefined,
                tags:[],
                content:"",
                cover: "",
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
        async getCategroy(){
            const res = await this.$axios.get(api.getCategoryAll,
                {
                    params:{module:"forum"}
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
        async getForum(){
            const res = await this.$axios.get(api.getCategoryAll,
                {
                    params:{module:"forum"}
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
        selectForum(e){
            console.log(e)
        },
        changeContent(){
            this.contentCount = this.form.content.length
        },
        onSearch(){

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
            .menu{
                background: white;
                padding: 8px;
                border-radius: 2px;
                .item{
                    cursor: pointer;
                    margin-bottom: 2px;
                    display: flex;
                    align-items: center;
                    font-size: 22px;
                    padding: 10px 15px;
                    .title{
                        font-size: 16px;
                        
                    }
                    .icon{
                        margin-right: 15px;
                    }
                }
                .active{
                    color:#1e80ff;
                    border-radius: 2px;
                    background: #eaf2ff!important;
                }
                .item:hover{
                    color:#1e80ff;
                    border-radius: 2px;
                    background: #f7f8fa!important;
                }
                .group{
                    .group-text{
                        cursor: pointer;
                        margin-bottom: 2px;
                        display: flex;
                        align-items: center;
                        font-size: 22px;
                        padding: 10px 15px;
                        .text{
                            font-size: 16px;
                            
                        }
                        .icon{
                            margin-right: 15px;
                        }
                    }
                    .group-active{
                        color:#1e80ff;
                    }
                    .group-text:hover{
                        color:#1e80ff;
                        border-radius: 2px;
                        background: #f7f8fa!important;
                    }

                    .group-menu{
                        .group-item{
                            cursor: pointer;
                            margin-bottom: 2px;
                            display: flex;
                            align-items: center;
                            font-size: 22px;
                            padding: 10px 5px;
                            font-size: 13px;
                            padding-left: 55px;
                            color: #8a919f;
                        }
                        .active{
                            color:#1e80ff;
                            border-radius: 2px;
                            background: #eaf2ff!important;
                        }
                        .group-item:hover{
                            color:#1e80ff;
                            border-radius: 2px;
                            background: #f7f8fa!important;
                        }
                    }

                }
            }
        }
        .right{
            display: flex;
            flex: 1;
            .content{
                flex: 1;
                .top{
                    position: relative;
                    background-color: white;
                    padding: 20px 20px 10px 20px;
                    
                    .create-info{
                        border: 2px solid #f5f5f5;
                        border-radius: 4px;
                        /deep/ .ant-input{
                            resize : none;
                            border: 0;
                            outline: none;
                            -webkit-box-shadow: none !important;
                            box-shadow: none !important;
                        }
                        .create-text-num{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 10px;
                            .select-forum{
                                .forum-icon{
                                    display: flex;
                                    align-items: center;
                                    user-select: none;
                                    cursor: pointer;
                                    background: #f5f6f7;
                                    padding: 0 15px;
                                    border-radius: 15px;
                                    .icon{
                                        margin-right: 2px;
                                        height: 23px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        text-align: center;
                                    }
                                    .title{
                                        height: 23px;
                                        font-size: 12px;
                                        color: #ff3a55;
                                        font-weight: 400;
                                        line-height: 23px;
                                        text-align: center;
                                }
                                }
                                .byte-popover{
                                    width: 360px;
                                    max-width: none;
                                    z-index: 1092;
                                    position: absolute;
                                    will-change: transform;
                                    top: 0px;
                                    left: 0px;
                                    transform: translate3d(20px, 198px, 0px);
                                
                                    .popover-content{
                                        .forum-picker{
                                            background-color: #fff;
                                            border: 1px solid #e4e6eb;
                                            border-radius: 4px;
                                            .search{
                                                padding: 16px;
                                                /deep/ .ant-input{
                                                    resize : none;
                                                    border: 0;
                                                    outline: none;
                                                    -webkit-box-shadow: none !important;
                                                    box-shadow: none !important;
                                                    background: #f2f3f5;
                                                }
                                            }
                                            .wrapper{
                                                display: flex;
                                                height: 352px;
                                                max-height: calc(80vh - 300px);
                                                border-top: 1px solid #e4e6eb;
                                                .cate-menu{
                                                    overflow: auto;
                                                    width: 88px;
                                                    border-top: 1px solid #e4e6eb;
                                                    background: #f2f3f5;
                                                    flex-shrink: 0;
                                                    .cate-item{
                                                        position: relative;
                                                        line-height: 48px;
                                                        text-align: center;
                                                        color: #8a919f;
                                                        cursor: pointer;
                                                        white-space: nowrap;
                                                        overflow: hidden;
                                                        text-overflow: ellipsis;
                                                        word-break: break-all;
                                                    }
                                                    .active{
                                                        color: #1e80ff;
                                                        background: #eaf2ff;
                                                    }
                                                    .active::after{
                                                        content: "";
                                                        position: absolute;
                                                        top: 14px;
                                                        right: 0;
                                                        width: 2px;
                                                        height: 20px;
                                                        background: #1e80ff;
                                                    }
                                                }
                                                .forum-list{
                                                    padding: 7px 0;
                                                    flex-grow: 1;
                                                    border-bottom: 1px solid #e4e6eb;
                                                    overflow-y: auto;
                                                    .forum-item{
                                                        display: flex;
                                                        cursor: pointer;
                                                        align-items: center;
                                                        padding: 9px 0;
                                                        .cover{
                                                            width: 48px;
                                                            height: 48px;
                                                            border-radius: 4px;
                                                            margin: 0 15px;
                                                            img{
                                                                border-radius: 4px;
                                                                width: 100%;
                                                                height: 100%;
                                                                object-fit: cover;
                                                            }
                                                        }
                                                        .forum-info{
                                                            padding-right: 15px;
                                                            .forum-title{
                                                                font-weight: 500;
                                                                font-size: 16px;
                                                                line-height: 28px;
                                                                color: #252933;
                                                                margin: 0;
                                                                display: -webkit-box;
                                                                overflow: hidden;
                                                                text-overflow: ellipsis;
                                                                -webkit-box-orient: vertical;
                                                                -webkit-line-clamp: 1;
                                                            }
                                                            .desc{
                                                                font-size: 14px;
                                                                line-height: 24px;
                                                                color: #8a919f;
                                                                margin: 0;
                                                            }
                                                        }
                                                    }
                                                    .forum-item:hover{
                                                            background: #f7f8fa;
                                                    }
                                                }
                                            }
                                            .search-list{
                                                padding: 7px 0;
                                                flex-grow: 1;
                                                border-bottom: 1px solid #e4e6eb;
                                                overflow-y: auto;
                                                height: 352px;
                                                max-height: calc(80vh - 300px);
                                                .forum-item{
                                                    display: flex;
                                                    cursor: pointer;
                                                    align-items: center;
                                                    padding: 9px 0;
                                                    .cover{
                                                        width: 48px;
                                                        height: 48px;
                                                        border-radius: 4px;
                                                        margin: 0 15px;
                                                        img{
                                                            border-radius: 4px;
                                                            width: 100%;
                                                            height: 100%;
                                                            object-fit: cover;
                                                        }
                                                    }
                                                    .forum-info{
                                                        padding-right: 15px;
                                                        .forum-title{
                                                            font-weight: 500;
                                                            font-size: 16px;
                                                            line-height: 28px;
                                                            color: #252933;
                                                            margin: 0;
                                                            display: -webkit-box;
                                                            overflow: hidden;
                                                            text-overflow: ellipsis;
                                                            -webkit-box-orient: vertical;
                                                            -webkit-line-clamp: 1;
                                                        }
                                                        .desc{
                                                            font-size: 14px;
                                                            line-height: 24px;
                                                            color: #8a919f;
                                                            margin: 0;
                                                        }
                                                    }
                                                }
                                                .forum-item:hover{
                                                        background: #f7f8fa;
                                                }
                                            }
                                            .btn-box{
                                                display: flex;
                                                align-items: center;
                                                justify-content: flex-end;
                                                height: 68px;
                                                width: 100%;
                                                box-sizing: border-box;
                                                padding: 0 16px; 
                                                .no-select{
                                                    user-select: none;
                                                    background: rgba(30, 128, 255, .05);
                                                    border: 1px solid rgba(30, 128, 255, .3);
                                                    box-sizing: border-box;
                                                    border-radius: 4px;
                                                    text-align: center;
                                                    color: #1e80ff;
                                                    width: 96px;
                                                    line-height: 36px;
                                                    cursor: pointer;
                                                }
                                            }
                                        }
                                    }
                                    .popper-arrow{
                                        left: 52px;
                                        background-color:#fff;
                                        border-left-color: transparent;
                                        border-bottom-color: transparent;
                                        border-right-color: #e4e6eb;
                                        border-top-color: #e4e6eb;
                                        width: 8px;
                                        height: 8px;
                                        border-width: 1px;
                                        border-style: solid;
                                        transform: rotate(-45deg);
                                        position: absolute;
                                        top: -4px;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                    }
                                }
                            }
                            /deep/ .ant-progress{
                                /deep/ .ant-progress-text{
                                    font-size:10px;
                                        transform: translate(-50%, -50%) scale(0.8);
                                }
                                
                            }
                        }
                    }
                }
            }
            .sidebar{
                width: 260px;
            }
        }
    }
}
</style>
