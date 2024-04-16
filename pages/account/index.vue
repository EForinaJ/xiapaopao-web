<template>
    <div class="account-page">
        <a-row>
            <a-col :span="18" :offset="6">
                <div class="avatar-box">
                    <div class="avatar">
                        <img :src="accountInfo.avatar | resetImage(80,80)" alt="" srcset="">
                    </div>
                    <div class="info">
                        <div class="nickname-btn">
                            <h2>{{accountInfo.nickName}}</h2>
                            <div @click="uploadAvatar" class="btn">
                                上传头像
                            </div>
                            <div @click="uploadCover" class="btn">
                                上传背景
                            </div>
                        </div>
                        <div class="create-time">
                            <span>注册时间:</span>
                            <span>{{accountInfo.createTime}}</span>
                        </div>
                        <div class="create-time">
                            <span>最后登录时间:</span>
                            <span>{{accountInfo.loginTime}}</span>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
        
        <div class="form">
            <a-form-model
            layout="horizontal"
            ref="form"
            :model="form" 
            :rules="form.rules">
                <!-- 用户名 -->
                <a-form-model-item 
                :label-col="{ span: 5}"
                :wrapper-col="{ span: 18,offset:1  }"
                label="用户昵称"
                ref="nickName" 
                prop="nickName">
                    <a-input 
                    :maxLength="40" 
                    size="large" 
                    v-model="form.nickName" 
                    placeholder="请输入用户名称"/>
                </a-form-model-item>

                <!-- 性别 -->
                <a-form-model-item 
                :label-col="{ span: 5}"
                :wrapper-col="{ span: 18,offset:1  }"
                label="性别"
                ref="sex" 
                prop="sex">
                    <a-radio-group  
                    size="large"
                    placeholder="请选择性别"
                    v-model="form.sex">
                        <a-radio :value="1">
                            男
                        </a-radio>
                        <a-radio :value="2">
                            女
                        </a-radio>
                        <a-radio :value="3">
                            未知
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>


                <!-- 用户简介 -->
                <a-form-model-item 
                :label-col="{ span: 5}"
                :wrapper-col="{ span: 18,offset:1  }"
                label="用户简介"
                ref="description" 
                prop="description">
                    <a-textarea 
                    :rows="4" 
                    :maxLength="40" 
                    v-model="form.description" 
                    placeholder="请输入用户简介"/>
                </a-form-model-item>
            
                <a-form-model-item
                    :wrapper-col="{ span: 18,offset:6  }">
                    <a-button @click="onSubmit" icon="check" type="primary">
                        确认修改
                    </a-button>
                </a-form-model-item>
                
            </a-form-model>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState,mapActions } from "vuex"
export default {
    middleware: 'auth',
    head () {
        return {
            title: `个人资料-${this.base.title} - ${this.base.childTitle}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            form:{
                avatar:undefined,
                cover:undefined,
                nickName:undefined,
                description:undefined,
                sex:undefined,
                rules:{
                    title:[
                        { required: true, message: '请选输入玩家名称', trigger: 'change' },
                    ],
                    description:[
                        { required: true, message: '请选输入简单描述', trigger: 'change' },
                    ],
                    cateId:[
                        { required: true, message: '请选择分类', trigger: 'change' },
                    ],
                },
            },
        }
    },
    mounted(){
        this.resetData()
    },
    methods:{
        ...mapActions("user",["A_UPDATE_AVATAR","A_UPDATE_COVER","A_UPDATE_NICKNAME"]),
        resetData(){
            this.form.avatar =  this.accountInfo.avatar
            this.form.cover =  this.accountInfo.cover
            this.form.nickName =  this.accountInfo.nickName
            this.form.description =  this.accountInfo.description
            this.form.sex =  this.accountInfo.sex
        },
        uploadAvatar(){
            
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.avatar = res
                    this.A_UPDATE_AVATAR(this.form.avatar)
                }
            }).catch((err)=>{
                (err)
            })
        },
        uploadCover(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.cover = res
                    this.A_UPDATE_COVER(this.form.cover)
                }
            }).catch((err)=>{
                (err)
            })
        },
        onSubmit(){
            this.$confirm({
                title: '是否修改',
                content: '请注意，您现在正在修改用户信息',
                okText:"确定",
                cancelText:"取消",
                onOk:() => {
                    if (this.form.nickName.length > 9) {
                        this.$message.error(
                            "用户名长度不能超过8",
                            3
                        )
                        return
                    }
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            this.postEdit(this.form)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postEdit(formData){
            try {
                const res = await this.$axios.post(api.postAccountEdit,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.A_UPDATE_NICKNAME(this.form.nickName)
                this.A_UPDATE_COVER(this.form.cover)
                this.A_UPDATE_AVATAR(this.form.avatar)
            } catch (error) {
                (error)
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
    }
}
</script>

<style lang="less" scoped>
.account-page{
    background-color: white;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 15px 120px;
    .avatar-box{
        display: flex;
        align-items: center;
        margin: 30px 0;
        .avatar{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            img{
                object-fit: cover;
                width: 100%;
                height:100%;
                border-radius: 50%;
            }
        }
        .info{
            flex: 1;
            margin-left: 10px;
            .nickname-btn{
                display: flex;
                align-items: center;
                h2{
                    color: #4e5358;
                    font-size: 1.2em;
                    font-weight: 700;
                }
                .btn{
                    cursor: pointer;
                    user-select: none;
                    margin-left: 10px;
                    color: #2997f7;
                    font-size: 12px;
                    border-radius: 4px;
                    padding: 4px 10px;
                    background-color: white;
                    border: 1px solid #2997f7;
                }
                .btn:hover{
                    background-color: rgba(41, 151, 247, 0.1);
                }
            }
            .create-time{
                color: #999;
                margin-top: 10px;
                font-size: 14px;
                span{
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>