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
            <div class="list">
                <a-table 
                    size="small"
                    :rowKey="record=>record.orderNum"
                    :pagination="{
                        showQuickJumper:true,
                        showSizeChanger:true,
                        showTotal:(total)=>`共${total}条`,
                        pageSize:query.limit,
                        current:query.page,
                        total:total
                    }"
                    :columns="columns" 
                    :dataSource="list"
                    @change="pageChange"
                >
                    <span @click="goPath(record)" class="detail-title" slot="detail" slot-scope="detail,record">
                        <span >{{detail.title}}</span>
                    </span>
                    <span slot="createTime" slot-scope="createTime">
                        <span >{{createTime | resetData}}</span>
                    </span>
                    <span slot="orderType" slot-scope="orderType">
                        <a-tag color="blue">
                            {{orderType | resetType}}
                        </a-tag>
                    </span>
                    <span slot="type" slot-scope="type">
                        <a-tag v-if="type == 2" color="blue">
                            支出
                        </a-tag>
                        <a-tag v-if="type == 1" color="green">
                            收入
                        </a-tag>
                    </span>
                </a-table>
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
        resetType(e){
            switch (e) {
                case 1:
                    return "积分购买"
                case 2:
                    return "打赏内容"
                case 3:
                    return "付费内容"
            }
        }   
    },
    data(){
        return{
            locale: zhCN,
            loading:true,
            query:{
                page:1,
                limit:8,
            },
            columns:[
                {
                    title: "编号",
                    width: '200px',
                    dataIndex: 'orderNum',
                },
                {
                    title: "金额",
                    dataIndex: 'money',
                    scopedSlots: { customRender: 'money' }
                },
                {
                    title: "类型",
                    dataIndex: 'orderType',
                    scopedSlots: { customRender: 'orderType' }
                },
                {
                    title: "关联内容",
                    dataIndex: 'detail',
                    ellipsis: true,
                    scopedSlots: { customRender: 'detail' }
                },
                {
                    title: "创建时间",
                    dataIndex: 'createTime',
                    scopedSlots: { customRender: 'createTime' }
                },
                {
                    title:"类型",
                    dataIndex: 'type',
                    scopedSlots: { customRender: 'type' }
                }
            ],
            list:[],
            total:0
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        goPath(e){
            switch (e.orderType) {
                case 1:
                    return
                case 2:
                    switch (e.module) {
                        case "post":
                            this.$router.push(`/post/${e.detail.id}`)
                            break;
                        case "wiki":
                            this.$router.push(`/wiki/${e.detail.id}`)
                            break;
                        default:
                            this.$router.push(`/account/wallet/order`)
                            break;
                    }
                case 3:
                    this.$router.push(`/post/${e.detail.id}`)
                    break;
            }
        },
        async getList(){
            this.loading = true
            const res = await this.$axios.get(api.getOrderList,{params: this.query})
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
        pageChange(e){
            this.query.page = e.current
            this.query.limit = e.pageSize
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
        padding: 10px;
        .detail-title{
            cursor: pointer;
        }
    }
}
</style>