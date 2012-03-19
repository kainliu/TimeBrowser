TB.validation = {
	/**
	* 判断是否符合域名格式
	*/
	
	isURL: function (str){
		var reg = /\.(cn|cc|com|co|net|org|biz|gov|edu|tv|info|name|pro|aisa|ly|li|gd|ru|ca|de|es|us|fr|hk|tw|jp)+$/i;
		if(!reg.test(str)){
			return false;
		}
	  	return true;	
	},
	  
	/**
	* 是否包含中文,包含返回true,否则返回false
	*/
	isCHN: function (str){
		var reg=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		if(!reg.test(str)){
			return false;
		}
		else{
			return true;
		}
	},
	
	/*
	* 检查协议名
	*/
	completeHTTP: function (str){
		var reg = /^(http|https):\/\//i;
		if(!reg.test(str)){
			return "http://"+str;
		}
		return str;	
	}
};








