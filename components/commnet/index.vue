<template>
    <div class="comment-widget">
        <div class="header">
            <div class="count">
                {{count}}条回复
            </div>
            <div class="txt">
                你本无意穿堂风，偏偏孤倨引山洪
            </div>
        </div>

        <div v-if="token == null" class="login-form">
            <div class="login-text">
                请登录后发表评论
            </div>
            <div class="action">
                <div class="login btn">
                    <a-icon type="login" />
                    <span>登录</span>
                </div>
                 <div class="register btn">
                    <a-icon type="login" />
                    <span>登录</span>
                </div>
            </div>
        </div>
        <div v-if="token != null" class="create-form">
            <div class="left">
                <img :src="accountInfo.avatar | resetImage(50,50)" alt="">
            </div>
            <div class="right">
                <div class="input">
                    <a-textarea
                        id="editor-box" 
                        :rows="4"
                        :maxLength="256"
                        placeholder="说说你的看法。。。。" 
                        v-model="form.content" />
                </div>
                <div class="meta">
                    <div class="">

                    </div>
                    <div @click="postCreate" class="btn">
                        提交评论
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!loading" class="comments">
            <ul v-if="list.length > 0" class="list">
                <li class="item" v-for="(item,index) in list" :key="index">
                    <div class="left">
                        <img :src="item.userInfo.avatar | resetImage(50,50)" :alt="item.userInfo.nickName">
                    </div>
                    <div class="right border">
                        <div class="nickname-grade-date">
                            <div class="nickname-grade">
                                <div class="nickname">
                                    {{item.userInfo.nickName}}
                                </div>
                                <div class="grade">
                                    <img :src="item.userInfo.grade.icon | resetImage(48,18)">
                                </div>
                            </div>
                            <div  class="more">
                                <a-dropdown placement="bottomCenter">
                                    <a-icon type="ellipsis" />
                                    <a-menu slot="overlay">
                                        <a-menu-item @click="report(item.id)">
                                            <a-icon type="warning" />
                                            <span>举报</span>
                                        </a-menu-item>
                                        <a-menu-item  @click="remove('top',index,0,item.id)" v-if="accountInfo.id == item.userInfo.id">
                                            <a-icon type="delete" />
                                            <span>删除</span>
                                        </a-menu-item>
                                    </a-menu>
                                </a-dropdown>
                            </div>
                        </div>
                        <div class="content">
                            {{item.content}}
                        </div>
                        <div class="like-date-repy">
                            <div @click="like('top',index,0,item.id)" class="like">
                                <a-icon v-if="!item.isLike" type="like" />
                                <a-icon v-if="item.isLike" theme="filled" type="like" />
                                <span>{{item.likes}}</span>
                            </div>
                            <div @click="repy(item.userInfo.id,item.id,'top',index,0)" class="repy">
                                回复
                            </div>
                            <div class="date">
                                {{item.createTime |  resetData}}
                            </div>
                            
                        </div>

                        <div v-if="item.isOpen && form.index == index" class="repy-input">
                            <div class="left">
                                <img :src="accountInfo.avatar | resetImage(50,50)" alt="">
                            </div>
                            <div class="right">
                                <div class="input">
                                    <a-textarea
                                        id="editor-box" 
                                        :rows="4"
                                        :maxLength="256"
                                        placeholder="说说你的看法。。。。" 
                                        v-model="form.repyContent" />
                                </div>
                                <div class="meta">
                                    <div class=""></div>
                                    <div class="action">
                                        <div @click="removeRepy('top',index)" class="cancel">
                                            取消评论
                                        </div>
                                        <div @click="postCreate" class="btn">
                                            提交评论
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="item.children" class="repy-list">
                            <div class="item" v-for="(citem,cindex) in item.children" :key="cindex">
                                <div class="left">
                                    <img :src="citem.userInfo.avatar | resetImage(30,30)" alt="">
                                </div>
                                <div class="right">
                                    <div class="nickname-repyname-repot-grade">
                                        <div class="nickname-reyname-grade">
                                            <div class="nickname-reyname">
                                                <span>{{citem.userInfo.nickName}}</span>
                                                <span class="jian">@</span>
                                                <span>{{citem.reply.nickName}}</span>
                                            </div>
                                            <div class="grade">
                                                <img :src="citem.userInfo.grade.icon | resetImage(46,18)">
                                            </div>
                                        </div>
                                        <div class="more">
                                            <a-dropdown placement="bottomCenter">
                                                <a-icon type="ellipsis" />
                                                <a-menu slot="overlay">
                                                    <a-menu-item @click="report(citem.id)">
                                                        <a-icon type="warning" />
                                                        <span>举报</span>
                                                    </a-menu-item>
                                                    <a-menu-item @click="remove('children',index,cindex,item.id)" v-if="accountInfo.id == citem.userInfo.id">
                                                        <a-icon type="delete" />
                                                        <span>删除</span>
                                                    </a-menu-item>
                                                </a-menu>
                                            </a-dropdown>
                                        </div>
                                    </div>

                                    <div class="content">
                                        {{citem.content}}
                                    </div>

                                    <div class="like-date-repy">
                                        <div @click="like('children',index,cindex,citem.id)" class="like">
                                            <a-icon v-if="!citem.isLike" type="like" />
                                            <a-icon v-if="citem.isLike" theme="filled" type="like" />
                                            <span>{{citem.likes}}</span>
                                        </div>
                                        <div @click="repy(citem.userInfo.id,item.id,'children',index,cindex)" class="repy">
                                            回复
                                        </div>
                                        <div class="date">
                                            {{citem.createTime |  resetData}}
                                        </div>
                                        
                                    </div>

                                    <div v-if="citem.isOpen && form.cindex == cindex" class="repy-input">
                                        <div class="left">
                                            <img :src="accountInfo.avatar | resetImage(50,50)" alt="">
                                        </div>
                                        <div class="right">
                                            <div class="input">
                                                <a-textarea
                                                    id="editor-box" 
                                                    :rows="4"
                                                    :maxLength="256"
                                                    placeholder="说说你的看法。。。。" 
                                                    v-model="form.repyContent" />
                                            </div>
                                            <div class="meta">
                                                <div class=""></div>
                                                <div class="action">
                                                    <div @click="removeRepy('children',index,cindex)" class="cancel">
                                                        取消评论
                                                    </div>
                                                    <div @click="postCreate" class="btn">
                                                        提交评论
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
            <div v-if="list.length > 0" class="pagination">
               <a-config-provider :locale="locale">
                    <a-pagination
                        @change="changePage"
                        :pageSize="queryParam.limit"
                        :current="queryParam.page"
                        :total="total"
                        show-quick-jumper
                    >
                    </a-pagination>
                </a-config-provider>
            </div>
            <div v-if="list == null || list.length == 0" class="empty">
                <a-empty description="还没人评论呢，你要不要来说一句" />
            </div>
        </div>

        <div v-if="loading" class="loading">
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton avatar :loading="loading" :title="false" active></a-skeleton>
            </div>
        </div>

    </div>
</template>

<script>

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    props:{ 
        module:{
            type: String, //指定传入的类型
            default: "" //这样可以指定默认的值
        },
        relatedId: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        },
        count: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        },
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            loading:true,
            locale: zhCN,
            queryParam: {
                page: 1,
                limit: 3,
                id:null,
                relatedId:0,
                module:null
            },
            form:{
                index: 0,
                cindex: 0,
                // video:null,
                // fileList:[],
                repyContent: "",
                content: "",
                replyId: 0,
                topId:0
            },
            emoji:[
                '😁',
                '😊',
                '😎',
                '😤',
                '😥',
                '😂',
                '😍',
                '😏',
                '😙',
                '😟',
                '😖',
                '😜',
                '😱',
                '😲',
                '😭',
                '😚',
                '💀',
                '👻',
                '👍',
                '💪',
                '👊',
            ],
            commentMetaOptions:{
                imgVisible:false,
                videoVisible:false,
            },
            total:0,
            list:[],
            tmpList:[],
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            this.loading = true
            this.queryParam.relatedId = this.relatedId
            this.queryParam.module = this.module
            const res = await this.$axios.get(api.getCommentList,{params: this.queryParam})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.total = res.data.total
            
            this.tmpList = res.data.list || []

            this.restList(res.data.list|| [])
            this.loading = false
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        restList(arr){
            arr = arr.map((item)=>{
                item.isOpen = false
                return item
            })
            let list = this.$handertree(arr || [],"id","topId")
            this.list = list
        },
        selectImg(){
            if (this.token) {
                this.$Upload().then((res)=>{
                    if (res != false) {
                        if (this.createForm.fileList.length <= 4) {
                            this.createForm.fileList.push(res)
                        }else{
                            this.$message.error(
                            "上传图片数量最多只能为5张",
                                3
                            )
                            return
                        }
                        
                        this.createForm.video = null
                        this.commentMetaOptions.imgVisible = true
                        this.commentMetaOptions.videoVisible = false 
                    }
                }).catch((err)=>{
                    this.createForm.fileList = []
                })
            }else{
                return
            }
            
        },
        selectVideo(){
             this.$Upload("Video").then((res)=>{
                if (res != false) {
                    this.createForm.fileList = []
                    this.createForm.video = res
                    this.commentMetaOptions.videoVisible = true
                    this.commentMetaOptions.imgVisible = false 
                }
            }).catch((err)=>{
                this.commentMetaOptions.videoVisible = false
              this.createForm.video = null
            })
        },
        selectEmoji(e){
            var elInput =document.getElementById("commentInput");
            var startPos = elInput.selectionStart;
            var endPos = elInput.selectionEnd;
            if(startPos ===undefined|| endPos ===undefined)return 
            var txt = this.createForm.content;
            var result = txt.substring(0, startPos) + e + txt.substring(endPos)    
            this.createForm.content = result;    
            elInput.focus();  
            this.$nextTick(() => {
                elInput.selectionStart = startPos + e.length;    
                elInput.selectionEnd = startPos + e.length;
            })
        },
        async postCreate(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }

            if (this.form.content.length < 1 && this.form.replyId == 0) {
                this.$message.error(
                    "请写点内容吧",
                    3
                )
                return
            }
            if (this.form.repyContent.length < 1 && this.form.replyId != 0) {
                this.$message.error(
                    "请写点内容吧",
                    3
                )
                return
            }

            if (this.relatedId  == 0 || this.module == "") {
                this.$message.error(
                    "请设置评论模块",
                    3
                )
                return
            }
            let formData = {
                content:this.form.content,
                relatedId:this.relatedId,
                module: this.module,
                replyId:this.form.replyId,
                topId:this.form.topId,
            }
            // if (this.createForm.fileList.length > 0 && this.createForm.video == null) {
            //     formData.files = JSON.stringify(this.createForm.fileList)
            //     formData.type = 1
            // }
            if (this.form.replyId != 0) {
                formData.content = this.form.repyContent
            }
           
            try {
                const res = await this.$axios.post(api.postCommentCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.$message.success(
                    res.message,
                    3
                )
                if (this.tmpList.length > 0) {
                    this.tmpList.unshift(res.data.info)
                }else{
                    this.tmpList.push(res.data.info)
                }
             
                this.restList(this.tmpList)
                this.form.content = undefined
                this.form.topId = 0
                this.form.parentId = 0
                this.form.repyContent = undefined
                this.$emit('updataCount',"add")
                // if (!this.isView) {
                //     
                // }
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        async like(top,index,cindex,id){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("favorite")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            if (top == "top") {
                this.list[index].isLike = !this.list[index].isLike
                this.list[index].likes = parseInt(this.list[index].likes)
                if (this.list[index].isLike) {
                    this.list[index].likes =  this.list[index].likes + 1
                } else {
                    this.list[index].likes =  this.list[index].likes - 1
                }
            }

            if (top == "children") {
                this.list[index].children[cindex].isLike = !this.list[index].children[cindex].isLike
                this.list[index].children[cindex].likes = parseInt(this.list[index].children[cindex].likes)
                if (this.list[index].children[cindex].isLike) {
                    this.list[index].children[cindex].likes =  this.list[index].children[cindex].likes + 1
                } else {
                    this.list[index].children[cindex].likes =  this.list[index].children[cindex].likes - 1
                }
            }
            
            const res = await this.$axios.post(api.postCommentLike,{
                id:id
            })
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                if (top == "top") {
                    this.list[index].isLike = !this.list[index].isLike
                    this.list[index].likes = parseInt(this.list[index].likes)
                    if (this.list[index].isLike) {
                        this.list[index].likes =  this.list[index].likes + 1
                    } else {
                        this.list[index].likes =  this.list[index].likes - 1
                    }
                }

                if (top == "children") {
                    this.list[index].children[cindex].isLike = !this.list[index].children[cindex].isLike
                    this.list[index].children[cindex].likes = parseInt(this.list[index].children[cindex].likes)
                    if (this.list[index].children[cindex].isLike) {
                        this.list[index].children[cindex].likes =  this.list[index].children[cindex].likes + 1
                    } else {
                        this.list[index].children[cindex].likes =  this.list[index].children[cindex].likes - 1
                    }
                }
                return
            }
        },
        
        // ---------- 删除
        removeImg(i){
            this.createForm.fileList.splice(i,1)
            if (this.createForm.fileList.length == 0) {
                 this.commentMetaOptions.imgVisible = false
            }
        },
        removeVideo(){
            this.createForm.video = null
            this.commentMetaOptions.videoVisible = false 
        },
        repy(e,topId,isTop,index,cindex){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.form.topId = topId
            this.form.replyId = e
            this.form.repyContent = ""
            
            
            if (isTop == "top") {
                this.list[index].isOpen = true
                this.form.cindex = null
                this.form.index = index
            }
            if (isTop == "children") {
                this.form.cindex = cindex
                this.form.index = null
                this.list[index].children[cindex].isOpen = true
            }
            
        },
        removeRepy(isTop,index,cindex){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (isTop == "top") {
                this.list[index].isOpen = false
            }
            if (isTop == "children") {
                this.list[index].children[cindex].isOpen = false
            }
            this.form.topId = 0
            this.form.replyId = 0
            this.form.repyContent = ""
        },
        report(e){
            this.$Report(e,"comment")
        },
        remove(top,index,cindex,id){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$confirm({
                okText:"确定",
                cancelText:"取消",
                title: '正在删除',
                content: '请注意，您现在正在删除',
                onOk:async () => {
                    const formData = {
                        id:id,
                    }
                    const res = await this.$axios.post(api.postCommentRemove,formData)
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    if (top == "top") {
                        this.list.splice(index,1)
                    }

                    if (top == "children") {
                        this.list[index].children.splice(cindex,1)
                    }
                    this.$emit('updataCount',"sub")
                },
                onCancel() {},
            });
        },
    },
}
</script>


<style lang="less" scoped>
.comment-widget{
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 15px;
        border-bottom: 1px solid #eeeeee;
        .count{
            position: relative;
            font-size: 18px;
            font-weight: bold;
            padding-left: 10px;    
        }
        .count::before{
            content: '';
            width: 4px;
            height: 23px;
            position: absolute;
            left: 0px;
            top: -2px;
            background-color: #0066ff;
            border-radius: 4px;
        }
        .txt{
            font-size: 12px;
            color: #8590a6;
        }
    }

    .login-form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f5f5f5;
        height: 260px;
        .login-text{
            font-size: 18px;
            font-weight: bold;
        }
        .action{
            margin-top: 20px;
            display: flex;
            align-items: center;
            .btn{
                cursor: pointer;
                user-select: none;
                border-radius: 4px;
                padding: 8px 14px;
            }
            .login{
                color: #2997f7;
                background: rgba(41, 151, 247, .1);
            }
            .register{
                margin-left: 10px;
                color: #ff6f06;
                background: rgba(255, 111, 6, 0.1);
            }
        }
    }

    .create-form{
        margin-top: 15px;
        display: flex;
        .left{
            height: 60px;
            width: 60px;
            border-radius: 50%;
            img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
        }
        .right{
            margin-left: 20px;
            flex: 1;
            .meta{
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
                .btn{
                    text-align: center;
                    font-size: 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    user-select: none;
                    background-color: rgba(0, 102, 255, 0.1);
                    color: #0066ff !important;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 16px;
                    font-weight: 500;
                }
            }
        }
    }

    .comments{
        .list{
            .item{
                display: flex;
                margin-top: 15px;
                .left{
                    height: 50px;
                    width: 50px;
                    border-radius: 4px;
                    img{
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .right{
                    flex: 1;
                    margin-left: 15px;
                    .nickname-grade-date{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .nickname-grade{
                            .nickname{
                                font-size: 16px;
                                color: #4e5358;
                                font-weight: 700;   
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .grade{
                                margin-top: 10px;
                                img{
                                    height: 1.1em;
                                    max-width: 6em;
                                    vertical-align: -0.15em;
                                    backface-visibility: hidden;
                                }
                            }
                        }
                        .more{
                            cursor: pointer;
                            user-select: none;
                            font-size: 21px;
                            color: #8590A6;
                        }
                    }
                    .content{
                        margin-top: 15px;
                        font-size: 12px;
                        color: #8590a6;
                        line-height: 16px;
                        letter-spacing: 1px;
                    }
                    .like-date-repy{
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        .date{
                            margin-right: 10px;
                            color: #999;
                            font-size: 12px;
                        }
                        .like{
                            margin-right: 10px;
                            cursor: pointer;
                            user-select: none;
                            border-radius: 4px;
                            padding: 2px 4px;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            span{
                                margin-left: 5px;
                            }
                            color: #eb2f96;
                            background: #fff0f6;
                        }
                        .repy{
                            margin-right: 10px;
                            cursor: pointer;
                            user-select: none;
                            border-radius: 4px;
                            padding: 2px 4px;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                           
                        }
                    }
                    .repy-input{
                        margin-top: 15px;
                        display: flex;
                        .left{
                            height: 40px;
                            width: 40px;
                            border-radius: 50%;
                            img{
                                height: 100%;
                                width: 100%;
                                border-radius: 50%;
                                object-fit: cover;
                            }
                        }
                        .right{
                            margin-left: 20px;
                            flex: 1;
                            .meta{
                                margin-top: 15px;
                                display: flex;
                                justify-content: space-between;
                                
                                .action{
                                    display: flex;
                                    align-items: center;
                                    .cancel{
                                        margin-right: 10px;
                                        text-align: center;
                                        font-size: 12px;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        user-select: none;
                                        background-color: rgba(255, 0, 0, 0.1);
                                        color: #ff004c !important;
                                        height: 30px;
                                        line-height: 30px;
                                        padding: 0 16px;
                                        font-weight: 500;
                                    }
                                    .btn{
                                        text-align: center;
                                        font-size: 12px;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        user-select: none;
                                        background-color: rgba(0, 102, 255, 0.1);
                                        color: #0066ff !important;
                                        height: 30px;
                                        line-height: 30px;
                                        padding: 0 16px;
                                        font-weight: 500;
                                    }
                                }
                            }
                        }
                    }
                    .repy-list{
                        margin-top: 15px;
                        padding: 15px;
                        background: rgba(116, 116, 116, 0.08);
                        .item{
                            display: flex;
                            .left{
                                height: 30px;
                                width: 30px;
                                border-radius: 4px;
                                img{
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }
                            .right{
                                flex: 1;
                                margin-left: 10px;
                                .nickname-repyname-repot-grade{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .nickname-reyname-grade{
                                        .nickname-reyname{
                                            display: flex;
                                            align-items: center;
                                            font-size: 12px;
                                            color: #8590A6;
                                            .jian{
                                                margin: 0 5px;
                                            }
                                        }
                                        .grade{
                                            margin-top: 5px;
                                            img{
                                                height: 1.1em;
                                                max-width: 6em;
                                                vertical-align: -0.15em;
                                                backface-visibility: hidden;
                                            }
                                        }
                                    }
                                    .more{
                                        cursor: pointer;
                                        user-select: none;
                                        font-size: 21px;
                                        color: #8590A6;
                                    }
                                }

                                .content{
                                    margin-top: 15px;
                                    font-size: 12px;
                                    color: #8590a6;
                                    line-height: 16px;
                                    letter-spacing: 1px;
                                }

                                .like-date-repy{
                                    display: flex;
                                    align-items: center;
                                    margin-top: 15px;
                                    .date{
                                        margin-right: 10px;
                                        color: #999;
                                        font-size: 12px;
                                    }
                                    .like{
                                        margin-right: 10px;
                                        cursor: pointer;
                                        user-select: none;
                                        border-radius: 4px;
                                        padding: 2px 4px;
                                        font-size: 12px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            margin-left: 5px;
                                        }
                                        color: #eb2f96;
                                        background: #fff0f6;
                                    }
                                    .repy{
                                        margin-right: 10px;
                                        cursor: pointer;
                                        user-select: none;
                                        border-radius: 4px;
                                        padding: 2px 4px;
                                        font-size: 12px;
                                        display: flex;
                                        align-items: center;
                                    
                                    }
                                }

                                .repy-input{
                                    margin-top: 15px;
                                    display: flex;
                                    .left{
                                        height: 40px;
                                        width: 40px;
                                        border-radius: 50%;
                                        img{
                                            height: 100%;
                                            width: 100%;
                                            border-radius: 50%;
                                            object-fit: cover;
                                        }
                                    }
                                    .right{
                                        margin-left: 20px;
                                        flex: 1;
                                        .meta{
                                            margin-top: 15px;
                                            display: flex;
                                            justify-content: space-between;
                                            
                                            .action{
                                                display: flex;
                                                align-items: center;
                                                .cancel{
                                                    margin-right: 10px;
                                                    text-align: center;
                                                    font-size: 12px;
                                                    border-radius: 4px;
                                                    cursor: pointer;
                                                    user-select: none;
                                                    background-color: rgba(255, 0, 0, 0.1);
                                                    color: #ff004c !important;
                                                    height: 30px;
                                                    line-height: 30px;
                                                    padding: 0 16px;
                                                    font-weight: 500;
                                                }
                                                .btn{
                                                    text-align: center;
                                                    font-size: 12px;
                                                    border-radius: 4px;
                                                    cursor: pointer;
                                                    user-select: none;
                                                    background-color: rgba(0, 102, 255, 0.1);
                                                    color: #0066ff !important;
                                                    height: 30px;
                                                    line-height: 30px;
                                                    padding: 0 16px;
                                                    font-weight: 500;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    
                    }
                }
                .border{
                    border-bottom: #eee 1px solid;
                    padding-bottom: 15px;
                }
            }
        }
        .empty{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
        }
        .pagination{
            margin-top: 15px;
        }
    }
    .loading{
        margin-top: 15px;
        .skeleton-item{
            margin-bottom: 10px;
        }
    }

}
</style>

<style lang="less">
.ant-popover-inner-content{
    .emoji-box{
        display: flex;
        align-items: center;
        justify-items: center;
        z-index: 3;
        flex-flow: wrap;
        width: 230px;
        button{
            width: 14.2857%;
            height: 33px;
            background: #f5f5f5;
            border: 1px solid #fff;
            font-size: 19px;
            line-height: 33px;
            padding: 0;
            outline: none;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            font-family: font-regular,'Helvetica Neue',sans-serif;
            // border: 1px solid #ccc;
            box-sizing: border-box;
        }
    }
}
</style>