<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2024-03-17 20:30:29
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-18 18:00:11
 * @FilePath: \web\pages\account\binding.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="account-page">
        <div class="list">
            <div class="text">
                <h2>邮箱绑定</h2>
                <p>绑定邮箱账号，及时接收订单、审核等重要信息</p>
            </div>
            <a-row :gutter="[30,30]">
                <a-col :span="24" :md="8">
                    <div class="item">
                        <div class="icon-text-desc">
                            <div class="icon bgcolor-info">
                                <FIcon color="rgba(255, 255, 255)" :size="18" type="icon-email1"/>
                            </div>
                            <div class="item-text">
                                邮箱
                            </div>
                            <div class="desc">
                                {{email ? '已经绑定' : '暂未绑定'}}
                            </div>
                        </div>
                        <div class="btn" @click="openEmail">
                            绑定
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="list">
            <div class="text">
                <h2>手机号绑定</h2>
                <p>绑定手机号，提高账户安全性</p>
            </div>
            <a-row :gutter="[30,30]">
                <a-col :span="24" :md="8">
                    <div class="item">
                        <div class="icon-text-desc">
                            <div class="icon bgcolor-blue">
                                <FIcon color="rgba(255, 255, 255)" :size="18" type="icon-phone"/>
                            </div>
                            <div class="item-text">
                                手机
                            </div>
                            <div class="desc">
                                {{phone ? '已经绑定' : '暂未绑定'}}
                            </div>
                        </div>
                        <div @click="openPhone" class="btn">
                            绑定
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="list">
            <div class="text">
                <h2>社交账号</h2>
                <p>绑定社交账号，您可更安全、更快速的登录本站</p>
            </div>
            <a-row :gutter="[30,30]">
                <a-col :span="24" :md="8">
                    <div class="item">
                        <div class="icon-text-desc">
                            <div class="icon bgcolor-info">
                                <FIcon color="rgba(255, 255, 255)" :size="18" type="icon-QQ"/>
                            </div>
                            <div class="item-text">
                                QQ
                            </div>
                            <div class="desc">
                                {{qq ? '已经绑定' : '暂未绑定'}}
                            </div>
                        </div>
                        <div @click="openOauth" class="btn">
                            绑定
                        </div>
                    </div>
                </a-col>
                <a-col :span="24" :md="8">
                    <div class="item">
                        <div class="icon-text-desc">
                            <div class="icon bgcolor-gree">
                                <FIcon color="rgba(255, 255, 255)" :size="18" type="icon-weixin"/>
                            </div>
                            <div class="item-text">
                                微信
                            </div>
                            <div class="desc">
                                {{weChat ? '已经绑定' : '暂未绑定'}}
                            </div>
                        </div>
                        <div @click="openOauth" class="btn">
                            绑定
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="list">
            <div class="text">
                <h2>账户密码</h2>
                <p>定期修改密码有助于账户安全</p>
            </div>
            <a-row :gutter="[30,30]">
                <a-col :span="24" :md="8">
                    <div class="item">
                        <div class="icon-text-desc">
                            <div class="icon bgcolor-grey">
                                <FIcon color="rgba(255, 255, 255)" :size="18" type="icon-lock"/>
                            </div>
                            <div class="item-text">
                                密码
                            </div>
                            <div class="desc">
                                {{passWord ? '已设置' : '未设置'}}
                            </div>
                        </div>
                        <div @click="openPassword" class="btn">
                            修改
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
export default {
    middleware: 'auth',
    head () {
        return {
            title: `账户安全-${this.base.title} - ${this.base.childTitle}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    components:{
        FIcon,
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            email:false,
            phone:false,
            qq:false,
            weChat:false,
            passWord:false,
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            try {
                const res = await this.$axios.get(api.getAccountSecurity)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.email = res.data.info.email
                this.phone = res.data.info.phone
                this.qq = res.data.info.qq
                this.weChat = res.data.info.weChat
                this.passWord = res.data.info.passWord
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        openEmail(){
            this.$Email().then((res)=>{
                this.email = true
            }).catch((err)=>{
                (err)
            })
        },
        openPassword(){
            this.$Password().then((res)=>{
                this.passWord = true
            }).catch((err)=>{
                (err)
            })
        },
        openPhone(){
            this.$message.error(
                "此功能正在开发中。。。。",
                3
            )
            return
            // this.$Phone().then((res)=>{
            //     this.phone = true
            // }).catch((err)=>{
            //     (err)
            // })
        },
        openOauth(){
            this.$message.error(
                "此功能正在开发中。。。。",
                3
            )
            return
        }
    }
}
</script>

<style lang="less" scoped>
.account-page{
    background-color: white;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 15px 20px;
    .text{
        position: relative;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 20px ;
        p{
            font-size: 12px;
            color: #999;
            margin-top: 8px;
            margin-left: -10px;
        }
    }
    .text::before{
        content: '';
        width: 4px;
        height: 18px;
        position: absolute;
        left: 10px;
        top: 13px;
        background-color: #0066ff;
        border-radius: 4px;
    }
    .list{
        margin-bottom: 20px;
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.03);
        .icon-text-desc{
            flex: 1;
            display: flex;
            align-items: center;
            .icon{
                height: 40px;
                width: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .item-text{
                font-size: 16px;
                font-weight: 700;
                margin-left: 10px;
            }
            .desc{
                margin-left: 30px;
                font-size: 12px;
                color: #999;
            }
        }
        .btn{
            cursor: pointer;
            user-select: none;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            color: #2997f7;
            border: 1px #2997f7 solid;
        }
    }
    
}
</style>