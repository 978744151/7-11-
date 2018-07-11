
$(document).ready(function () {
    render(0)
    refreshPage();

})
function render(id){
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/queryCategory.action?shopcode=10000000',
        success: function (data) {
            if(data.success == 1){
                data.id = id
                console.log(data)
                var html = template('tpl',data);
                $('.cate_content').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005,
                    indicators:false
                });
            }else{
                mui.toast('加载失败，请重新进行操作');
            }
        },
        error: function(){
            mui.toast('请稍后再试')
        }
    })
}
$(".cate_content").on('tap','.cate_l',function () {
    var id = $(this).data('id');
    console.log(id)
    render(id)
    $(this).addClass('now')
})
$('.search_text').on('focus', function () {
    document.activeElement.blur();
    openWindow('search.html');
})
$('body').on('tap','.category_li', function () {
    var cate_id = $(this).data('id')
    var cate_name = $(this).data('name')
    var cate_level = $(this).data('level')
    openWindow("category_list.html?key=" + cate_name + "&name=" + cate_id + "&level=" + cate_level + '&time=' + ((new Date()).getTime()))
})
