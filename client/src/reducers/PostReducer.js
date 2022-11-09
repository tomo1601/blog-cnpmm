export const PostReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: payload.data,
                postsLoading: false
            }
        case 'FIND_POSTS_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        case 'FIND_POSTS_FAIL':
            return {
                ...state,
                posts: {},
                postsLoading: false
            }
        default:
            return state
    }
}
