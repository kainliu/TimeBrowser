/**
 * Validation
 */
TB.validation = {
	/**
	* Check whether string is a url
	* 判断是否符合域名格式
	* @param String
	* @return Bool
	*/
	
	isURL: function (str){
		var reg = /\.(cn|cc|com|co|net|org|biz|gov|edu|tv|info|name|pro|aisa|ly|li|gd|ru|ca|de|es|uk|us|fr|hk|tw|jp)+$/i;
		if(!reg.test(str)){
			return false;
		}
	  	return true;	
	},
	  
	/**
	* Check whether contains Chinese character
	* 是否包含中文,包含返回true,否则返回false
	* @param String
	* @return Bool
	*/
	isCHN: function (str){
		var reg=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		if(!reg.test(str)){
			return false;
		}
		return true;
	},
	
	/*
	* Complete an url with http protocal prefix
	* 补全http协议名
	* @param String
	* @return String
	*/
	completeHTTP: function (str){
		var reg = /^(http|https):\/\//i;
		if(!reg.test(str)){
			return "http://" + str;
		}
		return str;	
	}
};








