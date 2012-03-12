<?php

$target_word = $_GET["word"];

//$target_url = "http://www.baidu.com/s?ie=UTF-8&wd=".$target_word;
$target_url = "http://m.baidu.com/s?word=".$target_word;

$target_content = @file_get_contents($target_url);

preg_match('/(<div class="reswrap">.*?)<div class="pagenav"/',$target_content,$new_content);

$target_content =  $new_content[1];//输出括号内符合部分

$target_content = preg_replace('/<font[^>]*>([^<]*)<\/font>/i','<em>${1}</em>',$target_content);//替换红色font为em

echo $target_content;

?>	

