<template>
    <div class="siber-box">
        <!-- <div class="text">
            <h2>热门文章</h2>
        </div> -->
        <div v-if="list.length > 0" class="hot-topic">
            <div @click="goPath(`/article/${frist.id}`)"  class="first">
                <div  class="cover">
                    <img :src="frist.cover">
                </div>
                <div class="mask"></div>
                <div class="info">
                    <div class="category">
                        <span v-if="frist.category">
                            {{frist.category.title}}
                        </span>
                    </div>
                    <div v-if="frist.title" class="title">
                        {{frist.title}}
                    </div>
                </div>
                <div class="num">
                    <span>1</span>
                </div>
            </div>
        </div>
        <ul class="list" v-if="list.length > 0">
            <li v-for="(item,index) in list" :key="index" @click="goPath(`/article/${item.id}`)" class="item">
                <div class="num">
                    <span>{{index+2}}</span>
                </div>
                <div class="info">
                    <div class="cover">
                        <img :src="item.cover" :alt="item.title">
                    </div>
                    <div class="title-view">
                        <h2>{{item.title}}</h2>
                        <div class="date-view">
                            <span class="date">{{item.createTime | resetData}}</span>
                            <div class="view">
                                <a-icon type="eye" />
                                <span class="count">{{item.views | resetNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
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
            frist: {},
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
                mode: 1
            }
            const res = await this.$axios.get(api.getArticleList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list != null ? res.data.list : []
            this.frist = this.list[0]
            this.list.shift();
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
        .first{
            cursor: pointer;
            user-select: none;
            height: 160px;
            width: 100%;
            position: relative;
            border-radius: 4px;
            .cover{
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                
                overflow: hidden;
                img{
                    border-radius: 4px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all .2s;
                }
            }
            .mask{
                border-radius: 4px;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(0deg, rgba(29, 41, 49, .4) 3em, rgba(255, 255, 255, 0) 8em);
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                position: absolute;
                padding: 20px;
                width: 100%;
                height: 100%;
                .category{
                    
                    span{
                        font-size: 12px;
                        border-radius: 4px;
                        padding: 3px 4px;
                        color: white;
                        background: #f35;
                    }
                }
                .title{
                    margin-top: 15px;
                    color: white;
                    font-size: 12px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    margin-bottom: 8px;
                    word-break: break-all;
                }
            }
            .num{
                background-color: #f35;
                color: #fff;
                position: absolute;
                border-radius: 0 10px 10px 0;
                left: -24px;
                top: 16px;
                z-index: 2;
                span{
                    font-weight: 700;
                    display: block;
                    padding: 0;
                    font-size: 16px;
                    margin-right: 6px;
                    line-height: 22px;
                    height: 22px;
                    width: 34px;
                    text-align: right;
                }
            }
            .num::after{
                content: '';
                bottom: -2px;
                left: 1px;
                height: 0;
                width: 0;
                border-right: 2px solid transparent;
                border-left: 2px solid transparent;
                position: absolute;
                transform: rotate(34deg);
            }
        }
        .first:hover{
            .cover{
                
                img{
                   transform: scale(1.05);
                }
            }
        } 
    }
    .list{
        .item{
            cursor: pointer;
            user-select: none;
            display: flex;
            font-size: 13px;
            padding: 0 16px 16px 16px;
            box-sizing: border-box;
            height: 92px;
            position: relative;
            .num{
                background: #818b95;
                color: white;
                position: absolute;
                border-radius: 0 10px 10px 0;
                left: -4px;
                top: 16px;
                z-index: 2;
                span{
                    font-weight: 700;
                    display: block;
                    padding: 0;
                    font-size: 16px;
                    margin-right: 6px;
                    line-height: 22px;
                    height: 22px;
                    width: 34px;
                    text-align: right;
                }
            }
            .num::after{
                content: '';
                bottom: -2px;
                left: 1px;
                height: 0;
                width: 0;
                border-right: 2px solid transparent;
                border-left: 2px solid transparent;
                position: absolute;
                transform: rotate(34deg);
            }
            .info{
                display: flex;
                // padding-left: 28px;
                .cover{
                    
                    height: 100%;
                    width: 90px;
                    img{
                        border-radius: 4px;
                        height: 100%;
                        object-fit: cover;
                        width: 100%;
                    }
                }
                .title-view{
                    flex: 1;
                    margin-left: 10px;
                    padding: 5px 0;
                    flex-direction: column;
                    display: flex;
                    justify-content: space-between;
                    h2{
                        line-height: 16px;
                        font-size: 14px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        margin-bottom: 8px;
                        word-break: break-all;
                    }
                    .date-view{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .date{
                            font-size: 12px;
                            color: #bcbcbc;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .view{
                            display: flex;
                            align-items: center;
                            .count{
                                margin-left: 5px;
                            }
                        }
                    }
                    
                }
                
            }
            

        }
        .item:nth-child(1){
            .num{
                background-color: #ffa41b;
                color: #fff;
            }
        }
        .item:nth-child(2){
            .num{
                background-color: #1a85ff;
                color: #fff;
            }
        }
    }
}
</style>