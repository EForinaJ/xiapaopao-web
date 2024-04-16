<template>
    <div class="modal_box center opacity" :class="[isTrue && 'is_back_show']">
        <div class="modal_box_container">
            <div class="modal_box_title">
                <div class="modal_box_title_l">
                    <span>手机号绑定</span>
                </div>
                <div class="modal_box_title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>

            <div class="modal_box_content">
                
                <div class="input_form">
                    <div class="phone">
                        <a-input size="large"
                         v-model="form.phone"
                         placeholder="输入手机号" />
                    </div>

                    <div class="code">
                        <a-input-search 
                        v-model="form.code"
                        placeholder="请输入验证码" 
                        size="large"  @search="sendCode">
                            <a-button 
                            size="large" type="primary" 
                            :disabled="!form.show"
                            slot="enterButton">
                                {{form.content}}
                            </a-button>
                        </a-input-search>
                    </div>
                </div>

                <div class="modal_box_content_ok">
                        
                    <a-space size="middle">
                        <a-button @click="cancel">取消</a-button>
                        <a-button @click="ascertain" type="primary">
                        确定
                        </a-button>
                    </a-space>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"

export default {

    data() {
        return {
            form: {
                show: true,
                count: 0,
                content: "发送验证码",
                timer: null,
                visible:false,
                phone: null,
                code: null,
                rules:{
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern:/^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'}
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
            },
            // 登录输入框
            isTrue: false,
            state: null // 准备（prepare） 确定（ ascertain） 取消（cancel）
        };
    },
    methods: {
        async confirm(
            relatedId,
            module
        ) {
            this.relatedId = relatedId
            this.module = module
            this.open();
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare'};
                const that = this
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(that.activeList);
                            
                        } else {
                            reject(false);
                        }
                        return true
                    }
                });
                this.state = res;
            });
        },
        async sendCode(){
            if (this.form.phone == "" || this.form.phone == undefined|| this.form.phone == null) {
                this.$message.error(
                    "请先输入手机号",
                    3
                )
                return false
            }
            let pea =/^1[3456789]\d{9}$/
            // 验证手机号格式
            if (!pea.test(this.form.phone)) {
                this.$message.error(
                    "请输入正确的手机号格式",
                    3
                )
                return false
            }
            

            const TIME_COUNT = 60;
            if (!this.timer) {
            this.form.count = TIME_COUNT;
            this.form.show = false;
            this.form.timer = setInterval(() => {
                if (this.form.count > 0 && this.form.count <= TIME_COUNT) {
                        this.form.count--;
                        this.form.content = `${this.form.count}秒后重发`
                    } else {
                        this.form.show = true;
                        this.form.content = "发送验证码"
                        clearInterval(this.form.timer);
                        this.form.timer = null;
                    }
                }, 1000)
            }

            const formData = {
                account:this.form.phone,
            }
            const res = await this.$axios.post(api.sendCaptcha,formData)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
        },
        
        cancel(){
            this.state.state = "cancel"
            this.close()
        },
        async ascertain(){
            try {
                if (this.form.phone == "" || this.form.phone == undefined|| this.form.phone == null) {
                    this.$message.error(
                        "请先输入手机号",
                        3
                    )
                    return false
                }
                let pea = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
                // 验证手机号格式
                if (!pea.test(this.form.phone)) {
                    this.$message.error(
                        "请输入正确的手机号格式",
                        3
                    )
                    return false
                }
                if (this.form.code == "" || this.form.code == undefined|| this.form.code == null) {
                    this.$message.error(
                        "请输入验证码",
                        3
                    )
                    return false
                }

                const formData = {
                    phone:this.form.phone,
                    code:this.form.code,
                }
                const res = await this.$axios.post(api.postAccountUpdatephone,formData)
                this.form.phone = null
                this.form.code = null
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    this.cancel()
                }else{
                    this.$message.success(
                        "手机号修改成功",
                        3
                    )
                    this.state.state = "ascertain"
                    this.close()
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
        open() {
            this.isTrue = true;
        },
        close() {
            this.isTrue = false;
        },
        
    }
};
</script>

<style lang="less" scoped>
    .modal_box {
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
        .modal_box_container{
            background-color: #fff;
            width: 26rem;
            margin: 0 auto;
            position: relative;
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin-top: -9%;

            .modal_box_title{
                font-size: 13px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                .modal_box_title_l{
                    display: block;
                    align-items: center;
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .modal_box_content{
                padding: 40px 20px 40px 20px;
                .input_form{
                    .code{
                        margin: 30px 0;
                    }
                }

                .modal_box_content_ok{
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;
                }

            }
        }
        
    }
    .is_back_show {
        opacity: 1 !important;
        background: rgba(42, 44, 48, 0.7);
        pointer-events: auto !important;
        visibility: visible;
        transform: perspective(1px) scale(1);
        transition: visibility 0s linear 0s,opacity .15s 0s,transform .15s;
    }

    @media only screen and (max-width: 768px) {
        .modal_box{
            .modal_box_container{
                width: 100%;
            }
        }
    }
</style>