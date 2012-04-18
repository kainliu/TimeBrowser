/**
 * Namespace of TimeBrowser
 */

var TB = {};

/**
 * Initialization
 */
TB.init = {
	
}
/**
 * Init all when page on loaded
 */	
$(function(){
	
//窗体默认居中
TB.window_control.window_normal();

//标签默认序号从1开始
$("#tabs-bar").data("num","1")

//去除noscript提示
$("#content-info").remove()

//显示iframe
$("#content iframe").show()

//禁止选中
$("div").disableSelection()

//Jquery-ready end
});