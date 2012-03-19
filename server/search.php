<?php
/**
 * Since search engines don't offer unlimited search api for normal users,
 * This PHP converts the result page into a json object
 * 
 * By Kaihua Liu 2012/03/19
 * 
 * UNDER MIT LICENCE
 */


 
$engine = "baidu_mobile";

$target_word = $_GET["word"];

//$target_url = "http://www.baidu.com/s?ie=UTF-8&wd=".$target_word;

$engines = array(
	'baidu_mobile' => "http://m.baidu.com/s?word=", 
	
);


$target_url = $engines[$engine].$target_word;

// echo $target_url;

$target_content = @file_get_contents($target_url);

preg_match('/(<div class="reswrap">.*?)<div class="pagenav"/',$target_content,$new_content);

$target_content =  $new_content[1];//输出括号内符合部分

$target_content = preg_replace('/<font[^>]*>([^<]*)<\/font>/i','<em>${1}</em>',$target_content);//替换红色font为em

echo $target_content;


//TODO: change the data format in to json
//TODO: add google and bing
?>	

