/**
* 判断是否符合域名格式
*/

function isURL(str){
	var reg = /\.(cn|cc|com|net|org|biz|gov|edu|tv|info|name|pro|aisa|ly|li|gd|ru|ca|de|es|us|fr|hk|tw|jp)+$/i;
  if(!reg.test(str)){
   return false;
  }
  return true;	
}
  
/**
* 是否包含中文,包含返回true,否则返回false
*/
function isCHN(str){
	var reg=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
	if(!reg.test(str)){
		return false;
	}
	else{
		return true;
	}
}

/*
* 检查协议名
*/
function isHTTP(str){
	var reg = /^(http|https):\/\//i;
  if(!reg.test(str)){
   return "http://"+str;
  }
  return str;	
}

/**
* 删除左右两端的空格
*/	
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

/**
* 替代所有空格为加号
*/	
function spaceToAdd(str){
	return str.replace(/(\s)/g,"+");
}








// 说明：一个非常健全的 Javascript 链接(URL)解析类

/** 
* @projectDescription 	Poly9's polyvalent URLParser class
*
* @author	Denis Laprise - denis@poly9.com - http://poly9.com
* @version	0.1 
* @namespace	Poly9
*
* See the unit test file for more examples.
* URLParser is freely distributable under the terms of an MIT-style license.
*/

if (typeof Poly9 == 'undefined')
{
	var Poly9 = {};
}

/**
 * Creates an URLParser instance
 *
 * @classDescription	Creates an URLParser instance
 * @return {Object}	return an URLParser object
 * @param {String} url	The url to parse
 * @constructor
 * @exception {String}  Throws an exception if the specified url is invalid
 */
Poly9.URLParser = function(url) {

	this._fields = {
		'Username' : 4, 
		'Password' : 5, 
		'Port' : 7, 
		'Protocol' : 2, 
		'Host' : 6, 
		'Pathname' : 8, 
		'URL' : 0, 
		'Querystring' : 9, 
		'Fragment' : 10
	};

	this._values = {};
	this._regex = null;
	this.version = 0.1;
	this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

	for(var f in this._fields)
	{
		this['get' + f] = this._makeGetter(f);
	}

	if (typeof url != 'undefined')
	{
		this._parse(url);
	}
}
 
/**
 * @method 
 * @param {String} url	The url to parse
 * @exception {String} 	Throws an exception if the specified url is invalid
 */
Poly9.URLParser.prototype.setURL = function(url) {
	this._parse(url);
}

Poly9.URLParser.prototype._initValues = function() {
	for(var f in this._fields)
	{
		this._values[f] = '';
	}
}

Poly9.URLParser.prototype._parse = function(url) {
	this._initValues();
	var r = this._regex.exec(url);
	if (!r) throw "DPURLParser::_parse -> Invalid URL";

	for(var f in this._fields) if (typeof r[this._fields[f]] != 'undefined')
	{
		this._values[f] = r[this._fields[f]];
	}
}

Poly9.URLParser.prototype._makeGetter = function(field) {
	return function() {
		return this._values[field];
	}
}


