<template>
    <div class="widget">
        <div class="text">
            <h2>最新评论</h2>
        </div>
        <div class="new-comment">
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" class="item">
                    <div class="avatar-nickname-date">
                        <div @click="goPath(`/user/${item.userInfo.id}`)"  v-if="item.userInfo.avatar" class="avatar">
                            <img :src="item.userInfo.avatar | resetImage(32,32)" alt="">
                        </div>
                        <div class="avatar-nickname">
                            <div @click="goPath(`/user/${item.userInfo.id}`)" class="nickname-grade">
                                <h2>{{item.userInfo.nickName}}</h2>
                                <div class="grade">
                                    <img :src="item.userInfo.grade.icon" alt="">
                                </div>
                            </div>
                            <div class="date">
                                {{item.createTime | resetData}} 
                            </div>
                        </div>
                        
                    </div>
                    <div @click="goContentPath(item)"  class="content">
                        <p> {{item.content}} </p>
                    </div>
                    <div  @click="goContentPath(item)"  class="source">
                        <span>来自:</span>
                        <p>{{item.relatedTitle}}</p>
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
            list: [],
            queryParam: {
                page: 1,
                limit: 5,
            },
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        goPath(path){
            this.$router.push(path)
        },
        goContentPath(e){
  
            switch (e.module) {
                case "post":
                     this.$router.push(`/post/${e.relatedId}`)
                    break;
                case "wiki":
                     this.$router.push(`/wiki/${e.relatedId}`)
                    break;
                default:
                    break;
            }
        },
        async getData(){
            const res = await this.$axios.get(api.getCommentList,{params: this.queryParam})
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
    .new-comment{
        .list{
            padding-top: 15px;
            .item{
                padding: 0px 15px;
                padding-bottom: 15px;
                .avatar-nickname-date{
                    display: flex;
                    
                    align-items: center;
                    .avatar{
                        margin-right: 10px;
                        cursor: pointer;
                        border-radius: 4px;
                        width: 32px;
                        height: 32px;
                        img{
                            border-radius: 4px;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .avatar-nickname{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex: 1;
                        .nickname-grade{
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
                                img{
                                    height: 0.8em;
                                    max-width: 6em;
                                    vertical-align: -0.15em;
                                    backface-visibility: hidden;
                                    display: inline-block;
                                }
                            }
                        }
                        .date{
                            color: #999;
                            font-size: 12px;
                            letter-spacing: 1px;
                        }
                    }
                    
                }
                .content{
                    cursor: pointer;
                    border-radius: 4px;
                    padding: 10px;
                    position: relative;
                    margin: 10px 0;
                    background-color: #f8f8f8;
                    p{
                        font-size: 14px;
                        word-wrap: break-word;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                }
                .content::before{
                    border-bottom-color: #f8f8f8;
                    content: '';
                    display: block;
                    position: absolute;
                    top: -8px;
                    left: 35px;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 8px solid #f8f8f8;
                    z-index: 2;
                }
                .content::after{
                    border-bottom-color: #f8f8f8;
                    content: '';
                    display: block;
                    position: absolute;
                    top: -6.6px;
                    left: 35px;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 8px solid #f8f8f8;
                    z-index: 2;
                }
                .source{
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    p{
                        flex: 1;
                        margin-left: 3px;
                        word-wrap: break-word;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    
                    
                    font-size: 12px;
                    color: #bcbcbc;
                }
            }
        }
    }
}
</style>