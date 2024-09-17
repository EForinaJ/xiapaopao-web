<template>
    <div class="recaptcha_box center opacity"
        :class="[isTrue && 'is_back_show']">
        <div class="container">
            <div class="title">
                <div class="title_l">
                    <span>查看版主</span>
                </div>
                <div class="title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>

            <div v-if="loading" class="loading">
                <a-spin size="large" tip="加载中..."/>
            </div>

            <div v-if="!loading" class="list">
                <div class="item">
                    <div @click="goPath(`/user/${superManger.id}`)" class="avatar">
                        <a-avatar :size="38" :src="superManger.avatar | resetImage(base.url,38,38)" />
                    </div>
                    <div class="name-info">
                        <div @click="goPath(`/user/${superManger.id}`)" class="name-grade">
                            <div class="name">
                                {{superManger.nickName}}
                            </div>
                            <div v-if="superManger.grade != null" class="grade">
                                <img :src="superManger.grade.icon" alt="">
                            </div>
                        </div>
                        <div class="manger">
                            <div class="text">
                                超级版主
                            </div>
                        </div>
                    </div>
                    <div v-if="this.accountInfo.id != superManger.id" @click="mnagerfollow(superManger.id)" class="btn-act">
                        <div class="icon">
                            <a-icon type="plus" />
                        </div>
                        <div class="text">
                            {{superManger.isFollow ? '取消关注' : '关注'}}
                        </div>
                    </div>
                </div>
                <div v-for="(item,index) in list" :key="index" class="item">
                    <div @click="goPath(`/user/${item.id}`)" class="avatar">
                        <a-avatar :size="38" :src="item.avatar | resetImage(base.url,38,38)" />
                    </div>
                    <div class="name-info">
                        <div @click="goPath(`/user/${item.id}`)" class="name-grade">
                            <div class="name">
                                {{item.nickName}}
                            </div>
                            <div v-if="item.grade != null" class="grade">
                                <img :src="item.grade.icon" alt="">
                            </div>
                        </div>
                        <div class="manger">
                            <div class="text">
                                版主
                            </div>
                        </div>
                    </div>
                    <div @click="follow(item.id,index)" class="btn-act">
                        <div class="icon">
                            <a-icon type="plus" />
                        </div>
                        <div class="text">
                            {{item.isFollow ? '取消关注' : '关注'}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!loading" class="action">
                <a-button block @click="onSubmit" type="primary">
                    申请版主
                </a-button>
            </div>
        </div>
    </div>
</template>



<script>
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    data(){
        return{
            isTrue: false,
            state: null, // 准备（prepare） 确定（ ascertain） 取消（cancel）
            
            loading: false,
            id: 0,
            list:[],
            superManger:{
                avatar:''
            }
        }
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
        ...mapState(["base"]),
    },
    methods:{
        async confirm(
            id = 0,
            superManger = null
        ) {
            this.open();
            this.id = id
            this.superManger = superManger
            this.getManger()
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare' };
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                        return true;
                    }
                });
                this.state = res;
            });
        },
        async getManger(){
            this.loading = true
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
            this.list = res.data.list ?? []
            this.loading = false
        },
        async mnagerfollow(id){
            if (this.token == null) {
                this.cancel()
                this.$Auth("login","登录","快速登录")
                return
            }
            if (this.accountInfo.id == id) {
                this.$message.error(
                    "自己不要关注自己",
                    3
                )
                return
            }
            if (!this.accountInfo.grade.auth.includes("follow")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            
            this.superManger.isFollow = !this.superManger.isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                this.superManger.isFollow = !this.superManger.isFollow
                return
            }
        },
        goPath(path){
            this.cancel()
            this.$router.push(path)
        },
        async follow(id,index){
            if (this.token == null) {
                this.cancel()
                this.$Auth("login","登录","快速登录")
                return
            }
            if (!this.accountInfo.grade.auth.includes("follow")) {
                this.$message.error(
                    "你的等级还无此权限",
                    3
                )
                return
            }
            
            this.list[index].isFollow = !this.list[index].isFollow
            const res = await this.$axios.post(api.postUserFollow,{id:id})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                this.list[index].isFollow = !this.list[index].isFollow
                return
            }
        },
        onSubmit(e){
            this.cancel()
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$MangerCreate(this.id).then((res)=>{
                if (res != false) {
                //    this.$emit("getData")
                }
            }).catch((err)=>{
               
            })
        },
        cancel(){
            this.state.state = 'cancel'
            this.close()
        },
        ascertain(){
            this.state.state = "ascertain"
            this.close()
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
            width: 420px;
            margin: 0 auto;
            position: relative;  
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin-top: -9%;
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
            .list{
                padding: 20px;
                max-height: 50vh;
                overflow-x: hidden;
                overflow-y: auto;
                .item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    .avatar{
                        cursor: pointer;
                        margin-right: 10px;
                    }
                    .name-info{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .name-grade{
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            .name{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                color: @font-gray-color;
                                font-size: @font-normal;
                            }
                            .grade{
                                margin-left: 10px;
                                height: 1em;
                                max-width: 5em;
                                vertical-align: -0.15em;
                                -webkit-backface-visibility: hidden;
                                backface-visibility: hidden;
                                display: inline-block;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                }
                            }
                        }
                        .manger{
                            margin-top: 5px;
                            display: flex;
                            .text{
                                background: @bg-blue-main;
                                color: @color-blue-main;
                                padding: 2px 4px;
                                border-radius: 4px;
                                font-size: @font-small;
                                
                            }
                        }
                    }
                    .btn-act{
                        display: flex;
                        align-items: center;
                        color: @color-blue-main;
                        cursor: pointer;
                        user-select: none;
                        padding: 4px 5px;
                        .icon{
                            margin-right: 5px;
                        }
                        .text{
                            font-size: @font-small;
                        }
                    }
                }
            }
            .action{
                padding: 10px 20px;
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