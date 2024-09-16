/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 14:52:33
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-18 06:31:43
 * @FilePath: \web\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from "@/api/index"

export const state = () => ({
    design:{
        width:1200,
        layout:"default", //home default
        theme: true
    },
    base:{
        title:"",
        theme:"light"
    },
    file:{},
    pay:{},
})

export const mutations = {
    M_UPDATE_Title: (state, title) => {
        state.base.title = title
    },
    M_UPDATE_BASE: (state, base) => {
        state.base = base
    },
    M_UPDATE_FILE: (state, file) => {
        state.file = file
    },
    M_UPDATE_PAY: (state, pay) => {
        state.pay = pay
    },
    M_UPDATE_THEME: (state, theme) => {
        state.design.theme = theme
    },
}  


export const actions = {
    async  nuxtServerInit({ commit }, { app:{$cookies,$axios} }){

        const systemInfo = await $axios.get(api.getSystemInfo)
        commit("M_UPDATE_BASE",systemInfo.data.info.base)
        commit("M_UPDATE_FILE",systemInfo.data.info.file)
        commit("M_UPDATE_PAY",systemInfo.data.info.pay)


        // const forumRes = await $axios.get(api.getForumAll)
        // commit("forum/M_UPDATE_LIST",forumRes.data.list)
        // commit("forum/M_UPDATE_INFO",forumRes.data.list[0])

        // 初始化token到里面
        let token = $cookies.get("xpp-token") ? $cookies.get("xpp-token") : null
       
        commit("user/M_UPDATE_TOKEN",token)
        if (token != null && token != "") {
            const res = await $axios.get(api.getAccountInfo)
            
            commit("user/M_UPDATE_ACCOUNTINFO",res.data.info)

            //通知消息
            const noticeRes = await $axios.get(api.getNoticeCount)
            commit("notice/M_UPDATE_HAVE_NOTICE",noticeRes.data.info)
        }
    },
    A_UPDATE_THEME({commit},theme){
        commit('M_UPDATE_THEME', theme)
    },
    
}