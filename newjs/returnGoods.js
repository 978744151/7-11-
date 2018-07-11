$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        returnGoods()
        function returnGoods() {
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/entry/datalist/queryOrderReturnGood.action',
                data: {
                    userid: userid,
                    access_code: access_code,
                },
                success: function (data) {
                    console.log(data);
                    if (data.success == 1) {
                        var order_state = "";
                        for (var i = 0; i < data.result.record.length; i++) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo"  data-ordersn_no="' + data.result.record[i].ordersn_no + '" data-barcode="' + data.result.record[i].barcode + '" >'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'

                            order_state += '<div class="history_list">'
                            order_state += '<div class="history_img">'
                            order_state += '<img src="' + data.result.record[i].commoditypic + '"  alt="">'
                            order_state += '</div>'
                            order_state += '<div class="history_info">'
                            order_state += '<p style="color: black;">' + data.result.record[i].commodityname + '' + data.result.record[i].speckeyname + '</p>'
                            order_state += '<div>'
                            order_state += '<span>X' + data.result.record[i].goodsnum + '</span>'
                            order_state += '<p>&yen;' + data.result.record[i].goodsprice + '</p>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + (data.result.record[i].goodsprice * data.result.record[i].goodsnum).toFixed(2) + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            if (data.result.record[i].status == 0) {
                                order_state += '<p style="color: #4038a5">退款中</p>'
                            } else if (data.result.record[i].status == 1) {
                                order_state += '<p style="color: #4038a5">退款成功</p>'
                            }
                            else if (data.result.record[i].status == -1) {
                                order_state += '<p style="color: #4038a5">退货失败</p>'
                            }
                            order_state += '</div>'
                            order_state += '</div>'
                        }
                        $('.history_box2').html(order_state)
                    }
                    else if (data.success == 0) {
                        mui.toast(data.errmsg)
                    } else {
                        mui.toast(data.errmsg);
                    }
                },
                error: function () {
                    mui.toast('网络错误，请重新进行操作');
                }
            })
        }

        $('body').on('tap', '.seeinfo', function () {
            var ordersn_no = $(this).data('ordersn_no');
            var barcode = $(this).data('barcode');
            window.top.location = "returnOneGoods.html?key=" + ordersn_no +"&barcode="+barcode;
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})
