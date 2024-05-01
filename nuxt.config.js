export default {
  hooks:{
    'render:route':(url,result)=>{
      result.html = result.html.replace(/data-n-head=\"ssr\"/gi,'')
    }
  },
  // sitemap:{
  //   path: '/sitemap.xml', // 生成的文件路径
  //   hostname: 'https://xiapaopao.com/', // 网址
  //   cacheTime: 1000 * 60 * 60 * 24, // 1天 更新频率，只在 generate: false有用
  //   gzip: true, // 生成 .xml.gz 压缩的 sitemap
  //   generate: false, // 允许使用 nuxt generate 生成
  //   // 排除不要页面
  //   exclude: [
  //       '/404', //  这里的路径相对 hostname
        
  //       '/notice/answer',
  //       '/notice/chat',
  //       '/notice/comment',
  //       '/notice/follow',
  //       '/notice/like',
  //       '/notice/system',
  //       '/notice',

  //       '/account/base',
  //       '/account/bind',
  //       '/account/course',
  //       '/account/favorite',
  //       '/account/resource',
  //       '/account/verify',
  //       '/account/vip',
  //       '/account/wallet',
  //       '/account',
  //   ],
  //   // xml默认的配置
  //   defaults: {
  //       changefreq: 'always',
  //       lastmod: new Date()
  //   },
  //   // 需要生成的xml数据, return 返回需要给出的xml数据
  //   // routes: async () => {
  //   //     const _url = 'https://api.xiapaopao.com/v1/index/system/sitemap'
  //   //     const res = await axios.get(_url);
  //   //     const routes = res.data.data.map((item)=>{
  //   //         const tmp ={
  //   //             "url": item.url,
  //   //             "changefreq": "yearly",
  //   //             "lastmod": item.lastmod
  //   //         }
  //   //         return tmp
  //   //     })
  //   //     // const routes = []
  //   //     return routes
  //   // }
  // },
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  // telemetry: false,
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'baidu-site-verification', content: 'code-STSylVh5vF' },
      { name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?ee5a17b50839a9894186477806feb69c' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/lib/spin/style/css',
    'ant-design-vue/lib/descriptions/style/css',
    'ant-design-vue/lib/anchor/style/css',
    'ant-design-vue/lib/skeleton/style/css',
    'ant-design-vue/lib/result/style/css',
    'ant-design-vue/lib/popover/style/css',
    'ant-design-vue/lib/progress/style/css',
    'ant-design-vue/lib/switch/style/css',
    'ant-design-vue/lib/checkbox/style/css',
    'ant-design-vue/lib/alert/style/css',
    'ant-design-vue/lib/date-picker/style/css',
    'ant-design-vue/lib/select/style/css',
    'ant-design-vue/lib/upload/style/css',
    'ant-design-vue/lib/tabs/style/css',
    'ant-design-vue/lib/radio/style/css',
    'ant-design-vue/lib/form-model/style/css',
    'ant-design-vue/lib/card/style/css',
    'ant-design-vue/lib/input/style/css',
    'ant-design-vue/lib/timeline/style/css',
    'ant-design-vue/lib/tag/style/css',
    'ant-design-vue/lib/dropdown/style/css',
    'ant-design-vue/lib/menu/style/css',
    'ant-design-vue/lib/config-provider/style/css',
    'ant-design-vue/lib/layout/style/css',
    'ant-design-vue/lib/button/style/css',
    'ant-design-vue/lib/row/style/css',
    'ant-design-vue/lib/col/style/css',
    'ant-design-vue/lib/icon/style/css',
    'ant-design-vue/lib/pagination/style/css',
    'ant-design-vue/lib/table/style/css',
    'ant-design-vue/lib/avatar/style/css',
    'ant-design-vue/lib/badge/style/css',
    'ant-design-vue/lib/modal/style/css',
    'ant-design-vue/lib/message/style/css',
    'ant-design-vue/lib/notification/style/css',
    'ant-design-vue/lib/divider/style/css',
    'ant-design-vue/lib/space/style/css',
    'ant-design-vue/lib/steps/style/css',
    'ant-design-vue/lib/input-number/style/css',
    'ant-design-vue/lib/tree-select/style/css',
    'ant-design-vue/lib/empty/style/css',
    'ant-design-vue/lib/statistic/style/css',
    'ant-design-vue/lib/affix/style/css',
    'ant-design-vue/lib/tooltip/style/css',
    'ant-design-vue/lib/back-top/style/css',
    'ant-design-vue/lib/slider/style/css',
    'ant-design-vue/lib/tree/style/css',
    '~/static/css/reset.css',
    '~/static/css/variable.less',
    '~/static/css/main.less',
  ],

  loading:false,
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {
      src: '@/plugins/baidu'
    },
    '@/plugins/antd-ui',
    // { src: '@/plugins/socket', ssr: false },
    { src: '@/plugins/modals/message', ssr: false },
    { src: '@/plugins/modals/integral', ssr: false },
    { src: '@/plugins/modals/phone', ssr: false },
    { src: '@/plugins/modals/password', ssr: false },
    { src: '@/plugins/modals/email', ssr: false },
    { src: '@/plugins/modals/share', ssr: false },
    { src: '@/plugins/modals/auth', ssr: false },
    { src: '@/plugins/modals/withdraw', ssr: false },
    { src: '@/plugins/modals/pay', ssr: false },
    { src: '@/plugins/modals/upload', ssr: false },
    { src: '@/plugins/modals/payQr', ssr: false },
    { src: '@/plugins/modals/rechargeQr', ssr: false },
    { src: '@/plugins/modals/recharge', ssr: false },
    { src: '@/plugins/modals/reward', ssr: false },
    { src: '@/plugins/modals/report', ssr: false },
    { src: '@/plugins/modals/reservation', ssr: false },
    { src: '@/plugins/modals/imgPreview', ssr: false },
    { src: '@/plugins/axios'},
    { src: '@/plugins/echarts', ssr: false },
    { src: "@/plugins/swipe", ssr: false },
    { src: "@/plugins/clipboard", ssr: false },
    '@/plugins/mixins',
    '@/plugins/md5',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    // "@nuxtjs/sitemap",
  ],
  server:{
    port: 3000,
    host: "0.0.0.0"
  },
  
  // axios: {
  //   prefix: '/v1/',
  //   proxy: true,
  // },
  // proxy: {
  //   "/v1/": {
  //     changeOrigin: true,
  //     target: "http://localhost:8199"
  //   }
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    vendor: ['axios'], // 为防止重复打包
  }
}
