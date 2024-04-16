<template>
    <div class="recaptcha_box center opacity"
        :class="[isTrue && 'is_back_show']">
        <div class="container">
            <div class="title">
                <div class="title_l">
                    <span>预约申请</span>
                </div>
                <div class="title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>
            <div class="from">
                <a-form-model ref="form" :model="form" :rules="form.rules" class="form">

                    <!-- 方式 -->
                    <a-form-model-item ref="contactMode" prop="contactMode">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                   联系方式
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                 <a-radio-group v-model="form.contactMode" buttonStyle="solid" >
                                    <a-radio-button :value="1">
                                        QQ
                                    </a-radio-button>
                                    <a-radio-button :value="2">
                                        微信
                                    </a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </a-form-model-item>
                    
                    <!-- 账号 -->
                    <a-form-model-item ref="contactNumber" prop="contactNumber">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    联系账号
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-input size="large"
                                    v-model="form.contactNumber" 
                                    placeholder="请输入联系账号" />
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 类型 -->
                    <a-form-model-item ref="type" prop="type">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                   预约类型
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                 <a-radio-group v-model="form.type" buttonStyle="solid" >
                                    <a-radio-button :value="1">
                                        陪玩
                                    </a-radio-button>
                                    <a-radio-button :value="2">
                                        代练
                                    </a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </a-form-model-item>
                    <!-- 周期 -->
                    <a-form-model-item ref="timeLimit" prop="timeLimit">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    预约周期
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                               <a-input-number size="large" 
                                    :placeholder="form.type == 1 ? '单位小时' : '单位天'"
                                    v-model="form.timeLimit" 
                                    :style="{ width: '100%' }"  
                                    :min="0" 
                                    :max="100000"
                                    />
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    

                    <!-- 预约时间 -->
                    <a-form-model-item v-if="form.type == 1" ref="reservationTime" prop="reservationTime">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    预约时间
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-input size="large"
                                    v-model="form.reservationTime" 
                                    placeholder="格式（2023-8-8 20:00）" />
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 登录平台 -->
                    <a-form-model-item v-if="form.type == 2" ref="gamePlatform" prop="gamePlatform">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    登录平台
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-input size="large"
                                    v-model="form.gamePlatform" 
                                    placeholder="例如（steam）" />
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <a-form-model-item  ref="isLive" prop="isLive">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                   是否需要直播
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                 <a-radio-group v-model="form.isLive" buttonStyle="solid" >
                                    <a-radio-button :value="1">
                                        否
                                    </a-radio-button>
                                    <a-radio-button :value="2">
                                        是
                                    </a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 预算费用 -->
                    <a-form-model-item ref="price" prop="price">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    预算费用
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                               <a-input-number size="large" 
                                   
                                    placeholder="请输入提现金额"
                                    v-model="form.price" 
                                    :style="{ width: '100%' }"  
                                    :min="0" 
                                    :max="100000"
                                    :precision="2"/>
                            </a-col>
                        </a-row>
                    </a-form-model-item>


                    <!-- 游戏分类 -->
                    <a-form-model-item ref="money" prop="money">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    游戏分类
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-select 
                                    size="large" 
                                    placeholder="请选择分类"
                                    v-model="form.cateId" 
                                >
                                    <a-select-option 
                                    v-for="(item,index) in cateList" 
                                    :key="index"
                                    :value="item.cateId"
                                    >
                                        {{item.title}}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 备注 -->
                    <a-form-model-item ref="description" prop="description">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    备注信息
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-textarea 
                                    :rows="6"
                                    v-model="form.description" 
                                    placeholder="请输入备注（格式：匹配或者排位，等具体信息）" />
                            </a-col>
                        </a-row>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <div class="action">
                <a-button @click="onSubmit" type="primary">
                    提交预约
                </a-button>
            </div>
        </div>
    </div>
</template>

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
            width: 620px;
            margin: 0 auto;
            position: relative;  
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            .title{
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
                padding: 40px;
                .from-title{
                    font-size: 16px;
                    font-weight: 700;
                }
                .from-money{
                    font-size: 22px;
                    font-weight: 700;
                }
                .from-service{
                    font-size: 12px;
                    line-height: 22.5px;
                    color: #8590a6;
                }
            }
            .action{
                height: 55px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0 40px;
                background: #f5f6f7;
                margin-top: 30px;
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

<script>
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    data(){
        return{
            isTrue: false,
            state: null, // 准备（prepare） 确定（ ascertain） 取消（cancel）
            cateList:[],

            form:{
                contactMode:undefined,
                contactNumber:undefined,
                type: undefined,
                timeLimit: undefined,
                reservationTime:undefined,
                gamePlatform:undefined,
                isLive:undefined,
                price:undefined,
                cateId:undefined,
                description:undefined,
                wokeUserId:undefined,
                rules:{
                    contactMode:[
                        { required: true, message: '请设置联系方式', trigger: 'blur' }
                    ],
                    contactNumber:[
                        { required: true, message: '请输入联系账号', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ],
                    timeLimit:[
                        { required: true, message: '请输入周期', trigger: 'blur' }
                    ],
                    price:[
                        { required: true, message: '请输入预算费用', trigger: 'blur' }
                    ],
                    cateId:[
                        { required: true, message: '请选择分类', trigger: 'blur' }
                    ],
                    isLive:[
                        { required: true, message: '请选择是否需要直播', trigger: 'blur' }
                    ],
                    description:[
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                },
            },
        }
    },
    computed:{
        ...mapState("user",["userInfo"]),
        ...mapState(["base","pay"]),
    },
    methods:{
        async confirm(id = 0) {
            this.form.wokeUserId = id
            const res = await this.$axios.get(api.getProjectMeta)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            
            this.cateList = res.data.cateList || []
            
            this.open();
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
        onSubmit(e){
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const res = await this.$axios.post(api.postReservationCreate,this.form)
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.$message.success(
                        "预约申请提交成功",
                        3
                    )
                    this.form.contactMode = undefined
                    this.form.contactNumber = undefined
                    this.form.type = undefined
                    this.form.timeLimit = undefined
                    this.form.reservationTime = undefined
                    this.form.gamePlatform = undefined
                    this.form.isLive = undefined
                    this.form.price = undefined
                    this.form.cateId = undefined
                    this.form.description = undefined
                    this.form.wokeUserId = undefined
 
                    this.ascertain()
                } else {
                    return false;
                }
            });
        },

        onChange(date, dateString){
            (date, dateString);
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