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
                    :rowKey="record=>record.code"
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
                    <span slot="createTime" slot-scope="createTime">
                        <span >{{createTime | resetData}}</span>
                    </span>
                    <span slot="mode" slot-scope="mode">
                        <a-tag color="blue">
                            {{mode | resetMode}}
                        </a-tag>
                    </span>
                    <span slot="status" slot-scope="type">
                        <a-tag v-if="type == 2" color="green">
                            充值成功
                        </a-tag>
                        <a-tag v-if="type == 1" color="blue">
                            待审核
                        </a-tag>
                        <a-tag v-if="type == 3" color="red">
                            充值失败
                        </a-tag>
                    </span>
                    <p slot="expandedRowRender" slot-scope="record" >
                        <span>备注: </span>
                        <span>{{ record.remark }}</span>
                    </p>
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
        resetMode(e){
            switch (e) {
                case 1:
                    return "支付宝"
                case 2:
                    return "微信"
                case 3:
                    return "卡密"
                case 3:
                    return "人工后台"
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
                    dataIndex: 'code',
                },
                {
                    title: "金额",
                    dataIndex: 'money',
                    scopedSlots: { customRender: 'money' }
                },
                {
                    title: "类型",
                    dataIndex: 'mode',
                    scopedSlots: { customRender: 'mode' }
                },
                {
                    title: "创建时间",
                    dataIndex: 'createTime',
                    scopedSlots: { customRender: 'createTime' }
                },
                {
                    title:"状态",
                    dataIndex: 'status',
                    scopedSlots: { customRender: 'status' }
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
        async getList(){
            this.loading = true
            const res = await this.$axios.get(api.getRechargeList,{params: this.query})
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
    }
}
</style>