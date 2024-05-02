<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="18">
                    <div class="content">
                        
                        <div class="create-title">
                            <a-input
                                size="large"
                                placeholder="请写入标题" 
                                v-model="form.title"
                                :maxLength="256"
                            />
                            <!-- <div class="create-content">
                                <TinyMceEditor @writeContent="writeContent"   
                                    :valueContont="form.content"/>
                            </div> -->
                            <a-textarea  
                                @change="changeContent"
                                id="editor-box" 
                                :rows="8"
                                :maxLength="256"
                                placeholder="填写内容（选填）" 
                                v-model="form.content" />
                            <div class="create-text-num">
                                <div class="select-emoji">
                                    <a-icon class="icon" type="smile" />
                            
                                </div>
                                <a-progress type="circle"  :percent="contentCount" :width="20" >
                                    <template #format="percent">
                                        <span v-if="contentCount < 100">{{ percent }}</span>
                                        <span v-if="contentCount > 100">{{ contentCount }}</span>
                                    </template>
                                </a-progress>
                            </div>
                        </div>

                         <div  class="create-images">
                            <p>最多上传9张图片</p>
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


                        <div v-if="form.setResource" class="create-resouce">
                            <a-row :gutter="[{md:20}]">
                                <a-col :span="24" :md="12">
                                    <a-input
                                    disabled
                                        size="large"
                                        placeholder="请写入资源标题" 
                                        v-model="form.resource.title"
                                    />
                                </a-col>
                                <a-col :span="24" :md="12">
                                    <a-input
                                    disabled
                                        size="large"
                                        placeholder="请写入资源演示地址" 
                                        v-model="form.resource.example"
                                    />
                                </a-col>
                            </a-row>

                            <div class="mode rescource-box">
                                <div class="text">资源权限</div>
                                <a-radio-group size="large"
                                disabled
                                    v-model="form.resource.mode" 
                                    button-style="solid">
                                    <a-radio-button :value="1">
                                        登录后可看
                                    </a-radio-button>
                                    <a-radio-button :value="2">
                                        评论后可看
                                    </a-radio-button>
                                    <a-radio-button :value="3">
                                        按等级查看
                                    </a-radio-button>
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
                                disabled
                                    size="large" 
                                    placeholder="请输入积分"
                                    :style="{ width: '100%' }"
                                    :min="0"
                                />
                            </div>
                            <!-- 费用 -->
                            <div v-if="form.resource.mode == 5" class="money">
                                <a-input-number
                                disabled
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
                                <a-button disabled v-if="form.resource.attr.length == 0" @click="addAttr" block type="dashed">
                                    添加属性
                                </a-button>
                                <ul v-if="form.resource.attr.length > 0" class="attr-list">
                                    <li v-for="(item,index) in form.resource.attr" :key="index" class="item">
                                        <div class="input">
                                            <a-row :gutter="[{md:20}]">
                                                <a-col :span="24" :md="12">
                                                    <a-input
                                                    disabled
                                                        size="large"
                                                        placeholder="请写入资源标题" 
                                                        v-model="item.key"
                                                    />
                                                </a-col>
                                                <a-col :span="24" :md="12">
                                                    <a-input
                                                    disabled
                                                        size="large"
                                                        placeholder="请写入资源演示地址" 
                                                        v-model="item.value"
                                                    />
                                                </a-col>
                                            </a-row>
                                        </div>
                                        <div class="action">
                                            <a-space>
                                                <a-button disabled @click="addAttr" type="dashed">
                                                    添加
                                                </a-button>
                                                <a-button disabled @click="deleteAttr(index)" type="danger">
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
                                    disabled
                                        size="large"
                                        placeholder="下载地址" 
                                        v-model="form.resource.link"
                                    />
                                </a-col>
                                <a-col :span="24" :md="8">
                                    <a-input
                                    disabled
                                        size="large"
                                        placeholder="解压码" 
                                        v-model="form.resource.untieCode"
                                    />
                                </a-col>
                                <a-col :span="24" :md="8">
                                    <a-input
                                    disabled
                                        size="large"
                                        placeholder="请请输入提取码" 
                                        v-model="form.resource.gainCode"
                                    />
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </a-col>
                <a-col :span="24" :md="6">
                    <div class="siber-box">
                        <ul>
                            <li>
                                <p>尊重原创</p>
                                <p>请不要发布任何盗版下载链接，包括软件、音乐、电影等等。我们尊重原创。</p>
                            </li>
                            <li>
                                <p>处罚</p>
                                <p>禁止发布垃圾广告</p>
                                <p>发现垃圾广告，本站会立刻封停您的账户</p>
                            </li>
                        </ul>
                    </div>
                    <div class="siber-box">
                        <a-button @click="submit" icon="plus" size="large" type="primary" block>
                            提交发布
                        </a-button>
                    </div>

                    <!-- 版块选择 -->
                    <div class="siber-box">
                        <div class="select-btn" @click="openForum">
                            <div class="text-icon">
                                <a-icon type="thunderbolt" />
                                <span>
                                    版块
                                </span>
                            </div>
                            <div class="arrow-right">
                                <span>
                                    {{forum}}
                                </span>
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div :class="openForumPanel ? 'panel isOpenpanel' : 'panel isClosepanel'">
                            <div class="header">
                                 <a-input-search placeholder="输入版块栏目标题" 
                                 style="width: 100%" />
                            </div>
                            <div class="list" >
                                <div @click="selectForum(item.title,item.id)" v-for="(item,index) in forumList" :key="index" class="item">
                                    {{item.title}}
                                </div>
                            </div>
                            <div class="close" @click="cancelForum">
                                收起面板
                            </div>
                        </div>
                    </div>

                    <!-- 栏目选择 -->
                    <div class="siber-box">
                        <div class="select-btn" @click="openCategroy">
                            <div class="text-icon">
                                <a-icon type="gold" />
                                <span>
                                    栏目
                                </span>
                            </div>
                            <div class="arrow-right">
                                <span>
                                    {{category}}
                                </span>
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div :class="openCategroyPanel ? 'panel isOpenpanel' : 'panel isClosepanel'">
                            <div class="header">
                                 <a-input-search placeholder="输入版块栏目标题" 
                                 style="width: 100%" />
                            </div>
                            <div class="list" >
                                <div @click="selectCategory(item.title,item.id)" v-for="(item,index) in categoryList" :key="index" class="item">
                                    {{item.title}}
                                </div>
                            </div>
                            <div class="close" @click="cancelCategory">
                                取消选择
                            </div>
                        </div>
                        
                    </div>

                    <!-- 标签选择 -->
                    <div class="siber-box">
                        <div class="select-btn" @click="openTag">
                            <div class="text-icon">
                                <a-icon type="tags" />
                                <span>
                                    标签话题
                                </span>
                            </div>
                            <div class="arrow-right">
                                <span>
                                    {{form.tags.length > 0 ? "" :"请选择"}}
                                </span>
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div v-if="form.tags.length > 0" class="tag-list">
                            <div @click="removeTag(index)" v-for="(item,index) in form.tags" :key="index" class="tag">
                                <span class="icon">#</span>
                                <span class="title">{{item}}</span>
                            </div>
                        </div>
                        <div :class="openTagPanel ? 'panel isOpenpanel' : 'panel isClosepanel'">
                            <div class="header">
                                <a-input-search @search="createTag"  placeholder="输入标签话题" 
                                 style="width: 100%" >
                                    <a-button slot="enterButton">
                                        确认
                                    </a-button>
                                </a-input-search>
                            </div>
                            <div class="list" >
                                <div @click="selectTag(item.title)" v-for="(item,index) in tagList" :key="index" class="item">
                                    {{item.title}}
                                </div>
                            </div>
                            <div class="close" @click="openTag">
                                收起面板
                            </div>
                        </div>
                    </div>

                    <!-- 资源选择 -->
                    <div class="siber-box">
                        <div class="select-btn">
                            <div class="text-icon">
                                <a-icon type="file-zip" />
                                <span>
                                    是否设置资源
                                </span>
                            </div>
                            <div class="arrow-right">
                                <a-switch disabled @change="changeResource" 
                                checked-children="开" 
                                un-checked-children="关" />
                            </div>
                        </div>
                    </div>

                    
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
import FIcon from '@/components/icon/FIcon'
import TinyMceEditor from "@/components/editor/tinymceEditor"
export default {
    middleware: 'auth',
    components:{
        FIcon,
        TinyMceEditor
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
    validate({ query }) {
        if (query.id != null && query.id != undefined && query.id != NaN) {
             return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
        ...mapState("forum",["forumInfo","forumList"]),
    },
    data(){
        return{
            categoryList:[],
            tagList:[],
            gradeList:[],
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
            category: "请选择",
            forum: "请选择",
            openCategroyPanel:false,
            openTagPanel:false,
            openForumPanel:false,
            id: null,
        }
    },
    mounted(){
        if (this.token == null) {
            this.$router.push("/404")
            return
        }

        if (!this.accountInfo.grade.auth.includes("post")) {
            this.$message.error(
                "你的等级还无此权限",
                3
            )
            setTimeout(() => {
                this.$router.go(-1)
            }, 3000);
        }
        this.id = this.$route.query.id
        this.getData()
    },
    methods:{
        async getData(){
            try {
                //  获取文章内容
                const res = await this.$axios.get(api.getPostEditInfo,{params: {id:this.id}})
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    this.$router.push({ path: '/404' })
                    return
                }
                this.form.forumId = res.data.info.forum?.id ?? 0
                this.forum = res.data.info.forum?.title
                this.form.categoryId = res.data.info.category?.id
                this.category = res.data.info.category?.title
                
                this.form = Object.assign(this.form,res.data.info)
                this.form.tags = res.data.info.tagList == null ? [] :  res.data.info.tagList.map((itme)=>{
                    return itme.title
                })
                this.form.content =res.data.info.content.replace(/<br\/>/g,"\n"); 

                this.form.setResource = this.form.setResource == 1 ? false : true
                this.getCategroy()
                this.getTag()
                this.getGrade()
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
        writeContent(e){
            this.form.content = e
        },
        async getGrade(){
            const res = await this.$axios.get(api.getGradeAll)     
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.gradeList = res.data.list ?? []
        },
        async getTag(){
            const res = await this.$axios.get(api.getTagHot)     
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.tagList = res.data.list ?? []
        },
        async getCategroy(){
            const res = await this.$axios.get(api.getCategoryAll,
                {
                    params:{module:"post",forumId:this.form.forumId}
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
        openCategroy(){
            this.openCategroyPanel =!this.openCategroyPanel
        },
        selectCategory(title,id){
            this.category = title
            this.form.categoryId = id
            this.openCategroyPanel = false
        },
        cancelCategory(){
            this.form.categoryId = 0
            this.category = "请选择"
        },

        openForum(){
            this.openForumPanel =!this.openForumPanel
        },
        selectForum(title,id){
            this.forum = title
            this.form.forumId = id
            this.openForumPanel = false
            this.getCategroy()   
        },
        cancelForum(){
            this.form.forumId = this.forumInfo.id
            this.forum = this.forumInfo.title
            this.openForumPanel = false
        },

        openTag(){
            this.openTagPanel =!this.openTagPanel
        },
        selectTag(title){
            if (this.form.tags.length > 5) {
                this.$message.error(
                    "请不要选择超过5个标签",
                    3
                )
                return
            }
            this.form.tags.push(title)
            function uniqueArrayOrdered(arr) {
            const result = [];
            const seen = new Set();
            arr.forEach(item => {
                if (!seen.has(item)) {
                seen.add(item);
                result.push(item);
                }
            });
            return result;
            }
            this.form.tags = uniqueArrayOrdered(this.form.tags)
        },
        removeTag(index){
            this.form.tags.splice(index,1)
        },
        createTag(e){
            this.selectTag(e)
        },

        selectGrade(e){
            this.form.resource.grade = e
        },

        changeResource(e){
            this.form.setResource =  e
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

        changeContent(){
            this.contentCount = this.form.content.length
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
                     this.form.video = undefined
                    
                }
            }).catch((err)=>{
               this.form.images = []
                // this.createForm.link = null
            })
            
        },
        removeImg(i){
            this.form.images.splice(i,1)
        },
        
        submit(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            // 判断标题是否为空
            if (this.form.title === "" || this.form.title == null || this.form.title == undefined) {
                this.$message.error(
                    "请输入标题",
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
            if (this.form.categoryId === 0 || this.form.categoryId == null || this.form.categoryId == undefined) {
                this.$message.error(
                    "请设置栏目",
                    3
                )
                return
            }
            if (this.form.forumId === 0 || this.form.forumId == null || this.form.forumId == undefined) {
                this.$message.error(
                    "请设置版块",
                    3
                )
                return
            }
            if (this.form.tags.length > 5) {
                this.$message.error(
                    "请勿设置超出5个标签",
                    3
                )
                return
            }
            
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
            this.form.setResource = this.form.setResource ? 2 : 1
            this.form.id = parseInt(this.id)
             this.form.content = this.form.content.replace(/\n/g,"<br/>");  
            this.postEdit(this.form)

        },
        async postEdit(formData){
            try {
                const res = await this.$axios.post(api.postPostEdit,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }else{
                    this.$message.success(
                        "文章提交审核成功",
                        3
                    )
                    this.$router.push(`/account`)
                }
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
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
        .content{
            background-color: white;
            padding: 15px 20px;
            border-radius: 4px;
            .cover{
                
                position: relative;
                border-radius: 4px;
                .mark{
                    cursor: pointer;
                    width: 100%;
                    height: 160px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 3px dashed #8590a6;
                    background: rgba(0, 0, 0, 0.03);
                    .icon{
                        i{
                            font-size: 24px;
                        }
                        cursor: pointer;
                        user-select: none;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        width: 55px;
                        height: 55px;
                        color: #888;
                        background: rgba(136, 136, 136, 0.1);
                    }
                }
                .cover-img-btn{
                    cursor: pointer;
                    user-select: none;
                    height: 330px;
                    width: 100%;
                    position: relative;
                    .cover-img{
                        position: absolute;
                        top: 0;
                        height: 330px;
                        width: 100%;
                        border-radius: 4px;
                        border: 3px dashed #8590a6;
                        background-size: cover;
                        background-repeat: no-repeat;
                    }
                    .icon{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 330px;
                        width: 100%;
                        
                        .icon-info{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            i{
                                color: white;
                                font-size: 24px;
                            }
                            height: 55px;
                            width: 55px;
                            border-radius: 50%;
                            background: rgba(0,0,0,.5);
                        }
                    }
                    
                }
            }
            .create-title{
                margin: 10px 0;
                border: 2px solid #f5f5f5;
                border-radius: 4px;
                /deep/ .ant-input{
                    resize : none;
                    border: 0;
                    outline: none;
                    -webkit-box-shadow: none !important;
                    box-shadow: none !important;
                }
                /deep/ .tox-tinymce{
                    border: none;
                }
                /deep/ .tox-editor-header{
                    border-top: 2px solid #f5f5f5;
                    border-bottom: 2px solid #f5f5f5;
                }
                /deep/ .tox-toolbar__primary{
                    background: none;
                }
                .create-text-num{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    height: 30px;
                    .select-emoji{
                        z-index: 2;
                        position: relative;
                        .icon{
                            cursor: pointer;
                            font-size: 18.8px;
                        }
                        .emoji-list{
                            position: absolute;
                            padding: 10px;
                            left: -10px;
                            top: 100%;
                            width: 262px;
                            // height: 200px;
                            margin-top: 10px;
                            background: #fff;
                            border-radius: 4px;
                            box-shadow: 0px 10px 12px 0px rgb(133 144 166 / 15%);
                            border: 1px solid rgba(133, 144, 166, 0.1);
                            img{
                                cursor: pointer;
                                user-select: none;
                                width: 30px;
                                height: 30px;
                            }
                        }
                        .emoji-list::before{
                            content: "";
                            position: absolute;
                            width: 12px;
                            height: 12px;
                            top: -8px;
                            left: 11px;
                            border-top: 1px solid rgba(133, 144, 166, 0.1);
                            border-left: 1px solid rgba(133, 144, 166, 0.1);
                            -webkit-transform: rotate(45deg);
                            transform: rotate(45deg);
                            background: #fff;
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
                margin-bottom: 20px;
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
                                background: rgba(255, 255, 255, 0.88);
                                text-align: center;
                                height: 14px;
                                border-radius: 100%;
                                cursor: pointer;
                                line-height: 14px;
                                text-align: center;
                                margin-right: 10px;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
            .create-resouce{
                margin-bottom: 20px;
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
        }
        .siber-box{
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0px 0px 2px rgb(98 124 153 10%);
            position: relative;
            margin-bottom: 20px;
            ul{
                li{
                    font-size: 14px;
                    flex-flow: column;
                    padding: 16px;
                    display: flex;
                    box-sizing: border-box;
                    p{
                        font-size: 13px;
                        letter-spacing: 1px;
                        line-height: 16px;
                        margin-bottom: 10px;
                    }
                }
                li + li{
                    border-top: 1px solid #F5F6F7;
                    padding-top: 15px;
                    margin-top: -8px;
                }
            }
            .select-btn{
                cursor: pointer;
                user-select: none;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .text-icon{
                    display: flex;
                    align-items: center;
                    i{
                        font-size: 14px;
                    }
                    span{
                        font-size: 14px;
                        margin-left: 5px;
                    }
                }
                .arrow-right{
                    display: flex;
                    align-items: center;
                    span{
                        color: #999;
                        font-size: 12px;
                        margin-left: 5px;
                    }
                    i{
                        margin-left: 5px;
                        font-size: 16px;
                    }
                }
            }
            .tag-list{
                padding-top: 10px;
                padding-right: 20px;
                padding-left: 20px;
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                .tag{
                    margin-bottom: 20px;
                    border-radius: 15px;
                    background: rgba(173, 173, 173, 0.16);
                    margin-right: 10px;
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    padding: 4px 10px;
                    color: #8590a6;
                    .icon{
                        color: #8590a6;
                        margin-right: 6px;
                        font-size: 12px;
                        background: rgba(173, 173, 173, 0.16);
                        border-radius: 80%;
                    }
                    .title{
                        font-size: 13px;
                    }
                }
            }
            .panel{
                padding: 0 20px;
                height: 0px;
                flex-direction: column;
                display: flex;
                overflow: hidden;
                .header{
                   
                }
                .list{
                    flex: 1;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    overflow: auto;
                    .item{
                        padding: 8px 10px;
                        font-size: 14px;
                        cursor: pointer;
                        user-select: none;
                    }
                    .item:hover{
                        border-radius: 4px;
                        background-color: #eff1f3;
                    }
                }
                .close{
                    display: block;
                    cursor: pointer;
                    user-select: none;
                    color: #0066ff !important;
                    padding: 15px 0;
                    font-size: 12px;
                    text-align: center;
                    border-top: 1px solid #F5F6F7;
                    font-weight: 600;
                }
            }
            .isOpenpanel{
                transition: all 0.2s;
                height: 260px;
            }
            .isClosepanel{
                transition: all 0.2s;
                height: 0px;
            }
        }
    }
}
</style>