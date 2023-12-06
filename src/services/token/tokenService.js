export function setUserToken(key, content){
    localStorage.setItem(key, content);
}
export function getUserToken(){
    const userToken = localStorage.getItem("user");
    const parsedUser = JSON.parse(userToken);
    return parsedUser;
}