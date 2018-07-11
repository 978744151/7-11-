$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        var orderid = tools.getParam('key');
        console.log(orderid)
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryOneOrder.action',
            data: {
                orderid: orderid,
                access_code: access_code
            },
            success: function (data) {
                console.log(data)
                var footer = "";
                if (data.result.record.orderstatus == -1) {

                }
                else if (data.result.record.orderstatus == 4) {

                }
                else if (data.result.record.orderstatus == 5) {

                }
                else if (data.result.record.paystatus == 1) {
                    footer += '<button class="pay"  data-ordersn = "' + data.result.record.ordersn + '" data-total="' + data.result.record.total + '" data-goodsname="' + data.result.record.goods[0].commodityname + '">去付款</button>'
                    footer += '<button class="remover_order" data-id="' + data.result.record.orderid + '">取消订单</button>'
                }
                else if (data.result.record.orderstatus == 1) {
                    footer += '<button >等待发货</button>'
                } else if (data.result.record.orderstatus == 0) {
                    footer += '<button class="exp_info" data-shipsn="' + data.result.record.shipsn + '" data-shipcode ="' + data.result.record.shippingcode + '" data-ordersn ="' + data.result.record.ordersn + '" data-shippingname ="' + data.result.record.shippingname + '">查看物流</button>'
                    footer += '<button class="true_goods" data-id="' + data.result.record.orderid + '">确认收货</button>'
                }

                $('.order_info_button').html(footer);
                var html = "";
                html += '<div class="order_infos">'
                if (data.result.record.orderstatus == -1) {
                    html += '<span>退货中</span>'
                }
                else if (data.result.record.orderstatus == 4) {
                    html += '<span>退货完成</span>'
                }
                else if (data.result.record.orderstatus == 5) {
                    html += '<span>退货失败</span>'
                }
                else if (data.result.record.paystatus == 1) {
                    html += '<span >订单未付款</span>'
                }
                else if (data.result.record.orderstatus == 1) {
                    html += '<span>订单等待发货</span>'
                } else if (data.result.record.orderstatus == 0) {
                    html += '<span>订单已发货</span>'
                } else if (data.result.record.orderstatus == 3) {
                    html += '<span >订单已完成</span>'
                }
                html += '</div>'
                html += '<div class="order_site">'
                html += '<div class="order_img">'
                html += '<img src="../images/site.png" alt="">'
                html += '</div>'
                html += '<div class="order_info_per">'
                html += '<div>'
                html += '<p>' + data.result.record.consignee + '</p>'
                html += '<p>' + data.result.record.mobile + '</p>'
                html += '</div>'
                html += '<span>' + data.result.record.provincialurbanarea + data.result.record.address + '</span>'
                html += '</div>'
                html += '</div>'
                if (data.result.record.flag == 0) {
                    for (var i = 0; i < data.result.record.goods.length; i++) {
                        html += '<div class="allorder_list " >'
                        html += '<div>'
                        html += '<div class="history_list order_cart" style="border-bottom: 0;" data-barcode = "' + data.result.record.goods[i].barcode + '">'
                        html += '<div class="history_img">'
                        html += '<img src="' + data.result.record.goods[i].commoditypic + '"  alt="">'
                        html += '</div>'
                        html += '<div class="history_info">'
                        html += '<p style="color: black;">' + data.result.record.goods[i].commodityname + ' ' + data.result.record.goods[i].speckeyname + '</p>'
                        html += '<div>'
                        html += '<span>X' + data.result.record.goods[i].goodsnum + '</span>'
                        html += '<p>&yen;' + data.result.record.goods[i].goodsprice + '</p>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        if (data.result.record.paystatus == 1) {

                        } else if (data.result.record.orderstatus == 5) {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button>退货失败</button> '
                            html += '</div>'
                        }
                        else if (data.result.record.orderstatus == 4) {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button>退货成功</button> '
                            html += '</div>'
                        }
                        else if (data.result.record.orderstatus == -1) {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button>退货中</button> '
                            html += '</div>'
                        } else if (data.result.record.goods[i].iscomment == 1 && data.result.record.orderstatus == 3) {
                            html += '    <div class="order_return_button" style="position: static">'
                            html += '       <button class="returnGoods" data-barcode = "' + data.result.record.goods[i].barcode + '"' +
                                ' data-orderid="' + data.result.record.orderid + '" ' +
                                'data-ordersn_no="' + data.result.record.goods[i].ordersn_no + '" ' +
                                'data-ordersn="' + data.result.record.ordersn + '" ' +
                                'data-pic = "' + data.result.record.goods[i].commoditypic + '"' +
                                ' data-name ="' + data.result.record.goods[i].commodityname + '" ' +
                                'data-spce ="' + data.result.record.goods[i].speckeyname + '" ' +
                                'data-num ="' + data.result.record.goods[i].goodsnum + '"' +
                                ' data-price ="' + data.result.record.goods[i].goodsprice + '" data-sku = "' + data.result.record.goods[i].sku + '">申请售后</button>'
                            html += '       <button class="go_comment" class="go_comment" data-barcode="' + data.result.record.goods[i].barcode + '" data-orderid="' + data.result.record.orderid + '" data-name="' + data.result.record.goods[i].commodityname + '" data-pic="' + data.result.record.goods[i].commoditypic + '">去评价</button>'
                            html += '    </div>'
                        } else {
                            html += '    <div class="order_return_button" style="position: static">'
                            html += '       <button class="returnGoods" data-barcode = "' + data.result.record.goods[i].barcode + '"' +
                                ' data-orderid="' + data.result.record.orderid + '" data-ordersn="' + data.result.record.ordersn + '" ' +
                                'data-ordersn_no="' + data.result.record.goods[i].ordersn_no + '" ' +
                                'data-pic = "' + data.result.record.goods[i].commoditypic + '"' +
                                ' data-name ="' + data.result.record.goods[i].commodityname + '" ' +
                                'data-spce ="' + data.result.record.goods[i].speckeyname + '" ' +
                                'data-num ="' + data.result.record.goods[i].goodsnum + '"' +
                                ' data-price ="' + data.result.record.goods[i].goodsprice + '" data-sku = "' + data.result.record.goods[i].sku + '">去退货</button>'
                            html += '    </div>'
                        }
                        html += '</div>'
                        html += '</div>'
                    }
                } else {
                    for (var i = 0; i < data.result.record.goods.length; i++) {
                        html += '<div class="allorder_list " >'
                        html += '<div>'
                        html += '<div class="history_list order_cart" style="border-bottom: 0;" data-barcode = "' + data.result.record.goods[i].barcode + '">'
                        html += '<div class="history_img">'
                        html += '<img src="' + data.result.record.goods[i].commoditypic + '"  alt="">'
                        html += '</div>'
                        html += '<div class="history_info">'
                        html += '<p style="color: black;">' + data.result.record.goods[i].commodityname + ' ' + data.result.record.goods[i].speckeyname + '</p>'
                        html += '<div>'
                        html += '<span>X' + data.result.record.goods[i].goodsnum + '</span>'
                        html += '<p style="color: black;">&yen;' + data.result.record.goods[i].goodsprice + '</p>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        if (data.result.record.paystatus == 1) {

                        } else if (data.result.record.goods[i].orderstatus == 1) {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button>退货失败</button> '
                            html += '</div>'
                        }
                        else if (data.result.record.goods[i].orderstatus == 0) {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button>退货成功</button> '
                            html += '</div>'
                        } else if (data.result.record.goods[i].orderstatus == -1) {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button>退货中</button> '
                            html += '</div>'
                        } else if (data.result.record.goods[i].iscomment == 1 && data.result.record.orderstatus == 3) {
                            html += '    <div class="order_return_button" style="position: static">'
                            html += '       <button class="returnGoods" data-barcode = "' + data.result.record.goods[i].barcode + '"' +
                                ' data-orderid="' + data.result.record.orderid + '" ' +
                                'data-ordersn_no="' + data.result.record.goods[i].ordersn_no + '" ' +
                                'data-ordersn="' + data.result.record.ordersn + '" ' +
                                'data-pic = "' + data.result.record.goods[i].commoditypic + '"' +
                                ' data-name ="' + data.result.record.goods[i].commodityname + '" ' +
                                'data-spce ="' + data.result.record.goods[i].speckeyname + '" ' +
                                'data-num ="' + data.result.record.goods[i].goodsnum + '"' +
                                ' data-price ="' + data.result.record.goods[i].goodsprice + '" data-sku = "' + data.result.record.goods[i].sku + '">申请售后</button>'
                            html += '       <button class="go_comment" class="go_comment" data-barcode="' + data.result.record.goods[i].barcode + '" data-orderid="' + data.result.record.orderid + '" data-name="' + data.result.record.goods[i].commodityname + '" data-pic="' + data.result.record.goods[i].commoditypic + '">去评价</button>'
                            html += '    </div>'
                        } else {
                            html += '<div class="order_return_button" style="position: static">'
                            html += '<button class="returnGoods" data-barcode = "' + data.result.record.goods[i].barcode + '"' +
                                ' data-orderid="' + data.result.record.orderid + '" data-ordersn="' + data.result.record.ordersn + '" ' +
                                'data-ordersn_no="' + data.result.record.goods[i].ordersn_no + '" ' +
                                'data-pic = "' + data.result.record.goods[i].commoditypic + '"' +
                                ' data-name ="' + data.result.record.goods[i].commodityname + '" ' +
                                'data-spce ="' + data.result.record.goods[i].speckeyname + '" ' +
                                'data-num ="' + data.result.record.goods[i].goodsnum + '"' +
                                ' data-price ="' + data.result.record.goods[i].goodsprice + '" data-sku = "' + data.result.record.goods[i].sku + '">去退货</button>'
                            html += '    </div>'
                        }
                        html += '</div>'
                        html += '</div>'
                    }
                }
                html += '<div class="order_total">'
                html += '<span>商品总价</span>'
                html += '<span>&yen;' + data.result.record.total + '</span>'
                html += '</div>'
                html += '<div class="order_yf">'
                html += '<span>商品运费</span>'
                html += ' </div>'
                html += '<div class="order_sfk">'
                html += '<span style="color:#4038a5">实付款</span>'
                html += '<span style="color:#4038a5; font-size: 16px;">&yen;' + data.result.record.total + '</span>'
                html += '</div>'
                html += '<div class="order_state">'
                html += '<div>'
                html += '<span>订单编号</span>'
                html += '<span>' + data.result.record.ordersn + '</span>'
                html += '</div>'
                html += '<div>'
                html += '<span>创建时间</span>'
                html += '<span>' + data.result.record.createtime.substr(0, 19) + '</span>'
                html += '</div>'
                html += '</div>'
                $('.order_info_content').html(html);
            },
            error: function () {
                mui.toast('加载失败，稍后进行操作')
            }
        })
        $('body').on('click', '.returnGoods', function () {
            var barcode = $(this).data('barcode')
            var orderid = $(this).data('orderid')
            var pic = $(this).data('pic')
            var name = $(this).data('name')
            var spce = $(this).data('spce')
            var num = $(this).data('num')
            var price = $(this).data('price')
            var ordersn = $(this).data('ordersn')
            var sku = $(this).data('sku')
            var ordersn_no = $(this).data('ordersn_no')
            window.location.href = "returnGoodspec.html?id=" + barcode + "&name=" + name + "&spce=" + spce + "&num=" + num + "&price=" + price + "&orderid=" + orderid + "&pic=" + pic + "&ordersn=" + ordersn + "&sku=" + sku + "&ordersn_no=" + ordersn_no;
        })
        //跳转详情页
        $('body').on('click', '.order_cart', function () {

            var barcode = $(this).data('barcode');
            window.top.location = "product.html?key=" + barcode;
        })
        order.closeorder(userid, access_code)//关闭订单
        order.comment()//评论
        order.pay()//支付
        order.truesh(access_code)
        order.express()//查看物流
        order.pay()//支付
        order.returngoods()//退货
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})