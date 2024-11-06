export const getIsAuth = (state) => {
    console.log(state)
    return state?.auth?.isAuth
};

export const getUserInfo = (state) => {
    console.log(state)
    return state?.auth?.userInfo
};
