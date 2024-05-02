<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="18">
                    <div class="content">
                        <div class="cover">
                            <div v-if="form.cover == ''" @click="selectImg" class="mark">
                                <div class="icon">
                                    <a-icon theme="filled" type="camera" />
                                </div>
                            </div>
                            <div v-if="form.cover != ''" class="cover-img-btn">
                                <div class="cover-img" :style="{ backgroundImage: `url(${form.cover})@w900_h330` }"></div>
                                <div class="icon">
                                    <div class="icon-info">
                                        <a-icon theme="filled" type="camera" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="create-title">
                            <a-input
                                size="large"
                                placeholder="请写入标题" 
                                v-model="form.title"
                                :maxLength="256"
                            />
                        </div>
                        <div class="create-title">
                            <a-input
                                size="large"
                                placeholder="请你的链接" 
                                v-model="form.link"
                            />
                        </div>
                        <div class="description">
                            <a-textarea
                                :rows="5"
                                size="large"
                                type="text"
                                placeholder="请输入描述描述"
                                v-model="form.description"
                            />
                        </div>


                        <div class="create-content">
                            <TinyMceEditor @writeContent="writeContent"   
                                :valueContont="form.content"/>
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
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
        ...mapState("forum",["forumInfo","forumList"]),
    },
    data(){
        return{
            categoryList:[],
            tagList:[],
            contentCount:0,
            form:{
                title:undefined,
                cover:undefined,
                link:undefined,
                description:undefined,
               

                categoryId:undefined,
                forumId:undefined,
                tags:[],
                content:"",
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
            openForumPanel:false
        }
    },
    mounted(){
        if (this.token == null) {
            this.$router.push("/404")
            return
        }

        if (!this.accountInfo.grade.auth.includes("article")) {
            this.$message.error(
                "你的等级还无此权限",
                3
            )
            setTimeout(() => {
                this.$router.go(-1)
            }, 3000);
        }

        this.forum = this.forumInfo.title
        this.form.forumId = this.forumInfo.id
        this.getCategroy()
        this.getTag()
    },
    methods:{
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
                    params:{module:"article",forumId:this.form.forumId}
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
        writeContent(e){
            this.form.content = e
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
            
            this.postCreate(this.form)

        },
        async postCreate(formData){
            try {
                const res = await this.$axios.post(api.postArticleCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }else{
                    this.$message.success(
                        "玩家信息提交审核成功",
                        3
                    )
                    this.$router.push(`/account`)
                }
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
                margin: 20px 0;
                border: 1px solid #f5f5f5;
                border-radius: 4px;
                /deep/ .ant-input{
                    background-color: #f5f5f5;
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
            }
            .create-content{
                border: 1px solid #f5f5f5;
                border-radius: 4px;
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
            }
            .description{
                margin-bottom: 20px;
                /deep/ .ant-input{
                    background-color: #f5f5f5;
                    resize : none;
                    border: 0;
                    outline: none;
                    -webkit-box-shadow: none !important;
                    box-shadow: none !important;
                }
            }
            .mate{
                margin: 20px 0;
                /deep/ .ant-select-selection{
                    background-color: #f5f5f5;
                    resize : none;
                    border: 0;
                    outline: none;
                    -webkit-box-shadow: none !important;
                    box-shadow: none !important;
                }
                /deep/ .ant-input{
                    background-color: #f5f5f5;
                    resize : none;
                    border: 0;
                    outline: none;
                    -webkit-box-shadow: none !important;
                    box-shadow: none !important;
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