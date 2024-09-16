<template>
    <div class="item">
        <div class="avatar">
            <a-avatar :size="55" src="https://cbec.com.cn/wp-content/uploads/2024/07/2024072601451758.jpg" />
        </div>
        <div class="post-info">
            <div class="user-info">
                <div class="name-grade">
                    <div class="name-mate">
                        <div class="name">
                            用户名称
                        </div>
                        <div class="grade">
                            <img src="https://oss.zibll.com/zibll.com/zibll-img/img/user-level-3.png">
                        </div>
                    </div>
                    <div class="date-view">
                        <a-tooltip>
                            <template slot="title">
                            2024-15-2654
                            </template>
                            9小时前发布
                        </a-tooltip>
                        <a-divider type="vertical" />
                        <span>28次阅读</span>
                    </div>
                </div>
                <div class="report">
                    <a-dropdown placement="bottomCenter">
                        <a-icon type="more" />
                        <a-menu slot="overlay">
                            <a-menu-item key="0">
                                <a-icon type="exclamation-circle" /> 举报
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </div>
            <div class="title">
                提问，文本参数里的标签要怎么打开
            </div>
            <div class="content">
                <!-- <span class="topic">
                    <FIcon class="icon" :size="12" type="icon-huati1"/>
                    <span>话题</span>
                    <FIcon class="icon" :size="12" type="icon-huati1"/>
                </span> -->
                <span>
                    用户A设置提问【谁知道如何子比主题搭建网站】用户A设置提问单价为3元，有效期为24–48小时求回复答案，网站扣除用户A的3元余额，超过时间没人解答则退回余额给用户A，用户A只需在等其他人解答自己的问题，这时候如果用户B进行回复，如果用户A采纳了用户B的答案，
                </span>
            </div>
            <div class="images">
                <ImageAdaptation :list="[
                    'https://cbec.com.cn/wp-content/uploads/2024/07/2024072601451758.jpg',
                ]"/>
            </div>
            <div class="resource">
                <div class="icon">
                    <FIcon :size="18" type="icon-xiazai"/>
                </div>
                <div class="text">
                    查看资源查看资源查看资源查看资查看资源查看资源查看资源查看资
                </div>
            </div>
            <div class="footer">
                <div class="forum">
                    <FIcon class="icon" :size="16" type="icon-a-faxianquanzi"/>
                    <span class="forum-text">
                        圈子标题
                    </span>
                </div>
                <div class="action">
                    <div class="btn">
                        <div class="icon">
                            <a-icon type="like" />
                        </div>
                        <div class="text">
                            点赞
                        </div>
                    </div>
                    <div class="btn">
                        <div class="icon">
                            <a-icon type="message" />
                        </div>
                        <div class="text">
                            评论
                        </div>
                    </div>
                    <div class="btn">
                        <div class="icon">
                            <a-icon type="share-alt" />
                        </div>
                        <div class="text">
                            分享
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ImageAdaptation from "@/components/adaptation/image"
import FIcon from '@/components/icon/FIcon'
export default {
    components:{
        ImageAdaptation,
        FIcon
    }
}
</script>

<style lang="less" scoped>
.item{
    background: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    margin-bottom: 20px;
    .avatar{
        margin-right: 20px;
    }
    .post-info{
        flex: 1;
        .user-info{
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .name-grade{
                flex: 1;
                .name-mate{
                    display: flex;
                    align-items: center;
                    .name{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    .grade{
                        margin-left: 10px;
                        height: 1em;
                        max-width: 5em;
                        vertical-align: -0.15em;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        display: inline-block;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .date-view{
                    color: #8a919f;
                    font-size: 12px;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                }
            }
            .report{
                cursor: pointer;
            }
        }
        .title{
            cursor: pointer;
            font-size: 16px;
            color: #333;
            margin-bottom: 10px;
        }
        .content{
            color: #8a919f;
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 16px;
            cursor: pointer;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .topic{
                font-size: 12px;
                height: 20px;
                display: inline-block;
                line-height: 20px;
                padding: 0 5px 0 2px;
                margin-right: 5px;
                border-radius: 3px;
            }
            .topic:hover{
                color: #1890ff;
            }
        }
        .images{
            margin-bottom: 10px;
        }
        .resource{
            display: flex;
            margin-bottom: 10px;
            cursor: pointer;
            align-items: center;
            width: 200px;
            background: #e1edff;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            .icon{
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                background: #4289fa;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                width: 40px;
            }
            .text{
                margin: 10px;
                flex: 1;
                cursor: pointer;
                display: -webkit-box;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
        .footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .action{
                flex: 1;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .btn{
                    user-select: none;
                    cursor: pointer;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    padding: 4px 0px;
                    border-radius: 4px;
                    margin-left: 20px;
                    .icon{
                        margin-right: 5px;
                    }
                    .text{
                        font-size: 12px;
                    }
                }
            }
            .forum{
                margin-right: 5px;
                user-select: none;
                cursor: pointer;
                width: fit-content;
                background: #eaf2ff;
                line-height: 20px;
                border-radius: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2px 10px;
                .icon{
                    margin-right: 5px;
                }
                .forum-text{
                    color: #1e80ff;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>