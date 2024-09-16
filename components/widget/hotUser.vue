<template>
<div class="widget">
    <div class="text">
        <h2>热门用户</h2>
    </div>
    <div class="hot-user">
        <ul class="list">
            <li @click="goPath(`/user/${item.id}`)" v-for="(item,index) in list" :key="index" class="item">
                <div class="avatar">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="info">
                    <div class="nickname-grade">
                        <h2>{{item.nickName}}</h2>
                        <div class="grade">
                            <img :src="item.grade.icon" alt="">
                        </div>
                    </div>
                    <div class="desc">
                        {{item.description}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import api from "@/api/index"
export default {
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
            const res = await this.$axios.get(api.getSystemHotUser)
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
.widget{
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
    .hot-user{
        .list{
            padding-top: 15px;
            .item{
                cursor: pointer;
                padding: 0px 15px;
                padding-bottom: 15px;
                display: flex;
                .avatar{
                    height: 35px;
                    width: 35px;
                    border-radius: 4px;
                    img{
                        border-radius: 4px;
                        width: 100%;
                        height: 100%;
                    }
                }
                .info{
                    flex: 1;
                    margin-left: 8px;
                    flex-direction: column;
                    justify-content: space-between;
                    display: flex;
                    
                    .nickname-grade{
                        display: flex;
                        align-items: center;
                        h2{
                            font-size: 13px;
                            font-weight: 600;
                            line-height: 20px;
                            max-width: 100%;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            height: 20px;
                        }
                        .grade{
                            margin-left: 5px;
                            img{
                                height: 0.8em;
                                max-width: 6em;
                                vertical-align: -0.15em;
                                backface-visibility: hidden;
                                display: inline-block;
                            }
                        }
                    }
                    .desc{
                        font-size: 12px;
                        color: #999;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 1;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
}
</style>