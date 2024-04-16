<template>
<div class="widget">
    <div class="reward">
        <p><span>予人玫瑰，手有余香</span></p>
        <div class="count">
            <span>
                <b>{{total}}</b>
                人已充电
            </span>
        </div>
        <ul class="users">
            <a-tooltip @click="gopath(`/user/${item.userInfo.id}`)" v-for="(item,index) in list" :key="index" placement="top">
                <template slot="title">
                <span>{{item.userInfo.nickName}}打赏了{{item.money}}</span>
                </template>
                <li class="item">
                    <img :src="item.userInfo.avatar | resetImage(32,32)" alt="">
                </li>
            </a-tooltip>
            
        </ul>
        <div class="ds-btn">
            <div id="con">
                <div @click="reward" id="TA-con">
                    <div id="text-icon">
                        <a-icon class="icon" type="coffee" />
                        <div id="TA">给他充电</div>
                    </div>
                </div>
                <div id="tube-con">
                    <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 77H234.226L307.006 24H790" stroke="#e5e9ef" stroke-width="20"></path>
                        <path d="M0 140H233.035L329.72 71H1028" stroke="#e5e9ef" stroke-width="20"></path> 
                        <path d="M1 255H234.226L307.006 307H790" stroke="#e5e9ef" stroke-width="20"></path> 
                        <path d="M0 305H233.035L329.72 375H1028" stroke="#e5e9ef" stroke-width="20"></path> 
                        <rect y="186" width="236" height="24" fill="#e5e9ef"></rect> 
                        <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#e5e9ef"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle> 
                        <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#e5e9ef"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                    </svg> 
                    <div id="mask">
                        <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 77H234.226L307.006 24H790" stroke="#f25d8e" stroke-width="20"></path>
                            <path d="M0 140H233.035L329.72 71H1028" stroke="#f25d8e" stroke-width="20"></path> 
                            <path d="M1 255H234.226L307.006 307H790" stroke="#f25d8e" stroke-width="20"></path> 
                            <path d="M0 305H233.035L329.72 375H1028" stroke="#f25d8e" stroke-width="20"></path>
                            <rect y="186" width="236" height="24" fill="#f25d8e"></rect> 
                            <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#f25d8e"></ellipse> 
                            <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                            <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#f25d8e"></ellipse> 
                            <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                        </svg>
                    </div> 
                    <div id="orange-mask">
                        <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 77H234.226L307.006 24H790" stroke="#ffd52b" stroke-width="20"></path>
                            <path d="M0 140H233.035L329.72 71H1028" stroke="#ffd52b" stroke-width="20"></path>
                            <path d="M1 255H234.226L307.006 307H790" stroke="#ffd52b" stroke-width="20"></path> 
                            <path d="M0 305H233.035L329.72 375H1028" stroke="#ffd52b" stroke-width="20"></path> 
                            <rect y="186" width="236" height="24" fill="#ffd52b"></rect> 
                            <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#ffd52b"></ellipse> 
                            <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                            <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#ffd52b"></ellipse>
                            <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                        </svg>
                    </div> 
                    <span id="people">共{{total}}人</span>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>

<script>
import api from "@/api/index"
export default {
    props:{ 
        module:{
            type: String, //指定传入的类型
            default: "" //这样可以指定默认的值
        },
        relatedId: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        },
    },
    data(){
        return{
            total: 0,
            list: []
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        gopath(path){
            this.$router.push(path)
        },
        async getData(){
            const query = {
                page: 1,
                limit: 20,
                module: this.module,
                relatedId: this.relatedId,
            }
            const res = await this.$axios.get(api.getRewardList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.total = res?.data?.total ?? 0
            this.list = res?.data?.list ?? []
        },
        reward(){
            this.$Reward(this.module,this.relatedId)
        },
    }
}
</script>

<style lang="less" scoped>
.reward{
    display: flex;
    justify-content: center;
    flex-flow: column;
    padding: 20px;
    border-radius: 3px;
    position: relative;
    background: #fffcf7;
    .count{
        font-size: 12px;
        margin: 17px 0 5px;
        color: #515A6E;
    }
    .users{
        min-height: 100px;
        max-width: 50%;
        display: flex;
        margin: 0;
        flex-wrap: wrap;
        .item{
            cursor: pointer;
            user-select: none;
            padding: 0;
            border: 0;
            margin: 2px;
            position: unset;
            img{
                display: block;
                width: 32px;
                height: 32px;
                object-fit: cover;
                border-radius: 3px;
            }
        }
    }
    .ds-btn{
        position: absolute;
        right: 20px;
        top: 8px;
        #con{
            width: 320px;
            height: 85px;
            position: relative;
            border-radius: 4px;
            margin: 50px auto;
            #TA-con{
                width: 122px;
                height: 45px;
                background-color: #f25d8e;
                position: absolute;
                top: 50%;
                left: 14%;
                transform: translateY(-50%);
                border-radius: 4px;
                cursor: pointer;
                z-index: 2;
                #text-icon{
                    width: 100px;
                    height: 100%;
                    margin: 0 auto;
                    position: relative;
                    display: flex;
                    align-items: center;
                    .icon{
                        font-size: 18px;
                        color: #fff;
                    }
                    #TA{
                        margin-left: 5px;
                        float: right;
                        line-height: 45px;
                        font-size: 15px;
                        color: #fff;
                    }
                }
            }
            #tube-con{
                width: 157px;
                height: 55px;
                position: absolute;
                right: -5px;
                top: 15px;
                svg{
                    width: 100%;
                    height: 100%;
                }

                #mask{
                    width: 0px;
                    height: 100%;
                    overflow: hidden;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: all 0.5s;
                    svg{
                        width: 157px;
                        height: 55px;
                    }
                }
                #orange-mask{
                    width: 18px;
                    height: 100%;
                    overflow: hidden;
                    position: absolute;
                    left: -15px;
                    top: 0px;
                    svg{
                        position: absolute;
                        top: 0;
                        left: 15px;
                        width: 157px;
                        height: 55px;
                    }
                }
                #people {
                    position: absolute;
                    right: 10px;
                    top: 18px;
                    font-size: 12px;
                    font-family: "雅黑";
                    color: #aaa;
                }
            }
            #TA-con:hover{
                background-color: #ff6b9a;
            }
            #TA-con:hover+#tube-con>#mask {
                width: 157px;
            }
            #TA-con:hover+#tube-con>#orange-mask {
                animation: move1 0.5s linear 0.2s infinite;
            }
            #TA-con:hover+#tube-con>#orange-mask svg {
                animation: movetwo 0.5s linear 0.2s infinite;
            }
        }
    }


}
</style>
