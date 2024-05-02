<template>
<div class="contaier">
  <div  class="header" >
      <div class="header-top" >
        <div class="header-top-menu" :style="{width:design.width+'px'}">
          <ul class="top-menu">
            <li  v-for="(item,index) in forumList" :key="index" :style="{ backgroundImage: `url(${item.cover})` }" class="item">
              {{item.title}}
            </li>
          </ul>
          <a-input-search 
            v-model="keyword"
            placeholder="请输入搜索内容" 
            style="width: 200px" @search="onSearch" />
        </div>
      </div>
      <div  :class="fixed ? 'header-bottom fixed' : 'header-bottom'">
        <div class="header-bottom-logo-menu-user-search" :style="{width:design.width+'px'}" >
            <div class="logo-menu">
              <!-- <div class="logo">
                <img :src="base.logo" :alt="base.title">
              </div> -->
              <div class="logo-text">
                爱派克斯
              </div>
              <ul class="menu">
                <li :class="selectedKeys[0] == '' ? 'active item' : 'item'">
                  <nuxt-link :to="`/`">
                    首页
                  </nuxt-link>
                </li>
                <!-- <li :class="selectedKeys[0] == '/articles' ? 'active item' : 'item'" >
                  <nuxt-link  :to="`/articles`">
                    文章
                  </nuxt-link>
                </li> -->
                <li :class="selectedKeys[0] == '/tools' ? 'active item' : 'item'" >
                  <nuxt-link  :to="`/tools`">
                    工具
                  </nuxt-link>
                </li>
                <li :class="selectedKeys[0] == '/about' ? 'active item' : 'item'" >
                    <nuxt-link :to="`/about`">
                      About
                    <small class="small shop-tips">Me</small>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="user-search">
              <a-space :size="15">
                <nuxt-link :to="`/notice/`" v-if="token != null && system != 0 || message != 0 || comment != 0 || like != 0 || follow != 0">
                  <a-badge dot>
                    <a-icon :style="{fontSize:22+'px',color:'#6a6a6a'}" class="icon" type="bell" />
                  </a-badge>
                </nuxt-link>
                
                <nuxt-link :to="`/notice/`" v-if="token != null && system == 0 && message == 0 && comment == 0 && like == 0 && follow == 0">
                  <a-icon :style="{fontSize:22+'px',color:'#6a6a6a'}" class="icon" type="bell" />
                </nuxt-link>
                

                <div v-if="token != null" @click="goPath('/post/create')" class="create-action">
                  <a-icon type="edit" />
                  <span>投稿</span>
                </div>

                <div class="user">
                  <div v-if="token != null" class="main-user">
                    <a-dropdown 
                    :trigger="['click']" 
                    placement="bottomCenter" >
                      <a-avatar 
                      shape="square"
                      :src="accountInfo.avatar+'@w60_h60'"
                      class="meta-avatar" 
                      :size="35" icon="user" />
                      <a-menu  slot="overlay">
                          <a-menu-item key="2" @click="goPath(`/user/${accountInfo.id}`)">
                              个人主页
                          </a-menu-item>
                          <a-menu-item key="1" @click="goPath('/account')">
                              用户中心
                          </a-menu-item>
                          
                          <a-menu-divider />
                          <a-menu-item key="5" @click="logout">
                              <a-icon type="logout" />
                              退出
                          </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <div v-if="token == null" class="menus-meta">
                    <a-button @click="goPath" type="dashed" class="mmenus-meta-login">登录</a-button>
                    <a-button @click="toRegister" type="primary" class="mmenus-meta-login">注册</a-button>
                  </div>
                </div>
              </a-space>
            </div>
        </div>
      </div>
  </div>  
  <div class="page-content" id="menuFlag">
    <transition name="page-transition">
      <Nuxt />
    </transition>
  </div>
  <div class="footer">
    <p-footer/>
  </div>
</div>
</template>

<script>
import PFooter from "@/components/footer/Footer"
import FIcon from "@/components/icon/FIcon"
import { mapState,mapMutations } from "vuex"
import api from "@/api/index"
export default {
    components: {
      PFooter,
      FIcon
    },
    computed:{
      ...mapState("forum",["forumList"]),
      ...mapState(["design","base"]),
      ...mapState("user",["token","accountInfo"]),
      ...mapState("notice",["system","message","comment","like","follow"])
    },
    data() {
      return {
        fixed:false,
        keyword:"",
        openKeys: [],
        selectedKeys: [],
        timer:null,
      };
    },
    mounted () {

        window.addEventListener(
          "scroll",
          this.fixedActive
        )

        this.updateMenu()
        // this.timer = window.setInterval(() => {
        //     setTimeout(() => {
        //         this.getNotice()
        //     },0)
        // },8000)
    },
    destroyed() {
        window.clearInterval(this.timer)
        window.removeEventListener("scroll",this.fixedActive)
    },
    methods: {
        fixedActive(){
          let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          
          let offsetTop = document.querySelector('#menuFlag').offsetTop
       
          this.fixed = scrollTop > offsetTop

        },


        ...mapMutations("notice",['M_UPDATE_HAVE_NOTICE']),
        ...mapMutations("user",['M_UPDATE_TOKEN']),
        goPath(){
            this.$Auth("login","登录","快速登录")
        },
        async logout(){
          const res = await this.$axios.post(api.postLogout)
          if (res.code != 1) {
              this.$message.error(
                  res.message,
                  3
              )
              return
          }
          this.M_UPDATE_TOKEN(null)
          this.$cookies.remove("xpp-token")
          this.$router.push(`/home`)
        },
        toRegister(){
            this.$Auth("register","用户注册","立即注册")
        },
        goPath(path){
          if (this.token == null) {
            this.$Auth("login","登录","快速登录")
          }else{
            this.$router.push(path)
          }
        },
        onSearch(){
            this.$router.push({
                path:"/search",
                query:{
                    keyword:this.keyword
                }
            })
        },
        onOpenChange (openKeys) {
        this.openKeys = openKeys
        },
        updateMenu () {
          if (this.$route.path != "/404") {
            const routes = this.$route.matched.concat()
            this.selectedKeys = [ routes.pop().path ]
          }
        }
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
    }
}
</script>


<style lang="less" scoped>
.fixed{
  position: fixed !important;
  top: 0;
  transition: all 2s;
  z-index: 19;
}
.header{
  z-index: 19;
  width: 100%;
  box-shadow: 0px 5px 40px 0px rgba(17,58,93,.1);
  .header-top{
    background: #111;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-top-menu{
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/.ant-input{
        color: #fff;
        fill: #fff;
        background-color: rgba(204,204,204,0.21);
        border: 0;
      }
      /deep/.ant-input:focus{
        box-shadow: none;
      }
      /deep/ .ant-input-search-icon{
        color: #fff;
      }
    
      .top-menu{
        display: flex;
        .item{
          font-size: 16px;
          font-weight: bold;
          color: white;
          background-color: rgba(253, 49, 49, 0.802);
          padding: 0 30px;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }

    .menu-user{
      margin-left: 10px;
      display: flex;
      align-items: center;
      .menu{
        display: flex;
        .item{
            padding: 0 10px;
          a{
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 16px;
            color: #6a6a6a;
            font-weight: 700;
            font-family: "beethorn-zc";
            .icon{
              font-size: 20px;
              margin-bottom: 5px;
              line-height: 1.2;
            }
          }
        }
        .item:hover{
          a{
            color: rgb(213, 176, 255);
            .icon{
               color: rgb(213, 176, 255);
            }
          }
        }
      }
      .user{
        margin-left: 10px;
        .menu-main-right-user{
            display: flex;
            align-items: center;
            // width: 180px;
            justify-content: flex-end;      
            .meta-avatar{
              // margin: 0 15px;
              cursor: pointer;
            }
        }
        .menus-meta{
            display: flex;
            align-items: center;
            .mmenus-meta-login{
                margin-left: 10px;
                line-height: 0.2;
            }
        }
      }
    }
  }
  .header-bottom{
    width: 100%;
    background: white;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-bottom-logo-menu-user-search{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-menu{
        display: flex;
        align-items: center;
        .logo{
          height: 60px;
          // width: 140px;
          
        }
        .logo-text{
            color: #111;
            font-size: 22px;
            letter-spacing: 3px;
        }
        .menu{
            margin-left: 26px;
            display: flex;
            align-items: center;
            white-space: nowrap;
          .item{
            margin-right: 26px;
            .small{
              position: absolute;
              display: block;
              right: -5px;
              top: 16px;
              font-size: 10px;
              font-weight: 400;
              padding: 0 7px;
              line-height: 17px;
              color: #ffffff;
              border-radius: 4px 4px 4px 0;
              transform: translate(50%, -75%);
              height: 18px;
              background: linear-gradient(to right, #f35 0%, #ff6780 100%);
            }
            a{
              position: relative;
              // font-family: "xiapaopao-zc";
              opacity: 1;
              font-size: 16px;
              position: relative;
              display: flex;
              align-items: center;
              transition: opacity .2s ease-out;
              padding: 21px 0;
              color: #333333;
              fill: #333333;
            }
            
          }
          .active{
              a::after{
                background: #0066ff;
                content: '';
                width: 10px;
                height: 2px;
                border-radius: 5px;
                bottom: 12px;
                position: absolute;
                margin-left: auto;
                margin-right: auto;
                left: 0;
                right: 0;
                text-align: center;
              }
          }
        }
      }

      .user-search{
        // margin-right: 20px;
        .main-user{
          cursor: pointer;
        }
        .create-action{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: .6em 1.4em !important;
          margin: .4em;
          cursor: pointer;
          color: white;
          border-radius: 15px;
          font-size: 12px;
          background: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
        }
      }
    }
    
  }
}

.page-transition-enter-active ,.page-transition-leave-active{
    transition: opacity 1s;
}
.page-transition-enter ,.page-transition-leave-to{
    opacity: 0;
}
</style>