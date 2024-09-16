const web = "/v1/index"
const api = {

    // -------------------------站点接口
    getSystemApex: web + "/system/apex",
    getSystemPredator: web + "/system/predator",
    getSystemPredatorHistory: web + "/system/predator/history",
    getSystemApexMap: web + "/system/apexMap",

    getSystemAuth: web + "/system/auth",
    getSystemPay: web + "/system/pay",
    getSystemIntegralAndExperience: web + "/system/integralAndExperience",
    getSystemInfo: web + "/system/info",
    getSystemHome: web + "/system/home",
    getSystemHotUser: web + "/system/hotUser",
    getGradeNext: web + "/grade/next",

    // ------------------------- 获取分类版块
    getCategoryInfo: web + "/category/info",
    getCategoryAll: web + "/category/all",
    getGradeAll: web + "/grade/all",
    getForumList: web + "/forum/list",
    getTagHot: web + "/tag/hot",
    getRewardList: web + "/reward/list",
    // ------------------------- 话题接口
    getPostList: web + "/post/list",
    getPostTop: web + "/topic/top",
    postPostCreate: web + "/post/create",
    postPostLike: web + "/post/like",
    postPostFavorite: web + "/post/favorite",
    postPostRemove: web + "/post/remove",
    getPostInfo: web + "/post/info",
    postPostExchange: web + "/post/exchange",
    getPostEditInfo: web + "/post/edit/info",
    postPostEdit: web + "/post/edit",

    // -------------------------文章接口
    postArticleCreate: web + "/article/create",
    getArticleEditInfo: web + "/article/edit/info",
    postArticleEdit: web + "/article/edit",
    getArticleInfo: web + "/article/info",
    postArticleFavorite: web + "/article/favorite",
    postArticleLike: web + "/article/like",
    getArticleList: web + "/article/list",
    postArticleRemove: web + "/article/remove", //删除
    
   
    

    // -------------------------页面接口
    getPageInfo: web + "/page/info",


    // -------------------------autn 接口
    getImageCaptcha: web + "/auth/image/captcha",
    getOption: web + "/auth/option",
    sendCaptcha: web + '/auth/send/captcha',// 发送邮箱验证码
    postRegister: web + '/auth/register',// 用户注册
    postLogin: web + '/auth/login',// 用户登录
    postLogout: web + '/auth/logout',// 用户登出

    // -------------------------媒体 接口
    postuploadFile: web + "/upload/minFile",
    UploadChunk:  web +"/upload/chunk",
    mergeChunk:  web +"/upload/mergeChunk",

    // -------------------------用户账户 接口
    getAccountInfo: web + "/account/info", //获取用户账户信息
    postAccountEdit: web +  "/account/edit", //设置用户账户基础信息
    getAccountBalance: web + "/account/balance", //获取用户账户余额
    postAccountUpdatePassWord: web + "/account/editPassword", //修改用户账户密码
    postAccountUpdateEmail: web + "/account/editEmail", //修改用户邮箱
    postAccountUpdatePhone: web + "/account/editPhone", //修改用户邮箱
    getAccountSecurity: web + "/account/security", //获取用户账户绑定信息
    postAccountSign: web + "/account/sign", // 用户签到
    getAccountArticleList: web + "/account/article/list",
    getAccountPostList: web + "/account/post/list",
    getAccountFavoriteArticleList: web + "/account/favorite/article/list",
    getAccountFavoritePostList: web + "/account/favorite/post/list",


    getAccountProjects: web + "/account/project", //获取用户的需求
    getAccountWorks: web + "/account/work", //获取用户的工作
    getAccountMedals: web + "/account/medals", //获取用户的工作
    
   
    
   
    
    getAccountVerifyStatusIsPayPrice: web + "/account/verify/statusAndIsPayAndPrice", //获取认证信息
    getAccountVerify: web + "/account/verify", //获取认证信息
    postAccountVerify: web + "/account/verify", //提交认证信息

    // -------------------------积分 接口
    getIntegralList: web + "/integral/list",
    // -------------------------提现 接口
    getWithdrawList: web + "/withdraw/list", //获取列表
    postWithdrawCreate: web + "/withdraw/create", //提交
    // -------------------------充值 接口
    getRechargeList: web + "/recharge/list",
    postRechargeCreate: web + "/recharge/create", //
    postRechargePay: web + "/recharge/pay",
    postRechargeCheckStatus: web + "/recharge/status", //创建订单 token

    // -------------------------订单 接口
    getOrderList: web + "/order/list",
    postOrderCreate: web + "/order/create", //
    postOrderPay: web + "/order/pay",
    postOrderCheckStatus: web + "/order/status", //创建订单 token

    // -------------------------用户账户 接口
    postUserFollow: web + "/user/follow", // 关注接口
    getUserInfo: web + "/user/info", //获取用户账户信息
    getUserFollowList: web + "/user/follow/list", //获取用户粉丝列表
    getUserFansList: web + "/user/fans/list", //获取用户粉丝列表
    getUserList: web + "/user/list",
    
    

    // -------------------------通知接口
    getNoticeCount: web + "/notice/count",
    getNoticeList: web + "/notice/list",
    // -------------------------私信接口
    postMessageCreate: web + "/message/create",
    postMessageList: web + "/message/list",


   
    
    // -------------------------举报接口
    postReportCreate: web + "/report/create",

  

    

    // -------------------------评论 接口
    postCommentCreate: web + "/comment/create",
    getCommentList: web + "/comment/list",
    postCommentLike: web + "/comment/like",
    postCommentRemove: web + "/comment/remove",
}
export default api