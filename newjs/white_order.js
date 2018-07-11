$(function () {
    fast()
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        render()
        function render() {
            var checked_arr = tools.getParam('key');
            var checked_price = tools.getParam('price');
            console.log(checked_arr)
            console.log(checked_price);
            var totalprice = 0;
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/settlement.action',
                data: {
                    cartid: checked_arr,
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    data.checked_price = checked_price;
                    var goodsname = data.result.goods[0].commodityname;

                    if (data.success == 1) {
                        for( var i = 0;i<data.result.goods.length;i++){
                            totalprice +=  (data.result.goods[i].goodsprice * data.result.goods[i].goodsnum)
                        }
                        $(".order_sfk").text('实付款:￥' + totalprice.toFixed(2))
                        console.log(totalprice)
                            setTimeout(function () {
                            var site_layer = "";
                            if (data.result.userAddressList.length > 0) {
                                site_layer += '<div class="order_img"> '
                                site_layer += '<img src="../images/site.png" alt="">'
                                site_layer += '</div>'
                                site_layer += '<div class="order_info_per">'
                                site_layer += '<div>'
                                site_layer += '<p>' + data.result.userAddressList[0].consignee + '</p>'
                                site_layer += '<p>' + data.result.userAddressList[0].mobile + '</p>'
                                site_layer += '</div>'
                                site_layer += '<span style="display: flex;justify-content: space-between">'
                                site_layer += '<span>' + data.result.userAddressList[0].provincialurbanarea + data.result.userAddressList[0].address + '</span>'
                                site_layer += '<span class="qs_edit" style="width:30px; height:30px;"><img src="../images/right.png" alt=""  style="width:12px; height:18px;    position: absolute;right: 15px;"></span>'
                                site_layer += '</span>'
                                site_layer += '</div>'
                            }
                            else {
                                site_layer += '<div class="order_img">'
                                site_layer += '<img src="../images/site.png" alt="">'
                                site_layer += '</div>'
                                site_layer += '<div class="order_info_per">'
                                site_layer += '<div>'
                                site_layer += '<p>你还没有添加地址</p>'
                                site_layer += '</div>'
                                site_layer += '<span style="display: flex;justify-content: space-between">'
                                site_layer += '<span></span>'
                                site_layer += '<span style="color: #4038a5;" class="add_site">添加地址</span>'
                                site_layer += '</span>'
                                site_layer += '</div>'
                            }
                            $('.order_site').html(site_layer)
                            var html = template('tpl', data)
                            $('.order_wakeng').html(html)
                            $('body').on('click', '.qs_edit', function (e) {

                                var layer = "";
                                if (data.result.userAddressList.length > 0) {
                                    for (var i = 0; i < data.result.userAddressList.length; i++) {
                                        layer += '<div class="site_list">'
                                        layer += ' <div class="site_name">'
                                        layer += '<span>' + data.result.userAddressList[i].consignee + '</span>'
                                        layer += '<p>' + data.result.userAddressList[i].mobile + '</p>'
                                        layer += '</div>'
                                        layer += '<div class="site_info">'
                                        layer += '<span></span>'
                                        layer += '<p>' + data.result.userAddressList[i].provincialurbanarea + data.result.userAddressList[i].address + '</p>'
                                        layer += '</div>'
                                        //layer += '<div class="site_moren">'
                                        //layer += '<span>'
                                        //layer += '<span class="mui-input-row mui-checkbox mui-left">'
                                        //layer += '<input data-id="{{v.addressid}}" name="checkbox1" type="checkbox" class="side_ck" style="left: 0px;top: 0px;">'
                                        //layer += '</span>'
                                        //layer +='<span class="site_more_span">设为默认</span>'
                                        //layer += '</span>'
                                        //layer += '<p>'
                                        //layer +='<span data-id="{{v.addressid}}" class='qs_edit'><img src="../images/site.png" alt="">&nbsp;编辑</span>'
                                        //layer +='<span class="qs_del" data-id="{{v.addressid}}"><img src="../images/site.png" alt="">&nbsp;删除</span>'
                                        //layer += '</p>'
                                        //layer += '</div>'
                                        layer += '</div>'
                                    }
                                }
                                $('.site_box').html(layer);
                                $('.order_layer').animate({
                                    'bottom': 0
                                }, 300)
                                $('.container>.header').fadeOut();
                                $('.order_layer').fadeIn()
                                $('.layer_down').on('click', function () {
                                    $('.order_layer').animate({
                                        'bottom': 100 + '%'
                                    }, 300)
                                    $('.container>.header').fadeIn();
                                    $('.order_layer').fadeOut();
                                })
                            })
                        }, 300)
                        $('body').on('click', '.site_list', function () {
                            var index = $(this).index();
                            var site_layer = "";
                            site_layer += '<div class="order_img"> '
                            site_layer += '<img src="../images/site.png" alt="">'
                            site_layer += '</div>'
                            site_layer += '<div class="order_info_per">'
                            site_layer += '<div>'
                            site_layer += '<p>' + data.result.userAddressList[index].consignee + '</p>'
                            site_layer += '<p>' + data.result.userAddressList[index].mobile + '</p>'
                            site_layer += '</div>'
                            site_layer += '<span style="display: flex;justify-content: space-between">'
                            site_layer += '<span>' + data.result.userAddressList[index].provincialurbanarea + data.result.userAddressList[index].address + '</span>'
                            site_layer += '<span class="qs_edit" style="width:30px; height:30px;"><img src="../images/right.png" alt=""  style="width:12px; height:18px;    position: absolute;right: 15px;"></span>'
                            site_layer += '</span>'
                            site_layer += '</div>'
                            $('.cart_settle').data("id", data.result.userAddressList[index].addressid);
                            $('.order_site').html(site_layer)
                            $('.container>.header').fadeIn();
                            $('.order_layer').fadeOut();
                            $('.order_layer').animate({
                                'bottom': 100 + '%'
                            }, 400)
                        })
                        if (data.result.userAddressList.length > 0) {
                            var adressid = data.result.userAddressList[0].addressid;
                            console.log(adressid);
                            $('.cart_settle').on('click', function () {
                                var new_adressid = $(this).data('id');
                                var usernote = $('.pay_text').val();
                                var data = {
                                    userid: userid,
                                    loginuserfullname: '小胖',
                                    addressid: new_adressid || adressid,
                                    cartid: checked_arr,
                                    total: checked_price,
                                    shippingprice: 0,
                                    totalamount: checked_price,
                                    orderamount: checked_price,
                                    usernote: usernote,
                                    access_code: access_code
                                }
                                console.log(data);
                                $.ajax({
                                    type: 'post',
                                    url: url + '/api/api-bin/wjcm/datalist/SubmitUserOrder.action',
                                    data: data,
                                    success: function (data) {
                                        console.log(data);
                                        if (data.success == 1) {
                                            var ordersn = data.result.ordersn
//跳转支付页面
                                            window.top.location = '../new_html/order_pay.html?key=' + ordersn + '&price=' + totalprice.toFixed(2) + '&goodsname=' + goodsname;
                                        } else {
                                            mui.toast('操作失败，请重新进行操作');
                                        }
                                    },
                                    error: function () {
                                        mui.toast('请重新进行操作');
                                    }
                                })
                            })
                        } else {
                            mui.toast('请亲添加地址哦');
                        }
                    } else {
                        mui.toast('操作失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('请重新进行操作');
                }
            })
        }
        //新增地址
        $('body').on('click', '.add_site', function () {
            console.log(1)
            window.top.location = "site.html";
        })
////商品点击跳转页面
//        $('body').on('click', '.order_cart', function () {
//            var index = $(this).data('id');
//            window.top.location = 'product.html?key=' + index;
//        })
//管理页面
        $('body').on('click', '.order_admin', function () {
            window.top.location = "querysite.html";
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html";
        }, 1000)
    }
})