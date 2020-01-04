export default {
    /*
    取窗口可视范围的高度
     */
    getClientHeight()
    {
        let clientHeight=0;
        if(document.body.clientHeight&&document.documentElement.clientHeight)
        {
            clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        else
        {
            clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
    },
    /*
    取窗口滚动条滚动高度
     */
    getScrollTop()
    {
        let scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
            scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    },
    /*
    取文档内容实际高度
     */
    getScrollHeight()
    {
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }
}
