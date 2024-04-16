<template>
    <div class="page-list">
        <div v-if="loading" class="loading">
            <div class="skeleton-item">
                <a-skeleton :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton :loading="loading" :title="false" active></a-skeleton>
            </div>
            <div class="skeleton-item">
                <a-skeleton :loading="loading" :title="false" active></a-skeleton>
            </div>
        </div>
        <div v-if="!loading">
            <ul class="list">
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    新用户注册
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            注册者。首次注册时奖励。
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.register">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    发布帖子
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            发布优质文章并审核通过
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.createPost">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    发布帖子
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            发表评论并审核通过
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.createComment">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    收获点赞
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            发布内容获得用户点赞
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.like">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    内容被收藏
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            发布内容获得用户收藏
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.favorite">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    被关注
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            有新的粉丝关注
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.follow">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    举报内容
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            举报违规内容审核成功
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.report">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div class="text zfb">
                                    精选内容
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            发布优质内容被推送为精选
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic valueStyle="color: #ff6373;" :value="integralAndExperience.postEssence">
                                <template #prefix>
                                    <FIcon color="#ff6373" :size="16" type="icon-jifenquanicon"/>
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import FIcon from '@/components/icon/FIcon'
export default {
    middleware: 'auth',
    components:{
        FIcon,
    },
    filters:{
        resetType (e) {
            switch (e) {
                case 1:
                    return "购买积分"
                case 2:
                    return "签到积分"
                case 3:
                    return "创建帖子"
                case 4:
                    return "评论"
                case 5:
                    return "点赞"
                case 6:
                    return "收藏"
                case 7:
                    return "关注"
                case 8:
                    return "举报"
                case 9:
                    return "精华帖子"
            }
        },
    },
    data(){
        return{
            loading:true,
            integralAndExperience: null,
        }
    },
    mounted(){
        this.getIntegralAndExperience()
    },
    methods:{
        async getIntegralAndExperience(){
            this.loading = true
            const res = await this.$axios.get(api.getSystemIntegralAndExperience)     
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.integralAndExperience = res.data.info
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.page-list{
    border-radius: 4px;
   background-color: white;
    .loading{
        padding: 10px 20px;
        .skeleton-item{
            margin-bottom: 20px;
        }
    }
    .list{
        min-height: 400px;
        .item{
            cursor: pointer;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(212, 212, 212, 0.494);
            .code-type{
                .code{
                    display: flex;
                    align-items: center;
                    .type-status{
                        display: flex;
                        align-items: center;
                        .text{
                            color: white;
                            font-size: 10px;
                            padding: 5px 8px;
                            border-radius: 4px;
                        }
                        .zfb{
                            background-color: #5c7cff;
                        }
                        .wx{
                            background-color: #87d068;
                        }
                        .km{
                            background-color: #ff6f06;
                        }
                    }
                }
                
                .remark{
                    margin-top: 8px;
                    color: #999;
                    font-size: 12px;
                }
            }

            .je{
                .status{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .text{
                        color: white;
                        font-size: 10px;
                        margin-left: 5px;
                        padding: 5px 8px;
                        border-radius: 4px;
                    }
                    .cg{
                        background-color: #18a52a;
                    }
                    .sb{
                        background-color: rgb(255, 99, 115);
                    }
                    .ds{
                        background-color: rgb(51, 172, 236);
                    }
                }
            }
        }
    }
    .empty{
        min-height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pagination{
        padding: 10px 20px;
    }
}
</style>