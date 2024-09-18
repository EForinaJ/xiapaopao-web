<template>
    <div class="widget">
        <ul class="list">
            <li @click="changeSelectKey(0)" :class="selectkey == 0 ? 'item active' : 'item' ">
                <span>
                    全部
                </span>
            </li>
            <li @click="changeSelectKey(1)" :class="selectkey == 1 ? 'item active' : 'item' ">
                <span>
                    热门
                </span>
            </li>
            <li @click="changeSelectKey(2)" :class="selectkey == 2 ? 'item active' : 'item' ">
                <span>
                    最新
                </span>
            </li>
            <li @click="changeSelectKey(3)" :class="selectkey == 3 ? 'item active' : 'item' ">
                <span>
                    精华
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectkey: 0
        }
    },
    methods:{
        changeSelectKey(e){
            this.selectkey = e
            this.$emit("changeSelectKey",e)
        }
    }
}
</script>

<style lang="less" scoped>
.widget{
    .list{
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
</style>