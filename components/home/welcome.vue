<template>
    <div class="widget">
        <div class="welcome-text">
            <p class="title">嗨！朋友</p>
            <p>所有的伟大，都源于一个勇敢的开始</p>
        </div>
        <div class="login">
            <div @click="login" class="item">
                快速登录
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
    </div>
</template>

<script>
import { mapState,mapActions } from "vuex"
import api from "@/api/index"
export default {
    computed:{
        ...mapState("user",["token"]),
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
        login(){
            this.$Auth("login","登录","快速登录")
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
    .welcome-text{
        font-size: 13px;
        padding: 24px 20px;
        // background-image: -webkit-gradient(linear, left top, right top, from(#fff2ec), color-stop(42%, #f0f1f6), to(#e1f0ff));
        background-image: linear-gradient(90deg, #fff2ec 0, #f0f1f6 42%, #e1f0ff 100%);
        position: relative;
        p{
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: relative;
            z-index: 2;
        }
        .title{
            color: #0066ff;
            margin-bottom: 10px;
        }
    }
    .welcome-text::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: -webkit-gradient(linear, left bottom, left top, from(#fff), to(rgba(247, 248, 249, 0)));
        background-image: linear-gradient(0deg, #fff 0, rgba(247, 248, 249, 0) 100%);
    }
    .login{
        font-size: 12px;
        display: flex;
        border-top: 1px dashed #f5f6f7;
        border-bottom: 1px dashed #f5f6f7;
        background: #f7f8fa30;
        overflow: hidden;
        line-height: 43px;
        padding: 0 18px;
        flex-wrap: wrap;
        .item{
            user-select: none;
            cursor: pointer;
        }
        .item::before{
            background-color: #2d89ef;
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 100%;
            display: inline-block;
            margin-right: 3px;
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
}
</style>