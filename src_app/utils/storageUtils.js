import store from 'store';
const USER_KEY = 'als_user_key';
const MENU_NODE = 'als_menu_node';
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
    },
    /*
    保存Menu
     */
    saveMenu(node){
        store.set(MENU_NODE, node)
    },
    /*
    读取Menu
     */
    getMenu(){
        return store.get(MENU_NODE) || []
    },
    /*
    删除Menu
     */
    removeMenu(){
        store.remove(MENU_NODE)
    },
    /*
    清空所有存储
     */
    clearAllStore(){
        this.removeUser()
        this.removeMenu()
    },
}
