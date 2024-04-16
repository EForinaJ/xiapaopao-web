export const state = () => ({
    token: null,
    accountInfo:{
        avatar:"",
        cover:"",
        balance:0,
    }
})
  
export const mutations = {
    M_UPDATE_TOKEN: (state, payload) => {
        state.token = payload
    },

   

    // ------------------------------
    M_UPDATE_ACCOUNTINFO: (state, payload) => {
        state.accountInfo = payload
    },
    M_UPDATE_AVATAR: (state, payload) => {
        state.accountInfo.avatar = payload
    },
    M_UPDATE_COVER: (state, payload) => {
        state.accountInfo.cover = payload
    },
    M_UPDATE_NICKNAME: (state, payload) => {
        state.accountInfo.nickName = payload
    },
    M_UPDATE_SIGN: (state, payload) => {
        state.accountInfo.isSign = payload
    },
    M_UPDATE_BALANCE: (state, payload) => {
        state.accountInfo.balance = payload
    },
    M_UPDATE_INTEGRAL: (state, payload) => {
        state.accountInfo.integral = payload
    },
}

export const actions = {
    A_UPDATE_TOKEN({commit},token){
        commit('M_UPDATE_TOKEN', token)
    },
    

    A_UPDATE_SIGN({commit},payload){
        commit('M_UPDATE_SIGN', payload)
    },
    A_UPDATE_ACCOUNTINFO({commit},payload){
        commit('M_UPDATE_ACCOUNTINFO', payload)
    },
    A_UPDATE_AVATAR({commit},payload){
        commit('M_UPDATE_AVATAR', payload)
    },
    A_UPDATE_COVER({commit},payload){
        (payload)
        commit('M_UPDATE_COVER', payload)
    },
    A_UPDATE_NICKNAME({commit},payload){
        commit('M_UPDATE_NICKNAME', payload)
    },
    A_UPDATE_BALANCE({commit},payload){
        commit('M_UPDATE_BALANCE', payload)
    },
    A_UPDATE_INTEGRAL({commit},payload){
        commit('M_UPDATE_INTEGRAL', payload)
    },
}