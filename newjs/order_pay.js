$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    var ordersn = tools.getParam('key');
    var price = tools.getParam('price');
    var goodsname = tools.getParam('goodsname');
    if (access_code) {
        $('input').on('click', function () {
            console.log($(this))
            $(this).prop('checked', true).parents().siblings().find('input').prop('checked', false)
        })
        console.log(1)
        $('.pay_button').on('click', function () {
            if ($('.pay_zfb_check:checked').length > 0) {
                window.top.location = 'zfb_pay.html?key=' + ordersn + '&price=' + price + '&goodsname=' + goodsname;
            }
            if ($('.pay_wx_check:checked').length > 0) {
                console.log(1)
                $.ajax({
                    type: 'post',
                    url: url + '/api/api-bin/wjcm/entry/weichat/wxPayment.action',
                    data: {
                        orderno: ordersn,
                        totalAmount: 0.02
                    },
                    success: function (data) {
                        console.log(data)
                        console.log(data.result.result.mweb_url)
                        if (data.result.codeFlag == 0) {
                            location.href = data.result.result.mweb_url + '&redirect_url=' + 'http://mall.yanyuan666.com/xwh5/new_html/order_result.html';
                        } else {
                            mui.toast('请求出错')
                        }
                    }
                })
            }
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})
