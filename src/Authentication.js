import cookie from 'react-cookies'

export const CheckAuth = () => {
    if(cookie.load('user')!==undefined){
        return true
    }
    return false
}