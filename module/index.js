$(function(){

	//窗体处理
	$( "#window" )
	.css({
		"margin":0
	})
	//可整体拖动
	.draggable({ 
		handle: "#title-bar",
		cancel:"#text-menu",
		containment: "parent"
	})
	//可调整大小
	.resizable({ 
		maxHeight:$("#wrapper").height(),
		maxWidth:$("#wrapper").width(),
		minHeight:500,
		minWidth:614 + 80,
		alsoResize:"#content",
		resize:function(){	
			nav_buttons_resize();	
			nav_apps_resize();
			tabs_resize();
		}
	})


	//双击标题栏最大化
	$("#title-bar")
	.dblclick(function(){
		 TB.window_control.window_max() 
	});

	//在普通窗口的最小size中,移动到相应导航上显示全部.
	// $(".nav-child").hover(function(){
		// $(this).css({"z-index":"3"})
	// },function(){
		// $(this).css({"z-index":"1"})	
	// })


	//点击网页区域消除IFRMAE上的罩层
	//拖放调整大小时往往未捕捉到鼠标左脚施放的动作以及按钮无法释放等效果
	$("html")		
	.mouseup(function(){	
		$("#content-mask").hide();  
	});

	//Bind drag evnet to resizable handler
	//拖拽拖动
	$( ".ui-resizable-handle" )
	.mousedown(function(){	
		// show mask above iframe but make it invisible 
		// to prevent the cursor capturing events inside the iframe when dragging
		// 打开遮罩层，但是不可见，目的是让鼠标在拖动时不会受到iframe内的网页的影响
		$("#content-mask").css("opacity",0).show();
	})


	//Bind event for window control buttons
	//窗口大小控制按钮
	$("#window-min")
	.click(function(){ TB.window_control.window_min();    });			
	
	$("#window-normal")
	.click(function(){ TB.window_control.window_normal(); });
	
	$("#window-max")
	.click(function(){ TB.window_control.window_max();	  });
	
	$("#window-close")
	.click(function(){ TB.window_control.window_close();  });			


//导航控制
$("#backward-button")
.click(function(){ history.go(-1); })

$("#forward-button")
.click(function(){ history.go(1);  });	
		
$("#refresh-button")
.click(function(){
	$(".current-content").attr("src",$(".current-content").attr("src"));
});				

$("#recycler-button")
.click(function(){
	nav_buttons_list_toggle("recycler")	
});			





//应用图标默认黑白,单击后激活
/*
$("#nav-apps >ul >li img")
.each(function(){
	$(this).css({"opacity":0.5})
})
.hover(function(){
    $(this).css({"opacity":1})
  },
    function(){
    $(this).css({"opacity":0.5})
	}
)
*/


//初始化按钮为下拉菜单
//$("#nav-uni").addClass("uni-more-normal");	
		
//获得输入框焦点		
$( "#uni-input")
.click(function(){ 
	$("#uni-text").focus(); 
})
.hoverDelay({//悬停获得焦点
	hoverDuring:1000,
	hoverEvent:function(){
		$("#uni-text").focus(); 
	}
})


// Uni input
$("#uni-text")
.bind('keydown',function(e){// bind with enter keydown event
	if(e.which == 13){	
		//alert("enter fired!");
		uni_text();
	}else{
		// TODO: figure out this: 输入字符则清除旧的二次建议
		$("#uni-text-sug").html("").hide();
	}
})
.focus(function(){// when focused, show input and submit button
	$(this).show();
	$("#nav-uni").removeClass("uni-more-normal").addClass("uni-sub-normal");
})
.focusout(function(){
	if (!$(this).val()) { // when focusout, if nothing inputed
		$(this).hide();
		$("#nav-uni").removeClass("uni-sub-normal").addClass("uni-more-normal");
	}	
})


//输入框右侧按钮	
//当已输入内容时,展现提交按钮
//当无内容时,展现下拉按钮
$("#uni-button")
.hoverDelay({
	hoverDuring:200,
	outDuring:200,
	hoverEvent:function(){ 
		if($("#uni-text").val()){
			$("#nav-uni").addClass("uni-sub-mouseover"); 
		}else{
			$("#nav-uni").addClass("uni-more-mouseover"); 
		}
	},
	outEvent:function(){
		if($("#uni-text").val()){
			$("#nav-uni").removeClass("uni-sub-mousedown").removeClass("uni-sub-mouseover"); 
		}else{
			$("#nav-uni").removeClass("uni-more-mousedown").removeClass("uni-more-mouseover"); 
		}
	}
})
.click(
	function(){ 
		if($("#uni-text").val()){
			$("#nav-uni").removeClass("uni-sub-mouseover").addClass("uni-sub-mousedown"); 		
			uni_text();
		}else{
			$("#nav-uni").removeClass("uni-more-mouseover").addClass("uni-more-mousedown"); 
		}
	}
)

//点击建议内容下拉列表
$(".bdSug_wpr")
.click( function(){
	uni_text();
})


///**************绑定鼠标悬浮的样式		

//窗口大小按钮,导航按钮,应用按钮
$("#top-bar li > div")
.mouseenter(function(){ $(this).parent("li").addClass("mouseover"); })
.mousedown(function(){ $(this).parent("li").removeClass("mouseover").addClass("mousedown"); })
.mouseup(function(){ $(this).parent("li").removeClass("mousedown").addClass("mouseover");})
.mouseleave(function(){ $(this).parent("li").removeClass("mouseover"); });
		
///**************增加tip提示

$(".tipsy-enabled")
.each(function(){
	$(this).attr("original-title",$(this).find("span").html())
})

//关闭在右上角
$("#window-close").tipsy({gravity:'ne',delayIn:200});


//其他图标都是在下方
$(".tipsy-enabled").tipsy({gravity:'n',delayIn:800})
.mousedown(function(){
	$(this).tipsy("hide");
})

//定义选项列表
$("#option-tab-new").click(function(){
	tab_new();
});

$("#option-button").click(function(){
	nav_buttons_list_toggle("option")
})

//打开选项列表
function nav_buttons_list_toggle(){
	
	var toggle_target_id = arguments[0] || 0;
	//alert(toggle_target_id)	
	if(!toggle_target_id){ return false;	}//无ID则不调整	
	
	//toggle_target_id带有-list或者-button后缀,则自动去除
	var reg_for_id = /-(list|button)$/i

	toggle_target_id = toggle_target_id.replace(reg_for_id,"")
	//alert(toggle_target_id)	
	
	var $toggle_button = $("#"+toggle_target_id+"-button")
	
	var $toggle_list = $("#"+toggle_target_id+"-list")
		
	if(! $toggle_button.parent("li").hasClass("listopen")){	//open
		//alert(1)
		$toggle_button.parent("li").addClass("mousedown listopen")//.tipsy("show")
		$toggle_list.css({
			"top":$toggle_button.offset().top+33,
			"left":$toggle_button.offset().left-($toggle_list.width()-$toggle_button.width())*0.5
		})
		//.show()
		.fadeIn(200)
	
	}else{
		//alert(2)		
		$toggle_button.parent("li").removeClass("mousedown listopen")//.tipsy("hide")
		$toggle_list//.hide()
		.fadeOut(200)
	}	
	/*
		
	if(!$("#option-button").parent("li").hasClass("listopen")){	//open
	
		$("#option-button").parent("li").addClass("mousedown listopen")//.tipsy("show")
		$("#option-list").css({
			"top":$("#option-button").offset().top+38,
			"left":$("#option-button").offset().left-54
		})
		.fadeIn(200)
	
	}else{
		$("#option-button").parent("li").removeClass("mousedown listopen")//.tipsy("hide")
		$("#option-list").fadeOut(200)
	}
	
	*/
}


//定义所有button按钮类,只能展开一个list

$(".button").mousedown(function(){
	$(".listopen .button").not($(this)).click()
})

//定义list下拉样式
$(".list .list-inner li").live({
	mouseenter:function(){
		$(this).addClass("onhover")
	},
	mouseleave:function(){
		$(this).removeClass("onhover onclick")
	},
	mousedown:function(){
		$(this).addClass("onclick")
		nav_buttons_list_toggle($(this).parents(".list").attr("id"))
	},
	mouseup:function(){
		$(this).removeClass("onclick")	
	}
})



///**************标签点击逻辑


/*tabs可拖拽排序*/
$("#tabs-bar").dblclick(function(){
	tab_new();
})
	



});
///**************程序主体结束


//导航按钮间距调整
function nav_buttons_resize(){
	nav_children_resize("nav-buttons");
}

//应用图标间距调整
function nav_apps_resize(){
	//var apps_num = arguments[0] || 4;	
	//if( $("#title-bar")[0].style.display == "none" ){//标题栏消失,切换到全屏,需整体往左移动72像素 = window-control的宽度
	if($("#wrapper").hasClass("max")){
		$("#nav-apps").css({"right":"72px"})
		nav_children_resize("nav-apps","72"/*,apps_num+1*/);
	}else{
		$("#nav-apps").css({"right":"0"})		
		nav_children_resize("nav-apps","0"/*,apps_num+1*/);		
	}	
}


function nav_children_resize(){
	
	var resize_target_id = arguments[0] || 0;
	
	if(!resize_target_id){ return false;	}//无ID则不调整	
	
	var minus_width = arguments[1] || 0;	//需要减少的长度,如果需要增加则传入负数
	
	var button_number = arguments[2] || 5; //按钮数量,默认为5,一般不用更改
	
	var uni_width = 310;
	
	var resize_target_width = ($("#window").width()-uni_width)/2 - minus_width;//整体长度减去输入框后,除以2,减去传入参数
		
	var button_width = 37;
	
	var resize_target_min_width =	button_number*button_width;//最小宽度就是所有按钮本身的宽度,防止因过短而溢出为两行
	
	//var button_padding = parseInt (( resize_target_width - resize_target_min_width)/(button_number*2));//减去按钮本身长度,除以2就是两边的边距
	
	//button_padding = button_padding > 0 ? button_padding:0;//非负//update:padding本身视负值为无效
	
	var final_target_width = resize_target_width > resize_target_min_width ? resize_target_width :resize_target_min_width;
	
	$("#"+resize_target_id).css({"width":final_target_width})
	//alert("final width:"+final_target_width)
	
	//$("#"+resize_target_id+" >ul >li").css({"padding-left":button_padding,"padding-right":button_padding});
	
	$("#"+resize_target_id+" >ul >li").css({"width":parseInt(final_target_width/button_number)});//居中出现问题,存在1像素的差
	//alert("each:"+final_target_width/button_number)	
	
}





//创建一个新tab
function tab_new(){
	
	//初始化
	var tab_title = arguments[0] || "新页面";//标题
	var tab_url = arguments[1] || "页面地址";//显示的页面地址
	var url = arguments[1] || "";//访问的页面地址
	
	//alert(tab_url)
	//alert($("#tabs-bar").data("num"))
	
	var tab_num = $("#tabs-bar").data("num");
	var tab_id = "tab-" + tab_num
	$("#tabs-bar").data("num",tab_num*1+1)//ID自增
	
	if(!$("#"+tab_id).length){//默认只存在序号为1的TAB,不存在则从它复制
		
		$("#tab-0").clone().appendTo("#tabs-bar > ul").attr("id",tab_id)


	}
	$("#"+tab_id).find(".tab-title").html(tab_title)//加标题

	$("#"+tab_id).find(".tab-url").html(tab_url)//加页面地址
	
	$(".current-content").attr("src",url)//访问当前地址//todo增加多个iframe	
	
	$("#tabs-bar-ul").find("li").removeClass("current-tab")
	$("#tabs-bar-ul li:last").addClass("current-tab")//创建的新页面总在最后并高亮它
	
	//alert(tab_id)
	//alert($("#tabs-bar").data("num"))
	$("#"+tab_id).find(".tipsy-enabled").tipsy()
	
	tab_init();	
	tabs_resize()
	//tabs_resize("1");

}

//tab按钮初始化
function tab_init(){
	//悬浮
	tab_hover();
	//绑定鼠标
	$(".tab").mousedown(function(e){
		 // 1: left, 2: middle, 3: right
	   //alert(e.which);
	   //左键选中,中间关闭,右键弹出某层作为菜单
	   switch(e.which){
	   	//case1
	   	case 1:
 					
        	$(".tab").removeClass("current-tab")
        	
        	$(this).addClass("current-tab")
        	
        	//动态效果
        	$(this).find(".tab-url").stop()
        	.css({
    			"margin-top":"20px"
    		})
        	.animate({
    			"margin-top":"0"
    		},300)
        		
        	//处理头尾圆角
        	tabs_round(); 
        	//处理悬浮效果
        	tab_hover();
					
	   	break;
	   	
	   	//case2
	   	//鼠标中间点击关闭的页面不改变标签的激活
	   	case 2:
            $(this).find(".tab-close").click()

	  	break;	
	  	  
	  	//case3 	
	   	case 3:
	  	
	  	break;
	  	
	  	default:break;
	  }
	})

	
	//关闭
	$(".tab-close").click(function(){
		//$(this).parent(".current-tab").toggle('slow');//关闭//update:toggle虽然有动态效果,但是只是hide()而不是remove()
	
		$(this).parent(".tab").animate({/*"opacity":"0",*/"width":"0"/*,"height":"0"*/},500,function(){
				
				if($(this).hasClass("current-tab")){//如果关闭的页面是激活的,那么自动切换到一个标签
				
					if( $(this).next(".tab").length ){//下一个标签不为空
	
						$(this).next(".tab").addClass("current-tab");	//自动选择下一个标签为当前页面
						
					}else{
	
						$(this).prev(".tab").addClass("current-tab")	//选择前一个标签为当前页面
						
					}
				
				}
				

				$(this).removeClass("current-tab").prependTo($("#recycler-tab-list"))//移动到回收站
				.unbind("click")//防止多次绑定
				.click(function(){
					tab_new( $(this).find(".tab-title").html(),$(this).find(".tab-url").html())//重新打开
					$(this).hide()//彻底隐藏
					recycler_list_check();//检查回收站是否为空
				})

				recycler_list_check();//检查回收站是否为空
				
				tabs_resize("1");//1表示动画模式,默认0.
				recycler_twinkle();

				
		})
		
	})


	
}

function recycler_twinkle(){

	$("#recycler-button").parent("li").addClass("twinkle")
	.fadeTo("fast",0.3)
	.fadeTo("fast",1)
	.fadeTo("fast",0.3)
	.fadeTo("fast",1,function(){$(this).removeClass("twinkle")})

}


function recycler_list_check(){
	
	if( !$("#recycler-tab-list li:visible").length ){
		$("#recycler-list").removeClass("recycler-full").addClass("recycler-empty")
	}else{
		$("#recycler-list").removeClass("recycler-empty").addClass("recycler-full")
	}
	
}

//鼠标悬浮效果,只在非当前标签页上增加高亮效果
function tab_hover(){
	$(".tab").hover(
        function(){
            $(this).find(".tab-mask").stop().animate({"opacity":"0.15"},200)
		},
		function(){
            $(this).find(".tab-mask").stop().animate({"opacity":"0"},200)
		}
	)
	$(".current-tab").hover(
		function(){
			 $(this).find(".tab-mask").stop().css({"opacity":"0"},200)
		},
		function(){}		
	)
	
}


//标签大小调整
function tabs_resize(){
	
	var animate_true = arguments[0] || 0;
	
	var tabs_num = $("#tabs-bar-ul").children("li").length;
	
	if(!tabs_num){//为空,隐藏tabs栏
		
		$("#h-line-2").hide();//分割横线
		$("#tabs-bar").hide();//隐藏tabs栏
		$("#content").css({"height":$("#window").height()-$("#top-bar").height()-2})
		
	}else{//不为空,显示tabs栏
		$("#h-line-2").show();
		$("#tabs-bar").show();		
		$("#content").css({"height":$("#window").height()-$("#top-bar").height()-46})
	}
	/*
	if(tabs_num == 1){//only one tab
		$(".tab-header").addClass("tab-header-active");
		$(".tab-tailer").addClass("tab-tailer-active");
		$(".tab-column").hide();
		$("#tabs-bar ul").css({"padding-left":($("#tabs-bar").width()-314)*0.5  });
		return true;
	}
	*/
	//alert("more than one tab");
	
	var tabs_max_width = ($("#tabs-bar").width()-30)/tabs_num;
	//alert($("#tabs-bar").width());
	//alert(tabs_num);
	//alert(tabs_max_width);
	var tabs_width = tabs_max_width < 310 ? tabs_max_width : 310;//计算最大长度
	
	if(!animate_true){
		$("#tabs-bar .tab").css({"width":tabs_width});//调节长度
		$("#tabs-bar .tab-row").css({"width":tabs_width-40});
		//$("#tabs-bar .tab:last .tab-column").hide();//隐藏末尾之前的分割线//update:最后一个右分割线被末尾圆角遮盖
		$("#tabs-bar>ul").css({"padding-left":($("#tabs-bar").width() - tabs_width*tabs_num )*0.5  });//调节整体居中
	}else{//动画效果较为柔和
		var animate_time = 200;
		$("#tabs-bar .tab").animate({"width":tabs_width},animate_time);//调节长度
		$("#tabs-bar .tab-row").animate({"width":tabs_width-40},animate_time);
		$("#tabs-bar>ul").animate({"padding-left":( $("#tabs-bar").width() - tabs_width*tabs_num )*0.5},animate_time);//调节整体居中
	}
	tabs_round();//处理头尾圆角样式
}



//处理头尾圆角样式
function tabs_round(){

	$("#tabs-bar .tab-header").hide();
	$("#tabs-bar .tab:first .tab-header").show();
	
	$("#tabs-bar .tab-tailer").hide();	
	$("#tabs-bar .tab:last .tab-tailer").show();
	
	if($("#tabs-bar .tab:first").hasClass("current-tab")){//如果选中的是头
		
		$("#tabs-bar .tab:first .tab-header").addClass("tab-header-active");
		
	}else{
		
		$("#tabs-bar .tab:first .tab-header").removeClass("tab-header-active");
		
	}
		
	if($("#tabs-bar .tab:last").hasClass("current-tab")){//如果选中的是尾
		
		$("#tabs-bar .tab:last .tab-tailer").addClass("tab-tailer-active");
		
	}else{
		
		$("#tabs-bar .tab:last .tab-tailer").removeClass("tab-tailer-active");	
		
	}
	
}



//提交关键字或网址
function uni_text(){
	
	var source = $("#uni-text").val();	
	
	// url = TB.util.trim(url);//去头尾空格ert(url);	
	//alert(TB.util.trimM(TB.util.trim(url)));
	//alert(completeHTTP(url) );
	
	/*
	 *针对有可能输入复杂URL,对主机Host进一步判断
	 *如果是该不含中文且符合规则,则直接打开
	 *否则转到搜索结果.
	 */
	// var p = new Poly9.URLParser(url);
	
	// var p = new TB.validation.urlParser(url);
	// var host = p.getHost();
	url = $.url(source);
	var host = url.attr('host');
	
	// If it is an url
	// 判断用户是否输入了一个url地址
	if( TB.validation.isURL(host) && !TB.validation.isCHN(host) ){
		
		// Add new tab
		// 新建一个页面
		tab_new( source, TB.validation.completeHTTP(source) )
		
		// Loading animation
		// 读取动画
		$("#content-mask").css({"opacity":1}).show().delay(2000).fadeOut(500);
	}
	// Otherwise it is a search query
	// 否则，认为是个搜索词
	else {
		
		// If the search query doesn't change 
		// 如果搜索词没变
		// TODO: 这里的判断机制有问题
		if($("#uni-text-sug").html()) {
			// Show previous search suggestion
			// 展示之前的搜索建议
			$("#uni-text-sug").show().css({"height":"auto"})
			return;
		}
		
		// Show search suggestion
		// 展示搜索建议
		$("#uni-text-sug")
		.css({
			"top":$("#uni-text").offset().top+29,
			"left":$("#uni-text").offset().left,
			"height":290
		})
		.addClass("loading")
		.show()
		
		// Using ajax to get search result
		$.get(
			"server/search.php",
			{
				word: encodeURIComponent(source)
			},	
			function(data){
			
			$("#uni-text-sug")
			.html(data)
			.append($("#uni-text-sug-bar"))
			.css({//根据得到结果调整高度
				"height":"auto"	
			})
			.removeClass("loading")
			
			$("#uni-text-sug .reswrap").append($("#uni-text-sug #uni-text-sug-search").show())
			

	
			var resitem_min_height = 35;//75;//
			var resitem_vertical_padding = 10;
			var reswrap_min_height = 10*(resitem_min_height+resitem_vertical_padding);
			
			$("#uni-text-sug .reswrap .resitem")
			.each(
				function(index){
					$(this).data("h",$(this).height())//储存默认高度
					.css({"height":resitem_min_height,"background-color":$(this).index()%2?"#F0F0F0":"#FFFFFF"})//隔行变色
					.find(".abs").hide().end()//隐藏
					.hoverDelay({//悬浮变色
						hoverDuring:300,
						hoverEvent:function(){

							$(this).animate({
								"height":$(this).data("h")>resitem_min_height?$(this).data("h"):resitem_min_height
								},300);
							$(this).find(".abs").show();
							
							//console.log(index);
							var total_height = index*(resitem_min_height+resitem_vertical_padding) + ($(this).data("h")+resitem_vertical_padding);//展开后的整体高度

							
							//console.log(total_height)
							if( total_height > reswrap_min_height ){//说明展开后整体高度要溢出了
								//$(this).parent(".reswrap").animate({"height":total_height},300)
								$(this).parent(".reswrap").find(".resitem:first").animate({"margin-top":reswrap_min_height-total_height},300)
							}
							
						},
						outEvent:function(){

							$(this).animate({
								"height":resitem_min_height
								},300);
							$(this).find(".abs").hide();
							$(this).parent(".reswrap").find(".resitem:first").animate({"margin-top":0},300)
						}
					})
				}
			)
			/*
			.hover(//悬浮变色
				function(){
					$(this).animate({/*"background-color":"#E3E9FF",*\/"height":$(this).data("h")},300);
				},
				function(){
					$(this).animate({/*"background-color":index%2?"#FFF":"#EDEDED",*\/"height":min_resitem_height},300);
				}
			)
			*/
			//上一页高亮
			//$("#uni-text-sug ul >li:first").addClass("sug_active")
			//.append('<div id="sug-control-header" class="tab-header tab-header-active"></div><div id="sug-control-tailer" class="tab-tailer tab-tailer-active"></div>')
			

			/*
			$("#uni-text-sug .sug_button").hover(function(){
					$(this).css({"background-color":"#E3E9FF"});
				},
				function(){
					$(this).css({"background-color":"#FFFFFF"});
			})
			*/
			
			//$("#uni-text-sug .reswrap .resitem").hide();
			//$("#uni-text-sug .reswrap .resitem:not(.adv)").filter(":lt(4)").show()//只显示前5个
			
			///*********上下滚动//todo:左右滚动
			
			//上一页
			$("#uni-text-sug .prev").click(function(){ 	
			
				$("#uni-text-sug .reswrap .resitem:first")
				.animate({
					"margin-top":0
				},800)
				
			})
						
			//下一页
			$("#uni-text-sug .next").click(function(){ 	

				$("#uni-text-sug .reswrap .resitem:first")
				.animate({
					"margin-top":"-425px"
				},800)
				
			})
			
			//更多搜索
			// $("#uni-text-sug #sug_more").click(function(){ 	

			// 	$("#uni-text-sug .reswrap .resitem:first")
			// 	.animate({
			// 		"margin-top":"-850px"
			// 	},800)
				
			// })			
			/**/
			///*********上下滚动结束
			
			//关闭
			$("#uni-text-sug .close").click(function(){ 	
				$("#uni-text-sug").animate({
					"height":"0px"
				},300)
				.fadeOut(300)//收缩并消失	
			})
			
			//更多搜索结果
			// $("#uni-text-sug #sug_more").click(function(){ 	
				//$("#uni-text-sug .reswrap .resitem").hide();
				//$("#uni-text-sug .reswrap .resitem:not(.adv)").filter(":gt(4)").show()//显示后5个
				//$(this).hide();
				//$("#uni-text-sug #sug_search").show()
			// })
			
			
			//转换m.baidu.com的网页链接
			$("#uni-text-sug .resitem a").click(function(){
			
				//alert($(this).attr("href"));
				var str_title = $(this).get(0).innerHTML;
				
				//去除标题编号与空格 \d*&nbsp; //百度真的很不专业
				var reg = /(\d*&nbsp;)/;
			  str_title = str_title.replace(reg,"")
			  
				//alert(str_title);return false;
				var str = $(this).attr("href")
				var str_src_index = str.lastIndexOf("src=")//查找相应的链接地址
				var str_src;
				if(str_src_index != "-1" ){//找到
					str_src = str.substr(str_src_index+4,str.length)//得到src
					//alert(str_src)
					str_src = decodeURIComponent(str_src)//url解密
					
					tab_new(str_title,str_src)//在新的标签中打开
					
					$("#uni-text-sug").animate({
						"height":"0px"
					},500).fadeOut(500)//收缩并消失
					
				}else{
					$(this).html('<strong>× 链接失效</strong>')
				}
				return false;//防止浏览器转向
			})
			
			//隐藏第一次建议
			$(".bdSug_sd").hide();	$(".bdSug_wpr").hide();	

		})
	}
	
	$("#uni-text").blur()/*离开输入框的焦点*/

	return false;/*防止浏览器提交表单*/

}





