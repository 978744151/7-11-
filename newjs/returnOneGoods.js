$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        var ordersn_no =  tools.getParam('key');
        var barcode  = tools.getParam('barcode');
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/entry/datalist/queryReturnDetailGood.action',
            data: {
                ordersn_no: ordersn_no,
                barcode: barcode,
                access_code: access_code
            },
            success: function (data) {
                console.log(data)
                var html =  '';
                html+='<div class="order_infos">'
                switch(data.result.record[0].status){
                    case  "0" :
                        html+='<span>退货审核中</span>'
                    break
                    case  "-1" :
                        html+='<span>退货失败</span>'
                    break
                    case  "1" :
                        html+='<span>退货成功</span>'
                    break
                    //default:
                    //    html+='<span>退货中</span>'
                }
                html+='</div>'
                html+='<div class="allorder_list">'
                html+='<div>'
                html+='<div class="history_list" style="border-bottom: 0px;">'
                html+='<div class="history_img">'
                html+='<img src="' + data.result.record[0].commoditypic + '"  alt="">'
                html+='</div>'
                html+='<div class="history_info">'
                html += '<p style="color: black;">' + data.result.record[0].commodityname + ' ' + data.result.record[0].speckeyname + '</p>'
                html+='<div>'
                html+='<span>'+data.result.record[0].goodsnum+'</span>'
                html+='<p style="color: black;">&yen;'+data.result.record[0].goodsprice+'</p>'
                html+='</div>'
                html+=' </div>'
                html+='</div>'
                html+='</div>'
                html+='</div>'
                html+='<div class="order_total">'
                html+='<span>商品总价</span>'
                html+=' <span>&yen;'+(data.result.record[0].goodsnum * data.result.record[0].goodsprice).toFixed(2)+'</span>'
                html+=' </div>'
                html+='<div class="order_yf">'
                html+='<span>商品运费</span>'
                html+='<span>0</span>'
                html+='</div>'
                html+='<!--<div class="order_yh">-->'
                html+='<!--商品优惠-->'
                html+='<!--</div>-->'
                html+='<div class="order_sfk">'
                html+='<span style="color:#4038a5">退款金额</span>'
                html+='<span style="color:#4038a5; font-size: 16px;">'+(data.result.record[0].goodsnum * data.result.record[0].goodsprice).toFixed(2)+'</span>'
                html+='</div>'
                html+='<div class="order_state">'
                html+=' <div>'
                html+='<span>订单编号</span>'
                html+='<span>'+ordersn_no+'</span>'
                html+='</div>'
                html+='</div>'
                $('.order_info_content').html(html)
            },
            error: function () {
                mui.toast('加载失败，稍后进行操作')
            }
        })
        //跳转详情页
        $('body').on('click', '.order_cart', function () {
            var barcode = $(this).data('barcode');
            window.top.location = "product.html?key=" + barcode;
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})