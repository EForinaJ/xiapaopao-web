<template>
    <div :class="design.theme ? 'hot-forum' : 'hot-forum dark'">
        <ul class="menu">
            <li @click="selectMenu(1)" :class="(menuKey == 1 && myForumKey == 0 && topForumKey == 0) ? 'item active' : 'item'">
                <FIcon class="icon" :size="20" type="icon-huxiangguanzhu"/>
                <span class="title">关注</span>
            </li>
            <li @click="selectMenu(0)" :class="(menuKey == 0 && myForumKey == 0 && topForumKey == 0) ? 'item active' : 'item'">
                <FIcon class="icon" :size="20" type="icon-faxian1"/>
                <span class="title">综合</span>
            </li>
            <li @click="selectMenu(2)" :class="(menuKey == 2 && myForumKey == 0 && topForumKey == 0) ? 'item active' : 'item'">
                <FIcon class="icon" :size="20" type="icon-remen"/>
                <span class="title">热门</span>
            </li>
            <div v-if="token != null" class="group" >
                <div :class="myForumKey != 0 ? 'group-text active' : 'group-text'">
                    <FIcon class="icon" :size="20" type="icon-huati"/>
                    <span class="text">我的圈子</span>
                </div>
                <ul class="group-menu">
                    <li 
                        @click="selectMyForum(item)"
                        v-for="(item,index) in mylist"
                        :key="index"
                        :class="myForumKey == item.id ? 'group-item active': 'group-item' ">
                            {{item.title}}
                    </li>
                </ul>
            </div>
            <div class="group" >
                <div :class="topForumKey != 0 ? 'group-text active' : 'group-text'">
                    <FIcon class="icon" :size="20" type="icon-huati"/>
                    <span class="text">推荐圈子</span>
                </div>
                <ul class="group-menu">
                    <li 
                        @click="selectTopForum(item)"
                        v-for="(item,index) in toplist"
                        :key="index"
                        :class="topForumKey == item.id ? 'group-item active': 'group-item' ">
                            {{item.title}}
                    </li>
                    <li :class="'group-item' ">
                        更多圈子
                    </li>
                </ul>
            </div>
        </ul>
    </div>
</template>


<script>
import { mapState } from "vuex"
import FIcon from '@/components/icon/FIcon'
import api from "@/api/index"
export default {
    components:{
        FIcon
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
    },
    data(){
        return{
            mylist:[],
            toplist:[],
            menuKey: 0,
            myForumKey: 0,
            topForumKey: 0,
        }
    },
    mounted(){
        if (this.token != null) {
            this.getMyList()
        }
        

        this.getTopList()
    },
    methods:{
        async getMyList(){
            let query = {
                page: 1,
                limit: 8,
                isJoin:true,
            }
            const res = await this.$axios.get(api.getForumList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.mylist = res.data.list ?? [] 
        },
        async getTopList(){
            let query = {
                page: 1,
                limit: 8,
                isTop:true,
            }
            const res = await this.$axios.get(api.getForumList,{params: query})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.toplist = res.data.list ?? [] 
        },
        selectMyForum(e){
            this.menuKey = 0
            this.myForumKey = e.id
            this.topForumKey = 0
            this.$emit("changeForum",e.id)
        },
        selectTopForum(e){
            this.menuKey = 0
            this.myForumKey = 0
            this.topForumKey = e.id
            this.$emit("changeForum",e.id)
        },
        selectMenu(e){
            this.menuKey = e
            this.myForumKey = 0
            this.topForumKey = 0

            this.$emit("changeMode",e)
        }
    }
}
</script>

<style lang="less" scoped>
.hot-forum{
    max-height: calc(100vh - 40px);
    
    margin-bottom: 15px;
    top: 80px;
    position: sticky;
    height: fit-content;
    border-radius: 4px;
    overflow-x: hidden;
    .menu{
        background: white;
        padding: 8px;
        border-radius: 4px;
        .item{
            cursor: pointer;
            margin-bottom: 2px;
            display: flex;
            align-items: center;
            font-size: 22px;
            padding: 10px 15px;
            .title{
                font-size: 16px;
                
            }
            .icon{
                margin-right: 15px;
            }
        }
        .active{
            color:#1e80ff;
            border-radius: 2px;
            background: #eaf2ff!important;
        }
        .item:hover{
            color:#1e80ff;
            border-radius: 2px;
            background: #eaf2ff!important;
        }
        .group{
            .group-text{
                cursor: pointer;
                margin-bottom: 2px;
                display: flex;
                align-items: center;
                font-size: 22px;
                padding: 10px 15px;
                .text{
                    font-size: 16px;
                    
                }
                .icon{
                    margin-right: 15px;
                }
            }
            .group-active{
                color:#1e80ff;
            }
            .group-text:hover{
                color:#1e80ff;
                border-radius: 2px;
                background: #eaf2ff!important;
            }
            .group-menu{
                .group-item{
                    cursor: pointer;
                    margin-bottom: 2px;
                    display: flex;
                    align-items: center;
                    font-size: 22px;
                    padding: 10px 5px;
                    font-size: 13px;
                    padding-left: 55px;
                    color: #8a919f;
                }
                .active{
                    color:#1e80ff;
                    border-radius: 2px;
                    background: #eaf2ff!important;
                }
                .group-item:hover{
                    color:#1e80ff;
                    border-radius: 2px;
                    background: #eaf2ff!important;
                }
            }
        }
    }
}
.dark{
    .menu{
        color: #DEE4EA;
        background: #161A1D;
        .active{
            background: #101214!important;
        }
        .item:hover{
            background: #dee4ea13!important;
        }
        .group{
            color: #DEE4EA;
            .group-active{
                color:#1e80ff;
                background: #101214!important;
            }
            .group-text:hover{
                color:#1e80ff;
                border-radius: 2px;
                background: #101214!important;
            }
            .group-menu{
                .active{
                    background: #101214!important;
                }
                .group-item:hover{
                    background: #dee4ea13!important;
                }
            }
        }
    }
}
</style>