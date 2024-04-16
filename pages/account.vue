<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="header">
                <div class="mask-cover" :style="{ backgroundImage: `url(${accountInfo.cover}@w1200_h240)` }"></div>
                <div class="panel">
                    <div class="avatar">
                        <img :src="accountInfo.avatar | resetImage(20,20)" alt="">
                    </div>
                    <div class="info">
                        <div class="nickname-desc">
                            <h1 class="nickname">
                                <span>{{accountInfo.nickName}}</span>
                                <div class="grade" v-if="accountInfo.grade.current != null">
                                    <img :src="accountInfo.grade.current.icon" :alt="accountInfo.nickName">
                                </div>
                                <!-- <b>Lv1</b>
                                <FIcon :size="15" type="icon-renzheng"/> -->
                            </h1>
                            <p class="desc">
                                {{accountInfo.description}}
                            </p>
                        </div>
                        <div class="user-panel-button">
                            <div class="user-follow">
                                <a-space>
                                    <a-button @click="signIn" icon="carry-out" type="primary">
                                        {{accountInfo.isSign ? '已签到' : '未签到'}}
                                    </a-button>
                                </a-space>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="author-info">
                <div class="left">
                    

                    <div class="grade" @click="goRouter('/grade')">
                        <div class="colorful-make"></div>
                        <div class="info" style="height: 146px;">
                            <div class="avatar-text">
                                <div class="avatar">
                                    <img :src="accountInfo.avatar | resetImage(20,20)" alt="">
                                </div>
                                <div class="text">我的等级</div>
                            </div>
                            <div class="icon-title">
                                <div class="icon" v-if="accountInfo.grade.icon != null">
                                    <img :src="accountInfo.grade.icon" :alt="accountInfo.nickName">
                                </div>
                                <div class="text">{{accountInfo.grade.title}}</div>
                            </div>
                            <div v-if="this.grade" class="progress">
                                <div class="percent">
                                    <div class="text">
                                        {{accountInfo.experience }}/{{this.grade.experience }}
                                    </div>
                                    <div class="residue">
                                        <span>升级还需要</span>
                                        <span class="num">{{this.grade.experience - accountInfo.experience}}</span>
                                        <span>经验</span>
                                    </div>
                                </div>
                                <div class="twig">
                                    <a-progress 
                                    strokeColor="#866127"
                                    :showInfo="false"
                                    :percent="Math.floor((this.accountInfo.experience / this.grade.experience) * 100)" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="wallet">
                        <a-row :gutter="[{md:20}]">
                            <a-col :span="24" :md="12">
                                <div class="box" @click="goRouter('/wallet')">
                                    <div class="text">
                                        <span>余额</span>
                                        <a-icon type="right" />
                                    </div>
                                    <div class="num">
                                        <span>{{accountInfo.balance}}</span>
                                        <FIcon :size="15" type="icon-yibaoyue"/>
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="24" :md="12">
                                <div class="box" @click="goRouter('/wallet/integral')">
                                    <div class="text">
                                        <span>积分</span>
                                        <a-icon type="right" />
                                    </div>
                                    <div class="num">
                                        <span>{{accountInfo.integral}}</span>
                                        <FIcon :size="15" type="icon-jifenquanicon"/>
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                    </div>

                    <div class="setting-menu">
                        <div class="text">
                            稿件内容
                        </div>
                        <div @click="goRouter('/post')" :class="selectedKeys == '/post' ? 'active item' : 'item'">
                            <div class="item-info">
                                <FIcon :size="24" type="icon-tiezi"/>
                                <p>
                                    帖子
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <!-- <div @click="goRouter('/wiki')" :class="selectedKeys == '/wiki' ? 'active item' : 'item'">
                            <div class="item-info">
                                <FIcon :size="24" type="icon-tiezi"/>
                                <p>
                                文章
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div> -->
                        <div @click="goRouter('/favorite')" :class="selectedKeys == '/favorite' ? 'active item' : 'item'">
                            <div class="item-info">
                                <FIcon :size="24" type="icon-shoucang"/>
                                <p>
                                    收藏
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                    </div>

                    
                    <div class="setting-menu">
                        <div @click="goRouter('/')" :class="selectedKeys == '/' ? 'active item' : 'item'">
                            <div class="item-info">
                                <FIcon :size="24" type="icon-yonghu"/>
                                <p>
                                    个人资料
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                        <div @click="goRouter('/binding')" :class="selectedKeys == '/binding' ? 'active item' : 'item'">
                            <div class="item-info">
                                <FIcon :size="24" type="icon-anquanpeizhi"/>
                                <p>
                                    账户安全
                                </p>
                            </div>
                            <div class="author-menu-right">
                                <a-icon type="right-circle" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right">
                    <transition name="page-transition">
                        <Nuxt />
                    </transition>
                </div>
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
            selectedKeys: "/",
            grade: null,
        }
    },
    mounted(){
        this.updateMenu()
        this.getData()
    },
    methods:{
        ...mapActions("user",["A_UPDATE_SIGN","A_UPDATE_INTEGRAL"]),

        async getData(){
            const res = await this.$axios.get(api.getGradeNext)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.grade = res.data.info
        },

        async signIn(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if(this.accountInfo.isSign){
                this.$message.error(
                    "已经签到过了",
                    3
                )
                return
            }

            const res = await this.$axios.post(api.postAccountSign)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.$message.success(
                "获得"+res.data.num+"经验",
                3
            )
            this.A_UPDATE_SIGN(true)
            this.A_UPDATE_INTEGRAL(this.accountInfo.integral + res.data.num)
        },
        updateMenu () {
          if (this.$route.path != "/404") {
            const routes = this.$route.matched.concat()
            this.selectedKeys = routes.pop().path.slice(8)
          }
        },
        goRouter(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
            }else{
                this.selectedKeys = e
                this.$router.push('/account'+e)
            }
        },
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
    }
}
</script>

<style lang="less" scoped>
.page{
    background-color: #eff1f3;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    .container{
        margin-top: 20px;
        .header{
            border-radius: 4px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0px 0px 2px rgba(220, 229, 238, 0.212);
            position: relative;
            .mask-cover{
                position: relative;
                display: flex;
                align-items: flex-end;
                background-color: #ccc;
                width: 100%;
                height: 0;
                padding-top: 20%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .panel{
                position: relative;
                width: 100%;
                margin-top: -73px;
                padding: 0 20px 20px 20px;
                display: flex;
                box-sizing: border-box;
                .avatar{
                    height: 150px;
                    width: 150px;
                    border: 4px solid white;
                    border-radius: 4;
                    img{
                        height: 100%;
                        width: 100%;
                        border-radius: 4;
                    }
                }
                .info{
                    font-size: 24px;
                    font-weight: 600;
                    padding-top: 45px;
                    padding-left: 20px;
                    display: flex;
                    justify-content: space-between;
                    flex-grow: 1;
                    align-items: flex-end;
                    .nickname-desc{
                        .nickname{
                            display: flex;
                            align-items: center;
                            .grade{
                                height: 1.1em;
                                max-width: 6em;
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
                            span{
                                margin-right: 6px;
                            }
                            b{  
                                margin-right: 3px;
                                color: #797C80;
                                font-size: 12px;
                                font-style: normal;
                                display: inline-block;
                                background-color: rgba(80, 80, 80, 0.15);
                                transform: scale(1);
                                height: 17px;
                                line-height: 17px;
                                padding: 0 6px;
                                border-radius: 3px;
                                text-transform: capitalize;
                            }
                        }
                        .desc{
                            align-items: center;
                            font-size: 13px;
                            color: #797C80;
                            font-weight: 400;
                            margin-top: 15px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            text-justify: inter-ideograph;
                            word-break: break-all;
                            margin-right: 300px;
                            margin-bottom: 5px;
                        }
                    }
                    .user-panel-button{
                        text-align: center;
                        position: absolute;
                        right: 24px;
                        top: 105px;
                        .user-follow{
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
        .author-info{
            display: flex;
            margin-top: 20px;
            .left{
                width: 300px;

                .grade{
                    cursor: pointer;
                    user-select: none;
                    padding: 15px;
                    box-shadow: 0 0 10px rgba(116, 116, 116, 0.08);
                    border-radius: 4px;
                    margin-bottom: 20px;
                    color: #866127;
                    background: linear-gradient(25deg, #eabe7b 10%, #f5e3c7 70%, #edc788 100%);
                    overflow: hidden;
                    position: relative;
                    background: linear-gradient(25deg, #eabe7b 10%, #f5e3c7 70%, #edc788 100%);
                    .colorful-make::before{
                        right: -517px;
                        bottom: 0;
                        height: 276px;
                        width: 708px;
                        top: -110px;
                        transform: rotate(341deg);
                        opacity: .6;
                        position: absolute;
                        color: #866127;
                        background: linear-gradient(25deg, #eabe7b 10%, #f5e3c7 70%, #edc788 100%);
                        border-radius: 100%;
                        content: ' ';
                    }
                    .colorful-make::after{
                        left: 29px;
                        bottom: 0;
                        height: 239px;
                        width: 150px;
                        top: 85px;
                        transform: rotate(326deg);
                        opacity: .4;
                        position: absolute;
                        color: #866127;
                        background: linear-gradient(25deg, #eabe7b 10%, #f5e3c7 70%, #edc788 100%);
                        border-radius: 100%;
                        content: ' ';
                    }
                    .info{
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        position: relative;
                        .icon-text{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .icon-text-box{
                                display: flex;
                                align-items: center;
                                .text{
                                    font-weight: bold;
                                    font-size: 13px;
                                    margin-left: 5px;
                                }
                            }
                        
                            .more{
                                cursor: pointer;
                                user-select: none;
                                display: flex;
                                align-items: center;
                                font-size: 12px;
                                span{
                                    margin-right: 5px;
                                }
                                i{
                                    font-size: 14px;
                                }
                            }
                            .more:hover{
                                color: #155bd5;
                            }
                        }

                        .avatar-text{
                            display: flex;
                            align-items: center;
                            .avatar{
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                img{
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }
                            .text{
                                
                                font-weight: bold;
                                font-size: 13px;
                                margin-left: 5px;
                            }
                        }
                        .icon-title{
                            display: flex;
                            align-items: center;
                            .icon{
                                height: 1.1em;
                                max-width: 6em;
                                vertical-align: -0.15em;
                                img{
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .text{
                                
                                font-weight: bold;
                                font-size: 18px;
                                margin-left: 10px;
                            }
                        }
                        .progress{
                            .percent{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .text{
                                    font-size: 13px;
                                    font-weight: bold;
                                }
                                .residue{
                                    opacity: .8;
                                    font-size: .9em;
                                    .num{
                                        opacity: 1;
                                        font-weight: bold;
                                        font-size: 1.4em;
                                        margin: 0 4px;
                                    }
                                }
                            }
                        }
                    }
                }

                .wallet{
                    margin-bottom: 20px;
                    .box{
                        cursor: pointer;
                        user-select: none;
                        background-color: white;
                        border-radius: 4px;
                        padding: 10px;
                        .text{
                            display: flex;
                            align-items: center;
                            font-size: .9em;
                            i{
                                font-size: .7em;
                                color: #777;
                                margin-left: 5px;
                            }
                        }
                        .num{
                            margin-top: 20px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            span{
                                font-size: .9em;
                                font-weight: 700;
                                color: #5c7cff;
                            }
                        }
                    }
                }

                .setting-menu{
                    margin-bottom: 20px;
                    background-color: white;
                    border-radius: 4px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    box-shadow: 0px 0px 2px rgba(98, 124, 153, 0.1);
                    position: relative;
                    .text{
                        color: #8590A6;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    .item{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        padding: 10px;
                        .item-info{
                            user-select: none;
                            font-size: 14px;
                            font-weight: 700;
                            position: relative;
                            display: flex;
                            align-items: center;
                            p{
                                margin-left: 5px;
                                display: flex;
                                align-items: center;
                                color: #8590A6;
                            }
                        }
                        i{
                            color: #8590A6;
                        }
                    }
                    .active{
                        border-radius: 4px;
                        background: rgba(0, 102, 255, 0.04);
                    }
                    .item:hover{
                        border-radius: 4px;
                        background: rgba(0, 102, 255, 0.04);
                    }
                }

            }
            .right{
                margin-left: 20px;
                flex: 1;
                .page-transition-enter-active ,.page-transition-leave-active{
                    transition: opacity 1s;
                }
                .page-transition-enter ,.page-transition-leave-to{
                    opacity: 0;
                }
            }
        }
    }
}

</style>