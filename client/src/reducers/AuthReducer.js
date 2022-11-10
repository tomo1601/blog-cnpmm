export const AuthReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, isUser, isAdmin } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                isUser,
                isAdmin,
            }
        default:
            return state
    }
}
