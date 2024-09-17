<template>
    <div 
        :class="design.theme ? 'create':'create dark'"
        :style="{
            minHeight:collapsed?'262px':'0px',
            padding:collapsed?'20px':'0px'
            }"
        >
        <div v-if="collapsed" class="create-info">
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
                    <div @click="openForumPanel" class="forum-icon">
                        <div class="icon">
                            <FIcon class="icon" :size="16" type="icon-huati"/>
                        </div>
                        <div class="title">
                            {{selectForumObj != null ? selectForumObj.title : '请选择圈子'}}
                        </div>
                    </div>
                    <div v-if="openForum" class="byte-popover">
                        <div class="popover-content">
                            <div class="forum-picker">
                                <div class="search">
                                    <a-input-search 
                                    placeholder="请输入版块标题" style="width: 100%" 
                                    @change="onSearch"
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

        <div v-if="form.images.length > 0 && collapsed" class="create-images">
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
        <!-- 
        <div v-if="selectLinkObj != null" class="create-link">
            <div class="cover">
                <img :src="selectLinkObj.cover" :alt="selectLinkObj.title">
            </div>
            <div class="title-desc">
                <div class="title">
                    {{selectLinkObj.title}}
                </div>
                <div class="desc">
                    {{selectLinkObj.description}}
                </div>
            </div>
            <div @click="removeLink" class="dot">
                <a-icon type="close" />
            </div>
        </div> -->

        <div v-if="openResource  && collapsed" class="create-resouce">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="12">
                    <a-input
                        size="large"
                        placeholder="请写入资源标题" 
                        v-model="form.resource.title"
                    />
                </a-col>
                <a-col :span="24" :md="12">
                    <a-input
                        size="large"
                        placeholder="请写入资源演示地址" 
                        v-model="form.resource.example"
                    />
                </a-col>
            </a-row>

            <div class="mode rescource-box">
                <div class="text">资源权限</div>
                <a-radio-group size="large"
                    v-model="form.resource.mode" 
                    button-style="solid">
                    <a-radio-button :value="1">
                        登录后可看
                    </a-radio-button>
                    <a-radio-button :value="2">
                        评论后可看
                    </a-radio-button>
                    <!-- <a-radio-button :value="3">
                        按等级查看
                    </a-radio-button> -->
                    <a-radio-button :value="4">
                        积分兑换查看
                    </a-radio-button>
                    <a-radio-button :value="5">
                        付费购买查看
                    </a-radio-button>
                </a-radio-group>
            </div>

            <!-- 积分 -->
            <div v-if="form.resource.mode == 4" class="integral">
                <a-input-number
                    size="large" 
                    placeholder="请输入积分"
                    :style="{ width: '100%' }"
                    :min="0"
                />
            </div>
            <!-- 费用 -->
            <div v-if="form.resource.mode == 5" class="money">
                <a-input-number
                    size="large" 
                    placeholder="请输入费用"
                    :style="{ width: '100%' }"
                    :min="0"
                />
            </div>
            <!-- 等级 -->
            <div v-if="form.resource.mode == 3" class="grade">
                <div class="grade-list">
                    <div @click="selectGrade(item.id)" v-for="(item,index) in gradeList" :key="index" class="grade-item">
                        <input class="x-input" v-model="form.resource.grade" :value="item.id" type="radio" >
                        <div class="lavel">
                            <img class="lavel" :src="item.icon" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <div class="rescource-box">
                <div class="text">资源属性</div>
                <a-button v-if="form.resource.attr.length == 0" @click="addAttr" block type="dashed">
                    添加属性
                </a-button>
                <ul v-if="form.resource.attr.length > 0" class="attr-list">
                    <li v-for="(item,index) in form.resource.attr" :key="index" class="item">
                        <div class="input">
                            <a-row :gutter="[{md:20}]">
                                <a-col :span="24" :md="12">
                                    <a-input
                                        size="large"
                                        placeholder="请写入属性标识" 
                                        v-model="item.key"
                                    />
                                </a-col>
                                <a-col :span="24" :md="12">
                                    <a-input
                                        size="large"
                                        placeholder="请写入属性值" 
                                        v-model="item.value"
                                    />
                                </a-col>
                            </a-row>
                        </div>
                        <div class="action">
                            <a-space>
                                <a-button @click="addAttr" type="dashed">
                                    添加
                                </a-button>
                                <a-button @click="deleteAttr(index)" type="danger">
                                    删除
                                </a-button>
                            </a-space>
                        </div>
                    </li>
                </ul>
            </div>

            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="8">
                    <a-input
                        size="large"
                        placeholder="下载地址" 
                        v-model="form.resource.link"
                    />
                </a-col>
                <a-col :span="24" :md="8">
                    <a-input
                        size="large"
                        placeholder="解压码" 
                        v-model="form.resource.untieCode"
                    />
                </a-col>
                <a-col :span="24" :md="8">
                    <a-input
                        size="large"
                        placeholder="请请输入提取码" 
                        v-model="form.resource.gainCode"
                    />
                </a-col>
            </a-row>
        </div>

        <div v-if="collapsed" class="create-option">
            <div class="options">
                <div @click="selectImg" class="options-item">
                    <div class="icon">
                        <FIcon class="icon" :size="18" type="icon-tupian1"/>
                    </div>
                    <div class="text">
                        图片
                    </div>
                </div>
                <!-- <div @click="openLinkPanel" class="options-item">
                    <div class="icon">
                        <FIcon class="icon" :size="18" type="icon-lianjie"/>
                    </div>
                    <div class="text">
                        链接
                    </div>
                </div> -->
                <div @click="changeResource" class="options-item">
                    <div class="icon">
                        <FIcon class="icon" :size="18" type="icon-zip"/>
                    </div>
                    <div class="text">
                        资源
                    </div>
                </div>
            </div>
            <div @click="submit" class="create-btn">
                发布帖子
            </div>

            <!-- <div v-if="openLink" class="link-panel">
                <div class="popover-content">
                    <div class="text-input">
                        <a-input-search style="width: 100%" v-model="linkSearchText" placeholder="输入标题"  size="large" @search="onLinkSearch">
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
            </div> -->
        </div>
    </div>
</template>

<script>
import ImageAdaptation from "@/components/adaptation/image"
import FIcon from '@/components/icon/FIcon'
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
export default {
    props:{
        collapsed:{
            type:Boolean,
            default: false
        }
    },
    components:{
        FIcon,
        ImageAdaptation
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
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
                images:[],
                forumId:undefined,
                tags:[],
                content:"",
                cover: "",
                module: "",
                relatedId: 0,
                setResource: 1,
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
    },
    methods:{
        submit(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            // 判断标题是否为空
            if (this.form.content === "" || this.form.content == null || this.form.content == undefined) {
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
            
            
            // if (this.form.tags.length > 5) {
            //     this.$message.error(
            //         "请勿设置超出5个标签",
            //         3
            //     )
            //     return
            // }
            
            if (this.form.setResource && this.form.resource.mode == 4) {
                if (this.form.resource.integral == 0 || this.form.resource.integral == null || this.form.resource.integral == undefined) {
                    this.$message.error(
                        "请设置兑换积分",
                        3
                    )
                    return
                }
            }

            if (this.form.setResource && this.form.resource.mode == 5) {
                if (this.form.resource.money == 0 || this.form.resource.money == null || this.form.resource.money == undefined) {
                    this.$message.error(
                        "请设置费用",
                        3
                    )
                    return
                }
                
            }

            if (this.form.setResource && this.form.resource.mode == 3) {
                if (this.form.resource.grade == 0 || this.form.resource.grade  == null || this.form.resource.grade  == undefined) {
                    this.$message.error(
                        "请设置等级",
                        3
                    )
                    return
                }
                
            }
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
                this.$message.success(
                    "发布帖子成功",
                    3
                )
                this.form.title = undefined
                this.form.content = undefined
                this.form.images = []
                this.form.setResource = 1
                this.form.resource.title = undefined
                this.form.resource.example = undefined
                this.form.resource.mode = undefined
                this.form.resource.integral = undefined
                this.form.resource.money = undefined
                this.form.resource.grade = undefined
                this.form.resource.attr = []
                this.form.resource.gainCode = undefined
                this.form.resource.untieCode = undefined
                this.form.resource.link = undefined
                this.$emit("create")
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
                    isTop: 2,
                }
                this.getForum(params)
            }
            if (e == 1 && id == 0) {
                let params = {
                    isJoin: true,
                }
                this.getForum(params)
            }

            if (id != 0) {
                let params = {
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
            if (this.openForum) {
                let params = {
                    isTop: 2,
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
            if (this.forumSearchText == "") {
                this.categoryKey = 0
                let params = {
                    isTop: 2,
                }
                this.getForum(params)
                this.forumIsSearch = false
            }else{
                this.forumIsSearch = true
                let params = {
                    title: this.forumSearchText,
                }
                this.getForum(params)
            }
        },
        
        changeContent(){
            this.contentCount = this.form.content.length
        },
        removeImg(i){
            this.form.images.splice(i,1)
        },
        selectImg(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    if (this.form.images.length <= 8) {
                        this.form.images.push(res)
                    }else{
                        this.$message.error(
                           "上传图片数量最多只能为9张",
                            3
                        )
                        return
                    }
                }
            }).catch((err)=>{
               this.form.images = []
                // this.createForm.link = null
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
                    }else{
                        this.linkList = []
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
            this.openLink = false
        },
        removeLink(){
            this.selectLinkObj = null
            this.form.relatedId = 0
            this.form.module = ""
            this.openLink = false
        },
        openLinkPanel(){
            this.openLink = !this.openLink
            if (this.openLink) {
                let params = {
                    isTop: 2,
                    page: 1,
                    limit: 10
                }
                this.getArticle(params)
            }
        },

        changeResource(){
            this.openResource =  !this.openResource
            if (this.openResource) {
                this.form.setResource = 2
            }else{
                this.form.setResource = 1
                this.form.resource.title = undefined
                this.form.resource.example = undefined
                this.form.resource.mode = undefined
                this.form.resource.integral = undefined
                this.form.resource.money = undefined
                this.form.resource.grade = undefined
                this.form.resource.attr = []
                this.form.resource.gainCode = undefined
                this.form.resource.untieCode = undefined
                this.form.resource.link = undefined
            }
        },
        addAttr(){
            this.form.resource.attr.push({
                key: undefined,
                value: undefined,
            })
        },
        deleteAttr(index){
            this.form.resource.attr.splice(index,1)
        },
    }
}
</script>

<style lang="less" scoped>
.create{
    position: relative;
    background-color: white;
    transition: height .25s;
    transition: padding .25s;
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

    .create-resouce{
        margin-top: 20px;
        /deep/ .ant-input{
            resize : none;
            border: 0;
            outline: none;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            background-color: #fafafa;
        }
        /deep/ .ant-input-number{
            resize : none;
            border: 0;
            outline: none;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            background-color: #fafafa;
        }
        .mode{
            margin-top: 20px;
        }
        .rescource-box{
            margin: 20px 0;
            .text{
                font-size: 12px;
                font-weight: 900;
                color: #999;
                margin-bottom: 10px;
            }
            .attr-list{
                .item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    .input{
                        flex: 1;
                    }
                    .action{
                        margin-left: 20px;
                    }
                } 
            }
        }
        .grade{
            .grade-list{
                display: flex;
                align-items: center;
                .grade-item{
                    margin-right: 20px;
                    display: flex;
                    align-items: center;
                    .x-input[type=radio]{
                        border-radius: 50%;
                        border: 1px solid #1890ff;
                        border-radius: 3px;
                        background: #1890ff;
                        clear: none;
                        cursor: pointer;
                        display: inline-block;
                        line-height: 0;
                        height: 1em;
                        outline: 0;
                        padding: 0 !important;
                        text-align: center;
                        width: 1em;
                        min-width: 1em;
                        box-shadow: inset 0 2px 2px rgba(0,0,0,.1);
                        transition: border-color .3s, background .3s, opacity .2s;
                        vertical-align: -0.15em;
                        position: relative;
                    }
                    .x-input[type=radio]::before{
                        content: '';
                        border-radius: 50%;
                        width: 0.5em;
                        height: 0.5em;
                        margin: 0.18em;
                        background-color:#1890ff;
                        line-height: 1.14285714;
                        float: left;
                        opacity: 0;
                        transition: opacity .2s;
                    }
                    .lavel{
                        margin-left: 2px;
                        height: 1.1em;
                        // max-width: 6em;
                        vertical-align: -0.15em;
                        display: inline-block;
                        img{
                            width: 100%;
                            height: 100%;
                        }
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
            .title{
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
    }
}
.dark{
    background: #161A1D;
    color: #DEE4EA;
    .create-info{
        border: 2px solid #dee4ea13;
        /deep/ .ant-input{
            background: #161A1D;
            color:#DEE4EA;
        }
        .create-text-num{
            .select-forum{
                .forum-icon{
                    background: #dee4ea13;
                    .title{
                        color:#DEE4EA;
                    }
                }
                .byte-popover{
                    .popover-content{
                        .forum-picker{
                            background-color: #161A1D;
                            border: 1px solid #dee4ea13;
                            .search{
                                padding: 16px;
                                /deep/ .ant-input{
                                    background: #161A1D;
                                    color:#DEE4EA;
                                    border: 1px solid #dee4ea13;
                                }
                            }
                            .wrapper{
                                border-top: 2px solid #dee4ea13;
                                border-bottom: 2px solid #dee4ea13;
                                .cate-menu{
                                    color: #DEE4EA;
                                    border-right: 2px solid #dee4ea13;
                                    background-color: #161A1D;
                                    .active{
                                        color: #1e80ff;
                                        background: #101214;
                                    }
                                }
                                .forum-list{
                                    
                                    .forum-item{
                                        .forum-info{
                                            .forum-title{
                                                color: #DEE4EA;
                                            }
                                            .desc{
                                                color: #DEE4EA;
                                            }  
                                        }
                                    }
                                    .forum-item:hover{
                                       background: #101214;
                                    }
                                } 
                            }
                            .search-list{
                                border-bottom: 1px solid #dee4ea13;
                            }
                        }
                    }
                }
            }
            /deep/ .ant-progress{
                .ant-progress-inner{
                    .ant-progress-text{
                        span{
                            color:#DEE4EA;
                        }
                    }
                }
                
            }
        }
    }
}
</style>