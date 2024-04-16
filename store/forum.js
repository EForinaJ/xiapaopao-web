export const state = () => ({
    forumInfo: null,
    forumList: [],
})
  
export const mutations = {
    M_UPDATE_INFO: (state, payload) => {
        state.forumInfo = payload
    },
    M_UPDATE_LIST: (state, payload) => {
        state.forumList = payload
    },
}
