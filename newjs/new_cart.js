$(function () {
    //fast()
    console.log(1);
    //refreshPage();
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if(access_code){
        render();
        delcart();
        total();
        spaetrue();
        update();
        updatechange();
        upatecheck();
        skip();
        //页面渲染
        function render(){
            $.ajax({
                url: url + "/api/api-bin/wjcm/datalist/queryUserCarGoods.action",
                data:{
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    if(data.success == 1){
                        var html = template('tpl', data);
                        $('.cart_list').html(html);
                        mui('.mui-numbox').numbox();
                        $('.cart_all').text(' ')
                        $(':checked').prop('checked', false)

                        $('body').on('tap','.btn_edit,.cart_list_spec',function (e) {
                            console.log(1)
                            var barcode = $(this).data('id');
                            var morespec = $(this).data('morespec');
                            var cardid = $(this).data('cardid')
                            var goodsnum = $(this).data('number')
                            console.log(morespec)
                            console.log(barcode);
                            console.log(cardid);
                            console.log(goodsnum);
                            $.ajax({
                                type: 'get',
                                url: url + '/api/api-bin/wjcm/datalist/queryCarGoodsSpec.action',
                                data: {
                                    userid: userid,
                                    cartid: cardid,
                                    access_code: access_code
                                },
                                success:function (data){
                                    console.log(data)

                                    var layer = '';
                                    var layer_arr = [];
                                    for (k in data.defaultspec){
                                        layer_arr.push(data.defaultspec[k]);
                                    }
                                    console.log(layer_arr)
                                    if(morespec == 0) {
                                        var html1 = '';
                                        html1 += '<img src="../images/product.jpg" alt="" class="pro_image">'
                                        html1 += '<p>￥<span  class="cart_layer_price">' + data.defaultspec.price + '</span></p>'
                                        html1 += '<p>库存:<span class="storeage">' + data.defaultspec.storecount + '</span></p>'
                                        $('.pro_tpl2').html(html1);
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
                                        layer += '</div>';
                                        $('.pro_tpl1').html(layer);
                                        changespan()
                                        function changespan() {
                                            $('.layer').on('tap', 'span', function (e) {
                                                $(this).addClass('now').siblings().removeClass('now');
                                                var str_arr = [];
                                                for (var i = 0; i < $('span.now').length; i++) {
                                                    var str = $('span.now').eq(i).text();
                                                    str_arr.push(str);
                                                }
                                                str_arr = str_arr.join(',')//拼接规格参数
                                                console.log(str_arr)
                                                var pamas = {
                                                    keyname: str_arr,
                                                    barcode: barcode,
                                                }
                                                $.ajax({
                                                    type: 'get',
                                                    url: url + '/api/api-bin/wjcm/entry/datalist/querySpecPrice.action',
                                                    data: pamas,
                                                    success: function (data) {
                                                        console.log(data)
                                                        var html2 = '';
                                                        if (data.result.goodspec.price) {
                                                            console.log(true);
                                                            $('.cart_true').removeAttr('disabled', 'disabled');
                                                            html2 += '<img src="../images/product.jpg" alt="" class="pro_image">'
                                                            html2 += '<p>￥<span  class="cart_layer_price">' + data.result.goodspec.price + '</span></p>'
                                                            html2 += '<p>库存:<span class="storeage">' + data.result.goodspec.storecount + '</span></p>'
                                                        } else {
                                                            console.log(false);
                                                            $('.cart_true').attr('disabled', 'disabled');
                                                            html2 += '<img src="../images/product.jpg" alt="" class="pro_image"> '
                                                            html2 += '<p>￥<span  class="cart_layer_price">' + 0 + '</span></p>'
                                                            html2 += '<p>库存:<span class="storeage">缺货</span></p>'
                                                        }
                                                        $('.pro_tpl2').html(html2);

                                                        console.log(str_arr)
                                                        if (str_arr) {
                                                            $('.cart_true').data('str_arr', str_arr);
                                                        }
                                                        var storeage = $(".storeage").text();
                                                        console.log(storeage);
                                                        $('.cart_true').data('storeage', storeage);
                                                        var layer_price = $(".cart_layer_price").text();
                                                        $('.cart_true').data('layer_price', layer_price);
                                                        $('.cart_true').data('barcode', barcode);
                                                        $('.cart_true').data('cardid', cardid);
                                                        $('.cart_true').data('goodsnum', goodsnum);
                                                        $('.cart_true').data('layer_price', layer_price);
                                                        //if (storeage == 0) {
                                                        //    $('.cart_true').attr('disabled', 'disabled')
                                                        //} else {
                                                        //    $('.cart_true').removeAttr('disabled', 'disabled')
                                                        //}
                                                    },
                                                    error: function () {
                                                        mui.toast('网络错误，请重新进行操作');
                                                    }
                                                })
                                            })
                                        }
                                        $('.pro_layer').show();
                                        $('.pro_layer').animate({
                                            'bottom': 0
                                        }, 200)
                                        e.stopPropagation();
                                        $(document).one('tap', function () {
                                            //console.log(1)
                                            $('.pro_layer').animate({
                                                'bottom': -400
                                            }, function () {

                                            })
                                        })
                                        $('body').on('tap', '.pro_layer', function (e) {
                                            e.stopPropagation();
                                        })
                                        mui('.mui-scroll-wrapper').scroll({
                                            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                                        });
                                        mui('.mui-numbox').numbox();//数字初始化
                                    } else {
                                        mui.toast('没有更多规格哦')
                                    }
                                },
                                error: function () {
                                    mui.toast('加载失败，请重新操作');
                                }
                            })
                        })
                    } else if(data.success == 0){
                        mui.toast('请重新登陆')
                        setTimeout(function () {
                            window.top.location = "landing.html"
                        }, 1000)
                    }else {
                        mui.toast(data.errmsg);
                    }
                },
                error: function () {
                    mui.toast('加载失败，请重新操作');
                }
            })
        }
        mui.init({
            swipeBack: false,
            pullRefresh: {
                container: '#pull',
                down: {
                    callback: pulldownRefresh
                }
            }
        });
        function pulldownRefresh(){
            setTimeout(function () {
                mui('#pull').pullRefresh().endPulldownToRefresh();
                render()
            }, 700)
        }
        cart_click()
        //长按事件
        function cart_click() {
            var longClick = 0;
            var timeOutEvent;
            $("body").on('touchstart', '.cart_list_dan', function (e) {
                var $this = $(this);
                var cartid = $this.data('cartid');
                var id = $this.data('id')
                var cart_click = '';
                cart_click += "<div class='cart_mengceng_box'>";
                cart_click += "<span class='cart_delete' >删除</span>"
                cart_click += "<span class='cart_mengceng_com'>收藏</span>"
                cart_click += "</div>"
                $('.cart_mengceng').html(cart_click);
                $(".cart_delete").data('id', cartid)
                $('.cart_mengceng_com').data('barcode', id)
                longClick = 0;//设置初始为0
                timeOutEvent = setTimeout(function () {
                    console.log(timeOutEvent)
                    $(".cart_mengceng").show();
                    //此处为长按事件-----在此显示遮罩层及删除按钮
                    longClick = 1;
                }, 500);
                $(document).one('tap', function () {
                    $(".cart_mengceng").hide();
                })
            })
            $("body").on('touchmove', '.cart_list_dan', function (e) {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            })
            $("body").on('touchend', '.cart_list_dan', function (e) {
                clearTimeout(timeOutEvent);
            })
            $('body').on('tap', '.cart_mengceng_box', function (e) {
                e.stopPropagation()
            })
        }
        //删除购物车
        function delcart(){
            $('body').on('tap', '.btn_delete,.cart_delete', function () {
                var index = $(this).data('id');
                console.log(index);
                $.ajax({
                    type: 'get',
                    url: url + '/api/api-bin/wjcm/datalist/deleteUserCarGood.action',
                    data: {
                        userid: userid,
                        cartid: index,
                        access_code: access_code
                    },
                    success: function (data) {
                        if (data.success == 1) {
                            mui.toast('删除成功');
                            render();
                            $(".cart_mengceng").hide();
                        }
                    },
                    error: function () {
                        mui.toast('请稍后再试');
                    }
                })
            })
            //多选删除
            $('.cart_foot_del').on('tap', function () {
                var dellist = [];
                $(".ck:checked").each(function (i, e) {
                    dellist.push($(this).data('id'));
                })
                console.log(dellist.join(','))
                $.ajax({
                    url:url + '/api/api-bin/wjcm/datalist/deleteUserCarGood.action',
                    data:{
                        userid: userid,
                        cartid: dellist+'',
                        access_code: access_code
                    },
                    success: function (data) {
                        console.log(data)
                        if (data.success == 1) {
                            mui.toast('删除成功');
                            render();
                        }
                    },
                    error: function () {
                        mui.toast('请稍后再试');
                    }
                })
            })

        }
        collect()
        function collect() {
            //    多选收藏
            $('body').on('tap', '.cart_collect,.cart_mengceng_com', function () {
                var collectlist = [];
                var barcodelist = []
                $(".ck:checked").each(function (i, e) {
                    collectlist.push($(this).data('id'));
                    barcodelist.push($(this).data('barcode'));
                })
                var barcode = $(this).data('barcode')
                console.log(barcode)
                $.ajax({
                    url: url + '/api/api-bin/wjcm/collect/shop/addAllCollect.action?shopcode=10000000',
                    data: {
                        barcode: barcodelist + '' || barcode,
                        userId: userid,
                        access_code: access_code
                    },
                    success: function (data) {
                        //console.log(data)
                        if (data.success == 1) {
                            mui.toast('添加成功');
                            $(".cart_mengceng").hide();
                        } else {
                            mui.toast(data.errmsg);
                        }
                    },
                    error: function () {
                        mui.toast('请稍后再试');
                    }
                })
            })
        }
        // 计算总数
        function total(){
            var price = 0;
            $(".ck:checked").each(function (e, i) {
                var morespec = $(this).data('morespec')
                var specstorage = $(this).data('specstorage');
                var goodprice = $(this).data('price');
                var goodsnumber = $(this).parent().parent().find('.mui-numbox-input').val();
                var storage = $(this).data('storage')
                price += goodprice * goodsnumber
                if (morespec == 1) {
                    if (parseInt(goodsnumber) > parseInt(storage)) {
                        mui.toast('你所选的数量大于库存')
                        $('.cart_settle').attr('disabled', 'disabled')
                    } else {
                        $('.cart_settle').removeAttr('disabled', 'disabled')
                    }
                } else {
                    if (parseInt(goodsnumber) > parseInt(specstorage)) {
                        mui.toast('你所选的数量大于库存')
                        $('.cart_settle').attr('disabled', 'disabled')
                    } else {
                        $('.cart_settle').removeAttr('disabled', 'disabled')
                    }
                }

            })
            $('.cart_all').html(price.toFixed(2));
        }
        //规格确认
        function spaetrue(){
            var $that = $(this);
            $('.cart_true').on('tap', function () {
                var str_array = $(this).data('str_arr');
                var cardid = $(this).data('cardid');
                var goodsnum = $(this).data('goodsnum')
                var barcode = $(this).data('barcode')
                var data = {
                    barcode: barcode,
                    keyname: str_array,
                    userid: userid,
                    goodsnum: goodsnum,
                    cartid: cardid,
                    access_code: access_code
                }
                console.log(data)
                $.ajax({
                    url: url + '/api/api-bin/wjcm/datalist/updateCartSpec.action',
                    data: data,
                    success: function (data) {
                        if(data.success == 1){
                            render()
                        }
                    }
                })
                $('.pro_layer').animate({
                    'bottom': -420
                });
            })
        }
        //改变number
        function update(){
            $('body').on('change', '.mui-numbox-input', function () {
                var price = 0;
                var sku = $(this).data('stu')
                var index = $(this).data('id')
                var number = $(this).val()
                $.ajax({
                    type: 'get',
                    url: url + '/api/api-bin/wjcm/datalist/updateUserCarGoods.action',
                    data: {
                        userid: userid,
                        cartid: index,
                        goodsnum: number,
                        sku: sku,
                        access_code: access_code
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.success == 1) {
                            var price = 0;
                            $(".ck:checked").each(function (e, i) {
                                var morespec = $(this).data('morespec')
                                var specstorage = $(this).data('specstorage');
                                var goodprice = $(this).data('price');
                                var goodsnumber = $(this).parent().parent().find('.mui-numbox-input').val();
                                var storage = $(this).data('storage')
                                price += goodprice * goodsnumber
                                if (morespec == 1) {
                                    if (parseInt(goodsnumber) > parseInt(storage)) {
                                        mui.toast('你所选的数量大于库存')
                                        $('.cart_settle').attr('disabled', 'disabled')
                                        $(':checked').prop("checked", false)
                                    }else{
                                        $('.cart_settle').removeAttr('disabled', 'disabled')
                                    }
                                } else {
                                    if (parseInt(goodsnumber) > parseInt(specstorage)) {
                                        mui.toast('你所选的数量大于库存')
                                        $('.cart_settle').attr('disabled', 'disabled')
                                        $(':checked').prop("checked", false)
                                    }else{
                                        $('.cart_settle').removeAttr('disabled', 'disabled')
                                    }
                                }

                            })
                            $('.cart_all').html(price.toFixed(2));
                        }
                    },
                    error: function () {
                        mui.toast('请稍后再试');
                    }
                })
            })
        }
        //改变单个商品状态
        function upatecheck(){
            $('body').on('change', '.ck', function () {
                var ck_length = $(".ck:checked").length;
                console.log(ck_length)
                var checked = $(".ck").length;
                if (ck_length == checked) {
                    $('.foot_ck').prop("checked", true);
                } else {
                    $('.foot_ck').prop("checked", false);
                }
                total()
            })
        }
        //改变全选
        function updatechange(){
            $('.foot_ck').on('change', function () {
                if ($(this).prop('checked')) {
                    $('.ck').prop("checked", true);
                } else {
                    $('.ck').prop("checked", false);
                }
                var price = 0;
                $(".ck:checked").each(function (e, i) {
                    var morespec = $(this).data('morespec')
                    var specstorage = $(this).data('specstorage');
                    var goodprice = $(this).data('price');
                    var goodsnumber = $(this).parent().parent().find('.mui-numbox-input').val();
                    var storage = $(this).data('storage')
                    price += goodprice * goodsnumber
                    if (morespec == 1) {
                        if (parseInt(goodsnumber) > parseInt(storage)) {
                            mui.toast('你所选的数量大于库存')
                            $('.cart_settle').attr('disabled', 'disabled')
                        }
                    } else {
                        if (parseInt(goodsnumber) > parseInt(specstorage)) {
                            mui.toast('你所选的数量大于库存')
                            $('.cart_settle').attr('disabled', 'disabled')
                        }
                    }

                })
                $('.cart_all').html(price.toFixed(2));
            })
        }
        //跳转操作
        function skip(){
            $('.cart_bianji').on('tap', function () {
                $('.cart_bianji').hide();
                $('.cart_header_true').show();
                $('.cart_footer_one').hide();
                $('.cart_footer_two').show();
            })
            $('.cart_header_true').on('tap', function () {
                $('.cart_bianji').show();
                $('.cart_header_true').hide();
                $('.cart_footer_one').show();
                $('.cart_footer_two').hide();
            })
            $('body').on('tap', '.cart_img', function () {
                var index = $(this).data('id');
                window.top.location = 'product.html?key=' + index;
            })
            //结算
            $('body').on('tap', '.cart_settle', function () {
                if ($(".ck:checked").length == 0) {
                    mui.toast('亲,还没有选择商品哦')
                } else {
                    var checked_arr = [];
                    var checked_price = $('.cart_all').text()
                    for (var i = 0; i < $(".ck:checked").length; i++) {
                        var checked = $('.ck:checked').eq(i).data('id')
                        checked_arr.push(checked)
                    }
                    checked_arr = checked_arr.join(',')
                    console.log(checked_arr)
                    window.top.location = 'white_order.html?key=' + checked_arr + '&price=' + checked_price;
                }
            })


        }
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
    //删除购物车功能

})