// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com
// 鼠标延迟执行方法
// 2010-06-30
// 2010-09-21 绑定当前对象
// hoverDuring      鼠标经过的延时时间
// outDuring        鼠标移出的延时时间
// hoverEvent       鼠标经过执行的方法
// outEvent         鼠标移出执行的方法
//
// Demo:
/*
$("#test").hoverDelay({
    hoverEvent: function(){
        alert("经过我！");
    }
});
*/

(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer, that = this;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
            });    
        });
    }      
})(jQuery);