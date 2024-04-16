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
            <ul v-if="list.length > 0" class="list">
                <li v-for="(item,index) in list" :key="index" class="item">
                    <div class="code-type">
                        <div class="code">
                            <div class="type-status">
                                <div  class="text zfb">
                                    {{item.type | resetType}}
                                </div>
                            </div>
                        </div>
                        <div class="remark">
                            {{item.createTime | resetData}}
                        </div>
                    </div>
                    <div class="je">
                        <div class="num">
                            <a-statistic :valueStyle="`color: ${item.mode == 1 ? '#ff6373' : '#52c41a'};`" :value="item.integral">
                                <template #suffix>
                                    <a-icon :type="item.mode == 1 ? 'arrow-up' : 'arrow-down'" />
                                    <!-- <FIcon color="#5c7cff" :size="16" type="icon-rmb"/> -->
                                </template>
                            </a-statistic>
                        </div>
                    </div>
                </li>
            </ul>

            <div v-if="list.length == 0" class="empty">
                <a-config-provider :locale="locale">
                    <a-empty />
                </a-config-provider>
            </div>

            <div class="pagination"  v-if="list.length > 0" >
                <a-config-provider :locale="locale">
                    <a-pagination
                        @change="changePage"
                        :pageSize="query.limit"
                        :current="query.page"
                        :total="total"
                        show-quick-jumper
                    >
                    </a-pagination>
                </a-config-provider>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
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
                    return "签到奖励"
                case 3:
                    return "发布帖子奖励"
                case 4:
                    return "评论奖励"
                case 5:
                    return "点赞奖励"
                case 6:
                    return "收藏奖励"
                case 7:
                    return "关注奖励"
                case 8:
                    return "举报奖励"
                case 9:
                    return "精华帖子奖励"
            }
        },
        resetTypeIcon (e) {
            switch (e) {
                case 1:
                    return "arrow-up"
                case 2:
                    return "arrow-up"
                case 3:
                    return "arrow-up"
                case 4:
                    return "arrow-up"
                case 5:
                    return "arrow-up"
                case 6:
                    return "arrow-up"
                case 7:
                    return "arrow-up"
                case 8:
                    return "arrow-up"
                case 9:
                    return "arrow-up"
            }
        },
    },
    data(){
        return{
            locale: zhCN,
            loading:true,
            query:{
                page:1,
                limit:8,
            },
            list:[],
            total:0
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        async getList(){
            this.loading = true
            const res = await this.$axios.get(api.getIntegralList,{params: this.query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
            }
            this.list = res.data.list || []
            this.total = res.data.total || 0
            this.loading = false
        },
        changePage(page,limit){
            this.query.limit = limit
            this.query.page =page
            this.getList()
        },
    }
}
</script>

<style lang="less" scoped>
.page-list{
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