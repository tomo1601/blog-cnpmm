export const PostReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: payload.data,
                postsLoading: false
            }
        default:
            return state
    }
}
