import authReducer from "../pages/Login/LoginSlice"

const rootReducer = (state, action) => {
    return {
        auth: authReducer(state, action),
    }
}

export default rootReducer