$(function () {
    picker()
    var barcode = tools.getParam('id');
    var orderid = tools.getParam('orderid');
    var pic = tools.getParam('pic');
    var name = tools.getParam('name');
    var spce = tools.getParam('spce');
    var num = tools.getParam('num');
    var price = tools.getParam('price');
    var ordersn = tools.getParam('ordersn');
    var sku = tools.getParam('sku');
    var access_code = localStorage.getItem('user');
    var ordersn_no = tools.getParam('ordersn_no');
    var userid = localStorage.getItem('userid');
    if (userid) {
        $('.allorder_bh p').text('订单编号:' + ordersn_no);
        $('.history_img img').attr('src', pic);
        $('.returngoods_name').text(name + spce);
        $('.returngoods_spec span').text('x' + num);
        $('.returngoods_spec p').text(price);
        $('.order_price p').text((price * num).toFixed(2));
        document.getElementById("alertBtn").addEventListener('tap', function () {
            var goodstatus = $('#userResult').text()
            var reason = $('#causerResult').text()
            var shipname = $('.shipname').val();
            var shipcode = $('.shipcode').val()
            var rtnexplan = $('.order_explain input').val()
            var data = {
                userid: userid,
                orderid: orderid,
                ordersn: ordersn,
                barcode: barcode,
                type: 0,
                reason: reason,
                goodsstatus: goodstatus,
                sku: sku,
                access_code: access_code,
                rtnamount: price,
                shipname: shipname,
                shipcode: shipcode,
                rtnexplan: rtnexplan,
                ordersn_no: ordersn_no
            }
            console.log(data);
            $.ajax({
                url: url + '/api/api-bin/wjcm/datalist/orderReturnGood.action',
                data: data,
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        mui.alert('申请成功', '', function () {
                            window.location.href = "allorder.html"
                        });
                    } else {
                        mui.toast(data.errmsg)
                    }
                },
                error: function () {
                    mui.toast('加载失败，稍后进行操作')
                }

            })
        });
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html";
        }, 1000)
    }
})