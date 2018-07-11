var date = {
    name: '',
    shopcode: 10000000,
    pageApp: 1,
    orderkey: '',
    orderdesc: ''
}
var url = 'http://mall.yanyuan666.com'
function render(date) {
    $.ajax({
        type: 'get',
        url: url + '/api/api-bin/wjcm/entry/datalist/queryGoods.action',
        data: date,
        success: function (data) {
            console.log(data)
            if (data.success == 1) {
                var html = '';
                if (data.result.goods.length == 0) {
                    html += "<p style='margin-left: 10px; margin-top: 10px;'>没有找到相关的宝贝</p>"
                } else if (data.result.goods.length > 0) {
                    for (var i = 0; i < data.result.goods.length; i++) {
                        html += "<div class='goods-item' data-id='" + data.result.goods[i].barcode + "'>"
                        html += "<div class='goods_item_img'>"
                        html += "<img src =" + data.result.goods[i].commoditypic + " alt=''>"
                        html += "</div>"
                        html += "<div class='goods_item_p'>"
                        html += "<p>" + data.result.goods[i].commodityname + "</p>"
                        html += "</div>"
                        html += "<div class='goods_item_span'>"
                        html += "<span>包邮</span>"
                        //html+= "<span>推荐</span>"
                        //html+= "<span>新品</span>"
                        html += "</div>"
                        html += "<div class='goods_item_price'>"
                        html += "<span><span style='color: #4038a9; font-size: 14px;'>￥" + data.result.goods[i].buyprice + "</span><span style='font-size: 12px;'><del>原价:" + data.result.goods[i].saleprice + "</del></span></span>"
                        html += "<span style='font-size: 12px;margin-top: 2px;'>" + parseInt(data.result.goods[i].totalsale) + "购买</span>"
                        html += "</div>"
                        html += "</div>"
                    }
                }
                $('.goods-list').html(html);
            } else {
                mui.toast('操作失败，请重新进行操作')
            }
        },
        error: function () {
            mui.coast('服务器出错请重试')
        }
    })
}
$('body').on('click', '.goods-item', function () {
    console.log($(this));
    var id = $(this).data('id')
    console.log(id)
    window.top.location = 'product.html?key=' + id
})
var name = tools.getParam('key')
$('.search_text').val(name)
date.name = name
render(date)
//排序功能
$('.lt_sort').on('click', '.lt_sort>a', function () {
    var $span = $(this).find('span')
    $(this).addClass('on').siblings().removeClass('on')
    if ($span.hasClass('fa-angle-down')) {
        $span.removeClass('fa-angle-down').addClass('fa-angle-up')
    }
    else if ($span.hasClass('fa-angle-up')) {
        $span.removeClass('fa-angle-up').addClass('fa-angle-down')
    }
    var val = $(this).data('type')
    var order = $span.hasClass('fa-angle-down') ? "desc" : "asc";
    console.log(order)
    console.log(val)
    date.orderkey = val
    date.orderdesc = order
    console.log(date)
    render(date)
})
$('.search_text').on('focus', function () {
    window.top.location = 'search.html'
})
