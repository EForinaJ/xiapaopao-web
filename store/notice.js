export const state = () => ({
    system: 0,
    comment: 0,
    like: 0,
    follow: 0,
    message:0
})
  
export const mutations = {
    M_UPDATE_HAVE_NOTICE: (state, payload) => {
        state.system = payload.system
        state.message = payload.message
        state.comment = payload.comment
        state.like = payload.like
        state.follow = payload.follow
    },
}