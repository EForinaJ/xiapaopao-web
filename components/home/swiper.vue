<template>
    <div class="widget">
        <swiper  class="swiper-container" :options="swiperOption"   >
            <swiper-slide>
                <img class="swiper-cover" :src="info.cover">
            </swiper-slide>
            
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
    </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    components:{
        Swiper,
        SwiperSlide,
    },
    data(){
        return{
            swiperOption: {
                
                centeredSlides: false,
                spaceBetween: 0,
                grabCursor: true,
                autoplay: false, // 是否自动打开
                loop: true, // 关闭无限循环
                slidesPerView: 1,
                // direction : 'vertical', // 滑动方向
                on: {
                    click: function () {
                        // vm.goLink(this.realIndex)
                    },
                    slideChange: function () {
                        // vm.activeIndex = this.realIndex
                    }
                },
                pagination: {
                    // type: 'progressbar',
                    el: '.swiper-pagination',
                    dynamicBullets: false
                },
            },
            info:{
                "cateInfo": {
                    "cateId": 12,
                    "parentId": 0,
                    "title": "系统教程"
                },
                "cover": "https://zaaap-1254235226.cos.ap-guangzhou.myqcloud.com/images/2022/08/04/b2a12a7557e27ac96292bd8ff2d0a168.jpg?imageMogr2/thumbnail/!50p",
                "createTime": "2022-05-19 19:15:54",
                "description": "测试有",
                "favorites": 3124,
                "hots": 12312,
                "id": 7,
                "likes": 1231,
                "module": "video",
                "status": 2,
                "title": "基于宝塔安装教程环境安装",
                "userInfo": {
                    "id": 1,
                    "nickName": "EForinaj",
                    "follows": 2,
                    "fans": 2,
                    "posts": 7,
                    "likes": 18,
                    "cover": "https://zaaap-1254235226.cos.ap-guangzhou.myqcloud.com/short_pic/2022/08/06/20211111_170454.jpg?imageMogr2/thumbnail/!50p",
                    "integral": 1250,
                    "avatar": "https://zaaap-1254235226.cos.ap-guangzhou.myqcloud.com/images/2022/08/05/f7866ac1d2a5b9603d678a1a6792efbe.jpg?imageMogr2/thumbnail/!50p",
                    "description": "干撒大发噶丹是asd123asd",
                    "sex": 1,
                    "isFollow": false,
                    "isVerify": true,
                    "grade": {
                        "title": "等级一",
                        "icon": "http://localhost:8199/public/uploads/2022-07-09/clb1f10c1a1krsnlgs.png"
                    },
                    "vip": null
                },
                "views": 23289
            },
            locale: zhCN,
        }
    },
}
</script>

<style lang="less" scoped>
.widget{
    .swiper-container{
        height: 200px;
       
        border-radius: 4px;
        .swiper-item{
            
            cursor: pointer;
            height: 100%;
            width: 100%;
            border-radius: 10px;
            img{
                border-radius: 10px;
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
            
        }
        --swiper-pagination-color:  white;/* 两种都可以 */
    }
}
</style>