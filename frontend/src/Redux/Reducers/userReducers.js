import {
     USER_LOGIN_FAIL, 
     USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS,
    USER_LOGOUT 
} from "../Constants/UserConstants";

//LOGIN
export const userLoginReducer = (state = {},action ) =>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { ...state,loading: true,products:[]};
        case USER_LOGIN_SUCCESS:
            return {loading: false,product:action.payload};
        case USER_LOGIN_FAIL:
            return {loading: false,error:action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}  