<template>
    <div :class="design.theme ? 'widget' : 'widget dark'">
        <div class="inner-wrapper-sticky">
            <div class="post-content-footer-in">
                <div class="post-footer-content">
                    <!-- <a-tooltip placement="left">
                        <template slot="title">
                        <span>主题</span>
                        </template>
                        <button @click="changeTheme" class="poster-span b2tooltipbox">
                            <FIcon v-if="!design.theme" :size="24" type="icon-baitianmoshi"/>
                            <FIcon v-if="design.theme" :size="24" type="icon-heiyemoshi"/>
                        </button>
                    </a-tooltip> -->
                    <a-tooltip placement="left">
                        <template slot="title">
                        <span>回到顶部</span>
                        </template>
                        <button @click="backTop" class="poster-span b2tooltipbox">
                            <FIcon v-if="!design.theme" :size="24" type="icon-arrowup"/>
                            <FIcon v-if="design.theme" :size="24" type="icon-arrowup-dark"/>
                        </button>
                    </a-tooltip>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapActions } from "vuex"
import FIcon from '@/components/icon/FIcon'
export default {
    components:{
        FIcon,
    },
    computed:{
        ...mapState(["design"]),
    },
    methods:{
        ...mapActions(["A_UPDATE_THEME"]),
        changeTheme(){
            this.A_UPDATE_THEME(!this.design.theme)
        },
        backTop(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style lang="less" scoped>
.widget{
    position: fixed;
    right: 40px;
    flex-flow: column;
    bottom: 80px;
    padding-top: 0;
    width: 49px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    .inner-wrapper-sticky{
        .post-content-footer-in{
            .post-footer-content{
                display: flex;
                flex-flow: column;
                .poster-span{
                    cursor: pointer;
                    user-select: none;
                    margin-right: 0;
                    margin-bottom: 20px;
                    width: 48px;
                    height: 48px;
                    padding: 0;
                    text-align: center;
                    display: block;
                    border-radius: 100%;
                    
                    box-shadow: 0 4px 16px 0 rgba(13, 39, 91, 0.033);
                    background: #fff;
                    color: inherit;
                    border: 0;
                    font-size: 20px;
                }
            }
            .post-footer-like{
                cursor: pointer;
                user-select: none;
                .like{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    i{
                        font-size: 26px;
                        margin-bottom: 10px;
                    }
                    span{
                        color: #999;
                        font-size: 12px;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}

.dark{
    .inner-wrapper-sticky{
        .post-content-footer-in{
            .post-footer-content{
                .poster-span{
                    background: #161A1D;
                    box-shadow: 8px 8px 20px rgba(55, 99, 170, .1), -8px -8px 20px #000;
                }
            }
        }
    }
}
</style>