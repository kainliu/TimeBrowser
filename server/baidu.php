<?php

$target_word = $_GET["word"];

$target_url = "http://www.baidu.com/s?ie=UTF-8&wd=".$target_word;
//$target_url = "http://m.baidu.com/s?word=".$target_word;

$target_content = file_get_contents($target_url);

preg_match('/(<table[^>]*id=\"\d+\"[^>]*>.*<\/table>)/',$target_content,$new_content);

$target_content =  $new_content[1];//输出括号内符合部分

/*问题是百度的编码是gb2312，iconv不一定在服务器上部署好*/


//$target_content = preg_replace('/c60a00/i','0066cc',$target_content);//去除红色em

//$target_content = preg_replace('/<font[^>]c60a00/i','0066cc',$target_content);//去除红色em

?>

<style type="text/css">
#uni-text-sug{line-height:120%;font-size:14px;}
#uni-text-sug	a{color:#0066cc;}
#uni-text-sug	form{margin:0;}
#uni-text-sug	img{display:none;}
#uni-text-sug	small{font-size:12px;}	
#uni-text-sug	a em{font-size:14px}
#uni-text-sug	em{font-size:12px;font-style:normal;col/or:#C60A00;color:#0066cc;}
#uni-text-sug	.keyword,.keyword a{col/or:#c60a00;color:#0066cc;}	
#uni-text-sug	.bc{background-color:#D7EBFF;border-top:1px solid #8FBCFF;border-bottom:1px solid #8FBCFF;padding-top:2px;padding-bottom:2px;}
#uni-text-sug	.hr{border-top:1px solid #6699CC;margin:5px 0;}
#uni-text-sug	.b{margin:5px 0;}
#uni-text-sug	.d{margin-bottom:6px;}
#uni-text-sug	.i{margin-bottom:4px;}
#uni-text-sug	.site,.date,.size,.g{color:#008000;padding:0;margin:0;}
#uni-text-sug	.site,.date,.size,.abs{font-size:12px;}
#uni-text-sug	.gray{color:#666666;}
#uni-text-sug	.green{color:#008000}
#uni-text-sug .relate,.adv3,.pagenav,.timestamp,.bc,.retlink,.ew,.url,.ca{padding-right:6px;padding-left:6px;}
#uni-text-sug	.ew{padding-top:3px;padding-bottom:3px;}
#uni-text-sug	.relate{padding-bottom:5px;padding-top:5px;background-color:#EFF2FA;line-height:150%;}
#uni-text-sug	.resitem{/*margin:5px 0;*/padding:6px;}	
#uni-text-sug	.adv,.adv2,.adv3{/*margin:5px 0;*/display:none}
#uni-text-sug	.f{padding:5px;}
#uni-text-sug	.tf{border-bottom:1px solid #D7EBFF;}
#uni-text-sug	.bf{}
#uni-text-sug	.pagenav{padding-top:5px;padding-bottom:5px;}
#uni-text-sug	.pagenav{margin:5px 0;}
#uni-text-sug	.retlink{margin-top:4px;}
#uni-text-sug	.timestamp{margin-bottom:2em;}
#uni-text-sug	.abs{line-height:150%;}
#uni-text-sug	#sug_more{float:left;padding:6px;cursor:pointer;}
#uni-text-sug	#sug_close{float:right;padding:6px;cursor:pointer;}
</style>

<?php

echo $target_content;

?>	
<div class="sug_button" id="sug_more">更多搜索结果 ↘</div>
<div class="sug_button" id="sug_close">关闭 ×</div>

<!--
<div id="baidu">百度</div>
<div id="google">谷歌</div>
<div id="yahoo">雅虎</div>
<div id="taobao">淘宝</div>
-->
