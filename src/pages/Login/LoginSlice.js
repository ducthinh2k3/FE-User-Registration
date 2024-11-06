const initState = {
    isAuth: false,
    userInfo: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'auth/saveUserLogin':
            return {...initState, isAuth:true, userInfo: action.payload}
        case 'auth/saveUserLogout':
            console.log("logout")
            return {...initState, isAuth:false, userInfo: null}
        default:
            return state?.auth
    }
}

export default authReducer