<template>
    <div class="widget">
        <div class="cover" style="background-image: url(https://cbec.com.cn/wp-content/uploads/2024/07/2024081902504971.jpg);"> </div>
        <div class="info">
            <div class="avatar-name">
                <div class="avatar">
                    <a-avatar :size="45" src="https://cbec.com.cn/wp-content/uploads/2024/07/2024081402434259.jpg" shape="square"/>
                </div>
                <div class="name-grade">
                    <div class="name">
                        用户名称
                    </div>
                    <div class="grade">
                        <img src="https://oss.zibll.com/zibll.com/zibll-img/img/user-level-3.png">
                    </div>
                </div>
            </div>
            <div class="mate">
                <div class="dis">
                    <p>帖子</p>
                    <span>10</span>
                </div>
                <div class="dis">
                    <p>获赞</p>
                    <span>10</span>
                </div>
                <div class="dis">
                    <p>粉丝</p>
                    <span>10</span>
                </div>
                <div class="dis">
                    <p>关注</p>
                    <span>10</span>
                </div>
            </div>
        </div>
        <div class="announcement">
            <ul class="list">
                <li class="item">
                    <span class="agc">公告</span>
                    <span class="text">WordPress轻社交购物主题：B2Pro_3.4.1 + APP插件_1.1.0+uniapp源码_1.1.0（微信小程序）更新通知</span>
                </li>
                <li class="item">
                    <span class="agc">公告</span>
                    <span class="text">WordPress轻社交购物主题：B2Pro_3.4.1 + APP插件_1.1.0+uniapp源码_1.1.0（微信小程序）更新通知</span>
                </li>
                <li class="item">
                    <span class="agc">公告</span>
                    <span class="text">WordPress轻社交购物主题：B2Pro_3.4.1 + APP插件_1.1.0+uniapp源码_1.1.0（微信小程序）更新通知</span>
                </li>
            </ul>
        </div>
        <div class="more">
            全部公告
        </div>
        <div class="sign">
            <div class="icon">
                <FIcon class="icon" :size="16" type="icon-qiandaoyouli"/>
            </div>
            <div class="text">
                立即签到
            </div>
        </div>
    </div>
</template>


<script>
import FIcon from '@/components/icon/FIcon'
export default {
    components:{
        FIcon
    }
}
</script>

<style lang="less" scoped>
.widget{
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;
    .cover{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        height: 0;
        padding-top: 38%;
        height: 80px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        image-rendering: -webkit-optimize-contrast;
    }
    .info{
        .avatar-name{
            padding: 10px;
            display: flex;
            align-items: center;
            .avatar{
                margin-right: 10px;
            }
            .name-grade{
                .name{
                    font-size: 16px;
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
                    margin-top: 5px;
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
        }
        .mate{
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            height: 56px;
            box-shadow: inset -13px -48px 80px -35px rgba(17, 58, 93, 0.05);
            overflow: hidden;
            .dis{
                flex-direction: column;
                justify-content: center;
                align-items: center;
                display: flex;
                p{
                    font-weight: 600;
                    margin-bottom: 5px;
                    font-size: 12px;
                    color: #bcbcbc;
                }
                span{
                    font-weight: 600;
                }
            }
        }
    }
    .announcement{
        padding: 10px 0;
        .list{
            .item{
                
                display: flex;
                align-items: center;
                padding: 16px 20px;
                .agc{
                    padding-left: 17px;
                    position: relative;
                    font-size: 12px;
                    line-height: 16px;
                    margin-right:10px;
                }
                .agc::before{
                    background-color: #e04a1c;
                    content: '';
                    width: 6px;
                    height: 6px;
                    position: absolute;
                    left: 0px;
                    top: 5px;
                    border-radius: 10px;
                }
                .text{
                    flex: 1;
                    color: #8a919f;
                    font-size: 13px;
                    line-height: 16px;
                    cursor: pointer;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
    .more{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
        border-top: 1px solid #f0f0f0;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
    }
    .sign{
        user-select: none;
        cursor: pointer;
        position: absolute;
        background: linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
        display: flex;
        align-items: center;
        padding: 5px 10px;
        top: 30px;
        right: 0;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        .icon{
            margin-right: 5px;
        }
        .text{
            font-size: 13px;
            color: white;
        }
    }
}
</style>