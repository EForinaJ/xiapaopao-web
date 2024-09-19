<template>
    <div class="recaptcha_box center opacity"
        :class="[isTrue && 'is_back_show']">
        <div class="container">
            <div class="title">
                <div class="title_l">
                    <!-- <span>创建版块</span> -->
                </div>
                <div class="title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>

            <div v-if="loading" class="loading">
                <a-spin size="large" tip="加载中..."/>
            </div>

            <div v-if="!loading" class="from">
                <div class="create-info">
                    <div class="create-title">
                        <a-input
                            size="large"
                            placeholder="内容若设置阅读权限，请输入标题（选填）" 
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
                            <div @click="openForumPanel" class="forum-icon">
                                <div class="icon">
                                    <FIcon class="icon" :size="16" type="icon-huati"/>
                                </div>
                                <div class="form-title">
                                    {{selectForumObj != null ? selectForumObj.title : '请选择圈子'}}
                                </div>
                            </div>
                            <div v-if="openForum" class="byte-popover">
                                <div class="popover-content">
                                    <div class="forum-picker">
                                        <div class="search">
                                            <a-input-search 
                                            placeholder="请输入版块标题" style="width: 100%" 
                                            @search="onSearch"
                                            @change="onchangeForumSearch"
                                            v-model="forumSearchText"
                                            />
                                        </div>
                                        <div v-if="!forumIsSearch" class="wrapper">
                                            <div class="cate-menu">
                                                <div @click="selectCategoryMenu(0,0)" :class="categoryKey == 0 ? 'cate-item active' : 'cate-item'">
                                                    推荐圈子
                                                </div>
                                                <div @click="selectCategoryMenu(1,0)" :class="categoryKey == 1 ? 'cate-item active' : 'cate-item'">
                                                    我的圈子
                                                </div>
                                                <div :class="categoryKey == (index+2) ? 'cate-item active' : 'cate-item'" @click="selectCategoryMenu(index+2,item.id)" v-for="(item,index) in categoryList" :key="index">
                                                    {{item.title}}
                                                </div>
                                            </div>
                                            <div class="forum-list">
                                                <div @click="selectForm(item)" v-for="(item,index) in forumList" :key="index" class="forum-item">
                                                    <div class="cover">
                                                        <img :src="item.cover" :alt="item.title">
                                                    </div>
                                                    <div class="forum-info">
                                                        <p class="forum-title">
                                                            {{item.title}}
                                                        </p>
                                                        <p class="desc">
                                                            {{item.members}}成员 · {{item.posts}}帖子
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="forumIsSearch" class="search-list">
                                            <div v-if="forumList.length > 0">
                                                <div @click="selectForm(item)" v-for="(item,index) in forumList" :key="index" class="forum-item">
                                                    <div class="cover">
                                                        <img :src="item.cover" :alt="item.title">
                                                    </div>
                                                    <div class="forum-info">
                                                        <p class="forum-title">
                                                            {{item.title}}
                                                        </p>
                                                        <p class="desc">
                                                            {{item.members}}成员 · {{item.posts}}帖子
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="forumList.length == 0" class="empty">
                                                <a-empty >
                                                    <span slot="description"> 搜不到版块 </span>
                                                </a-empty>
                                            </div>
                                        </div>
                                        <div class="btn-box">
                                            <div @click="closeForumPanel" class="no-select">
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

                <div v-if="form.images.length > 0" class="create-images">
                    <!-- <p>最多上传9张图片</p> -->
                    <div class="image-list">
                        <div class="item" v-for="(item,index) in form.images" :key="index">
                            <div class="image-box">
                                <img :src="item | resetImage(100,100)" alt="xxx">
                                <b @click="removeImg(index)" class="img-close"><a-icon type="close" /></b>
                            </div>
                        </div>
                        <div lass="item" v-if="form.images.length < 9">
                            <div class="add-image" @click="selectImg">
                                <a-icon class="icon" type="plus" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="selectLinkObj != null" class="create-link">
                    <div class="cover">
                        <img :src="selectLinkObj.cover" :alt="selectLinkObj.title">
                    </div>
                    <div class="title-desc">
                        <div class="link-title">
                            {{selectLinkObj.title}}
                        </div>
                        <div class="desc">
                            {{selectLinkObj.description}}
                        </div>
                    </div>
                    <div @click="removeLink" class="dot">
                        <a-icon type="close" />
                    </div>
                </div>

                <div class="create-option">
                    <div class="options">
                        <div @click="selectImg" :class="selectLinkObj != null ? 'options-item not-allowed' : 'options-item'">
                            <div class="icon">
                                <FIcon class="icon" :size="18" type="icon-tupian1"/>
                            </div>
                            <div class="text">
                                图片
                            </div>
                        </div>
                        <div @click="openLinkPanel" :class="form.images.length > 0 ? 'options-item not-allowed' : 'options-item'">
                            <div class="icon">
                                <FIcon class="icon" :size="18" type="icon-lianjie"/>
                            </div>
                            <div class="text">
                                链接
                            </div>
                        </div>
                    </div>
                    <div class="create-btn-auth">
                        <div v-if="authSelectKey == 1" @click="openAuthPanel" class="create-auth">
                            <div class="icon">
                                <FIcon :size="20" type="icon-quanqiu2x"/>
                            </div>
                            <div class="text">
                                无限制
                            </div>
                        </div>
                        <div v-if="authSelectKey == 2" @click="openAuthPanel" class="create-auth">
                            <div class="icon">
                                <FIcon :size="20" type="icon-user"/>
                            </div>
                            <div class="text">
                                登录
                            </div>
                        </div>
                        <div v-if="authSelectKey == 3" @click="openAuthPanel" class="create-auth">
                            <div class="icon">
                                <FIcon :size="20" type="icon-pinglun"/>
                            </div>
                            <div class="text">
                                评论
                            </div>
                        </div>
                        <div v-if="authSelectKey == 4" @click="openAuthPanel"  class="create-auth">
                            <div class="icon">
                                <FIcon :size="20" type="icon-fufeizhifu"/>
                            </div>
                            <div class="text">
                                付费
                            </div>
                        </div>
                        <div v-if="authSelectKey == 5" @click="openAuthPanel" class="create-auth">
                            <div class="icon">
                                <FIcon :size="20" type="icon-jifen"/>
                            </div>
                            <div class="text">
                                积分
                            </div>
                        </div>

                        <div @click="submit" 
                            class="create-btn">
                            发布帖子
                        </div>
                    </div>
                    

                    <div v-if="openLink" class="link-panel">
                        <div class="popover-content">
                            <div class="text-input">
                                <a-input-search style="width: 100%" v-model="linkSearchText" placeholder="输入标题"  size="large" 
                                @search="onLinkSearch"
                                @change="changeLinkSearch"
                                >
                                    <a-button slot="enterButton">
                                        搜索
                                    </a-button>
                                </a-input-search>
                            </div>
                            <div class="link-list">
                                <div v-if="linkList.length > 0">
                                    <div @click="selectLink(item)" v-for="(item,index) in linkList" :key="index" class="link-item">
                                        <div class="link-cover">
                                            <img :src="item.cover" :alt="item.title">
                                        </div>
                                        <div class="link-info">
                                            <p class="link-title">
                                                {{item.title}}
                                            </p>
                                            <p class="link-desc">
                                                {{item.description}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="linkList.length == 0" class="link-empty">
                                    <a-empty >
                                        <span slot="description"> 搜不到内容 </span>
                                    </a-empty>
                                </div>
                            </div>
                        </div>
                        <div class="popper-arrow"></div>
                    </div>
                    <div v-if="openAuth" class="auth-panel">
                        <div class="popover-content">
                            <div class="auth-options">
                                <div
                                    @click="changeAuth(1)" 
                                    :class="authSelectKey == 1 ? 'auth-item active' : 'auth-item'"
                                >
                                    <div class="icon">
                                        <FIcon :size="14" type="icon-quanqiu2x"/>
                                    </div>
                                    <div class="text">
                                        无限制
                                    </div>
                                </div>
                                <div 
                                    @click="changeAuth(2)" 
                                    :class="authSelectKey == 2 ? 'auth-item active' : 'auth-item'"
                                >
                                    <div class="icon">
                                        <FIcon :size="14" type="icon-user"/>
                                    </div>
                                    <div class="text">
                                        登录
                                    </div>
                                </div>
                                <div 
                                    @click="changeAuth(3)" 
                                    :class="authSelectKey == 3 ? 'auth-item active' : 'auth-item'"
                                >
                                    <div class="icon">
                                        <FIcon :size="14" type="icon-pinglun"/>
                                    </div>
                                    <div class="text">
                                        评论
                                    </div>
                                </div>
                                <div 
                                    @click="changeAuth(4)" 
                                    :class="authSelectKey == 4 ? 'auth-item active' : 'auth-item'"
                                >
                                    <div class="icon">
                                        <FIcon :size="14" type="icon-fufeizhifu"/>
                                    </div>
                                    <div class="text">
                                        付费
                                    </div>
                                </div>
                                <div 
                                    @click="changeAuth(5)" 
                                    :class="authSelectKey == 5 ? 'auth-item active' : 'auth-item'"
                                >
                                    <div class="icon">
                                        <FIcon :size="14" type="icon-jifen"/>
                                    </div>
                                    <div class="text">
                                        积分
                                    </div>
                                </div>
                                
                            </div>
                            <div v-if="authSelectKey == 1" class="auth-desc um">
                                <div class="text">
                                    无限制，任意查看话题内容
                                </div>
                            </div>
                            <div v-if="authSelectKey == 2" class="auth-desc um">
                                <div class="text">
                                    用户登录之后方可查看话题内容
                                </div>
                            </div>
                            <div v-if="authSelectKey == 3" class="auth-desc um">
                                <div class="text">
                                    用户评论此话题之后方可查看话题内容
                                </div>
                            </div>
                            <div v-if="authSelectKey == 4" class="auth-desc um">
                                <div class="price">
                                    <a-input-number
                                        v-model="form.price"
                                        size="large" 
                                        placeholder="请输入费用"
                                        :style="{ width: '100%' }"
                                        :min="0"
                                        :precision="0"
                                    />
                                </div>
                                <div class="text">
                                    用户支付费用之后方可查看话题内容
                                </div>
                            </div>
                            <div v-if="authSelectKey == 5" class="auth-desc um">
                                <div class="price">
                                    <a-input-number
                                        size="large" 
                                        v-model="form.integral"
                                        placeholder="请输入积分"
                                        :style="{ width: '100%' }"
                                        :min="0"
                                        :precision="0"
                                    />
                                </div>
                                <div class="text">
                                    用户支付积分后方可查看话题内容
                                </div>
                            </div>
                        </div>
                        <div class="popper-arrow"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import api from "@/api/index"
import { mapState } from "vuex"
import ImageAdaptation from "@/components/adaptation/image"
import FIcon from '@/components/icon/FIcon'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    components:{
        FIcon,
        ImageAdaptation
    },
    data(){
        return{
            locale: zhCN,
            isTrue: false,
            state: null, // 准备（prepare） 确定（ ascertain） 取消（cancel）
            loading: false,
            
            categoryList: [],
            categoryKey: 0,
            forumList:[],
            forumIsSearch:false,
            forumSearchText: "",
            contentCount:0,
            selectForumObj: null,
            openForum:false,
            openImages:false,
            linkSearchText: "",
            module: "article",
            linkList:[],
            selectLinkObj: null,
            openLink:false,
            openAuth:false,
            authSelectKey: 1,
            form:{
                title:undefined,
                images:[],
                forumId:undefined,
                tags:[],
                content:"",
                module: "",
                relatedId: 0,
                price:0,
                integral:0,
                authority:1,
                type: 1,
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
            post:null,
        }
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
        ...mapState(["base"]),
    },
    methods:{
        async confirm(
            info = null
        ) {
            this.open();
            
            this.id = info.id
            this.selectForumObj = info
            this.form.forumId = info.id
            this.getCategroy()
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare' };
                const that = this
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(that.post);
                        } else {
                            reject(false);
                        }
                        return true
                    }
                });
                this.state = res;
            });
        },
    

        submit(){
            if (this.token == null) {
                this.cancel()
                this.$Auth("login","登录","快速登录")
                return
            }
            if (this.form.authority != 1 && (this.form.title == "" || this.form.title == null|| this.form.title == undefined)) {
                this.$message.error(
                    "内容若设置阅读权限，请输入标题",
                    3
                )
                return
            }
            // 判断标题是否为空
            if (this.form.content == "" || this.form.content == null || this.form.content == undefined) {
                this.$message.error(
                    "请输入内容",
                    3
                )
                return
            }
            if (this.form.images.length > 9) {
                this.$message.error(
                    "请不要上传超过9张图片",
                    3
                )
                return
            }
            
            if (this.form.authority == 4) {
                if (this.form.price == 0) {
                    this.$message.error(
                        "请设置费用",
                        3
                    )
                    return
                }
                
            }
            if (this.form.authority == 5) {
                if (this.form.integral == 0) {
                    this.$message.error(
                        "请设置积分",
                        3
                    )
                    return
                }
            }
            
            // if (this.form.tags.length > 5) {
            //     this.$message.error(
            //         "请勿设置超出5个标签",
            //         3
            //     )
            //     return
            // }
            
            


            this.form.content = this.form.content.replace(/\n/g,"<br/>");  
            this.postCreate(this.form)
            
        },
        async postCreate(formData){
            try {
                const res = await this.$axios.post(api.postPostCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                
                this.post = res.data.info
                this.ascertain()
            } catch (error) {
                (error)
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        async getCategroy(){
            this.loading = true
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
            this.loading = false
        },
        async getForum(params){
            const res = await this.$axios.get(api.getForumList,
                {
                    params:params
                }
            )
            
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.forumList = res.data.list ?? []
        },
        async getArticle(params){
            const res = await this.$axios.get(api.getArticleList,
                {   
                    params:params
                }
            )
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.linkList = res.data.list ?? []
        },
        selectCategoryMenu(e,id){
            this.categoryKey = e
            if (e == 0 && id == 0) {
                let params = {
                    page:1,
                    limit: 50,
                    isTop: 2,
                }
                this.getForum(params)
            }
            if (e == 1 && id == 0) {
                let params = {
                    page:1,
                    limit: 50,
                    isJoin: true,
                }
                this.getForum(params)
            }

            if (id != 0) {
                let params = {
                    page:1,
                    limit: 50,
                    categoryId: id,
                }
                this.getForum(params)
            }
        },
        selectForm(e){
            this.selectForumObj = e
            this.form.forumId = e.id
            this.openForum = false
        },
        openForumPanel(){
            this.openForum = !this.openForum
            this.openLink = false
            this.openAuth = false
            if (this.openForum) {
                let params = {
                    isTop: 2,
                    page:1,
                    limit: 50,
                }
                this.getForum(params)
            }
        },
        closeForumPanel(){
            this.selectForumObj = null
            this.form.forumId = undefined
            this.openForum = !this.openForum
        },
        onSearch(){
            if (this.forumSearchText != "") {
                this.forumIsSearch = true
                let params = {
                    page:1,
                    limit: 50,
                    title: this.forumSearchText,
                }
                this.getForum(params)
            }
        },
        onchangeForumSearch(){
            if (this.forumSearchText == "") {
                this.categoryKey = 0
                let params = {
                    isTop: 2,
                    page:1,
                    limit: 50,
                }
                this.getForum(params)
                this.forumIsSearch = false
            }
        },
        
        changeContent(){
            this.contentCount = this.form.content.length
        },
        removeImg(i){
            this.form.images.splice(i,1)
        },
        selectImg(){
            if (this.selectLinkObj != null) {
                return
            }
            this.close()
            this.$Upload().then((res)=>{
                if (res != false) {
                    if (this.form.images.length <= 8) {
                        this.form.images.push(res)
                        this.form.relatedId = 0
                        this.form.module = ""
                        this.form.type = 1
                        this.open()
                    }else{
                        this.$message.error(
                           "上传图片数量最多只能为9张",
                            3
                        )
                        return
                    }
                }else{
                    this.open()
                }
            }).catch((err)=>{
                this.open()
            })
        },

        
        onLinkSearch(){
            switch (this.module) {
                case "article":
                    if (this.linkSearchText != "") {
                        let params = {
                            title: this.linkSearchText,
                            page: 1,
                            limit: 10,
                        }
                        this.getArticle(params)
                    }
                    break;
                default:
                    break;
            }
        },
        changeLinkSearch(){
            switch (this.module) {
                case "article":
                    if (this.linkSearchText == "") {
                        let params = {
                            title: "",
                            page: 1,
                            limit: 10,
                        }
                        this.getArticle(params)
                    }
                    break;
                default:
                    break;
            }
        },
        selectLink(e){
            this.selectLinkObj = e
            this.form.relatedId = e.id
            this.form.module = this.module
            this.form.images = []
            this.openLink = false
        },
        removeLink(){
            this.selectLinkObj = null
            this.form.relatedId = 0
            this.form.module = ""
            this.openLink = false
        },
        openLinkPanel(){
            if (this.form.images.length > 0) {
                return
            }
            this.openLink = !this.openLink
            this.form.type = 2
            this.openAuth = false
            this.openForum = false
            if (this.openLink) {
                let params = {
                    isTop: 2,
                    page: 1,
                    limit: 10
                }
                this.getArticle(params)
            }
            
           
        },

        openAuthPanel(){
            this.openAuth = !this.openAuth
            this.openForum = false
            this.openLink = false
        },
        changeAuth(e){
            if (e != 1 && (this.form.title == "" || this.form.title == null|| this.form.title == undefined)) {
                this.$message.error(
                    "内容若设置阅读权限，请输入标题",
                    3
                )
                return
            }
            this.authSelectKey = e
            this.form.authority = e
            
        },

        cancel(){
            this.categoryList =  [],
            this.categoryKey =  0,
            this.forumList = [],
            this.forumIsSearch = false,
            this.forumSearchText = "",
            this.contentCount = 0,
            this.selectForumObj = null,
            this.openForum = false,
            this.openImages = false,
            this.linkSearchText =  "",
            this.module = "article",
            this.linkList = [],
            this.selectLinkObj = null,
            this.openLink = false,
            this.openAuth = false,
            this.authSelectKey = 1,
            this.form = {
                title:undefined,
                images:[],
                forumId:undefined,
                tags:[],
                content:"",
                module: "",
                relatedId: 0,
                price:0,
                integral:0,
                authority:1,
                type: 1,
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
            this.state.state = 'cancel'
            this.close()
        },
        ascertain(){
            this.categoryList =  [],
            this.categoryKey =  0,
            this.forumList = [],
            this.forumIsSearch = false,
            this.forumSearchText = "",
            this.contentCount = 0,
            this.selectForumObj = null,
            this.openForum = false,
            this.openImages = false,
            this.linkSearchText =  "",
            this.module = "article",
            this.linkList = [],
            this.selectLinkObj = null,
            this.openLink = false,
            this.openAuth = false,
            this.authSelectKey = 1,
            this.form = {
                title:undefined,
                images:[],
                forumId:undefined,
                tags:[],
                content:"",
                module: "",
                relatedId: 0,
                price:0,
                integral:0,
                authority:1,
                type: 1,
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
            this.state.state = "ascertain"
            this.close()
            this.post = null
        },
        open() {
            this.isTrue = true;
        },
        close() {
            this.isTrue = false;
        }
    }
}
</script>

<style lang="less" scoped>
    .recaptcha_box {
        user-select: none;
        pointer-events: none;
        z-index: 20;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transform: perspective(1px) scale(1.1);
        transition: visibility 0s linear .15s,opacity .15s 0s,transform .15s;
        display: flex;
        align-items: center;
        justify-content: center;
        .container{
            background-color: white;
            width: 620px;
            margin: 0 auto;
            position: relative;  
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin-top: -15%;
            border-radius: 4px;
            
            .loading{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                width: 100%;
            }
            .title{
                transition: all .2s;
                font-size: 16px;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                .title_l{
                    display: block;
                    align-items: center;
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .from{
               
                position: relative;
                // background-color: white;
                padding: 20px;
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
                                .form-title{
                                    height: 23px;
                                    font-size: 12px;
                                    color: #1e80ff;
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
                                transform: translate3d(20px, 195px, 0px);
                            
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
                                            border-bottom: 1px solid #e4e6eb;
                                            .cate-menu{
                                                overflow: auto;
                                                width: 88px;
                                                border-right: 1px solid #e4e6eb;
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
                                            .empty{
                                                height: 100%;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                            }
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
                .create-images{
                    margin-top: 20px;
                    p{
                        font-size: 12px;
                        padding-bottom: 15px;
                        display: flex;
                        align-items: center;
                        line-height: 1;
                    }
                    .image-list{
                        display: flex;
                        flex-wrap: wrap;
                        .add-image{
                            cursor: pointer;
                            box-shadow: inset 0 0 2px rgb(137, 137, 137);
                            border-radius: 2px;
                            height: 100px;
                            width: 100px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .icon{
                                color: rgb(137, 137, 137);
                                font-size: 30px;
                            }
                        }   
                        .item{
                            height: 100px;
                            width: 100px;
                            position: relative;
                            margin-right: 10px;
                            margin-bottom: 10px;
                            .image-box{
                                height: 100px;
                                width: 100px;
                                padding-top: 100%;
                                position: relative;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 12px;
                                cursor: move;
                                img{
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    height: 100px;
                                    width: 100px;
                                    box-shadow: inset 0 0 2px rgb(137, 137, 137);
                                    border-radius: 2px;
                                }
                                .img-close{
                                    position: absolute;
                                    right: 0;
                                    top: 9px;
                                    width: 14px;
                                    display: block;
                                    background: red;
                                    height: 14px;
                                    border-radius: 100%;
                                    cursor: pointer;
                                    line-height: 14px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-right: 10px;
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                }

                .create-link{
                    border-radius: 4px;
                    margin-top: 10px;
                    padding: 10px ;
                    width: 400px;
                    position: relative;
                    display: flex;
                    .cover{
                        width: 100px;
                        height: 80px;
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                        img{
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                            object-fit: cover;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .title-desc{
                        flex: 1;
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                        height: 80px;
                        background: #eaeaea;
                        flex-direction: column;
                        justify-content: space-between;
                        display: flex;
                        padding: 15px 10px;
                        .link-title{
                            line-height: 18px;
                            font-size: 16px;
                            font-weight: 600;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                        }
                        .desc{
                            color: #999;
                            font-size: 12px;
                            line-height: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                        }
                    }
                    .dot{
                        user-select: none;
                        cursor: pointer;
                        top: 5px;
                        right: 4px;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 12px;
                        background: #fa3534;
                        color: white;
                    }
                }
                .create-option{
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    position: relative;
                    .options{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        .options-item{
                            margin-right: 20px;
                            padding: 5px 2px;
                            user-select: none;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            .icon{
                                margin-right: 3px;
                            }
                            .text{
                                font-size: 13px;
                            }
                        }
                        .not-allowed{
                            cursor: not-allowed;
                        }
                    }
                    .create-btn-auth{
                        display: flex;
                        align-items: center;
                        .create-auth{
                            display: flex;
                            align-items: center;
                            margin-right: 20px;
                            cursor: pointer;
                            user-select: none;
                            .icon{
                                margin-right: 5px;
                            }
                            .text{
                                font-size: 12px;
                            }
                        }
                        .create-btn{
                            user-select: none;
                            cursor: pointer;
                            background: #1e80ff;
                            color: #fff;
                            text-align: center;
                            font-size: 13px;
                            padding: 10px 15px;
                            border-radius: 4px;
                        }
                    }
                    .link-panel{
                        position: absolute;
                        width: 280px;
                        border-radius: 4px;
                        background-color: white;
                        padding: 10px;
                        top: 35px;
                        left: 50px;
                        border: 1px solid #eaeaea;
                        .popper-arrow{
                            left: 50px;
                            background-color: white;
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
                        .popover-content{
                            .link-list{
                                padding: 7px 0;
                                flex-grow: 1;
                                border-bottom: 1px solid #e4e6eb;
                                overflow-y: auto;
                                height: 352px;
                                max-height: calc(80vh - 300px);
                                .link-item{
                                    display: flex;
                                    cursor: pointer;
                                    align-items: center;
                                    padding: 9px 0;
                                    .link-cover{
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
                                    .link-info{
                                        padding-right: 15px;
                                        .link-title{
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
                                        .link-desc{
                                            color: #999;
                                            font-size: 12px;
                                            line-height: 14px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            -webkit-line-clamp: 1;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                        }
                                    }
                                }
                                .link-item:hover{
                                    background: #f7f8fa;
                                }
                                .link-empty{
                                    margin-top: 10px;
                                }
                            }
                        }
                    }
                    .auth-panel{
                        position: absolute;
                        width: 620px;
                        border-radius: 4px;
                        background-color: white;
                        padding: 10px;
                        top: 35px;
                        left: 0px;
                        border: 1px solid #eaeaea;
                        .popper-arrow{
                            right: 160px;
                            background-color: white;
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
                        .popover-content{
                            position: relative;
                            .auth-options{
                                display: flex;
                                align-items: center;
                                .auth-item{
                                    position: relative;
                                    display: flex;
                                    align-items: center;
                                    font-size: 12px;
                                    padding: 8px;
                                    cursor: pointer;
                                    user-select: none;
                                    .icon{
                                        margin-right: 5px;
                                    }
                                }
                                .active::after{
                                    background: #0066ff;
                                    content: '';
                                    width: 40px;
                                    height: 2px;
                                    border-radius: 5px;
                                    bottom: 0px;
                                    position: absolute;
                                    margin-left: auto;
                                    margin-right: auto;
                                    left: 0;
                                    right: 0;
                                    text-align: center;
                                }
                            }
                            .auth-desc{
                                color: @font-desc-color;
                                font-size: @font-small;
                                margin-top: 10px;
                                padding: 10px;
                                border-radius: 4px;
                                background: @bg-blue-main;
                                .price{
                                    margin-bottom: 10px;
                                    /deep/ .ant-input-number{
                                        resize : none;
                                        border: 0;
                                        outline: none;
                                        -webkit-box-shadow: none !important;
                                        box-shadow: none !important;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .is_back_show {
        opacity: 1 !important;
        background: rgba(42, 44, 48, 0.7);
        pointer-events: auto !important;
        opacity: 1;
        visibility: visible;
        transform: perspective(1px) scale(1);
        transition: visibility 0s linear 0s,opacity .15s 0s,transform .15s;
    }
    @media only screen and (max-width: 768px) {
        .recaptcha_box{
            .container{
                margin: 0 20px;
            }
        }
    }
</style>