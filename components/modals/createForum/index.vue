<template>
    <div class="recaptcha_box center opacity"
        :class="[isTrue && 'is_back_show']">
        <div class="container">
            <div class="title">
                <div class="title_l">
                    <span>创建版块</span>
                </div>
                <div class="title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>

            <div v-if="!loading" class="loading">
                <a-spin size="large" tip="加载中..."/>
            </div>

            <div v-if="loading" class="from">
                <a-form-model ref="form" :model="form" :rules="form.rules">
                    
                    <div class="from-cover">
                        <div v-if="form.cover == ''" @click="selectImg" class="mark">
                            <div class="icon">
                                <a-icon theme="filled" type="camera" />
                            </div>
                        </div>
                        <div v-if="form.cover != ''" @click="selectImg"  class="cover-img-btn">
                            <div class="cover-img" :style="{ backgroundImage: `url(${form.cover})@w900_h330` }"></div>
                            <div class="icon">
                                <div class="icon-info">
                                    <a-icon theme="filled" type="camera" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 版块标题 -->
                    <a-form-model-item ref="title" prop="title">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    版块标题
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-input size="large"
                                    v-model="form.title" 
                                    placeholder="请输入版块标题" />
                            </a-col>
                        </a-row>
                    </a-form-model-item>
                    
                    <a-form-model-item ref="categoryId" prop="categoryId">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    版块分类
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-select 
                                    placeholder="请选择版块分类"
                                    size="large"
                                    v-model="form.categoryId" 
                                    style="width: 100%">
                                    <a-select-option  v-for="(item,index) in categoryList"
                                     :key="index" 
                                     :value="item.id">
                                        {{item.title}}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-form-model-item>


                    <a-form-model-item ref="postAuth" prop="postAuth">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    发布权限
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-radio-group size="large"
                                    placeholder="发布权限"
                                    v-model="form.postAuth"
                                    button-style="solid">
                                    <a-radio-button :value="1">
                                        无限制
                                    </a-radio-button>
                                    <a-radio-button :value="2">
                                        管理员
                                    </a-radio-button>
                                    <a-radio-button :value="3">
                                        加入成员
                                    </a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <a-form-model-item ref="description" prop="description">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    版块描述
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-textarea
                                    :rows="5"
                                    size="large"
                                    type="text"
                                    placeholder="请输入描述"
                                    v-model="form.description"
                                />
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                </a-form-model>
            </div>
            <div v-if="loading" class="action">
                <span>
                    <!-- {{base.currencySymbol}}{{tmpMoney}}元提现到{{accountInfo.nickName}}对应的账户 -->
                </span>
                <a-button @click="onSubmit" type="primary">
                    确认创建
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
            categoryList:[],
            form:{
                title:undefined,
                cover:undefined,
                isAuditing:undefined,
                description:undefined,
                // slug:undefined,
                categoryId:undefined,
                postAuth:undefined,
                rules:{
                    title:[
                        { required: true, message: '请选输入玩家名称', trigger: 'change' },
                    ],
                    description:[
                        { required: true, message: '请选输入简单描述', trigger: 'change' },
                    ],
                    categoryId:[
                        { required: true, message: '请选择分类', trigger: 'change' },
                    ],
                    isAuditing:[
                        { required: true, message: '请设置内容发布后是否需要审核', trigger: 'change' },
                    ],
                    postAuth:[
                        { required: true, message: '请设置内容发布权限', trigger: 'change' },
                    ],
                },
            },
        }
    },
    computed:{
        ...mapState("user",["accountInfo"]),
        ...mapState(["base"]),
    },
    methods:{
        async confirm(
        ) {
            this.open();
            this.getCategroy()
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
        async getCategroy(){
            this.loading = false
            const res = await this.$axios.get(api.getCategoryAll,
                {
                    params:{module:"forum"}
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
            this.loading = true
        },
        selectImg(){
            this.close()
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.open()
                    this.form.cover = res 
                    console.log(this.form)
                }
            }).catch((err)=>{
                this.open()
               this.form.cover = null
                // this.createForm.link = null
            })
            
        },
        onSubmit(e){
            this.$refs.form.validate(async valid => {
                if (valid) {
                    
                    let formData = {}
                    formData = Object.assign(formData,this.form)
                    const res = await this.$axios.post(api.postForumCreate,formData)
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.$message.success(
                        "版块创建已提交，等待审核",
                        3
                    )
                    this.ascertain()
                } else {
                    return false;
                }
            });
        },
        cancel(){
            this.form.title = null
            this.form.cover = null
            this.form.isAuditing = null
            this.form.categoryId = null
            this.form.description = null
            this.state.state = 'cancel'
            this.close()
        },
        ascertain(){
            this.form.title = null
            this.form.cover = null
            this.form.isAuditing = null
            this.form.categoryId = null
            this.form.description = null
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
            width: 620px;
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
            .from{
                 .from-cover{
                    margin-bottom: 20px;
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
                        height: 100px;
                        width: 100%;
                        position: relative;
                        .cover-img{
                            position: absolute;
                            top: 0;
                            height: 100px;
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
                            height: 100px;
                            width: 100%;
                            
                            .icon-info{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                i{
                                    color: white;
                                    font-size: 18px;
                                }
                                height: 35px;
                                width: 35px;
                                border-radius: 50%;
                                background: rgba(0,0,0,.5);
                            }
                        }
                        
                    }
                }
                transition: all .2s;
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
                transition: all .2s;
                height: 55px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0 40px;
                background: #f5f6f7;
                margin-top: 30px;
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