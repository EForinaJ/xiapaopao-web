<template>
    <div class="account-page">
        <div class="header">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="12">
                    <div class="box">
                        <div class="text">
                            <FIcon :size="24" type="icon-yibaoyue"/>
                            <span>余额</span>
                        </div>
                        <div class="num-btn">
                            <div class="num">
                                <a-statistic valueStyle="color: #5c7cff;" :value="accountInfo.balance">
                                    <template #suffix>
                                        <FIcon color="#5c7cff" :size="16" type="icon-rmb"/>
                                    </template>
                                </a-statistic>
                            </div>
                            <div class="btn">
                                <div @click="cash" class="btn-ac tx">
                                    <span>提现</span>
                                </div>
                                <div  @click="recharge" class="btn-ac cz">
                                    <span>充值</span>
                                </div>
                            </div>
                        </div>
                        <div class="desc">
                            可用余额
                        </div>
                    </div>
                </a-col>
                <a-col :span="24" :md="12">
                    <div class="box">
                        <div class="text">
                            <FIcon :size="24" type="icon-jifenquanicon"/>
                            <span>积分</span>
                        </div>
                        <div class="num-btn">
                            <div class="num">
                                <a-statistic valueStyle="color: #ff6373;" :value="accountInfo.integral">
                                    <template #suffix>
                                        <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                    </template>
                                </a-statistic>
                            </div>
                            <div class="btn">
                                <div @click="integral" class="btn-ac gmjf">
                                    <span>购买积分</span>
                                </div>
                            </div>
                        </div>
                        <div class="desc">
                            做任务赚积分
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="content">
            <div class="menu">
                <ul class="list">
                    <li @click="goRouter('/order')" :class="selectKey == '/order' ? 'active item' : 'item'">
                        <span>
                            订单记录
                        </span>
                    </li>
                    <li @click="goRouter('/')" :class="selectKey == '/' ? 'active item' : 'item'">
                        <span>
                            充值记录
                        </span>
                    </li>
                    <li @click="goRouter('/withdraw')" :class="selectKey == '/withdraw' ? 'active item' : 'item'">
                        <span>
                            提现记录
                        </span>
                    </li>
                    <li @click="goRouter('/integral')" :class="selectKey == '/integral' ? 'active item' : 'item'">
                        <span>
                            积分记录
                        </span>
                    </li>
                    <li @click="goRouter('/task')" :class="selectKey == '/task' ? 'active item' : 'item'">
                        <span>
                            积分任务
                        </span>
                    </li>
                </ul>
            </div>
            <div class="panel">
                <transition name="page-transition">
                    <!-- <Nuxt /> -->
                    <nuxt-child></nuxt-child>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState,mapActions } from "vuex"

import FIcon from '@/components/icon/FIcon'
export default {
    middleware: 'auth',
    components:{
        FIcon,
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            selectKey:'',
            integralAndExperience: null,
        }
    },
    mounted(){
        this.updateMenu()
        this.getIntegralAndExperience()
    },
    methods:{
        ...mapActions('user',['A_UPDATE_INTEGRAL','A_UPDATE_BALANCE']),
        async getIntegralAndExperience(){
            const res = await this.$axios.get(api.getSystemIntegralAndExperience)     
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.integralAndExperience = res.data.info
        },
        integral(){
            this.$Integral().then(async (res)=>{
                if (res) {
                    // res * integralAndExperience.moneyToIntegral
                    this.A_UPDATE_INTEGRAL(this.accountInfo.integral + (res * this.integralAndExperience.moneyToIntegral))
                    this.A_UPDATE_BALANCE(this.accountInfo.balance - res)
                }
            }).catch((err)=>{
                // this.getData()
            })
        },
        recharge(){
            this.$Recharge().then((res)=>{
                if (res) {
                    this.getBlance()
                    if (this.type == 2) {
                        // this.getData()
                    }
                }
            }).catch((err)=>{
                // this.getData()
            })
        },
        cash(){
            this.$Withdraw(this.accountInfo.balance).then((res)=>{
                if (res) {
                    this.$message.success(
                        "提现申请提交成功",
                        3
                    )
                    return
                }
            }).catch((err)=>{
                (err)
            })
        },
        
        updateMenu () {
          if (this.$route.path != "/404") {
            const routes = this.$route.matched.concat()
            this.selectKey = routes.pop().path.slice(15)
          }
        },
        goRouter(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
            }else{
                this.selectKey = e
                this.$router.push('/account/wallet'+e)
            }
        }
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
    }
}
</script>

<style lang="less" scoped>
.account-page{
    

    .header{
        margin-bottom: 20px;
        .box{
            background-color: white;
            border-radius: 4px;
            padding: 15px 20px;

            .text{
                display: flex;
                align-items: center;
                span{
                    margin-left: 10px;
                }
            }
            .num-btn{
                margin-top: 20px;  
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btn{
                    display: flex;
                    align-items: center;
                    .btn-ac{
                        cursor: pointer;
                        user-select: none;
                        margin-left: 10px;
                        display: flex;
                        align-items: center;
                        padding: 6px 15px;
                        border-radius: 4px;
                    }
                    .tx{
                        border: 1px #5c7cff solid;
                        color: #5c7cff;
                    }
                    .cz{
                        color: white;
                        background-color:#5c7cff;
                    }
                    .gmjf{
                        color: #ff6373;
                        border: 1px #ff6373 solid;
                    }
                }
            }
            .desc{
                margin-top: 10px;
                font-size: 12px;
                color: #777;

            }
        }
    }

    

    .content{
        background-color: white;
        border-radius: 4px;
        margin-bottom: 20px;
        .menu{
            .list{
                padding-top: 10px;
                display: flex;
                align-items: center;
                padding-bottom: 6px;
                border-bottom: 1px solid rgba(50, 50, 50, 0.06);
                .item{
                    position: relative;
                    padding-bottom: 8px;
                    cursor: pointer;
                    user-select: none;
                    padding-left: 5px;
                    margin: 0;
                    padding-right: 5px;
                    line-height: 1.4;
                    color: #999;
                    span{
                        padding: 0 5px;
                    }
                }
                .item::before{
                    width: 20px;
                    height: 2px;
                    bottom: 0;
                    opacity: 0;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px -1px #155bd5;
                    background: #155bd5;
                    position: absolute;
                    content: '';
                    transition: .4s;
                    left: 0;
                    right: 0;
                    margin: auto;
                    transform-origin: center;
                }
                .item:hover{
                    color: #155bd5;
                }
                .active{
                    color: #155bd5;
                }
                .active::before{
                    opacity: 1;
                }
            }
        }
        .panel{
            .page-transition-enter-active ,.page-transition-leave-active{
                transition: opacity 1s;
            }
            .page-transition-enter ,.page-transition-leave-to{
                opacity: 0;
            }
        }
    }
}
</style>