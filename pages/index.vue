<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="18">
                    <!-- 帖子模块 -->
                    <div class="post-list">
                        <a-row :gutter="[20,20]">
                            <a-col v-if="info.newPostList" :span="24" :md="12">
                                <div class="box">
                                    <div class="info">
                                        <div @click="goPath(`/post/${leftPost.id}`)" v-if="leftPost.images" class="cover">
                                            <img :src="leftPost.images[0] | resetImage(140,100)" :alt="leftPost.title">
                                        </div>
                                        <div class="title-desc-meta">
                                            <div class="title-desc">
                                                <div @click="goPath(`/post/${leftPost.id}`)" class="title">
                                                    {{leftPost.title}}
                                                </div>
                                                <div v-if="leftPost.content != ''" @click="goPath(`/post/${leftPost.id}`)" class="desc">
                                                   {{leftPost.content | resetContent}}
                                                </div>
                                            </div>
                                            <div class="meta">
                                                <div @click="goPath(`/category/${leftPost.category.id}`)" v-if="leftPost.category" class="tag">
                                                    {{leftPost.category.title}}
                                                </div>
                                                <div class="action">
                                                    <div class="action-btn">
                                                        <a-icon type="eye" />
                                                        <span>{{leftPost.views | resetNum}}</span>
                                                    </div>
                                                    <div class="date">
                                                        {{leftPost.createTime | resetData}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list">
                                        <div v-for="(item,index) in leftPostList" :key="index" class="item">
                                            <div @click="goPath(`/category/${item.category.id}`)" class="cate">
                                                [{{item.category.title}}]
                                            </div>
                                            <div  @click="goPath(`/post/${item.id}`)" class="title-date">
                                                <h2>{{item.title}}</h2>
                                                <div class="date">
                                                    <div class="date-text">
                                                        {{item.createTime | resetData}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a-col>

                            <a-col v-if="info.topPostList" :span="24" :md="12">
                                <div class="box">
                                    <div class="info">
                                        <div @click="goPath(`/post/${rightPost.id}`)" v-if="rightPost.images" class="cover">
                                            <img :src="rightPost.images[0] | resetImage(140,100)" :alt="rightPost.title">
                                        </div>
                                        <div class="title-desc-meta">
                                            <div class="title-desc">
                                                <div @click="goPath(`/post/${rightPost.id}`)" class="title">
                                                    {{rightPost.title}}
                                                </div>
                                                <div v-if="rightPost.content != ''" @click="goPath(`/post/${rightPost.id}`)" class="desc">
                                                   {{rightPost.content | resetContent}}
                                                </div>
                                            </div>
                                            <div class="meta">
                                                <div @click="goPath(`/category/${rightPost.category.id}`)" v-if="leftPost.category" class="tag">
                                                    {{rightPost.category.title}}
                                                </div>
                                                <div class="action">
                                                    <div class="action-btn">
                                                        <a-icon type="eye" />
                                                        <span>{{rightPost.views | resetNum}}</span>
                                                    </div>
                                                    <div class="date">
                                                        {{rightPost.createTime | resetData}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list">
                                        <div v-for="(item,index) in rightPostList" :key="index" class="item">
                                            <div @click="goPath(`/category/${item.category.id}`)" class="cate">
                                                [{{item.category.title}}]
                                            </div>
                                            <div  @click="goPath(`/post/${item.id}`)" class="title-date">
                                                <h2>{{item.title}}</h2>
                                                <div class="date">
                                                    <div class="date-text">
                                                        {{item.createTime | resetData}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a-col>
                            
                        </a-row>
                    </div>

                    <!-- 模块内容 -->
                    <div class="module">
                        <div class="item">
                            <div class="item-text">
                                栏目
                            </div>
                            <div class="item-info">
                                <a-row :gutter="[30,30]">
                                    <a-col :span="24" :md="12" @click="goPath(`/category/${item.id}`)" v-for="(item,index) in info.categoryList" :key="index" >
                                        <div  class="item-box">
                                            <div  class="cover">
                                                <img :src="item.cover | resetImage(80,80)" :alt="item.title">
                                            </div>
                                            <div class="info">
                                                <div>
                                                    <h2 class="title">{{item.title}}</h2>
                                                    <div class="count">
                                                        <a-space size="middle">
                                                            <a-space>
                                                                <span class="text">今日:<em>{{item.todayCount}}</em></span>
                                                            </a-space>
                                                            <a-space>
                                                                <span class="text">帖子:<em>{{item.allCount}}</em></span>
                                                            </a-space>
                                                        </a-space>
                                                    </div>
                                                </div>
                                                <div class="post">
                                                    <span>{{item.description}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </div>
                    </div>

                    

                    <!-- 链接模块 -->
                    <!-- <div class="link">
                        <div class="text">
                            <div class="text-title">
                                <h2>文章</h2>
                            </div>
                            <div @click="goPath(`/wikis`)" class="more">
                                <span>更多</span>
                                <a-icon type="right" />
                            </div>
                        </div>
                        <div class="list">
                            <div v-for="(item,index) in info.randWikiList" :key="index" class="item">
                                <div @click="goPath(`/wiki/${item.id}`)" class="cover">
                                    <img :src="item.cover | resetImage(140,75)" alt="" srcset="">
                                </div>
                                <div class="item-info">
                                    <div class="header">
                                        <div class="user-info-date">
                                            <div   class="avatar-nickname">
                                                <div @click="goPath(`/user/${item.userInfo.id}`)" class="avatar">
                                                    <img :src="item.userInfo.avatar" :alt="item.userInfo.nickName" srcset="">
                                                </div>
                                                <div class="nickname-grade">
                                                    <h2 @click="goPath(`/user/${item.userInfo.id}`)" class="nickname">{{item.userInfo.nickName}}</h2>
                                                </div>
                                            </div>
                                            <div class="date">
                                                {{item.createTime | resetData}}
                                            </div>
                                        </div>
                                        <h2 class="title"  @click="goPath(`/wiki/${item.id}`)">{{item.title}}</h2>
                                        <p @click="goPath(`/wiki/${item.id}`)" class="desc">
                                            {{item.description}}
                                        </p>
                                    </div>
                                    <div class="footer">
                                        <div class="tags">
                                            <div  v-if="item.forum" class="game">
                                                {{item.forum.title}}
                                            </div>
                                            <div v-if="item.category" class="cate">
                                                {{item.category.title}}
                                            </div>
                                        </div>
                                        <div class="date-action">
                                            <div class="meta">
                                                <div class="action-btn">
                                                    <a-icon type="eye" />
                                                    <span>{{item.views | resetNum}}</span>
                                                </div>
                                                <div class="action-btn">
                                                    <a-icon type="heart" />
                                                    <span>{{item.likes | resetNum}}</span>
                                                </div>
                                                <div class="action-btn">
                                                    <a-icon type="message" />
                                                    <span>{{item.comments | resetNum}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </a-col>
                <a-col :span="24" :md="6">
                   
                    
                    <!-- 热门帖子 -->
                    <HotPost/>
                    <!-- 最新评论 -->
                    <Comment/>
                    <!-- 热门用户 -->
                    <HotUser />

                    <!-- 助手 -->
                    <About/>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import HotPost from "@/components/widget/hotPost"
import HotArticle from "@/components/widget/hotArticle"
import Comment from "@/components/widget/comment"
import HotUser from "@/components/widget/hotUser"
import About from "@/components/widget/about"

import { mapState } from "vuex"
import api from "@/api/index"
export default {
    components:{
        HotPost,Comment,HotUser,About,HotArticle
    },
    head () {
        return {
            title: `${this.base.title} - ${this.base.childTitle}`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    filters:{
        resetContent(e){
            return e.replace(/<br\/>/g," ")
        }
    },
    computed:{
        ...mapState(["design"]),
    },
    async asyncData({$axios,redirect,store}){
    
      
        
        const res = await $axios.get(api.getSystemHome,{params:{id:store.state.forum.forumInfo.id}})
 
        if (res.code != 1) {
            redirect("/404")
        }
     
        
        return {
            base:store.state.base,
            info: res?.data?.info,
            leftPost: res.data.info.newPostList != null ? res.data.info.newPostList.shift() : null,
            leftPostList: res.data.info.newPostList != null ? res.data.info.newPostList : [],
            rightPost: res.data.info.topPostList != null ? res.data.info.topPostList.shift() : null,
            rightPostList: res.data.info.topPostList != null ? res.data.info.topPostList : [],
        }
    },
    methods:{
        goPath(e){
            this.$router.push(e)
        },
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
        .post-list{
            .box{
                padding: 15px;
                border-radius: 4px;
                background-color: white;
                .info{
                    padding-bottom: 15px;
                    border-bottom: 1px solid #F5F6F7;
                    display: flex;
                    height: 115px;
                    .cover{
                        margin-right: 10px;
                        cursor: pointer;
                        width: 140px;
                        height: 100%;
                        border-radius: 4px;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                            object-fit: cover;
                        }
                    }
                    .title-desc-meta{
                        height: 100%;
                       
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        .title-desc{
                            .title{
                                cursor: pointer;
                                font-size: 16px;
                                font-weight: bold;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .desc{
                                line-height: 14px;
                                cursor: pointer;
                                margin-top: 10px;
                                font-size: 12px;
                                font-weight: bold;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                        }
                        .meta{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .action{
                                display: flex;
                                align-items: center;
                                .action-btn{
                                    padding: 3px 4px;
                                    cursor: pointer;
                                    margin-left: 10px;
                                    display: flex;
                                    align-items: center;
                                    i{
                                        font-size: 14px;
                                    }
                                    span{
                                        
                                        user-select: none;
                                        color: #999;
                                        font-size: 12px;
                                        margin-left: 5px;
                                    }
                                }
                                .date{
                                    margin-left: 15px;
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                            .tag{
                                cursor: pointer;
                                color: #2997f7;
                                font-size: 11px;
                                font-style: normal;
                                display: inline-block;
                                background-color:rgba(41, 151, 247, 0.1);
                                transform: scale(1);
                                padding: 6px 6px;
                                border-radius: 3px;
                                text-transform: capitalize;
                            }
                        }
                    }
                }
                .list{
                    margin-top: 10px;
                    .item{
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        .cate{
                            color: rgba(43, 123, 243, 0.73);
                            font-size: 11px;
                            font-style: normal;
                            display: inline-block;
                            transform: scale(1);
                            border-radius: 3px;
                            text-transform: capitalize;
                        }
                        .title-date{
                            flex: 1;
                            margin-left: 5px;
                            display: flex;
                            align-items: center;
                            h2{
                                user-select: none;
                                flex: 1;
                                font-size: 13px;
                                color: #999;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 1;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                            }
                            .date{
                                margin-left: 10px;
                                display: flex;
                                align-items: center;
                                font-size: 12px;
                                color: #999;
                                .item-b{
                                    display: flex;
                                    align-items: center;
                                    span{
                                        margin-left: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .module{
            margin-top: 20px;
            .item{
                margin-bottom: 20px;
                background: white;
                padding:0 20px;
                border-radius: 4px;
                .item-text{
                    font-size: 16px;
                    letter-spacing: 2px;
                    font-weight: 700;
                    color: #333;
                    padding: 15px 0;
                    border-bottom: 1px solid #eeeeee;
                }
                .item-info{
                    padding: 15px 0;
                    .item-box{
                        display: flex;
                        cursor: pointer;
                        .cover{
                            height: 70px;
                            width: 70px;
                            border-radius: 4px;
                            img{
                                border-radius: 4px;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .info{
                            padding: 3px 0;
                            margin-left: 15px;
                            flex: 1;
                            display: flex;
                            justify-content: space-between;
                            flex-direction: column;
                            .title{
                                margin-bottom: 2px;
                                height: 22px;
                                line-height: 22px;
                                font-size: 16px;
                                font-weight: 400;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 1;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                            }
                            .count{
                                margin-top: 5px;
                                font-size: 12px;
                                .text{
                                    color: #999;  
                                }
                                em{
                                    margin-left: 5px;
                                    font-weight: 700;
                                    color: #000;
                                }
                            }
                            .post{
                                display: flex;
                                align-items: center;
                                font-size: 18px;
                                span{
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
        }
        .link{
            margin-top: 20px;
            background: white;
            padding:0 20px;
            border-radius: 4px;
            .text{
                padding: 15px 0px 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #eeeeee;
                .text-title{
                    position: relative;
                    font-size: 14px;
                    font-weight: bold;
                    padding: 0 12px;
                    height: 30px;
                    line-height: 30px;
                }
                .text-title::before{
                    content: '';
                    width: 4px;
                    height: 18px;
                    position: absolute;
                    left: 0;
                    top: 6px;
                    background-color: #0066ff;
                    border-radius: 4px;
                }
                .more{
                    cursor: pointer;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    color: #0066ff;
                    span{
                        margin-right: 3px;
                    }
                }
            }
            
            .list{
                margin-bottom: 20px;
                margin-top: 15px;
                .item{      
                    border-bottom: 1px solid rgba(212, 212, 212, 0.494);
                    padding: 15px 20px;
                    display: flex;
                    .cover{
                        cursor: pointer;
                        width: 160px;
                        display: block;
                        height: 120px;
                        border-radius: 4px;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                            object-fit: cover;
                        }
                    }
                    .item-info{
                        margin-left: 10px;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .header{
                            .user-info-date{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .date{
                                    font-size: 12px;
                                    color: #999;
                                }
                                .avatar-nickname{
                                    display: flex;
                                    align-items: center;
                                    .avatar{
                                        cursor: pointer;
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 50%;
                                        img{
                                            height: 100%;
                                            width: 100%;
                                            border-radius: 50%;
                                        }
                                    }
                                    .nickname-grade{
                                        margin-left: 5px;
                                        img{
                                            height: 0.8em;
                                            max-width: 6em;
                                            vertical-align: -0.15em;
                                            backface-visibility: hidden;
                                            display: inline-block;
                                        }
                                        .nickname{
                                            
                                            cursor: pointer;
                                            font-size: 13px;
                                            color: #999;
                                        }
                                    }
                                }
                            }
                            .title{
                                color: #494b4d;
                                cursor: pointer;
                                font-size: 18px;
                                font-weight: bold;
                                -webkit-line-clamp: 1;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                word-break: break-all;
                                margin: 11px 0px;
                            }
                            .desc{
                                width: 100%;
                                cursor: pointer;
                                line-height: 24px;
                                font-size: 12px;
                                flex: 1;
                                color: #797C80;
                                -webkit-line-clamp: 1;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                word-break: break-all;
                            }
                        }
                        .footer{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .date-action{
                                display: flex;
                                align-items: center;
                                .meta{
                                    display: flex;
                                    align-items: center;
                                    .action-btn{
                                        margin-left: 10px;
                                        display: flex;
                                        align-items: center;
                                        i{
                                            font-size: 14px;
                                        }
                                        span{
                                            color: #999;
                                            font-size: 12px;
                                            margin-left: 5px;
                                        }
                                    }
                                }
                                .btn{
                                    display: flex;
                                    align-items: center;
                                    border-radius: 4px;
                                    font-size: 14px;
                                    .tag{
                                        padding: 5px 10px;
                                        display: inline-block;
                                        letter-spacing: 1px;
                                        white-space: nowrap;
                                    }
                                }
                            }
                            .tags{
                                display: flex;
                                align-items: center;
                                .cate{
                                    cursor: pointer;
                                    user-select: none;
                                    margin-right: 10px;
                                    color: #2997f7;
                                    font-size: 11px;
                                    font-style: normal;
                                    display: inline-block;
                                    background-color:rgba(41, 151, 247, 0.1);
                                    transform: scale(1);
                                    padding: 6px 6px;
                                    border-radius: 3px;
                                    text-transform: capitalize;
                                }
                                .game{
                                    cursor: pointer;
                                    user-select: none;
                                    margin-right: 10px;
                                    color: #ff3f9f;
                                    font-size: 11px;
                                    font-style: normal;
                                    display: inline-block;
                                    background-color:rgba(255, 63, 159, .1);
                                    transform: scale(1);
                                    padding: 6px 6px;
                                    border-radius: 3px;
                                    text-transform: capitalize;
                                }
                                
                            }
                        }
                    }
                }
                .item:hover{
                    border-radius: 4px;
                    background: rgba(145, 145, 145, 0.083);
                }
            }
        } 
        
        
    }
}
</style>