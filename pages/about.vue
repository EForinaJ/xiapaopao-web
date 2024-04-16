<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <div class="box">
                <div class="box-text">
                    <div class="text-o">
                        <div class="o"></div>
                        <div class="title">
                            团队成员
                        </div>
                    </div>
                </div>
                <div class="list">
                    <a-row :gutter="[60,60]">
                        <a-col :span="24">
                            <div class="item">
                                <div class="avatar">
                                    <img src="/img/about/Shane@2x.bee12e83.png" alt="" srcset="">
                                </div>
                                <div class="info">
                                    <div class="nickName-info">
                                        <div class="nickName">
                                            春风不语
                                        </div>
                                        <div class="tags">
                                            多赛季顶尖黄金 / 不务正业的程序员 / 猛 / 理想主义者
                                        </div>
                                        <div class="purpleLine"></div>
                                    </div>
                                    <div class="desc">
                                        “我与我周旋久，宁做我！”
                                    </div>
                                </div>
                            </div>
                        </a-col>

                    </a-row>
                </div>
            </div>

            <div class="box">
                <div class="box-text">
                    <div class="text-o">
                        <div class="o"></div>
                        <div class="title">
                            简单描述
                        </div>
                    </div>
                </div>
                <div class="bio">
                    <p>不要把陌生人的些许善意，视为珍稀的瑰宝；<br> 却把身边亲近人的全部付出，当做天经地义的事情，对其视而不见。</p>
                    <p>认定一件事，即使拿十分力气都无法完成，也要拿出十二分力气去努力</p>
                    <p>读过多少书，就敢说这个世道‘就是这样的’，见过多少人，就敢说男人女人‘都是这般德行’？<br>你亲眼见过多少太平和苦难，就敢断言他人的善恶？</p>
                    <p>落魄时，一定要把自己当回事，发迹后，一定要把他人当回事。</p>
                    <p>有些事情，死了也要做。但有些事情，是死也不能做的。</p>
                </div>
            </div>


            <div class="box">
                <div class="box-text">
                    <div class="text-o">
                        <div class="o"></div>
                        <div class="title">
                            联系我
                        </div>
                    </div>
                </div>
                <div class="lianxi">
                    <a-space :size="50">
                        <a-tooltip placement="topLeft">
                            <template slot="title">
                            <span >xpp_111</span>
                            </template>
                            <FIcon class="account" :size="60" type="icon-weixin1"/>
                        </a-tooltip>
                        <a-tooltip placement="topLeft">
                            <template slot="title">
                            <span >356866114</span>
                            </template>
                            <FIcon class="account" :size="70" type="icon-QQ1"/>
                        </a-tooltip>
                        <a-tooltip placement="topLeft">
                            <template slot="title">
                            <span >3781714</span>
                            </template>
                            <FIcon class="account" :size="60" type="icon-tiktok"/>
                        </a-tooltip>
                    </a-space>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex"
import FIcon from '@/components/icon/FIcon'
export default {
    components:{
       FIcon 
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","userInfo"]),
    },
    data(){
        return{
            
        }
    },
    methods:{
        
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
        margin-top: 100px;
        .box{
            margin-bottom: 100px;
            .box-text{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .text-o{
                    display: flex;
                    align-items: center;
                    .o{
                        width: 20px;
                        height: 20px;
                        border: 5px solid #9c5cf7;
                        border-radius: 50%;
                    }
                    .title{
                        line-height: 36px;
                        margin-left: 10px;
                        font-weight: bold;
                        font-size: 36px;
                        color: rgb(56, 56, 56);
                    }
                }
            }
            .list{
                margin-top: 100px;
                .item{
                    display: flex;
                    .avatar{
                        height: 150px;
                        width: 150px;
                        border-radius: 4px;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                            object-fit: cover;
                        }
                    }
                    .info{
                        padding: 10px 0;
                        margin-left: 20px;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        .nickName{
                            font-size: 28px;
                            font-weight: 700;
                        }
                        .tags{
                            margin-top: 10px;
                            font-size: 15px;
                            color: rgba(0,0,0,0.8);
                            line-height: 26px;
                        }
                        .purpleLine {
                            width: 28px;
                            height: 4px;
                            background: linear-gradient(90deg, #9c5cf7, #7123e5 100%);
                            border-radius: 2px;
                            margin: 5px 0 18px 0;
                        }
                        .desc{
                            line-height: 14px;
                            cursor: pointer;
                            font-size: 15px;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
            }
            .bio{
                margin-top: 20px;
                p{
                    padding:15px 0;
                    font-size: 21px;
                    line-height: 30px;
                }
            }
            .lianxi{
                margin-top: 60px;
                .account{
                    cursor: pointer;
                }
            }
        }
    }
}
</style>