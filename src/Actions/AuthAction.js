import * as AuthApi from '../Api/AuthRequest'

export const logIn=(formData)=> async(dispatch)=>{
    dispatch({type: "AUTH_START"})
    try {
        const {data}=await AuthApi.logIn(formData)
        
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL",message:error.response.data})
    }

   
    }
export const signUp=(formData)=> async(dispatch)=>{
    dispatch({type: "AUTH_START"})
    try {
        const {data}=await AuthApi.signUp(formData)
        console.log(data,'this is the data from signup in authAction');
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log(error);
        dispatch({type:"AUTH_FAIL"})
    }

   
    }
    export const logOut=()=>async (dispatch)=>{
        dispatch({type:"LOG_OUT"})
    }

    export const reset = ()=> async(dispatch)=>{
        dispatch({type:'RESET'})
    }