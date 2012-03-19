TB.util = {
	/**
	 * getRandom(100):
	 * 获取0-100的随机数;
	 */
	getRandom: function(n) {
		return Math.floor(Math.random()*n + 1)
	},
	
	/**
	* 删除左右两端的空格
	*/	
	trim: function (str) {
		return str.replace(/(^\s*)|(\s*$)/g, ""); 
	}
	
	
};
