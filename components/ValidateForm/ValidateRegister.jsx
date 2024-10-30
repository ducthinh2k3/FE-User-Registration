export default function ValidationRegister(value){
    const error = {}
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(value.email === ""){
        error.email = "Email is required"
    }else if(!emailPattern.test(value.email)){
        error.email = "Invalid email format"
    }

    if(value.password === ""){
        error.password = "Password is required"
    }
    else if(value.password.length < 5){
        error.password = "Password must contain at least 5 characters"
    }
    
    if(value.rePassword === ""){
        error.rePassword = "Password is required"
    }else if(value.password !== value.rePassword){
        error.rePassword = "Passwords does not match"
    }

    return error
}