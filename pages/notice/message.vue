<template>
    <div class="notice-page">
        <div ref="mune" class="left">
            <div v-if="!loading">
                <ul class="list">
                    <li @click="selcet(item.userInfo.id)" v-for="(item,index) in list" :key="index" :class="item.userInfo.id == selectkey ? 'item active' : 'item'">
                        <div v-if="item.userInfo" class="avatar">
                            <img :src="item.userInfo.avatar" alt="" srcset="">
                        </div>
                        <div class="nickname-content">
                            <div v-if="item.userInfo" class="nickName">
                                {{item.userInfo.nickName}}
                            </div>
                            <div class="content">
                                {{item.content}}
                            </div>
                        </div>
                        <div class="date">
                            {{item.createTime | resetData}}
                        </div>
                    </li>
                </ul>
                <div v-if="list.length == 0" class="empty">
                    <a-config-provider :locale="locale">
                        <a-empty />
                    </a-config-provider>
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
            </div>
        </div>
        <div class="right">
            <div ref="chat" class="chat">
                <div v-if="!messageLoading">
                    <div  v-for="(item,index) in messageList" :key="index" class="list">
                        <div v-if="item.userInfo.id == selectkey" class="chat-left">
                            <div  v-if="item.isShowCreateTime == 2" class="date">
                                {{item.createTime}}
                            </div>
                            <div class="message">
                                <div class="avatar">
                                    <img :src="item.userInfo.avatar" alt="">
                                </div>
                                <span>{{item.content}}</span>
                            </div>
                        </div>
                        <div v-if="item.userInfo.id != selectkey" class="chat-right">
                            <div v-if="item.isShowCreateTime == 2" class="date">
                               {{item.createTime}}
                            </div>
                            <div class="message">
                                <span>{{item.content}}</span>
                                <div class="avatar">
                                    <img :src="item.userInfo.avatar" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="messageLoading" class="message-loading">
                    <div class="skeleton-item">
                        <a-skeleton :loading="messageLoading" :title="false" active></a-skeleton>
                    </div>
                    <div class="skeleton-item">
                        <a-skeleton :loading="messageLoading" :title="false" active></a-skeleton>
                    </div>
                    <div class="skeleton-item">
                        <a-skeleton :loading="messageLoading" :title="false" active></a-skeleton>
                    </div>
                    <div class="skeleton-item">
                        <a-skeleton :loading="messageLoading" :title="false" active></a-skeleton>
                    </div>
                    <div class="skeleton-item">
                        <a-skeleton :loading="messageLoading" :title="false" active></a-skeleton>
                    </div>
                </div>
            </div>
            <div class="input">
                <a-textarea :disabled="selectkey == 0" v-model="form.content" placeholder="写点内容吧" :rows="4" />
                <div class="send-action">
                    <div v-if="selectkey == 0"  class="btn">
                        发送
                    </div>
                    <div v-if="selectkey != 0" @click="create"  class="btn">
                        发送
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import api from "@/api/index"
export default {
    middleware: 'auth',
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            locale: zhCN,
            loading: true,
            query:{
                page: 1,
                limit: 8,
            },
            total: 0,
            list: [],
            isShow:false,

            selectkey: 0,
            messageLoading: true,
            messageList: [],
            messageTotal: 0,
            messageIsShow:false,
            messageQuery:{
                page: 1,
                limit: 5,
            },

            form:{
                content: "",
            }
        }
    },
    mounted(){
        this.loading = true
        this.getList()
        this.loading = false
        this.$refs.mune.addEventListener('scroll', this.scrollList)
        this.$refs.chat.addEventListener('scroll', this.messageScrollList)
    },
    beforeDestroy () {
        // 离开页面取消监听
        this.$refs.mune.removeEventListener('scroll', this.scrollList, false)
        this.$refs.chat.removeEventListener('scroll', this.messageScrollList, false)
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        scrollList(){
            this.$nextTick(() => {
                const scrollTop = this.$refs.mune.scrollTop;
                const windowHeight = this.$refs.mune.clientHeight;
                const scrollHeight = this.$refs.mune.scrollHeight;
                
                // //滚动条到底部的条件
                if (scrollTop+windowHeight > scrollHeight-50 && !this.isShow) {
                    this.query.page += 1
                    this.getList()
                    return
                }
                
            }); 
        },
        async getList(){
            const res = await this.$axios.get(api.postMessageList,{params: this.query})
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
        async create(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (this.selectkey == 0) {
                this.$message.error(
                    "请选择用户",
                    3
                )
                return
            }
            if (this.form.content == "") {
                this.$message.error(
                    "请写点内容",
                    3
                )
                return
            }
            const formData = {
                content:this.form.content,
                receiver:this.selectkey,
            }
            const res = await this.$axios.post(api.postMessageCreate,formData)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.$message.success(
                "发布成功",
                3
            )
            this.form.content = null
            this.messageList = [...this.messageList,res.data.info]
            this.$nextTick(() => {
                this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;  
            }); 
        },
        selcet(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.messageQuery.page = 1
            this.messageIsShow = false
            this.messageList = []
            this.messageTotal = 0
            this.selectkey = e
            
            this.messageLoading = true
            this.getMessageData()
            this.messageLoading = false
        },
        async getMessageData(){
            this.messageQuery.author = this.selectkey
            const res = await this.$axios.get(api.postMessageList,{params: this.messageQuery})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            res.data.list = res.data.list != null ? res.data.list.reverse() : []
            this.messageIsShow = res.data.list.length > 0 ? false : true
            this.messageList = [...this.messageList,...res.data.list]
            this.messageTotal = res.data.total
            this.$nextTick(() => {
                this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;  
            }); 
        },
        async getMessageList(){
            this.messageQuery.author = this.selectkey
            const res = await this.$axios.get(api.postMessageList,{params: this.messageQuery})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            res.data.list = res.data.list != null ? res.data.list.reverse() : []
            this.messageIsShow = res.data.list.length > 0 ? false : true
            this.messageList = [...res.data.list,...this.messageList]
            this.messageTotal = res.data.total
        },
        messageScrollList(){
            this.$nextTick(() => {
                const scrollTop = this.$refs.chat.scrollTop;
              
                
                // //滚动条到底部的条件
                if (scrollTop == 0 && !this.messageIsShow) {
                    this.messageQuery.page += 1
                    this.getMessageList()
                    return
                }
                
            }); 
        },
    },
}
</script>

<style lang="less" scoped>
.notice-page{
    background-color: white;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    .left{
        width: 260px;
        height: 500px;
        overflow: auto;
        scrollbar-width: none;
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
            
            .item{
                cursor: pointer;
                user-select: none;
                padding: 10px;
                display: flex;
                border-radius: 4px;
                .avatar{
                    border-radius: 4px;
                    width: 40px;
                    height: 40px;
                    img{
                        border-radius: 4px;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .nickname-content{
                    flex: 1;
                    margin-left: 10px;
                    .nickName{
                        font-size: 13px;
                        font-weight: bold;
                        color: #777;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .content{
                        margin-top: 8px;
                        font-size: 12px;
                        color: #999;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .date{
                    color: #b1b1b1;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .item:hover{
                border-radius: 4px;
                background: rgba(0, 102, 255, 0.04);
            }
            .active{
                border-radius: 4px;
                background: rgba(0, 102, 255, 0.04);
            }
        }
    }
    .right{
        flex: 1;
        margin-left: 20px;
        .chat{
            overflow: auto;
            // scrollbar-width: none;
            height: 400px;
            background: #eee;
            border-radius: 4px;
            .list{
                padding: 15px;
                .chat-left{
                    .date{
                        color: #888;
                        font-size: 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .message{
                        margin-top: 10px;
                        margin-bottom: 15px;
                        display: flex;
                        .avatar{
                            border-radius: 4px;
                            width: 32px;
                            height: 32px;
                            img{
                                border-radius: 4px;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        span{
                            background: #fff;
                            max-width: calc(80% - 60px);
                            display: inline-block;
                            word-wrap: break-word;
                            white-space: pre-wrap;
                            padding: 8px 10px;
                            border-radius: 4px;
                            margin: 0 8px;
                            position: relative;
                            text-align: left;
                            min-height: 32px;
                            min-width: 32px;
                        }
                        span::before{
                            content: ' ';
                            display: inline-block;
                            width: 9px;
                            height: 9px;
                            background: #fff;
                            position: absolute;
                            top: 12px;
                            transform: rotate(45deg);
                            left: -4px;
                            border-radius: 2px;
                        }
                    }
                }
                .chat-right{
                    .date{
                        color: #888;
                        font-size: 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .message{
                        margin-top: 10px;
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: flex-end;
                        .avatar{
                            border-radius: 4px;
                            width: 32px;
                            height: 32px;
                            img{
                                border-radius: 4px;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        span{
                            background: #fff;
                            max-width: calc(80% - 60px);
                            display: inline-block;
                            word-wrap: break-word;
                            white-space: pre-wrap;
                            padding: 8px 10px;
                            border-radius: 4px;
                            margin: 0 8px;
                            position: relative;
                            text-align: left;
                            min-height: 32px;
                            min-width: 32px;
                        }
                        span::before{
                            content: ' ';
                            display: inline-block;
                            width: 9px;
                            height: 9px;
                            background: #fff;
                            position: absolute;
                            top: 12px;
                            transform: rotate(45deg);
                            right: -4px;
                            border-radius: 2px;
                        }
                    }
                }
            }

            .message-loading{
                padding: 10px 20px;
                .skeleton-item{
                    margin-bottom: 20px;
                }
            }
        }
        .input{
            margin-top: 15px;
            /deep/ .ant-input{
               
                border: 0;
                outline: none;
                background: #f5f6f7;
                // box-shadow: none !important;
            }
            .send-action{
                margin-top: 15px;
                display: flex;
                justify-content: flex-end;
                .btn{
                    user-select: none;
                    cursor: pointer;
                    display: inline-block;
                    transition: .15s;
                    border: 1px solid transparen;
                    vertical-align: middle;
                    padding: 0.3em 0.6em;
                    text-shadow: 0 0 0;
                    line-height: 1.44;
                    border-radius: 4px;
                    transition: .15s;
                    padding-right: 1em;
                    padding-left: 1em;
                    color: #2997f7;
                    font-size: 13px;
                    background:rgba(41, 151, 247, 0.1);
                }
            }
        }
    }
}
</style>