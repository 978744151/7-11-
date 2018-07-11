var access_code = localStorage.getItem('user');
var userid = localStorage.getItem('userid');
if (access_code) {
    var thisgoods = []
    var pageApp = 1;
    all(pageApp)
    dfk()
    dfh()
    dsh()
    dpj()
    tab()
    function all(pageApp) {
        console.log(pageApp)
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryOrdersAll.action',
            data: {
                userid: userid,
                access_code: access_code,
                pageApp: pageApp
            },
            success: function (data) {
                if (data.success == 1) {
                    if(pageApp == 1){
                        thisgoods =data.result.record
                    }else{
                        thisgoods = thisgoods.concat(data.result.record)
                    }
                    console.log(thisgoods);

                    var order_state = "";
                    if (thisgoods.length == 0) {
                        order_state += "<p style='margin-left: 10px; margin-top: 10px;'>没有订单哦</p>"
                    }
                    for (var i = 0; i < thisgoods.length; i++) {
                        if (thisgoods[i].goods.length > 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + thisgoods[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + thisgoods[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < thisgoods[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + thisgoods[i].goods[j].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + thisgoods[i].goods[j].commodityname + '' + thisgoods[i].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + thisgoods[i].goods[j].goodsnum + '</span>'
                                order_state += '<p>&yen;' + thisgoods[i].goods[j].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + thisgoods[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            if (thisgoods[i].orderstatus == 4) {
                                order_state += '<button>已退货</button>'
                            }
                            else if (thisgoods[i].orderstatus == -1) {
                                order_state += '<button>退货中</button>'
                            }
                            else if (thisgoods[i].orderstatus == 5) {
                                order_state += '<button>退货失败</button>'
                            }
                            else if (thisgoods[i].orderstatus == 0) {
                                order_state += '<button class="exp_info" data-shipsn="' + thisgoods[i].shipsn + '" data-shipcode ="' + thisgoods[i].shippingcode + '" data-ordersn ="' + thisgoods[i].ordersn + '" data-shippingname ="' + thisgoods[i].shippingname + '">查看物流</button>'
                                order_state += '<button class="true_goods" data-id="' + thisgoods[i].orderid + '">确认收货</button>'
                            }
                            else if (thisgoods[i].paystatus == 1) {
                                order_state += '<button class="pay" data-id="' + thisgoods[i].orderid + '" data-ordersn = "' + thisgoods[i].ordersn + '" data-total="' + thisgoods[i].total + '" data-goodsname="' + thisgoods[i].goods[0].commodityname + '">付款</button>'
                                order_state += '<button class="remover_order" data-id="' + thisgoods[i].orderid + '">取消订单</button>'
                            }
                            else if (thisgoods[i].orderstatus == 1) {
                                order_state += '<button>等待发货</button>'
                            }
                            else if (thisgoods[i].iscomment == 1 && thisgoods[i].orderstatus == 3) {
                                order_state += '<button class="to_comment" data-barcode="' + thisgoods[i].barcode + '" data-orderid="' + thisgoods[i].orderid + '' + '"data-name="' + thisgoods[i].commodityname + '" data-pic="' + thisgoods[i].commoditypic + '">去评价</button>'
                            }

                            //else if (thisgoods[i].orderstatus == 2) {
                            //    order_state += '<button class="remover_order">删除订单</button>'
                            //}
                            //else if(thisgoods[i].iscomment == 0 && thisgoods[i].shippingstatus == 0 && thisgoods[i].paystatus == 0){
                            //    order_state += '<button class="remover_order">删除订单</button>'
                            //}
                            //else if (thisgoods[i].orderstatus == 3) {
                            //    order_state += '<button class="complete_order">确认收货</button>'
                            //
                            //}
                            order_state += '</div>'
                            order_state += '</div>'
                        } else if (thisgoods[i].goods.length == 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + thisgoods[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + thisgoods[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < thisgoods[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + thisgoods[i].goods[0].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + thisgoods[i].goods[0].commodityname + '' + thisgoods[0].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + thisgoods[i].goods[0].goodsnum + '</span>'
                                order_state += '<p>&yen;' + thisgoods[i].goods[0].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + thisgoods[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            if (thisgoods[i].paystatus == 1) {
                                order_state += '<button class="pay" data-id="' + thisgoods[i].orderid + '" data-ordersn = "' + thisgoods[i].ordersn + '" data-total="' + thisgoods[i].total + '" data-goodsname="' + thisgoods[i].goods[0].commodityname + '">付款</button>'
                                order_state += '<button class="remover_order" data-id="' + thisgoods[i].orderid + '">取消订单</button>'
                            } else if (thisgoods[i].orderstatus == 4) {
                                order_state += '<button>已退货</button>'
                            }
                            else if (thisgoods[i].orderstatus == 5) {
                                order_state += '<button>退货失败</button>'
                            }
                            else if (thisgoods[i].orderstatus == -1) {
                                order_state += '<button>退货中</button>'
                            }
                            else if (thisgoods[i].orderstatus == 1) {
                                order_state += '<button>等待发货</button>'
                            }
                            else if (thisgoods[i].orderstatus == 0) {
                                order_state += '<button class="exp_info" data-shipsn="' + thisgoods[i].shipsn + '" data-shipcode ="' + thisgoods[i].shippingcode + '" data-ordersn ="' + thisgoods[i].ordersn + '" data-shippingname ="' + thisgoods[i].shippingname + '">查看物流</button>'
                                order_state += '<button class="true_goods" data-id="' + thisgoods[i].orderid + '">确认收货</button>'
                            }
                            //else if (thisgoods[i].orderstatus == 2) {
                            //    order_state += '<button class="remover_order">删除订单</button>'
                            //}
                            //else if (thisgoods[i].orderstatus == 3) {
                            //    order_state += '<button class="complete_order">确认收货</button>'
                            //}
                            else if (thisgoods[i].iscomment == 1 && thisgoods[i].orderstatus == 3) {
                                order_state += '<button class="go_comment" data-barcode="' + thisgoods[i].goods[0].barcode + '" data-orderid="' + thisgoods[i].goods[0].orderid + '' + '"data-name="' + thisgoods[i].goods[0].commodityname + '" data-pic="' + thisgoods[i].goods[0].commoditypic + '">去评价</button>'
                            }
                            order_state += '</div>'
                            order_state += '</div>'
                        }

                    }
                    $('.renderall').html(order_state);
                    mui('.mui-scroll-wrapper').scroll({
                        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                        indicators: false,//去除滚动条
                        bounce: true
                    });
                    mui.init({
                        swipeBack: false,
                        pullRefresh: {
                            container: '#pull',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                            down: {
                                callback: pulldownRefresh
                            },
                            up: {
                                height: 100,
                                contentrefresh: '正在加载...',
                                contentnomore: '没有更多数据了',
                                callback: pullupRefresh
                            }
                        }
                    });
                    function pulldownRefresh() {
                        setTimeout(function () {
                            mui('#pull').pullRefresh().endPulldownToRefresh();
                            all(1)
                        }, 700)
                    }

                    function pullupRefresh() {
                        setTimeout(function () {
                            mui('#pull').pullRefresh().endPullupToRefresh();
                            pageApp++
                            all(pageApp)
                        }, 700)
                    }
                } else if (data.success == 0) {
                    mui.toast(data.errmsg)
                    setTimeout(function () {
                        window.top.location = "landing.html"
                    }, 1000)
                } else {
                    mui.toast(data.errmsg)
                }
            },
            error: function () {
                mui.toast('网络错误，请重新进行操作')
            }
        })
    }

    function dfk() {
        console.log(1)
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryOrdersUnpaid.action',
            data: {
                userid: userid,
                access_code: access_code,
            },
            success: function (data) {
                console.log(data);
                if (data.success == 1) {
                    var order_state = "";
                    if (data.result.record.length == 0) {
                        order_state += "<p style='margin-left: 10px; margin-top: 10px;'>没有订单哦</p>"
                    }
                    for (var i = 0; i < data.result.record.length; i++) {
                        if (data.result.record[i].goods.length > 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + data.result.record[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + data.result.record[i].goods[j].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + data.result.record[i].goods[j].commodityname + '' + data.result.record[i].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + data.result.record[i].goods[j].goodsnum + '</span>'
                                order_state += '<p>&yen;' + data.result.record[i].goods[j].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + data.result.record[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            order_state += '<button class="pay" data-id="' + data.result.record[i].orderid + '" data-ordersn = "' + data.result.record[i].ordersn + '" data-total="' + data.result.record[i].total + '" data-goodsname="' + data.result.record[i].goods[0].commodityname + '">付款</button>'
                            order_state += '<button class="remover_order" data-id="' + data.result.record[i].orderid + '">取消订单</button>'
                            order_state += '</div>'
                            order_state += '</div>'
                        } else if (data.result.record[i].goods.length == 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + data.result.record[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + data.result.record[i].goods[0].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + data.result.record[i].goods[0].commodityname + '' + data.result.record[0].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + data.result.record[i].goods[0].goodsnum + '</span>'
                                order_state += '<p>&yen;' + data.result.record[i].goods[0].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + data.result.record[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            order_state += '<button class="pay" data-id="' + data.result.record[i].orderid + '" data-ordersn = "' + data.result.record[i].ordersn + '" data-total="' + data.result.record[i].total + '" data-goodsname="' + data.result.record[i].goods[0].commodityname + '">付款</button>'
                            order_state += '<button class="remover_order" data-id="' + data.result.record[i].orderid + '">取消订单</button>'
                            order_state += '</div>'
                            order_state += '</div>'
                        }
                    }
                    $('.renderdfk').html(order_state)
                } else {
                    mui.toast(data.errmsg);
                }
            },
            error: function () {
                mui.toast('网络错误，请重新进行操作');
            }
        })
    }

    function dfh() {
        console.log(1)
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryOrdersUnshipped.action',
            data: {
                userid: userid,
                access_code: access_code
            },
            success: function (data) {
                console.log(data);
                if (data.success == 1) {
                    var order_state = "";
                    if (data.result.record.length == 0) {
                        order_state += "<p style='margin-left: 10px; margin-top: 10px;'>没有订单哦</p>"
                    }
                    for (var i = 0; i < data.result.record.length; i++) {
                        if (data.result.record[i].goods.length > 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + data.result.record[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + data.result.record[i].goods[j].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + data.result.record[i].goods[j].commodityname + '' + data.result.record[i].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + data.result.record[i].goods[j].goodsnum + '</span>'
                                order_state += '<p>&yen;' + data.result.record[i].goods[j].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + data.result.record[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            order_state += '<button class="loader_goods">等待发货</button>'
                            order_state += '</div>'
                            order_state += '</div>'
                        } else if (data.result.record[i].goods.length == 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + data.result.record[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + data.result.record[i].goods[0].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + data.result.record[i].goods[0].commodityname + '' + data.result.record[0].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + data.result.record[i].goods[0].goodsnum + '</span>'
                                order_state += '<p>&yen;' + data.result.record[i].goods[0].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + data.result.record[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            order_state += '<button class="loader_goods">等待发货</button>'
                            order_state += '</div>'
                            order_state += '</div>'
                        }

                    }
                    $('.renderdfh').html(order_state)
                } else {
                    mui.toast(data.errmsg);
                }
            },
            error: function () {
                mui.toast('网络错误，请重新进行操作');
            }
        })
    }

    function dsh() {
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryOrdersOkshipped.action',
            data: {
                userid: userid,
                access_code: access_code
            },
            success: function (data) {
                console.log(data);
                if (data.success == 1) {
                    var order_state = "";
                    if (data.result.record.length == 0) {
                        order_state += "<p style='margin-left: 10px; margin-top: 10px;'>没有订单哦</p>"
                    }
                    for (var i = 0; i < data.result.record.length; i++) {
                        if (data.result.record[i].goods.length > 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + data.result.record[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + data.result.record[i].goods[j].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + data.result.record[i].goods[j].commodityname + '' + data.result.record[i].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + data.result.record[i].goods[j].goodsnum + '</span>'
                                order_state += '<p>&yen;' + data.result.record[i].goods[j].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + data.result.record[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            order_state += '<button class="true_goods" id="contrue"  data-id="' + data.result.record[i].orderid + '">确认收货</button>'
                            order_state += '<button class="exp_info" data-shipsn="' + data.result.record[i].shipsn + '" data-shipcode ="' + data.result.record[i].shippingcode + '" data-ordersn ="' + data.result.record[i].ordersn + '" data-shippingname ="' + data.result.record[i].shippingname + '">查看物流</button>'
                            order_state += '</div>'
                            order_state += '</div>'
                        } else if (data.result.record[i].goods.length == 1) {
                            order_state += '<div class="allorder_list">'
                            order_state += '<div class="seeinfo" data-id="' + data.result.record[i].orderid + '">'
                            order_state += '<div class="allorder_bh">'
                            order_state += '<p>订单编号: ' + data.result.record[i].ordersn + '</p>'
                            order_state += '</div>'
                            for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                order_state += '<div class="history_list">'
                                order_state += '<div class="history_img">'
                                order_state += '<img src="' + data.result.record[i].goods[0].commoditypic + '"  alt="">'
                                order_state += '</div>'
                                order_state += '<div class="history_info">'
                                order_state += '<p style="color: black;">' + data.result.record[i].goods[0].commodityname + '' + data.result.record[0].goods[j].speckeyname + '</p>'
                                order_state += '<div>'
                                order_state += '<span>X' + data.result.record[i].goods[0].goodsnum + '</span>'
                                order_state += '<p>&yen;' + data.result.record[i].goods[0].goodsprice + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '</div>'
                            }
                            order_state += '<div class="order_hj">'
                            order_state += '<span>合计: &yen;' + data.result.record[i].total + '</span>'
                            order_state += '</div>'
                            order_state += '</div>'
                            order_state += '<div class="order_button">'
                            order_state += '<button class="true_goods" id="contrue"  data-id="' + data.result.record[i].orderid + '">确认收货</button>'
                            order_state += '<button class="exp_info" data-shipsn="' + data.result.record[i].shipsn + '" data-shipcode ="' + data.result.record[i].shippingcode + '" data-ordersn ="' + data.result.record[i].ordersn + '" data-shippingname ="' + data.result.record[i].shippingname + '">查看物流</button>'
                            order_state += '</div>'
                            order_state += '</div>'
                        }
                    }
                    $('.renderdsh').html(order_state)
                } else {
                    mui.toast(data.errmsg);
                }
            },
            error: function () {
                mui.toast('网络错误，请重新进行操作')
            }
        })
    }

    function dpj() {
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryNoCommentGood.action',
            data: {
                userid: userid,
                access_code: access_code,
            },
            success: function (data) {
                console.log(data);
                if (data.success == 1) {
                    var order_state = "";
                    if (data.result.noComment.length == 0) {
                        order_state += "<p style='margin-left: 10px; margin-top: 10px;'>没有评价哦</p>"
                    }
                    for (var i = 0; i < data.result.noComment.length; i++) {
                        order_state += '<div class="allorder_list">'
                        order_state += '<div class="seeinfo" data-id="' + data.result.noComment[i].orderid + '">'
                        order_state += '<div class="history_list">'
                        order_state += '<div class="history_img">'
                        order_state += '<img src="' + data.result.noComment[i].commoditypic + '"  alt="">'
                        order_state += '</div>'
                        order_state += '<div class="history_info">'
                        order_state += '<p style="color: black;">' + data.result.noComment[i].commodityname + '' + data.result.noComment[i].speckeyname + '</p>'
                        order_state += '<div>'
                        order_state += '<span>X' + data.result.noComment[i].goodsnum + '</span>'
                        order_state += '<p>&yen;' + data.result.noComment[i].goodsprice + '</p>'
                        order_state += '</div>'
                        order_state += '</div>'
                        order_state += '</div>'
                        order_state += '</div>'
                        order_state += '<div class="order_button">'
                        order_state += '<button class="go_comment" data-barcode="' + data.result.noComment[i].barcode + '" data-orderid="' + data.result.noComment[i].orderid + '' + '"data-name="' + data.result.noComment[i].commodityname + '" data-pic="' + data.result.noComment[i].commoditypic + '">去评价</button>'
                        order_state += '</div>'
                        order_state += '</div>'
                    }
                    $('.renderdpj').html(order_state)
                } else {
                    mui.toast(data.errmsg);
                }
            },
            error: function () {
                mui.toast('网络错误，请重新进行操作');
            }
        })
    }
    //tab栏处理
    function tab(){
        if($(".order_category")){
            var hash = window.location.hash.replace(/#/g, "");
            $(".order_category>span").removeClass('on')
            if(hash){
                $(".order_category>span").each(function (i,e) {
                    var id = $(this).data('id');
                    console.log(id);
                    if(id == hash){
                        $(this).addClass('on')
                        $('.allorder_content').hide()
                        $('.'+id).show()
                    }
                })
            }
            if(!hash){
                $(".order_category>span").eq(0).addClass('on')
                var pageone = $(".order_category>span").eq(0).data('id')
                $('.allorder_content').hide()
                $('.'+pageone).show()
                pageone+'()'
            }
            $(".order_category>span").on('click', function () {
                $(".order_category>span").removeClass('on');
                $(this).addClass('on')
                $('.allorder_content').hide();
                var page = $(this).data('id');
                if(page == 'all'){
                    all(1)
                }else if(page == 'dfk'){
                    dfk()
                }else if(page == 'dfh'){
                    dfh()
                }else if(page == 'dsh'){
                    dsh()
                }else if(page == 'dpj'){
                    dpj()
                }
                console.log(page)
                $('.'+page).show()
                page+'()'
                history.pushState(history.length - 1, 'title', '#' + page);
            })
        }
    }

    //删除订单
    //确认
    order.closeorder(userid, access_code)//关闭订单
    order.comment()//评论
    order.pay()//支付
    order.truesh(access_code)
    order.express()//查看物流
    order.pay()//支付
    order.returngoods()//退货
    //查看订单信息事件
    $('body').on('tap', '.seeinfo', function () {
        var orderid = $(this).data('id');
        window.top.location = "order_info.html?key=" + orderid
    })
    ////去评价
    $('body').on('tap', '.to_comment', function () {
        var orderid = $(this).data('orderid');
        window.top.location = "order_info.html?key=" + orderid
    })
} else {
    mui.toast('你没有登陆')
    setTimeout(function () {
        window.top.location = "landing.html"
    }, 1000)
}
