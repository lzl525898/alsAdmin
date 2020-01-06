export default {
    user:{}, // 保存当前登录的user
    menu:[], // 保存当前用户的menu
    menuList:[], // 保存当前select菜单列表
    clearMemory(){
        this.user = {}
        this.menu = []
    }
}
