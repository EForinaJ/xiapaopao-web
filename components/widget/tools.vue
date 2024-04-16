<template>
<div class="season-predator-master">
    <div class="season">
        <div class="season-text">
            <h2>赛季主题：{{info.season}}</h2>
            <h2>{{info.number}}赛季</h2>
        </div>
        <div class="date">
            <span>上分赛结束时间</span>
            <a-statistic-countdown
            valueStyle="
                font-size: 12px;
                font-weight: 700;
            "
            :value="info.rankEndTime" 
            format="D 天 H 时 m 分 s 秒" />
        </div>
    </div>
    <div class="predator">
        <div class="predator-text-desc-icon">
            <div class="predator-text-desc">
                <h2>APEX猎杀榜</h2>
                <p>世界前750名</p>
            </div>
            <div class="icon">
                <img src="/img/apex/icon/apexpredator1.png" alt="APEX猎杀榜">
            </div>
        </div>
        <div class="count-more">
            <div class="count">
                <h2>猎杀底分:</h2>
                <a-statistic 
                :value="info.predatorScore" 
                valueStyle="color: red;" />
            </div>
        </div>
    </div>
    <div class="master">
        <div class="master-text-icon">
            <h2>当前大师人数</h2>
            <img src="/img/apex/icon/master1.png" alt="APEX猎杀榜">
        </div>
        <div class="count">
            <a-statistic 
                :value="info.totalMasters" 
                valueStyle="color: #7024d5;" />
        </div>
    </div>
</div>
</template>

<script>
import api from "@/api/index"
export default {
    data(){
        return{
            timeData: {},
            info:{
                season: "",
                number: "",
                endTime: "",
                rankEndTime: "",
                totalMasters: "",
                predatorScore: "",
            },
            deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            const res = await this.$axios.get(api.getSystemApex)     
            this.info.season=res.data.info.season
            this.info.number=res.data.info.number
            this.info.endTime=res.data.info.endTime
            this.info.rankEndTime= res.data.info.rankEndTime
            this.info.rankEndTime = this.info.rankEndTime * 1000
            this.info.totalMasters= res.data.info.totalMasters
            this.info.predatorScore= res.data.info.predatorScore
        },
        
    }
}
</script>

<style lang="less" scoped>
.season-predator-master{
    margin-bottom: 15px;
    .season{
        padding:10px;
        border-radius: 4px;
        background: #99a9bf;
        .season-text{
            flex: 1;
            // margin-left: 10px;
            display: flex;
            justify-content: space-between;
            h2{
                font-weight: 700;
                font-size: 18px;
                letter-spacing: 2px;
                color: #333;
            }
        }
        .date{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 10px;
            font-size: 12px;
            font-weight: 700;
        }
        
    }
    .predator{
        margin-top: 15px;
        padding:10px;
        border-radius: 4px;
        background: #CED7E1;
        .predator-text-desc-icon{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .predator-text-desc{
                h2{
                    color: red;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 2px;
                }
                p{
                    margin-top: 8px;
                    letter-spacing: 2px;
                    font-size: 14px;
                    color: #999;
                }
            }
            .icon{
                width: 50px;
                height: 50px;
                img{
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .count-more{
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            .count{
                display: flex;
                align-items: center; 
                h2{ 
                    font-size: 20px;
                    line-height: 32px;
                    margin-right: 5px;
                }
            }
        }
    }
    .master{
        margin-top: 15px;
        padding:10px;
        border-radius: 4px;
        background: #e5e9f2;
        .master-text-icon{
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width: 32px;
                height: 32px;
                object-fit: cover;
            }
            h2{
                color: #7024d5;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 2px;
            }
        }
        .count{
            margin-top: 8px;
        }
    }
}
</style>