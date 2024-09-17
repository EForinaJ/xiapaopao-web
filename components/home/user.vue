<template>
    <div class="widget">
        <div class="cover" :style="`background-image: url(${accountInfo.cover});`"> </div>
        <div class="info">
            <div class="avatar-name">
                <div @click="goPath(`/user/${accountInfo.id}`)" class="avatar">
                    <a-avatar :size="45" :src="accountInfo.avatar"/>
                </div>
                <div class="name-grade">
                    <div @click="goPath(`/user/${accountInfo.id}`)" class="name">
                        {{accountInfo.nickName}}
                    </div>
                    <div v-if="accountInfo.grade != null" class="grade">
                        <img :src="accountInfo.grade.icon">
                    </div>
                </div>
            </div>
            <div class="mate">
                <div class="dis">
                    <p>帖子</p>
                    <span>{{accountInfo.posts | resetNum}}</span>
                </div>
                <div class="dis">
                    <p>获赞</p>
                    <span>{{accountInfo.likes | resetNum}}</span>
                </div>
                <div class="dis">
                    <p>粉丝</p>
                    <span>{{accountInfo.fans | resetNum}}</span>
                </div>
                <div class="dis">
                    <p>关注</p>
                    <span>{{accountInfo.follows | resetNum}}</span>
                </div>
            </div>
        </div>
        <div class="announcement">
            <ul class="list">
                <li @click="goPath(`/announcement/${item.id}`)" v-for="(item,index) in list" :key="index" class="item">
                    <span class="agc">公告</span>
                    <span class="text">{{item.title}}</span>
                </li>
            </ul>
        </div>
        <div @click="goPath(`/announcement`)" class="more">
            全部公告
        </div>
        <div @click="signIn" class="sign">
            <div class="icon">
                <FIcon class="icon" :size="16" type="icon-qiandaoyouli"/>
            </div>
            <div class="text">
                {{accountInfo.isSign ? "已签到" : "立即签到"}}
            </div>
        </div>
    </div>
</template>


<script>
import { mapState,mapActions } from "vuex"
import FIcon from '@/components/icon/FIcon'
import api from "@/api/index"
export default {
    computed:{
        ...mapState("user",["token","accountInfo"]),
    },
    components:{
        FIcon
    },
    data(){
        return{
            list:[],
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        ...mapActions("user",["A_UPDATE_SIGN","A_UPDATE_INTEGRAL"]),
        
        async getList(){
            let query = {
                page: 1,
                limit: 3,
            }
            const res = await this.$axios.get(api.getAnnouncementList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list ?? [] 
        },
        async signIn(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            if(this.accountInfo.isSign){
                this.$message.error(
                    "已经签到过了",
                    3
                )
                return
            }

            const res = await this.$axios.post(api.postAccountSign)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.$message.success(
                "获得"+res.data.num+"经验",
                3
            )
            this.A_UPDATE_SIGN(true)
            this.A_UPDATE_INTEGRAL(this.accountInfo.integral + res.data.num)
        },
        goPath(path){
            this.$router.push(path)
        },
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
                cursor: pointer;
                margin-right: 10px;
            }
            .name-grade{
                flex: 1;
                cursor: pointer;
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
                cursor: pointer;
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