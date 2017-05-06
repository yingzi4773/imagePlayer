/**
 * Created by lenovo on 2017/5/6.
 */
var cArr = ["p5","p4","p3","p2","p1"];
var $s = $(".buttons span");
var $a = $(".buttons a");
var index=0;
$(".next").click(function () {
    nextImg();

});
$(".pre").click(function () {
    preImg();
});
function nextImg() {
    cArr.unshift(cArr[4]);//向开头添加p1
    cArr.pop();//把最后的p1删掉，最终数组是【p1,p5,p4,p3,p2】
    $("li").each(function (i, e) {
        $(e).removeClass().addClass(cArr[i]);
    })
    index++;
    if (index>4){
        index = 0;
    }
    show();
}
function preImg() {
    cArr.push(cArr[0]);//向数组末尾添加p5
    cArr.shift();//把开头的p5删掉，最终数组是【p4,p3,p2,p1,p5】
    $("li").each(function (i, e) {
        $(e).removeClass().addClass(cArr[i]);
    })
    index--;
    if(index<0){
        index = 4;
    }
    show();
}
//改变底下按钮的背景色
function show(){
    $($s).eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
    //$($s).eq(index).addClass("blue").parent()意思是当前的span添加上蓝色之后，他的父元素a
    //$($s).eq(index).addClass("blue").parent().siblings() 这个找到除了自己之外的所有的a
    //$($s).eq(index).addClass("blue").parent().siblings().children()  所有a下边的span
}

//点下边的按钮切换图片
//这个思路一开始感觉毫无头绪，可是后才参考资料，琢磨，还真想出来一个
//按钮的index与前一次点击图片的index相减；判断这个差值dip和之前的相差多少
//是正数的话就是next图片，负数的话就是pre图片。dip是多少就循环几次
$a.each(function () {

    $(this).click(function () {
        var myIndex = $(this).index();
        var dipIndex = myIndex-index;
        if (dipIndex >= 0){
            for(var i=0;i<dipIndex;i++){
                cArr.unshift(cArr[4]);//向开头添加p1
                cArr.pop();
            }
        }
        else if (dipIndex < 0){
            for(var i=0;i<-dipIndex;i++){
                cArr.push(cArr[0]);//向数组末尾添加p5
                cArr.shift();//把开头的p5删掉，最终数组是【p4,p3,p2,p1,p5】
            }
        }
        $("li").each(function(i,e){
            $(e).removeClass().addClass(cArr[i]);
        })
        index = myIndex;
        show();
    });

});

//点击图片能切换的功能
//点击class为p3的图片
$(document).on("click",".p3",function(){
    nextImg();
});
//点击class为p5的图片
$(document).on("click",".p5",function(){
    preImg();
});

//自动播放功能
//			鼠标移入box时清除定时器
$(".content").mouseover(function(){
    clearInterval(timer);
})

//			鼠标移出box时开始定时器
$(".content").mouseleave(function(){
    timer=setInterval(nextImg,4000);
})

//			进入页面自动开始定时器
timer=setInterval(nextImg,4000);
