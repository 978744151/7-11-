$(function () {
    var barcode = tools.getParam('id');
    var orderid = tools.getParam('orderid');
    var pic = tools.getParam('pic');
    var name = tools.getParam('name');
    var spce = tools.getParam('spce');
    var num = tools.getParam('num');
    var price = tools.getParam('price');
    var ordersn = tools.getParam('ordersn');
    var ordersn_no = tools.getParam('ordersn_no');
    var sku = tools.getParam('sku');
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (userid) {
        $('.allorder_bh p').text('订单编号:' + ordersn_no);
        $('.history_img img').attr('src', pic);
        $('.returngoods_name').text(name + spce);
        $('.returngoods_spec span').text('x' + num)
        $('.returngoods_spec p').text(price)
        $('.return_goods').on('click', function () {
            window.location.href = "return_price.html?id=" + barcode + "&name=" + name + "&spce=" + spce + "&num=" + num + "&price=" + price + "&orderid=" + orderid + "&pic=" + pic + "&ordersn=" + ordersn + "&sku=" + sku + "&ordersn_no=" + ordersn_no;
        })
        $('.return_goods_two').on('click', function () {
            window.location.href = "returnsales.html?id=" + barcode + "&name=" + name + "&spce=" + spce + "&num=" + num + "&price=" + price + "&orderid=" + orderid + "&pic=" + pic + "&ordersn=" + ordersn + "&sku=" + sku + "&ordersn_no=" + ordersn_no;
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }

})