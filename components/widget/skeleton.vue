<template>
  <div class="loading">
    <div class="skeleton-item">
        <a-skeleton :loading="loading" :title="false" active></a-skeleton>
    </div>
    <div class="skeleton-item">
        <a-skeleton :loading="loading" :title="false" active></a-skeleton>
    </div>
    <div class="skeleton-item">
        <a-skeleton :loading="loading" :title="false" active></a-skeleton>
    </div>
    <div class="skeleton-item">
        <a-skeleton :loading="loading" :title="false" active></a-skeleton>
    </div>
    <div class="skeleton-item">
        <a-skeleton :loading="loading" :title="false" active></a-skeleton>
    </div>
</div>
</template>

<script>
export default {
    props:{ 
        loading:{
            type: Boolean, //指定传入的类型
            default: false //这样可以指定默认的值
        },
    },
}
</script>

<style lang="less" scoped>
.loading{
    background: white;
    padding: 20px 20px;
    .skeleton-item{
        margin-bottom: 20px;
    }
}
</style>