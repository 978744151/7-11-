$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        var pageApp = 1;
        var thisgoods = [];
        var flag;
        render()
        upatecheck()
        updatechange()
        collect_skip()
        delCollect()
    }
    function render() {
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/collect/shop/querycollect.action?shopcode=10000000',
            data: {
                userid: userid,
                pageApp: pageApp,
                access_code: access_code
            },
            success: function (data) {
                console.log(data)
                if (data.success == 1) {
                    thisgoods = thisgoods.concat(data.result.record)
                    console.log(thisgoods);
                    var html = "";
                    if (thisgoods.length == 0) {
                        html += "<p style='margin-left: 10px; margin-top: 10px;'>没有收藏记录</p>"
                    }
                    for (var i = 0; i < thisgoods.length; i++) {
                        html += "<div class='goods-item'>"
                        html += "<div class='collect_checked'>"
                        html += '<span class="mui-input-row mui-checkbox mui-right">'
                        html += '<input name="checkbox" type="checkbox" class="collect_ck" data-id="' + thisgoods[i].collectioncontent + '">'
                        html += '</span>'
                        html += "</div>"
                        html += '<div class="goods_item_img" data-id="' + thisgoods[i].collectioncontent + '">'
                        html += '<img src="https://wojianshop.oss-cn-shanghai.aliyuncs.com/' + thisgoods[i].contentpicture + '" >'
                        html += "</div>"
                        html += "<div class='goods_item_p'>"
                        html += "<p>" + thisgoods[i].contentname + "</p>"
                        html += "</div>"
                        html += "<div class='goods_item_span'>"
                        html += "<span>包邮</span>"
                        //html+= "<span>推荐</span>"
                        //html+= "<span>新品</span>"
                        html += "</div>"
                        html += "<div class='goods_item_price'>"
                        html += "<span><span style='color: #4038a9; font-size: 14px;'>￥" + thisgoods[i].contentprice + "</del></span></span>"
                        //html += "<span style='font-size: 12px;margin-top: 2px;'>" + parseInt(thisgoods[i].totalsale) + "购买</span>"
                        html += "</div>"
                        html += "</div>"
                    }
                    $('.goods-list').html(html);
                }
                else if (data.success == 0) {
                    mui.toast('请重新登陆')
                    setTimeout(function () {
                        window.top.location = "landing.html"
                    }, 1000)
                }
                else {
                    mui.toast('加载失败，稍后进行操作')
                }
            },
            error: function () {
                mui.toast('加载失败，稍后进行操作')
            }
        })
    }
    $('body').on('tap','.goods_item_img', function () {
        var id = $(this).data('id');
        window.location.href = "product.html?key="+id
    })
    mui.init({
        swipeBack: false,
        pullRefresh: {
            container: '#pull',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                //auto : true,
                height: 100,
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了',
                callback: pullupRefresh
            }
        }
    });
    function pullupRefresh() {
        setTimeout(function () {
            mui('#pull').pullRefresh().endPullupToRefresh();
            pageApp++;
            render();
            setTimeout(function () {
                console.log(flag)
                if (flag == true) {
                    $('.collect_checked').show();
                } else {
                    $('.collect_checked').hide();
                }
            }, 50)
        }, 700)
    }

    function collect_skip() {
        $('.cart_bianji').on('tap', function () {
            flag = true
            $('.collect_checked').show();
            $('.cart_header_true').show()
            $('.cart_bianji').hide()
            $('.collect_footer').show()
        })
        $('.cart_header_true').on('tap', function () {
            flag = false
            $('.collect_checked').hide();
            $('.cart_header_true').hide()
            $('.cart_bianji').show()
            $('.collect_footer').hide()
        })
    }

    //删除
    function delCollect() {
        $('.cart_settle').on('tap', function () {
            var dellist = [];
            $(".collect_ck:checked").each(function (i, e) {
                dellist.push($(this).data('id'));
            })
            $.ajax({
                url: url + '/api/api-bin/wjcm/collect/shop/deleteUserCollection.action',
                data: {
                    collectioncontent: dellist + '',
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        mui.toast('删除成功');
                        setTimeout(function () {
                            window.location.href = location.href
                        }, 1000)
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

    function upatecheck() {
        $('body').on('change', '.collect_ck', function () {
            var ck_length = $(".collect_ck:checked").length;
            console.log(ck_length)
            var checked = $(".collect_ck").length;

            if (ck_length == checked) {
                $('.foot_ck').prop("checked", true);
            } else {
                $('.foot_ck').prop("checked", false);
            }
        })
    }

    function updatechange() {
        $('.foot_ck').on('change', function () {
            if ($(this).prop('checked')) {
                $('.collect_ck').prop("checked", true);
            } else {
                $('.collect_ck').prop("checked", false);
            }
        })
    }
})