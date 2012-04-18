TB.window_control = {
	
	//窗口最小化
	window_min: function(){ 
		$( "#window" ).animate({opacity: 0},500);
	},
	
	//窗口关闭
	window_close: function(){ 
		$( "#window" ).animate({opacity: 0},500);
	},
	
	
	//窗口最大化
	window_max: function(){
		//resize
		$( "#window" ).css({
			"width":$("#wrapper").width()/*-30*/,
			"height":$("#wrapper").height()/*-30*/,
			"left":0/*15*/,
			"top":0/*15*/
		});
		
		$( "#wrapper" ).addClass("max");
		$( "#content" ).css({"width":$("#window").width()/*-30*/,"height":$("#window").height()-90});
		$( "#nav-bar" ).css({"margin-top":"4px"});
	
		$( "#title-bar" ).hide();
		$( ".ui-resizable-handle" ).hide();
		$( "#window-max").hide();		
		$( "#window-normal").show();
		nav_buttons_resize();
		nav_apps_resize();
		tabs_resize();
		
	},
	
	
	//窗口默认
	window_normal: function(){
		//resize
		$( "#window" ).css({
			"width":950,
			"height":600,
			"left":$("#wrapper").width()>950?($("#wrapper").width()-950)*0.5:0,
			"top":$("#wrapper").height()>600?($("#wrapper").height()-600)*0.5:0
		});
		
		$( "#wrapper" ).removeClass("max");
		$( "#content" ).css({"width":950,"height":490});
		$( "#nav-bar" ).css({"margin-top":"0"});
		
		$( "#title-bar" ).show();		
		$( ".ui-resizable-handle" ).show();
		$( "#window-max").show();		
		$( "#window-normal").hide();		
		nav_buttons_resize();
		nav_apps_resize();
		tabs_resize();
	}
}
