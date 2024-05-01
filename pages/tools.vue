<template>
    <div class="page">
        <div class="container" :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="24" :md="18">
                    <!-- 轮换地图 -->
                    <div class="map">
                        <div v-if="loading" class="loading">
                            <a-spin tip="加载数据中..." size="large" />
                        </div>
                        <div v-if="!loading">
                            <a-row :gutter="[{md:20}]">
                                <a-col :span="24" :md="12">
                                    <div class="map-box">
                                        <div class="map-current"  :style="{ backgroundImage: `url(${resetImage(info.rank.current.code)})` }"></div>
                                        <div class="map-next" :style="{ backgroundImage: `url(${resetImage(info.rank.next.code)})` }"> </div>
                                        <h2 class="current-map-mode">
                                            排位模式
                                        </h2>
                                        <p class="current-map-title">
                                            <span>当前地图:</span>
                                            <span>{{info.rank.current.code | resetTitle}}</span>
                                        </p>
                                        <p class="current-map-date">
                                            <span>{{info.rank.current.starTime | resetTime}}</span>
                                            <span>~</span>
                                            <span>{{info.rank.current.endTime | resetTime}}</span>
                                        </p>

                                        <p class="next-map-titel">
                                            <span>接下来:</span>
                                            <span>{{info.rank.next.code | resetTitle}}</span>
                                        </p>
                                        <p class="next-map-date">
                                            <span>{{info.rank.next.starTime | resetTime}}</span>
                                            <span>~</span>
                                            <span>{{info.rank.next.endTime | resetTime}}</span>
                                        </p>

                                    </div>
                                </a-col>
                                <a-col :span="24" :md="12">
                                    <div class="map-box">
                                        <div class="map-current"  :style="{ backgroundImage: `url(${resetImage(info.pubs.current.code)})` }"></div>
                                        <div class="map-next" :style="{ backgroundImage: `url(${resetImage(info.pubs.next.code)})` }"> </div>
                                        <h2 class="current-map-mode">
                                            匹配模式
                                        </h2>
                                        <p class="current-map-title">
                                            <span>当前地图:</span>
                                            <span>{{info.pubs.current.code | resetTitle}}</span>
                                        </p>
                                        <p class="current-map-date">
                                            <span>{{info.pubs.current.starTime | resetTime}}</span>
                                            <span>~</span>
                                            <span>{{info.pubs.current.endTime | resetTime}}</span>
                                        </p>

                                        <p class="next-map-titel">
                                            <span>接下来:</span>
                                            <span>{{info.pubs.next.code | resetTitle}}</span>
                                        </p>
                                        <p class="next-map-date">
                                            <span>{{info.pubs.next.starTime | resetTime}}</span>
                                            <span>~</span>
                                            <span>{{info.pubs.next.endTime | resetTime}}</span>
                                        </p>

                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>

                    <!-- 猎杀列表 -->
                    <div class="predator-box">
                        <div v-if="loading" class="loading">
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                            <div class="skeleton-item">
                                <a-skeleton  :loading="loading" :title="false" active></a-skeleton>
                            </div>
                        </div>
                        <div v-if="!loading" class="predator-list">
                            <div class="notice-sreach">
                                <div class="notice">
                                    <a-alert message="排行榜数据每5分钟更新一次" banner  style="width: 100%"/>
                                </div>
                                <div class="search">
                                    <a-input-search v-model="predatorName" @change="onSearch" 
                                    size="large" placeholder="请输入游戏名称"
                                    style="width: 100%"
                                    @pressEnter="onSearch" />
                                </div>
                            </div>
                            <div v-if="predatorList.length > 0" class="list">
                                <div v-for="(item,index) in predatorList" :key="index" >
                                    <div v-if="item.name != ''" class="item">
                                        <div class="item-box">
                                            <div class="index">
                                                <span>{{item.ranking}}</span>
                                            </div>
                                            <div class="icon">
                                                <img src="/img/apex/icon/apexpredator1.png" alt="">
                                            </div>
                                            <div class="nickname-desc">
                                                <div class="nickname">
                                                    {{item.name != "" ? item.name : "游戏ID读取不到"}} 
                                                </div>
                                                <div class="desc">
                                                    <a-badge v-if="item.line == ''" status="default" text="未知" />
                                                    <a-badge v-if="item.line == 'lobby'" status="success" text="在线" />
                                                    <a-badge v-if="item.line == 'Offline'" status="error" text="离线" />
                                                    <a-badge v-if="item.line == 'match'" status="warning" text="游戏中" />
                                                    <span v-if="item.id != ''" @click="openHistory(item.id)" class="view-his">{{ predatorHistoryId == item.id ? "隐藏历史" : "查看历史"}}</span>
                                                </div>
                                            </div>
                                            <div class="count">
                                                <div class="num">
                                                    <a-statistic 
                                                        suffix="RP" 
                                                        :value="item.rankScore"
                                                        :value-style="{ 
                                                            color: '#000',
                                                            fontSize: '24px',
                                                            fontWeight: '700' 
                                                        }"
                                                    />
                                                </div>
                                                <div class="status">
                                                    <a-statistic
                                                        v-if="item.rankScoreStatus == 'up'"
                                                        :value="item.rankScoreValue"
                                                        :precision="0"
                                                        suffix="RP"
                                                        :value-style="{ color: '#3f8600',fontSize: '14px' }"
                                                    
                                                    >
                                                        <template #prefix>
                                                            <a-icon type="arrow-up" />
                                                        </template>
                                                    </a-statistic>
                                                    <a-statistic
                                                        v-if="item.rankScoreStatus == 'down'"
                                                        :value="item.rankScoreValue"
                                                        :precision="0"
                                                        suffix="RP"
                                                        :value-style="{ color: '#ff0000',fontSize: '14px' }"
                                                    
                                                    >
                                                        <template #prefix>
                                                            <a-icon type="arrow-down" />
                                                        </template>
                                                    </a-statistic>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div v-if="predatorHistoryId == item.id" class="history">
                                            <div v-if="predatorHistoryloading" class="loading">
                                                <div class="skeleton-item">
                                                    <a-skeleton  :loading="predatorHistoryloading" :title="false" active></a-skeleton>
                                                </div>
                                                <div class="skeleton-item">
                                                    <a-skeleton  :loading="predatorHistoryloading" :title="false" active></a-skeleton>
                                                </div>
                                                <div class="skeleton-item">
                                                    <a-skeleton  :loading="predatorHistoryloading" :title="false" active></a-skeleton>
                                                </div>
                                                <div class="skeleton-item">
                                                    <a-skeleton  :loading="predatorHistoryloading" :title="false" active></a-skeleton>
                                                </div>
                                            </div>
                                            
                                            <div v-if="!predatorHistoryloading">
                                                <div v-for="(jitem,jindex) in predatorHistoryList" :key="jindex" class="history-item">
                                                    <span :style="`${jitem.rankStatus == 'up' ? 'color: green;' : 'color: red;'}`">{{jitem.rankScore}}</span>
                                                    <span class="time">{{jitem.text}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div v-if="item.name == ''" class="nodata">
                                        排名更新，数据库正在更新无法查询
                                    </div>
                                </div>
                            </div>
                            <div v-if="list.length > 0" class="pagination">
                            <a-config-provider :locale="locale">
                                    <a-pagination
                                        @change="changePage"
                                        :pageSize="queryParam.limit"
                                        :current="queryParam.page"
                                        :total="total"
                                        show-quick-jumper
                                    >
                                    </a-pagination>
                                </a-config-provider>
                            </div>
                        </div>
                    </div>

                </a-col>
                <a-col :span="24" :md="6">
                    <!-- 助手 -->
                    <Tools/>
                    <About />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import About from "@/components/widget/about"
import Tools from "@/components/widget/tools"

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapState } from "vuex"
import api from "@/api/index"
import {format,addHours} from "date-fns"
export default {
    components:{
       About,Tools
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","accountInfo"]),
    },
    head () {
        return {
            title: `${this.base.title} - 工具`,
            meta: [
                { name: 'keywords', content: this.base.description },
                { name: 'description', content: this.base.description }
            ]
        }
    },
    filters:{
        resetTitle(e){
            switch (e) {
                case "Storm Point":
                    return "风暴点"
                case "Olympus":
                    return "奥林匹斯"
                case "Broken Moon":
                    return "残月"
                case "World's Edge":
                    return "世界尽头"
                case "":
                    return ""
                default:
                    return "未知"
            }
        },
        resetTime(e){
            if (e != "") {
                let time = new Date(parseInt(e) * 1000)
                return  format(addHours(time,2), "MM-dd HH:mm")
            }
            return  "未知"
        },
    },
    data(){
        return{
            loading:false,
            locale: zhCN,
            info: {
                rank:{
                    current:{
                        coce: "",
                        starTime: "1712577616",
                        endTime: "1712577616",
                    },
                    next:{
                        coce: "",
                        starTime: "1712577616",
                        endTime: "1712577616",
                    },
                },
                pubs:{
                    current:{
                        coce: "",
                        starTime: "1712577616",
                        endTime: "1712577616",
                    },
                    next:{
                        coce: "",
                        starTime: "1712577616",
                        endTime: "1712577616",
                    },
                },
            },
            queryParam: {
                page: 1,
                limit: 20,
            },
            list:  [],
            total: 0,
            predatorList:[],
            predatorName:undefined,

            predatorHistoryId:0,
            predatorHistoryList:[],
            predatorHistoryloading: false,
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            this.loading = true
            const res = await this.$axios.get(api.getSystemApexMap)     
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.info = res.data.info
            const predatorList = await this.$axios.get(api.getSystemPredator)
            if (res.code != 1) {
                redirect("/404")
            }
            predatorList?.data?.list.splice(0,1)
            let start = (this.queryParam.page - 1) * this.queryParam.limit; // 当前页的起始索引
            let end = start + this.queryParam.limit; // 当前页的结束索引
            let dataToShow = predatorList?.data?.list.slice(start, end); 
            this.predatorList = dataToShow
            this.list = predatorList?.data?.list
            this.total = predatorList?.data?.list.length
            this.loading = false
        },
        async openHistory(e){
            if (this.predatorHistoryId == e) {
                this.predatorHistoryId = 0
            }else{
                this.predatorHistoryId = e
                this.predatorHistoryloading = true
                let id = e.split("-")
                const res = await this.$axios.get(api.getSystemPredatorHistory,{params:{id:id[1]}})     
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                res.data.info = res.data.info != null ? res.data.info : []
                res.data.info.splice(0,1)
                res.data.info.pop()
                this.predatorHistoryList = res.data.info
                this.predatorHistoryloading = false
            }
        },
        resetImage(e){
            switch (e) {
                case "Storm Point":
                    return "/img/apex/map/Storm_Point.png"
                case "Olympus":
                    return "/img/apex/map/Olympus.png"
                case "Broken Moon":
                    return "/img/apex/map/Broken_Moon.png"
                case "World's Edge":
                    return "/img/apex/map/Worlds_Edge.png"
                case "":
                    return "/img/apex/map/Worlds_Edge.png"
                default:
                    return "未知"
            }
        },
        changePage(page,limit){
            this.queryParam.page = page
            this.queryParam.limit = limit
            let start = (page - 1) * limit; // 当前页的起始索引
            let end = start + limit; // 当前页的结束索引
            this.predatorList = this.list.slice(start, end);
           
        },
        onSearch(e){
            if (this.predatorName != '') {
                let tmpList =  this.list.filter((item)=>{
                    return item.name.includes(this.predatorName)
                })
                this.predatorList = tmpList
            }else{
                let start = (this.queryParam.page - 1) * this.queryParam.limit; // 当前页的起始索引
                let end = start + this.queryParam.limit; // 当前页的结束索引
                let dataToShow = this.list.slice(start, end); 
                this.predatorList = dataToShow
            }
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
        margin: 20px 0;
        .map{
            margin-bottom: 20px;
            .map-box{
                position: relative;
                height: 200px;
                border-radius: 4px;
                width: 100%;
                .map-current{
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 200px;
                    border-radius: 4px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    -webkit-clip-path: polygon(0 0, 80% 0%, 50% 100%, 0% 100%);
                    clip-path: polygon(0 0, 80% 0%, 50% 100%, 0% 100%);
                }
                .map-next{
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 200px;
                    border-radius: 4px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-image: url('/img/home/h2-slider3-background-img.jpg');
                    -webkit-clip-path: polygon(80% 0, 100% 0, 100% 100%, 50% 100%);
                    clip-path: polygon(80% 0, 100% 0, 100% 100%, 50% 100%);
                }
                .mask{
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 200px;
                    border-radius: 4px;
                    background-color: #00000069;
                }
                .current-map-mode{
                    border-bottom: 2px white solid;
                    color: white;
                    font-size: 18px;
                    font-weight: 700;
                    position: absolute;
                    padding-bottom: 10px;
                    top: 20px;
                    left: 20px;
                    letter-spacing: 4px;
                }
                .current-map-title{
                    position: absolute;
                    bottom: 70px;
                    left: 20px;
                    letter-spacing: 4px;
                    color: white;
                    span{
                        margin-right: 5px;
                        font-size: 16px;
                    }
                }
                .current-map-date{
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    color: white;
                    span{
                        margin-right: 5px;
                        font-size: 12px;
                    }
                }
                .next-map-titel{
                    position: absolute;
                    bottom:  45px;
                    right: 20px;
                    letter-spacing: 2px;
                    color: white;
                    span{
                        margin-right: 5px;
                        font-size: 14px;
                    }
                }
                .next-map-date{
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    color: white;
                    span{
                        margin-right: 5px;
                        font-size: 12px;
                    }
                }
            }
            .loading{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 200px;
            }
        }
        .predator-box{
            background: white;
            border-radius: 4px;
            .loading{
                
                .skeleton-item{
                    padding: 20px;
                }
            }
            .predator-list{
                .notice-sreach{
                    // display: flex;
                    // align-items: center;
                    // justify-content: space-between;
                    .notice{
                        flex: 1;
                        margin-right: 30px;
                        margin-bottom: 10px;
                    }
                    .search{
                        padding: 20px;
                    }
                }
                .list{
                    font-weight: 700;
                    .item{
                        cursor: pointer;
                        
                        border-bottom: 1px solid #f2f2f2;
                        padding: 15px;
                        .item-box{
                            display: flex;
                            align-items: center;
                            .index{
                                span{
                                    display: block;
                                    padding: 0;
                                    font-size: 28px;
                                    margin-right: 10px;
                                    line-height: 1;
                                    text-align: center;
                                    font-family: Impact;
                                    color: #eaeaea;
                                }
                            }
                            .icon{
                                margin-left: 20px;
                                height: 50px;
                                width: 50px;
                                img{
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .nickname-desc{
                                flex: 1;
                                margin-left: 20px;
                                .nickname{
                                    font-size: 18px;
                                    font-weight: 700;
                                    letter-spacing: 1px;
                                }
                                .desc{
                                    margin: 5px 0;
                                    display: flex;
                                    align-items: center;
                                    .view-his{
                                        cursor: pointer;
                                        user-select: none;
                                        color: #1890ff;
                                        font-size: 12px;
                                        margin-left: 10px;
                                    }
                                }
                            }
                        }
                        .history{
                            margin-left: 100px;
                            .history-item{
                                span{
                                    font-size: 12px;
                                }
                                .time{
                                    margin-left: 10px;
                                }
                                padding: 5px;
                            }
                        }
                    }
                    .item:hover{
                        box-shadow: 0 6px 16px 0 #d6e0e8;
                    }
                    .nodata{
                        border-bottom: 1px solid #f2f2f2;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px 0;
                    }
                    .nodata:hover{
                        cursor: pointer;
                        box-shadow: 0 6px 16px 0 #d6e0e8;
                    }
                }
                .pagination{
                    padding: 20px;
                }
            }
        }
    }
}
</style>