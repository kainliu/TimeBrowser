TB.nav_apps = {
	
	
};

// nav_apps_initial()

// function nav_apps_initial(){
// 	$("#nav-apps-list li:visible").click(function(){
// 		var url = $(this).find("span").html();
// 		tab_new( url ,"http://www." + url + ".com/")

// 		// if( $("#nav-apps-list-control")[0].style.display == "block" ){
// 		// 	nav_apps_toggle();
// 		// }
// 	})
// }


function nav_apps_toggle(){
	
	//app list is open
	if( !$("#apps-button").parent("li").hasClass("listopen") ){	
	
		$("#nav-apps-list-control")
		.css({
			"width":$("#nav-apps-list").width(),
			"top":$("#nav-apps-list").offset().top,
			"left":$("#nav-apps-list").offset().left,
			"z-index":"999"//调整层次	
		})
		.show()
		.prepend($("#nav-apps-list"))
		//.fadeIn(250)
		.css({"margin-top":"30px"})			//下拉动画效果
		.animate({"margin-top":"40px"},250)		
		.animate({"margin-top":0},200)

		// $("#nav-apps-list-control #nav-apps-list").css({"margin-top":"-40px"})
		//.fadeIn(500)
		
		//不显示tip
		$("#nav-apps-list-control .tipsy-enabled").each(function(){
			$(this).attr("original-title","")
		})
	
		//禁止缩放
		$("#window-control >ul").hide()
		$(".ui-resizable-handle").hide()	
		//增加收藏列表的图样
		$("#apps-title").show()
		//添加按下效果
		$("#apps-button").parent("li").addClass("mousedown listopen")
				
		
	}
	//app list is closed
	else {
		
		$("#nav-apps-list-control")
		.css({"margin-top":"0px"})		//上缩动画效果
		.animate({"margin-top":"40px"},200)
		.animate({"margin-top":"20px"},150)		
		.fadeOut(300,function(){
			$("#nav-apps-list").appendTo($("#nav-apps"))
			.css({"margin-top":"40px"})
			.animate({"margin-top":0},150)
		})
		//.hide()
		
		$("#nav-apps-list .tipsy-enabled").each(function(){
			$(this).attr("original-title",$(this).find("span").html())
		})
	
		$("#window-control >ul").show()
		$(".ui-resizable-handle").show()
		$("#apps-title").hide()
		$("#apps-button").parent("li").removeClass("mousedown listopen")

	}
}

/**
 * Render app list
 */
function nav_apps_list(){

	var list = [
		"amazon", "aol", "app-store", "apple", "baidu", "bebo", "behance", "blogger", "delicious", "design-bump", "designfloat", "deviant-art", "digg", "douban", "email", "facebook", "flickr", "friendfeed", "frinedster", "google-talk", "google", "kaixin", "lastfm", "linkedin", "microsoft", "mister-wong", "mixx", "mobileme", "msn", "myspace", "netvibes", "newsvine", "posterous", "qik", "qq", "qzone", "reddit", "renren", "retweet", "rss", "sharethis", "skype", "slashdot", "slideshare", "squidoo", "stumbleupon", "t163", "technorati", "tqq", "tsina", "tsohu", "tumblr", "twitter", "viddler", "vimeo", "virb", "wordpress", "xianguo", "xianxia", "yahoo-buzz", "yahoo", "youtube"
	];

	var template = [
	'<li><div class="tipsy-enabled">',
		'<img src="img/ico/{{0}}.gif" /><span>{{0}}</span>',
	'</div></li>'].join("");

	var render = function() {
		var result = '';
		for(var key = 0; key < list.length ; key++){
			result += template.replace( /\{\{0\}\}/g, list[key] );
		}
		return result;
	}

	$("#nav-apps-list")[0].innerHTML = render();

}




/*图标摆动*/
(function($){
	$.fn.iconShiver = function(){
	
		return $(this).each(function(){
			var self = this;//function in setInterval need this declaim
			
			// IE low version can't perform the cartoon smoothly
			if($.browser.msie && ($.browser.version < 8)){
				
			}else{
				
			}
			shake();

			function shake(){
				$(self).css({"position":"relative","top":0,"left":0})
				var delay_time = 1000;//TB.util.getRandom(100);
				var move_h = TB.util.getRandom(10)*0.2;
				var move_v = TB.util.getRandom(10)*0.2;

				$(self)//.delay( delay_time )
				.animate({"left":move_h,"top":move_v},60)						
				
				// $(self)
				// .css({
				// 	"-webkit-transform" : "rotate(30deg)",
				// 	"-webkit-transition" : "-webkit-transform 0.6s ease-in"	
				// })
				

	 			if($("#nav-apps-list").data("iconShiver") == "1"){
					return setTimeout( shake , 60)
		 		}else{
		 			$(self).css({"position":"static","left":0,"top":0})
		 		}
				
			}

		})
		
	}
})(jQuery);

//Jquery-ready start
$(function(){
	
//渲染列表
nav_apps_list();

$("#nav-apps-list li").click(function(){
	var url = $(this).find("span").html();
	tab_new( url ,"http://www." + url + ".com/")
})


$("#apps-button").click(function(){
	nav_apps_toggle()
})


$("#nav-apps-list-control .close").click(function(){
	nav_apps_toggle()
})


//只显示第一页
$("#nav-apps-list li").addClass("hidden").parent().find("li:lt(16)").removeClass("hidden")

//图标重排
$("#nav-apps-list")
.sortable({
	disabled: false,//启用
	//items:"li:not(.not-sorted)",
	opacity: 0.6, 	//设置拖动时候的透明度
   	revert: true,		//缓冲效果 		
   	start:function(event){
		if(event.which == 1){
			$("#nav-apps-list").data("iconShiver","1")

			$( "#nav-apps-list li:visible" ).unbind("click")
			.find("div").css({"cursor":"move"})
			.find("img").iconShiver()	
		
		}
	},

	sort:function(){
		//不显示tip
		$(".tipsy").hide()
	},
	
	stop:function(event){
		if(event.which == 1){
			$("#nav-apps-list").animate({"":""},1,function(){

				$("#nav-apps-list").data("iconShiver","0")
								
				// nav_apps_initial()
				
				$( "#nav-apps-list li:visible" )
				.find("div").css({"cursor":"pointer"})


			})
		}
	}
})

//Jquery-ready end
});
