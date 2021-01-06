
const initState = {
    isLoading: true,
    isAuthenticated: false,
    user:{
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        imageName: "",
        userType: "",
    },
    errors: [],
}
const authReducer = (state = initState, action) => {
        console.log(action)
    
    if(action.type === 'INITIALIZE_USER_INFO') {
        if(action.user_info)
        return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            user: action.user_info
        }
    }else if(action.type==='CLEAR_AUTH_STATE'){
        return{
          ...state,
            isLoading: false,
            isAuthenticated: false,
            user: initState.user
        }
    }else if(action.type==='FORM_ERRORS'){
        return{
          ...state,
          isLoading: false,
          isAuthenticated: true,
          errors: action.errors_res
        }
    }else if(action.type==='LOGIN_ERROR'){
        return{
          ...state,
          isLoading: false,
          isAuthenticated: false,
          errors: action.errors_res
        }
    }
    return state;
}
export default authReducer;