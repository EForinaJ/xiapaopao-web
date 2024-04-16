<template>
    <div class="modal_box center opacity" :class="[isTrue && 'is_back_show']">
        <div class="modal_box_container">
            <div class="modal_box_title">
                <div class="modal_box_title_l">
                    <span>站内信</span>
                </div>
                <div class="modal_box_title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>

            <div class="modal_box_content">
                <div class="modal_box_content_desc">
                    <a-textarea v-model="content" placeholder="请输入内容" :rows="4" />
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
            content:null,
            receiver:null,
            // 登录输入框
            isTrue: false,
            state: null // 准备（prepare） 确定（ ascertain） 取消（cancel）
        };
    },
    methods: {
        async confirm(userId) {
            this.receiver = userId
            this.module = module
            this.open();
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare'};
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                        return true
                    }
                });
                this.state = res;
            });
        },
        cancel(){
            this.state.state = "cancel"
            this.close()
        },
        async ascertain(){
    
            const formData = {
                content:this.content,
                receiver:this.receiver,
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
                res.message,
                3
            )
            this.receiver = null
            this.content = null
            this.state.state = "ascertain"
            this.close()
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
            width: 33rem;
            margin: 0 auto;
            position: relative;
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin-top: -9%;
            border-radius: 4px;
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
                padding: 0 20px 20px 20px;
                .modal_box_content_radio{
                    margin-bottom: 10px;
                }
                .modal_box_content_desc{
                    margin: 20px 0px;
                    h2{
                        margin-bottom: 10px;
                        font-size: 16px;
                    }
                }
                .modal_box_content_ok{
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