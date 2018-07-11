$(function () {
    //fast()
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    //初始化功能
    mui('.mui-numbox').numbox();
    var key = tools.getParam('key');
    $.ajax({
        type: 'get',
        url: url + '/api/api-bin/wjcm/entry/datalist/queryOneGoods.action?shopcode=10000000&barcode=' + key,
        data: {
            userid: userid
        },
        success: function (data) {
            if (data.success == 1) {
                //console.log(data)
                var pro_img = data.result.goods.commoditysmallpic;
                pro_img = pro_img.split(';');
                data.pro_img = pro_img;
                var barcode = data.result.goods.barcode;
                var defaultspec = data.result.defaultspec
                var commoditypic = data.result.goods.commoditypic;
                var com_arr = commoditypic.split('com')[1];
                var marketprice = data.result.goods.saleprice;
                var goodsprice = data.result.goods.buyprice;
                var morespec = data.result.goods.morespec;
                var spec = data.result.goods.spec;
                var html = template('tpl', data);
                $('.pro_container').html(html);
                var footer = template('tpl1', data);
                $('.pro_footer').html(footer);
                rendercomment()
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    indicators: false//去除滚动条
                });
                //获取距离
                var scroll = mui('.pro_content-scroll').scroll();
                document.querySelector('.pro_content-scroll').addEventListener('scroll', function (e) {
                    if (scroll.y < -100) {
                        $('.pro_header').show()
                    }
                    else {
                        $('.pro_header').hide()
                    }
                })
                //    初始化layer
                var html1 = '';
                if (morespec == 1) {
                    if (data.result.goods.storage == 0) {
                        $('.cart_true').attr('disabled', 'disabled');
                        html1 += '<img src="' + pro_img[0] + '" alt="" class="pro_image" >'
                        html1 += '<p>￥<span  class="cart_layer_price">' + data.result.goods.buyprice + '</span></p>'
                        html1 += '<p>库存:<span class="storeage">缺货</span></p>'
                    } else {
                        $('.cart_true').removeAttr('disabled', 'disabled');
                        html1 += '<img src="' + pro_img[0] + '" alt="" class="pro_image">'
                        html1 += '<p>￥<span  class="cart_layer_price">' + data.result.goods.buyprice + '</span></p>'
                        html1 += '<p>库存:<span class="storeage">' + data.result.goods.storage + '</span></p>'
                    }
                } else if (morespec == 0) {
                    if (data.result.defaultspec.storecount == 0) {
                        $('.cart_true').attr('disabled', 'disabled');
                        html1 += '<img src="' + pro_img[0] + '" alt="" class="pro_image">'
                        html1 += '<p>￥<span  class="cart_layer_price">' + data.result.goods.buyprice + '</span></p>'
                        html1 += '<p>库存:<span class="storeage">缺货</span></p>'
                    } else {
                        $('.cart_true').removeAttr('disabled', 'disabled');
                        html1 += '<img src="' + pro_img[0] + '" alt="" class="pro_image">'
                        html1 += '<p>￥<span  class="cart_layer_price">' + data.result.goods.buyprice + '</span></p>'
                        html1 += '<p>库存:<span class="storeage">' + data.result.defaultspec.storecount + '</span></p>'
                    }
                }
                $('.pro_tpl2').html(html1);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    indicators: false//去除滚动条
                });

                //    layer
                $('body').on('tap', '.guige,.pro_button', function (e) {
                    $.ajax({
                        type: 'get',
                        url: url + "/api/api-bin/wjcm/entry/datalist/queryGoodsSpec.action?barcode=" + barcode,
                        success: function (data) {
                            $('.pro_container').css('background', 'rgba(0,0,0,0.5)');
                            $('.pro_content').css('zIndex', -1)
                            $('.pro_layer').show();
                            $('.pro_layer').animate({
                                'bottom': 0
                            }, 200)

                            e.stopPropagation();
                            $(document).one('tap', function () {
                                $('.pro_layer').animate({
                                    'bottom': -400
                                })
                                $('.pro_container').css('background', '#f5f5f5');
                                $('.pro_content').css('zIndex', 999)
                            })
                            $('body').on('tap', '.pro_layer', function (e) {
                                e.stopPropagation();
                            })

                            //console.log(data);
                            data.barcode = barcode;
                            data.morespec = morespec;
                            data.defaultspec = defaultspec;
                            //规格展示
                            var layer_arr = [];
                            for (k in defaultspec) {
                                layer_arr.push(defaultspec[k]);
                            }
                            data.layer_arr = layer_arr;
                            var layer = '';
                            if (data.morespec == 0) {
                                layer += '<div class="layer">';
                                for (var k in data.goodspec) {
                                    layer += '<div>';
                                    layer += '<p>' + k + '</p>';
                                    layer += '<div class="pro_color">';
                                    for (var i in data.goodspec[k]) {
                                        var index = layer_arr.indexOf(data.goodspec[k][i]);
                                        if (index != -1) {
                                            layer += '<span class="now">' + data.goodspec[k][i] + '</span>';
                                        } else {
                                            layer += '<span>' + data.goodspec[k][i] + '</span>';
                                        }
                                    }
                                    layer += '</div>';
                                    layer += '</div>';
                                }
                                layer += '<div style="display: flex;justify-content:space-between;margin-top: 10px;">';
                                layer += '<p style="font-size: 14px;margin-top: 6px;">购买数量</p>'
                                layer += '<div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" data-numbox-max="100" style=" background: white; width: 85px;padding: 0 20px; ">'
                                layer += '<button style="border-right: 1px solid #dddddd;width: 25px;background: white" class="mui-btn mui-numbox-btn-minus" type="button">'
                                layer += '<img src="../images/-.png" alt="" style="width:  12px;height:  2px;width: 12px;height: 2px;position: absolute;top: 14px;left: 7px;"></button>'
                                layer += '<input class="mui-numbox-input" type="number" value="{{v.goodsnum}}" data-number="{{v.goodsnum}}" data-id="{{v.cartid}}" data-stu="{{v.sku}}" style="color: #cccccc;font-size: 14px;border-left:none!important;"/>';
                                layer += '<button style="border-left: 1px solid #dddddd;width: 25px;background: white" class="mui-btn mui-numbox-btn-plus" type="button">';
                                layer += '<img src="../images/+.png" alt="" style="width:  12px;height:12px;">';
                                layer += '</button>';
                                layer += '</div>';
                                layer += '</div>';

                                layer += '</div>';
                                layer += '</div>';
                            } else {
                                layer += '<div class="layer">';
                                layer += '<div style="margin-top: 10px;">';
                                layer += '<div style="font-size: 14px;margin-top: 6px; margin-bottom: 10px;">购买数量</div>'
                                layer += '<div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" data-numbox-max="100" style=" background: white; width: 85px;padding: 0 20px; ">'
                                layer += '<button style="border-right: 1px solid #dddddd;width: 25px;background: white" class="mui-btn mui-numbox-btn-minus" type="button">'
                                layer += '<img src="../images/-.png" alt="" style="width:  12px;height:  2px;width: 12px;height: 2px;position: absolute;top: 14px;left: 7px;"></button>'
                                layer += '<input class="mui-numbox-input" type="number" value="{{v.goodsnum}}" data-number="{{v.goodsnum}}" data-id="{{v.cartid}}" data-stu="{{v.sku}}" style="color: #cccccc;font-size: 14px;border-left:none!important;"/>';
                                layer += '<button style="border-left: 1px solid #dddddd;width: 25px;background: white" class="mui-btn mui-numbox-btn-plus" type="button">';
                                layer += '<img src="../images/+.png" alt="" style="width:  12px;height:12px;">';
                                layer += '</button>';
                                layer += '</div>';
                                layer += '</div>';
                                layer += '<div>';
                                layer += '</div>';
                            }
                            $('.pro_tpl1').html(layer);
                            mui('.mui-numbox').numbox();//数字初始化

                            $('.layer').on('tap', 'span', function (e) {
                                $(this).addClass('now').siblings().removeClass('now');
                                var str_arr = [];
                                for (var i = 0; i < $('span.now').length; i++) {
                                    var str = $('span.now').eq(i).text();
                                    str_arr.push(str);
                                }
                                str_arr = str_arr.join(',')
                                var pamas = {
                                    keyname: str_arr,
                                    barcode: data.barcode
                                }
                                //console.log(pamas)
                                updatespec()
                                function updatespec() {
                                    $.ajax({
                                        type: 'get',
                                        url: url + '/api/api-bin/wjcm/entry/datalist/querySpecPrice.action',
                                        data: pamas,
                                        success: function (data) {
                                            //console.log(data)
                                            if (data.success == 1) {
                                                var html2 = '';
                                                if (data.result.goodspec.price) {
                                                    $('.cart_true').removeAttr('disabled', 'disabled');
                                                    html2 += '<img src="' + pro_img[0] + '" alt="" class="pro_image">'
                                                    html2 += '<p>￥<span  class="cart_layer_price">' + data.result.goodspec.price + '</span></p>'
                                                    html2 += '<p>库存:<span class="storeage">' + data.result.goodspec.storecount + '</span></p>'
                                                } else {
                                                    $('.cart_true').attr('disabled', 'disabled');
                                                    html2 += '<img src="' + pro_img[0] + '" alt="" class="pro_image">'
                                                    html2 += '<p>￥<span  class="cart_layer_price">' + 0 + '</span></p>'
                                                    html2 += '<p>库存:<span class="storeage">缺货</span></p>'
                                                }
                                                $('.pro_tpl2').html(html2);
                                                var sku = data.result.goodspec.sku;
                                                if (sku) {
                                                    $('.cart_true').data('sku', sku)
                                                }
                                                $('.cart_true').data('price', data.result.goodspec.price)
                                            } else {
                                                mui.toast('操作失败，请重新进行操作')
                                            }
                                        },
                                        error: function () {
                                            mui.toast('网络错误，请重新进行操作')
                                        }
                                    })
                                }
                            })
                            if (access_code) {
                                var sku1 = data.defaultspec.sku || 0
                                $('.cart_true').data('sku')
                                $('.cart_true').on('tap', '', function (e) {
                                    var sku = $(this).data('sku')
                                    var size = $('.pro_color').find('span.now').text();
                                    var speckeyname = morespec == 0 ? size : spec
                                    var number = mui('.mui-numbox').numbox().getValue();
                                    var storeage = $('.storeage').text()
                                    var commodityname = $('.pro_name').text();
                                    if (number > storeage) {
                                        mui.toast('库存不足');
                                        return false;
                                    }
                                    var data = {
                                        userid: userid,
                                        barcode: key,
                                        commodityname: commodityname,
                                        commoditypic: com_arr,
                                        marketprice: marketprice,
                                        goodsprice: $('.cart_true').data('price') || goodsprice,
                                        goodsnum: number,
                                        speckeyname: speckeyname,
                                        sku: sku || sku1,
                                        morespec: morespec,
                                        defaultspec: defaultspec,
                                        access_code: access_code
                                    }
                                    console.log(data)
                                    $.ajax({
                                        type: 'post',
                                        url: url + '/api/api-bin/wjcm/datalist/addCarGoods.action',
                                        data: data,
                                        success: function (data) {
                                            if (data.success == 1) {
                                                mui.toast('添加成功');
                                                setTimeout(function () {
                                                    //window.location.href = "cart.html"
                                                }, 500)
                                            } else {
                                                mui.toast(data.errmsg);
                                                //setTimeout(function () {
                                                //    window.top.location = "landing.html"
                                                //}, 1000)
                                            }
                                        },
                                        error: function () {
                                            mui.toast('请稍后再试');
                                        }
                                    })
                                })
                            } else {
                                mui.toast('你没有登陆')
                                setTimeout(function () {
                                    window.top.location = "landing.html"
                                }, 1000)
                            }
                        }
                    })
                })
                goodscroll() // 上拉显示更多
                function goodscroll(){
                    var screenheight = $('body').height();
                    var scroll_com = $(".pro_up")[0].offsetTop;
                    document.querySelector('.pro_content-scroll').addEventListener('scroll', function (e) {
                        console.log(scroll.y)
                        if((screenheight - scroll.y) > scroll_com){
                            setTimeout(function () {
                                $('.product_new').show()
                                $(".pro_up").hide()
                            },700)
                        }else if( scroll_com < screenheight){
                            setTimeout(function () {
                                $('.product_new').show()
                                $(".pro_up").hide()
                            },700)
                        }
                    })
                }
                //收藏

                var data2 = {
                    userid: userid,
                    collectiontype: data.result.goods.categorycode,
                    useraccount: 'feifei',
                    collectioncontent: data.result.goods.barcode,
                    contentname: data.result.goods.commodityname,
                    contentpicture: com_arr,
                    contentprice: data.result.goods.buyprice,
                    access_code: access_code
                }
                $('.collect').on('tap', function () {
                    if (access_code) {
                        $this = $(this);
                        $this.toggleClass('now');
                        if ($('.collect').hasClass('now')) {
                            $.ajax({
                                type: 'get',
                                url: url + '/api/api-bin/wjcm/collect/shop/collect.action?shopcode=10000000',
                                data: data2,
                                success: function (data) {
                                    if (data.success == 1) {
                                        //console.log(data);
                                        mui.toast('添加成功')
                                    } else {
                                        mui.toast('添加失败')
                                    }
                                },
                                error: function () {
                                    mui.toast('网络错误，请重新进行操作')
                                }
                            })
                        } else {
                            $.ajax({
                                type: 'get',
                                url: url + '/api/api-bin/wjcm/collect/shop/deleteUserCollection.action',
                                data: {
                                    userid: userid,
                                    collectioncontent: data.result.goods.barcode,
                                    access_code: access_code
                                },
                                success: function (data) {
                                    //console.log(data);
                                    if (data.success == 1) {
                                        mui.toast('已取消收藏')
                                    } else {
                                        mui.toast('取消收藏失败')

                                    }
                                },
                                error: function () {
                                    mui.toast('网络错误，请重新进行操作')
                                }
                            })
                        }
                    }
                    else {
                        mui.toast('你没有登陆')
                        setTimeout(function () {
                            window.top.location = "landing.html"
                        }, 1000)
                    }
                })
                history()
                function history() {
                    var data3 = {
                        userid: userid,
                        historytype: data.result.goods.categorycode,
                        useraccount: 'feifei',
                        historycontent: data.result.goods.barcode,
                        contentname: data.result.goods.commodityname,
                        contentpicture: com_arr,
                        contentprice: data.result.goods.buyprice,
                        access_code: access_code
                    }
                    //console.log(data3);
                    $.ajax({
                        type: 'get',
                        url: url + '/api/api-bin/wjcm/history/shop/insertBrowsingHistory.action?shopcode=10000000',
                        data: data3,
                        success: function (data) {

                        }
                    })
                }
            }
        }
    })
    //评论按键
    $('body').on('tap', '.pro_header h4', function () {
        $(this).addClass('on').siblings().removeClass('on')
    })
    $('body').on('tap', '.pro_header_h1', function () {
        $(this).parents().siblings('.pro_content').show().siblings('.pro_comment_content').hide()
    })
    $('body').on('tap', '.pingjia', function () {
        $('.pro_content').hide()
        $('.pro_comment_content').show()
        $('.pro_header_h1').removeClass('on')
        $('.pro_header_h2').addClass('on')
        $('.pro_header').show()
    })
    $('body').on('tap', '.pro_header_h2', function () {
        $(this).parents().siblings('.pro_comment_content').show().siblings('.pro_content').show();
        rendercomment();
    })
    $('body').on('tap', '.pro_href_cart', function () {
        openWindow("cart.html");
    })
    //评论表头
    function rendercomment() {
        var thisgoods = [];
        var barcode = tools.getParam('key');
        var pageApp = 1;
        $.ajax({
            url: url + '/api/api-bin/wjcm/entry/datalist/queryGoodsComment.action',
            data: {
                barcode: barcode,
                pageApp: pageApp,
            },
            success: function (data) {
                //console.log(data)
                if (data.success == 1) {
                    thisgoods = thisgoods.concat(data.result.queryGoodsComment)
                    $('.comment_length').text(thisgoods.length || 0)
                    var html = '';
                    var html1 = '';
                    if (thisgoods.length == 0) {
                        html += ' <p>此商品暂时没有评论</p> '
                    } else {
                        for (var i = 0; i < thisgoods.length; i++) {
                            html += '<li style="border-bottom: 1px solid #f5f5f5">'
                            html += '<div class="mui-table-view-cell mui-media">'
                            html += '<img class="mui-media-object mui-pull-left" src="../images/user.png" style="margin-right: 5px;width: 30px;height: 30px;">'
                            html += '<div class="mui-media-body">'
                            html += '<span style="font-size: 15px;">' + thisgoods[i].username + '</span>'
                            if (thisgoods[i].goodsrank == 1) {
                                html += '<span  class="raty pro_time">'
                                html += '<img src="new_star2.png" alt="1" title="bad">'
                                html += '<img src="new_star.png" alt="2" title="poor">'
                                html += '<img src="new_star.png" alt="3" title="regular">'
                                html += '<img src="new_star.png" alt="4" title="good">'
                                html += '<img src="new_star.png" alt="5" title="gorgeous">'
                                html += '</span>'
                            }
                            else if (thisgoods[i].goodsrank == 2) {
                                html += '<span  class="raty pro_time">'
                                html += '<img src="new_star2.png" alt="1" title="bad">'
                                html += '<img src="new_star2.png" alt="2" title="poor">'
                                html += '<img src="new_star.png" alt="3" title="regular">'
                                html += '<img src="new_star.png" alt="4" title="good">'
                                html += '<img src="new_star.png" alt="5" title="gorgeous">'
                                html += '</span>'
                            }
                            else if (thisgoods[i].goodsrank == 3) {
                                html += '<span  class="raty pro_time">'
                                html += '<img src="new_star2.png" alt="1" title="bad">'
                                html += '<img src="new_star2.png" alt="2" title="poor">'
                                html += '<img src="new_star2.png" alt="3" title="regular">'
                                html += '<img src="new_star.png" alt="4" title="good">'
                                html += '<img src="new_star.png" alt="5" title="gorgeous">'
                                html += '</span>'
                            }
                            else if (thisgoods[i].goodsrank == 4) {
                                html += '<span  class="raty pro_time">'
                                html += '<img src="new_star2.png" alt="1" title="bad">'
                                html += '<img src="new_star2.png" alt="2" title="poor">'
                                html += '<img src="new_star2.png" alt="3" title="regular">'
                                html += '<img src="new_star2.png" alt="4" title="good">'
                                html += '<img src="new_star.png" alt="5" title="gorgeous">'
                                html += '</span>'
                            }
                            else if (thisgoods[i].goodsrank == 5) {
                                html += '<span  class="raty pro_time">'
                                html += '<img src="new_star2.png" alt="1" title="bad">'
                                html += '<img src="new_star2.png" alt="2" title="poor">'
                                html += '<img src="new_star2.png" alt="3" title="regular">'
                                html += '<img src="new_star2.png" alt="4" title="good">'
                                html += '<img src="new_star2.png" alt="5" title="gorgeous">'
                                html += '</span>'
                            }
                            html += '<p style="font-size: 12px;">' + thisgoods[i].createtime.substr(0, 11) + '</p>'
                            html += '</div>'
                            html += '<div class="cnt_content">'
                            html += '<p style="color:black">' + thisgoods[i].content + '</p>'
                            html += '</div>'
                            html += '</div>'
                            html += '</li>'
                        }
                        if (data.result.queryGoodsComment.length == 0) {
                            html += ' <p>此商品暂时没有评论</p> '
                        } else if (data.result.queryGoodsComment.length > 0) {
                            for (var i = 0; i < 1; i++) {
                                html1 += '<li>'
                                html1 += '<div class="mui-table-view-cell mui-media">'
                                html1 += '<img class="mui-media-object mui-pull-left" src="../images/user.png" style="margin-right: 5px;width: 30px;height: 30px;">'
                                html1 += '<div class="mui-media-body">'
                                html1 += '<span style="font-size: 15px;">' + data.result.queryGoodsComment[i].username + '</span>'
                                if (data.result.queryGoodsComment[i].goodsrank == 1) {
                                    html1 += '<span  class="raty pro_time">'
                                    html1 += '<img src="new_star2.png" alt="1" title="bad">'
                                    html1 += '<img src="new_star.png" alt="2" title="poor">'
                                    html1 += '<img src="new_star.png" alt="3" title="regular">'
                                    html1 += '<img src="new_star.png" alt="4" title="good">'
                                    html1 += '<img src="new_star.png" alt="5" title="gorgeous">'
                                    html1 += '</span>'
                                }
                                else if (data.result.queryGoodsComment[i].goodsrank == 2) {
                                    html1 += '<span  class="raty pro_time">'
                                    html1 += '<img src="new_star2.png" alt="1" title="bad">'
                                    html1 += '<img src="new_star2.png" alt="2" title="poor">'
                                    html1 += '<img src="new_star.png" alt="3" title="regular">'
                                    html1 += '<img src="new_star.png" alt="4" title="good">'
                                    html1 += '<img src="new_star.png" alt="5" title="gorgeous">'
                                    html1 += '</span>'
                                }
                                else if (data.result.queryGoodsComment[i].goodsrank == 3) {
                                    html1 += '<span  class="raty pro_time">'
                                    html1 += '<img src="new_star2.png" alt="1" title="bad">'
                                    html1 += '<img src="new_star2.png" alt="2" title="poor">'
                                    html1 += '<img src="new_star2.png" alt="3" title="regular">'
                                    html1 += '<img src="new_star.png" alt="4" title="good">'
                                    html1 += '<img src="new_star.png" alt="5" title="gorgeous">'
                                    html1 += '</span>'
                                }
                                else if (data.result.queryGoodsComment[i].goodsrank == 4) {
                                    html1 += '<span  class="raty pro_time">'
                                    html1 += '<img src="new_star2.png" alt="1" title="bad">'
                                    html1 += '<img src="new_star2.png" alt="2" title="poor">'
                                    html1 += '<img src="new_star2.png" alt="3" title="regular">'
                                    html1 += '<img src="new_star2.png" alt="4" title="good">'
                                    html1 += '<img src="new_star.png" alt="5" title="gorgeous">'
                                    html1 += '</span>'
                                }
                                else if (data.result.queryGoodsComment[i].goodsrank == 5) {
                                    html1 += '<span  class="raty pro_time">'
                                    html1 += '<img src="new_star2.png" alt="1" title="bad">'
                                    html1 += '<img src="new_star2.png" alt="2" title="poor">'
                                    html1 += '<img src="new_star2.png" alt="3" title="regular">'
                                    html1 += '<img src="new_star2.png" alt="4" title="good">'
                                    html1 += '<img src="new_star2.png" alt="5" title="gorgeous">'
                                    html1 += '</span>'
                                }
                                html1 += '<p style="font-size: 12px;">' + thisgoods[i].createtime.substr(0, 11) + '</p>'
                                html1 += '</div>'
                                html1 += '<div class="cnt_content">'
                                html1 += '<p style="color:black">' + data.result.queryGoodsComment[i].content + '</p>'
                                html1 += '</div>'
                                html1 += '</div>'
                                html1 += '</li>'
                            }
                        }

                    }
                    $('.pro_comment_list').html(html1)
                    $('.comment_list').html(html)
                }
            }
        })
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false//去除滚动条
        });
        mui.init({
            swipeBack: false,
            pullRefresh: {
                container: '#pro_pull',
                //down: {
                //    callback: pulldownRefresh
                //},
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        //function pulldownRefresh() {
        //    setTimeout(function () {
        //        mui('#pro_pull').pullRefresh().endPulldownToRefresh();
        //        //rendercomment()
        //    }, 700)
        //}
        function pullupRefresh() {
            setTimeout(function () {
                mui('#pro_pull').pullRefresh().endPullupToRefresh();
                pageApp++
                rendercomment()
            }, 700)
        }
    }

})