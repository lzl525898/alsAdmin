import store from 'store';
const USER_KEY = 'als_user_key';
export default {
    /*
    保存User
     */
    saveUser(user){
        store.set(USER_KEY, user);
    },
    /*
    读取User
     */
    getUser(){
        return store.get(USER_KEY) || {}
    },
    /*
    删除User
     */
    removeUser(){
        store.remove(USER_KEY)
    }
}
