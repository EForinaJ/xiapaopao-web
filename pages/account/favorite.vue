<template>
    <div class="account-page">
        <div class="content">
            <!-- <div class="menu">
                <ul class="list">
                    <li @click="goRouter('/')" :class="selectKey == '/' ? 'active item' : 'item'">
                        <span>
                            帖子
                        </span>
                    </li>
                    <li @click="goRouter('/wiki')" :class="selectKey == '/wiki' ? 'active item' : 'item'">
                        <span>
                            文章
                        </span>
                    </li>
                </ul>
            </div> -->
            <div class="panel">
                <transition name="page-transition">
                    <!-- <Nuxt /> -->
                    <nuxt-child></nuxt-child>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

import FIcon from '@/components/icon/FIcon'
export default {
    middleware: 'auth',
    components:{
        FIcon,
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    data(){
        return{
            selectKey:'',
        }
    },
    mounted(){
        this.updateMenu()
    },
    methods:{
        updateMenu () {
          if (this.$route.path != "/404") {
            const routes = this.$route.matched.concat()
            this.selectKey = routes.pop().path.slice(17)
          }
        },
        goRouter(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
            }else{
                this.selectKey = e
                this.$router.push('/account/favorite'+e)
            }
        }
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
    }
}
</script>

<style lang="less" scoped>
.account-page{
    

    .header{
        margin-bottom: 20px;
        .box{
            background-color: white;
            border-radius: 4px;
            padding: 15px 20px;

            .text{
                display: flex;
                align-items: center;
                span{
                    margin-left: 10px;
                }
            }
            .num-btn{
                margin-top: 20px;  
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btn{
                    display: flex;
                    align-items: center;
                    .btn-ac{
                        cursor: pointer;
                        user-select: none;
                        margin-left: 10px;
                        display: flex;
                        align-items: center;
                        padding: 6px 15px;
                        border-radius: 4px;
                    }
                    .tx{
                        border: 1px #5c7cff solid;
                        color: #5c7cff;
                    }
                    .cz{
                        color: white;
                        background-color:#5c7cff;
                    }
                    .gmjf{
                        color: #ff6373;
                        border: 1px #ff6373 solid;
                    }
                }
            }
            .desc{
                margin-top: 10px;
                font-size: 12px;
                color: #777;

            }
        }
    }

    

    .content{
        background-color: white;
        border-radius: 4px;
        margin-bottom: 20px;
        .menu{
            .list{
                padding-top: 10px;
                display: flex;
                align-items: center;
                padding-bottom: 6px;
                border-bottom: 1px solid rgba(50, 50, 50, 0.06);
                .item{
                    position: relative;
                    padding-bottom: 8px;
                    cursor: pointer;
                    user-select: none;
                    padding-left: 5px;
                    margin: 0;
                    padding-right: 5px;
                    line-height: 1.4;
                    color: #999;
                    span{
                        padding: 0 5px;
                    }
                }
                .item::before{
                    width: 20px;
                    height: 2px;
                    bottom: 0;
                    opacity: 0;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px -1px #155bd5;
                    background: #155bd5;
                    position: absolute;
                    content: '';
                    transition: .4s;
                    left: 0;
                    right: 0;
                    margin: auto;
                    transform-origin: center;
                }
                .item:hover{
                    color: #155bd5;
                }
                .active{
                    color: #155bd5;
                }
                .active::before{
                    opacity: 1;
                }
            }
        }
        .panel{
            .page-transition-enter-active ,.page-transition-leave-active{
                transition: opacity 1s;
            }
            .page-transition-enter ,.page-transition-leave-to{
                opacity: 0;
            }
        }
    }
}
</style>