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
                <div class="desc-text">
                    申请说明
                </div>
                <div class="desc-info">
                    <p>成为版主，您可以管理板块相关实务</p>
                    <p>申请版主前，需要先满足一定要求</p>
                    <p>申请提交后，管理员会在1-2个工作日内进行审核</p>
                    <p>审核结果将会已站内信以及邮件的方式通知您，请注意查收</p>
                </div>
                <div class="input">
                    <a-textarea
                        :rows="5"
                        size="large"
                        type="text"
                        placeholder="请输入申请理由及说明"
                        v-model="content"
                    />
                </div>
            </div>
            <div v-if="!loading" class="action">
                <span>
                    <!-- {{base.currencySymbol}}{{tmpMoney}}元提现到{{accountInfo.nickName}}对应的账户 -->
                </span>
                <a-button @click="onSubmit" type="primary">
                    提交申请
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
            content: null,
            id:0
        }
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
        ...mapState(["base"]),
    },
    methods:{
        async confirm(
            id = 0
        ) {
            this.open();
            this.id = id
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
        async onSubmit(e){
            if (this.token == null) {
                this.cancel()
                this.$Auth("login","登录","快速登录")
                return
            }
            let formData = {
                forumId: this.id,
                content: this.content
            }
            
            const res = await this.$axios.post(api.postForumApplyManger,formData)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.$message.success(
                "申请版主已经提交，等待审核",
                3
            )
            this.ascertain()
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
            width: 520px;
            margin: 0 auto;
            position: relative;  
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin-top: -10%;
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
                margin-top: 30px;
                padding: 0 40px;
                .desc-text{
                    margin-bottom: 10px;
                    position: relative;
                    font-weight: 600;
                    font-size: @font-big;
                }
                .desc-text::before{
                    position: absolute;
                    content: '';
                    width: 4px;
                    background: @color-blue-main;
                    top: 10%;
                    left: -10px;
                    bottom: 10%;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px -1px  @color-blue-main;
                }
                .desc-info{
                    font-size: @font-normal;
                    color: @font-desc-color;
                    margin-top: 10px;
                    p{
                        margin-bottom: 10px;
                    }
                }
            }
            .action{
                transition: all .2s;
                height: 55px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0 40px;
                background: #f5f6f7;
                margin-top: 10px;
                border-radius: 4px;
                span{
                    margin-right: 20px;
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