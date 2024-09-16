
<template>
<div class="siber-box">
    <div class="text">
        <h2>帮助我</h2>
    </div>
    <div class="hot-topic">
        <div class="info">
            <div class="jztext">
                <p>平台当前为站长为爱发电</p>
                <br/>
                <p>每月都有固定的开支（服务器费用，运维费用等）</p>
                <br/>
                <p>您的捐款，不仅仅是一份物质上的帮助</p>
                <br/>
                <p>更是一份精神的鼓励，感谢您！</p>
                <br/>
                <p>接保猎，上钻，上大师，陪玩</p>
            </div>
            <div  class="cont">
                <a-space>
                    <span>QQ:</span>
                    <span>356866114</span>
                </a-space>
                <a-divider type="vertical" />
                <a-space>
                    <span>微信:</span>
                    <span>xpp_111</span>
                </a-space>
            </div>
        </div>
        <div class="code">
            <div class="code-info">
                <img src="/img/about/wechat.png" alt="" srcset="">
            </div>
        </div>
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            selectKey:0,
        }
    },
    methods:{ 
        changeSelectKey(e){
            this.selectKey = e
        }
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
        .menu-data{
            .menu-list{
                display: flex;
                margin:15px 20px;
                justify-content: space-around;
                .item{
                    user-select: none;
                    cursor: pointer;
                    display: inline-block;
                    padding: 10px 10px;
                    border-radius: 4px;
                    background-color: #cee4f8;
                    font-size: 14px;
                    color: #155bd5;
                    font-weight: 600;
                }
                .active{
                    background-color: #155bd5;
                    color: white;
                }
            }
        }
        .code{
            display: flex;
            justify-content: center;
            align-items: center;
            .code-info{
                height: 180px;
                width: 180px;
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    object-fit: cover;
                }
            }
        }
        .info{
            margin:15px 20px;
            .jztext{
                margin-bottom: 5px;
                font-size: 13px;
                color: #999;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                p{
                    width: 100%;
                }
            }
            .cont{
                margin-top: 10px;
                padding-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 13px;
            }
        }
    }
}
</style>