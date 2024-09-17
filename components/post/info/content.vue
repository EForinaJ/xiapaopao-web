<template>
    <div class="widget">
        <!-- 标题 -->
        <h1 v-if="info.title != ''" class="post-title">{{info.title}}</h1>

        <!-- 元素 -->
        <div class="post-meta">
            <div class="cate-view-like">
                <a-space>
                    <div class="meta-icon">
                        <a-icon theme="filled"  type="eye" />
                        <b>{{info.views | resetNum}}</b>
                    </div>
                    <div class="meta-icon">
                        <a-icon theme="filled" type="heart" />
                        <b>{{info.likes | resetNum}}</b>
                    </div>
                </a-space>
            </div>
            <div class="date-report">
                <span class="date">{{info.createTime | resetData}}</span>
                <div class="report">
                    <a-dropdown placement="bottomCenter">
                        <a-icon type="ellipsis" />
                        <a-menu slot="overlay">
                            <a-menu-item @click="report()">
                                <a-icon type="warning" />
                                <span>举报</span>
                            </a-menu-item>
                            <a-menu-item @click="remove()" v-if="accountInfo.id == info.userInfo.id">
                                <a-icon type="delete" />
                                <span>删除</span>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </div>
        </div>

        <!-- 内容 -->
        <div  class="post-content entry-content" v-html="info.content"> </div>

        <!-- 图片选择器 -->
        <div v-if="info.images" class="adaptation">
            <ImageAdaptation :list="info.images"/>
        </div>

        <!-- 标签 -->
        <div v-if="info.forum != null" class="post-tag">
            <div @click="goPath(`/forum/${info.forum.id}`)" class="tag forum">
                <span class="title">{{ info.forum.title}}</span>
            </div>
            <!-- <div class="tag" v-for="(item,index) in info.tagList" :key="index">
                <span class="title">{{item.title}}</span>
            </div> -->
        </div>
    
        <!-- 隐藏资源 -->
        <div class="post-hide" v-if="info.setResource == 2">
            <div class="title">
                {{info.resource.title}}
            </div>
            <div @click="viewExample" class="example">
                <span>查看演示</span>
                <a-icon type="right" />
            </div>
            <div v-if="info.resource.attr.length > 0" class="attr">
                <a-row :gutter="[20,20]">
                    <a-col v-for="(item,index) in info.resource.attr" :key="index" :span="24" :md="12">
                        <div class="item">
                            <span class="key">
                                {{item.key}}
                            </span>
                            <span class="mou">
                                :
                            </span>
                            <span class="value">
                                {{item.value}}
                            </span>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div :class="info.resource.isView ? 'auth sucsse' : 'auth'">
                <div class="info">
                    <span class="text">所需要权限为:</span>
                    <a-tag color="pink">
                        {{info.resource.mode | resetMode}}
                    </a-tag>
                </div>
                <div v-if="info.resource.grade && info.resource.mode == 3" class="grade mode-text">
                    <span>你的等级还未达到</span>
                    <img :src="info.resource.grade.icon" alt="">
                </div>
                <div v-if="info.resource.mode == 1" class="mode-text">
                    请在注册登录之后，方可阅读隐藏内容
                </div>
                <div  v-if="info.resource.mode == 2" class="mode-text">
                    请在下面参与讨论之后，方可阅读隐藏内容
                </div>
                <div v-if="info.resource.mode == 4" class="mode-text">
                    使用{{info.resource.integral}}积分，方可阅读隐藏内容
                </div>
                <div v-if="info.resource.mode == 5" class="mode-text">
                    支付{{info.resource.money}}购买，方可阅读隐藏内容
                </div>
                <div class="hide">
                    <div class="view" @click="viewLink">
                        点击查看
                    </div>
                    <div class="code">
                        <span class="text">提取码（点击复制）:</span>
                        <span class="info">{{info.resource.gainCode != "" ? info.resource.gainCode : "******"}}</span>
                    </div>
                    <div class="code">
                        <span class="text">解压码（点击复制）:</span>
                        <span class="info">{{info.resource.untieCode!= "" ? info.resource.untieCode : "******"}}</span>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
import ImageAdaptation from "@/components/adaptation/image"
export default {
    components:{
        ImageAdaptation
    },
    props:{ 
        info:{
            type: Object, //指定传入的类型
            default: null //这样可以指定默认的值
        },
        module:{
            type: String, //指定传入的类型
            default: '' //这样可以指定默认的值
        }
    },
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    methods: {
        viewLink(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if (this.info.resource.isView) {
                window.open(this.info.resource.link,"_blank")
                return
            }
            if (this.info.resource.mode ==  2) {
                document.querySelector('#comment').scrollIntoView({
                    behavior: "smooth"
                });
                return
            }
            if (this.info.resource.mode == 3 && this.accountInfo.grade.id != this.info.resource.grade.id) {
                this.$message.error(
                    "等级还不足努力升级吧少年",
                    3
                )
                return
            }
            if (this.info.resource.mode ==  4) {
                this.$confirm({
                    title: '使用积分',
                    content: '请注意，使用积分兑换资源内容',
                    okText:"确定",
                    cancelText:"取消",
                    onOk:async () => {
                        const query = {
                            id:this.id
                        }
                        const res = await this.$axios.post(api.postPostExchange,query) 
                         if (res.code != 1) {
                            this.$message.error(
                                res.message,
                                3
                            )
                            return
                        }
                        this.info = res?.data?.info
                    },
                    onCancel() {

                    },
                });
                return
            }
            if (this.info.resource.mode ==  5) {
                const product = {
                    detailId: this.id,
                    detailModule:"post",
                    orderMoney: this.info.resource.money,
                    orderType: 3,
                }

                this.$Pay("支付帖子隐藏内容",product).then(async (res)=>{
                    this.info = res
                }).catch((err)=>{
                    (err)
                    // this.createForm.cover = undefined
                })
                return
            }

        },
        report(){
            this.$Report(this.info.id,"post")
        },
        remove(){
            this.$confirm({
                title: '删除内容',
                content: '请注意，是否真的要删除内容',
                okText:"确定",
                cancelText:"取消",
                onOk:async () => {
                    const query = {
                        id:this.id
                    }
                    const res = await this.$axios.post(api.postPostRemove,query) 
                        if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.$router.go(-1)
                },
                onCancel() {

                },
            });
        },
        viewExample(){
            window.open(this.info.resource.example,"_blank")
        },
        goPath(path){
            this.$router.push(path)
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    background: white;
    border-radius: 4px;
    padding: 20px;
    .post-title{
        font-size: 21px;
        font-weight: 600;
        line-height: 36px;
        margin-bottom: 10px;
    }
    .post-meta{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cate-view-like{
            display: flex;
            .meta-icon{
                margin-right: 15px;
                font-size: 14px;
                display: flex;
                align-items: center;
                color: #8590A6;
                b{
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: 700;
                    display: flex;
                    line-height: 1;
                }
            }
        }
        .date-report{
            display: flex;
            align-items: center;
            .date{
                margin-right: 10px;
                font-size: 12px;
                color: #8590A6;
            }
            .report{
                cursor: pointer;
                user-select: none;
                font-size: 16px;
            }
        }
    }

    .post-content{
        margin-bottom:  20px;
    }

    .adaptation{
        margin-bottom: 20px;
    }

    .post-tag{
        display: flex;
        align-items: center;
        .tag{
            margin-right: 10px;
            cursor: pointer;
            user-select: none;
            display: flex;
            padding: 4px 10px;
            color: #8590a6;
            border-radius: 15px;
            background: rgba(173, 173, 173, 0.16);
            .icon{
                color: #8590a6;
                margin-right: 6px;
                font-size: 12px;
                border-radius: 80%;
            }
            .title{
                font-size: 12px;
            }
        }
        .category{
            background-color: rgba(0, 102, 255, 0.1);
            color: #0066ff !important;
        }
        .forum{
            background-color: rgba(255, 0, 0, 0.1);
            color: #ff0051 !important;
        }
    }

    .post-hide{
        padding: 20px;
        background: rgba(167, 167, 167, 0.08);
        margin-bottom: 20px;
        .title{
            font-size: 16px;
            font-weight: 600;
        }
        .example{
            cursor: pointer;
            user-select: none;
            margin: 20px 0;
            color: #0066ff;
            display: flex;
            align-items: center;
            span{
                margin-right: 5px;
            }
        }
        .attr{
            background: rgba(167, 167, 167, 0.08);
            margin-bottom: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            .item{
                font-size: 12px;
                color: #8590A6;
                display: flex;
                align-items: center;
                .mou{
                    margin: 0 5px;
                }
            }
        }
        .auth{
            background: rgba(244, 67, 54, 0.04);
            border-radius: 4px;
            margin-top: 10px;
            padding: 20px;
            border: 2px dashed rgba(255, 0, 0, 0.26);
            .info{
                display: flex;
                align-items: center;
                .text{
                    font-weight: 700;
                    margin-right: 10px;
                }
            }
            .grade{
                display: flex;
                align-items: center;
                margin: 10px 0;
                img{
                    margin-left: 10px;
                    height: 1.5em;
                    max-width: 6em;
                    vertical-align: -0.15em;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    display: inline-block;
                }
                
            }
            .mode-text{
                margin: 10px 0;
                font-size: 12px;
                color: #8590A6;
            }
            .integral{
                margin-top: 5px;
                font-size: 12px;
                color: #8590A6;
            }
            .pay{
                margin-top: 5px;
                font-size: 12px;
                color: #8590A6;
            }
            .hide{
                margin-top: 10px;
                display: flex;
                align-items: center;
                .view{
                    user-select: none;
                    margin-right: 10px;
                    display: inline-block;
                    cursor: pointer;
                    font-size: 12px;
                    border: 1px solid #0066ff;
                    border-radius: 4px;
                    padding: 5px 16px;
                    color: #0066ff;
                }
                .code{
                    display: flex;
                    align-items: center;
                    background-color: #f0f2f5;
                    padding: 8px 20px;
                    font-size: 12px;
                    margin-right: 10px;
                    cursor: pointer;
                    .text{
                        margin-right: 5px;
                    }
                    .info{
                        font-weight: bold;
                    }
                }
            }
        }
        .sucsse{
            background: rgba(139,195,74, 0.05);
            border: 2px dashed rgb(0 128 0 / 28%);
        }
        
    }
}
</style>