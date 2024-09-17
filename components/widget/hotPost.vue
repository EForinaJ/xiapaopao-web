<template>
<!-- 热门帖子 -->
<div class="siber-box">
    <div class="text">
        <h2>热门帖子</h2>
    </div>
    <div class="hot-topic">
        <ul class="list">
            <li @click="goPath(`/post/${item.id}`)" class="item" :key="index" v-for="(item,index) in list">
                <div class="num">
                    {{index + 1}}
                </div>
                <div class="title">
                    {{item.title != '' ? item.title : item.content}}
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import api from "@/api/index"
export default {
    props:{ 
        postId: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        },
    },
    data(){
        return{
            list: []
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        async getData(){
            const query = {
                page: 1,
                limit: 5,
            }
            const res = await this.$axios.get(api.getPostList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res?.data?.list ?? []
        },
        
    }
}
</script>

<style lang="less" scoped>
.siber-box{
    background: white;
    border-radius: 4px;
    margin-bottom: 15px;
    .text{
        border-bottom: 1px solid #eeeeee;
        position: relative;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 20px ;
        
    }
    .text::before{
        content: '';
        width: 4px;
        height: 18px;
        position: absolute;
        left: 10px;
        top: 13px;
        background-color: #0066ff;
        border-radius: 4px;
    }
    .hot-topic{
        padding: 20px;
        .list{
           
            .item{
                cursor: pointer;
                user-select: none;
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                .num{
                    text-align: center;
                    vertical-align: 0.1em;
                    font-size: .8em;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    color: #888;
                    font-weight: 400;
                    background: rgba(136, 136, 136, 0.1);
                }
                .title{
                    margin-left: 10px;
                    flex: 1;
                    color: #8590A6;
                    font-size: 12px;
                     display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    word-break: break-all;
                }
            }
            .item:nth-child(1){
                .num{
                    background-color: rgba(255, 84, 115, 0.1);
                    color: #ff5473;
                }
            }
            .item:nth-child(2){
                .num{
                    background-color: rgba(41, 151, 247, 0.1);
                    color: #2997f7;
                }
            }
            .item:nth-child(3){
                .num{
                    background-color: rgba(18, 185, 40, 0.1);
                    color: #18a52a;
                }
            }
            .item:nth-child(4){
                .num{
                    background-color: rgba(255, 111, 6, 0.1);
                    color: #ff6f06;
                }
            }
        }
    }
}
</style>