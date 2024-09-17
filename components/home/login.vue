<template>
    <div class="widget">
        <div class="login-text">
            登录后可阅读更多话题
        </div>
        <div class="action">
            <div @click="login" class="login btn">
                <a-icon type="login" />
                <span>登录</span>
            </div>
            <div @click="login" class="register btn">
                <a-icon type="login" />
                <span>注册</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        login(){
            this.$Auth("login","登录","快速登录")
        },
    }
}
</script>

<style lang="less" scoped>
.widget{
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: white;
    height: 200px;
    .login-text{
        font-size: 18px;
        font-weight: bold;
    }
    .action{
        margin-top: 20px;
        display: flex;
        align-items: center;
        .btn{
            cursor: pointer;
            user-select: none;
            border-radius: 4px;
            padding: 8px 14px;
        }
        .login{
            color: #2997f7;
            background: rgba(41, 151, 247, .1);
        }
        .register{
            margin-left: 10px;
            color: #ff6f06;
            background: rgba(255, 111, 6, 0.1);
        }
    }
}
</style>