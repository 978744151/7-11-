$(function () {
    var access_code = localStorage.getItem('user');
    var user_id = localStorage.getItem('userid');
    console.log(access_code);
    if (access_code) {
        render();
        collect_skip();
        upatecheck();
        updatechange();
        var flag;
        var pageApp = 1;
        var thisgoods = [];

        function render() {
            $.ajax({
                type: 'get',
                url: url + "/api/api-bin/wjcm/history/shop/queryBrowsingHistory.action",
                data: {
                    userid: user_id,
                    pageApp: pageApp,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        data.result.record.forEach(function (e) {
                            thisgoods.push(e);
                        })
                        var html = "";
                        if (thisgoods.length == 0) {
                            html += "<p style='margin-left: 10px; margin-top: 10px;'>没有浏览记录</p>";
                        }
                        else {
                            for (var i = 0; i < thisgoods.length; i++) {
                                html += '<div class="history_list" data-id="' + thisgoods[i].historycontent + '">';
                                html += '<span class="mui-input-row mui-checkbox hist_check" style="width: 35px;display: none">'
                                html += '<input name="checkbox" type="checkbox" class="history_ck" style="left: -2px;top: 33px;z-index: 99999;" data-id= "' + thisgoods[i].historycontent + '">'
                                html += '</span>'
                                html += '<div class="history_img">'
                                html += '<img src="https://wojianshop.oss-cn-shanghai.aliyuncs.com' + thisgoods[i].contentpicture + '" alt="" data-id= "' + thisgoods[i].historycontent + '">'
                                html += '</div>'
                                html += '<div class="history_info">'
                                html += '<p style="color: black;">' + thisgoods[i].contentname + '</p>'
                                html += '<div>'
                                html += '<span>&yen;' + thisgoods[i].contentprice + '</span>'
                                html += '<p>' + thisgoods[i].createtime + '</p>'
                                html += '</div>'
                                html += '</div>'
                                html += '</div>'
                            }
                        }
                        $('.history_box').html(html)
                    }
                    else if (data.success == 0) {
                        mui.toast('请重新登陆');
                        setTimeout(function () {
                            window.top.location = "landing.html";
                        }, 1000)
                    } else {
                        mui.toast(data.errmsg);
                    }
                },
                error: function () {
                    mui.toast('网络错误,请稍后再试');
                }
            })
        }

        function collect_skip() {
            $('.cart_bianji').on('tap', function () {
                flag = true;
                $('.hist_check').show();
                $('.cart_header_true').show();
                $('.cart_bianji').hide();
                $('.collect_footer').show();
            })
            $('.cart_header_true').on('tap', function () {
                flag = false
                $('.hist_check').hide();
                $('.cart_header_true').hide();
                $('.cart_bianji').show();
                $('.collect_footer').hide();
            })

        }

        function upatecheck() {
            $('body').on('change', '.history_ck', function () {
                var ck_length = $(".history_ck:checked").length;
                console.log(ck_length)
                var checked = $(".history_ck").length;

                if (ck_length == checked) {
                    $('.foot_ck').prop("checked", true);
                } else {
                    $('.foot_ck').prop("checked", false);
                }
            })
        }

        function updatechange() {
            $('.foot_ck').on('change', function () {
                console.log(1)
                if ($(this).prop('checked')) {
                    $('.history_ck').prop("checked", true);
                } else {
                    $('.history_ck').prop("checked", false);
                }
            })
        }

        $('body').on('tap', '.cart_settle', function () {
            var dellist = [];
            $(".history_ck:checked").each(function (i, e) {
                dellist.push($(this).data('id'));
            })
            dellist = dellist.join(',')
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/history/shop/deleteBrowsingHistory.action',
                data: {
                    userid: user_id,
                    historycontent: dellist + '',
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        mui.toast('删除成功')
                        setTimeout(function () {
                            window.top.location = location.href
                        }, 1000)
                    } else {
                        mui.toast('加载失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('网络错误,请稍后再试')
                }
            })

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
                pageApp++
                render()
                $('.foot_ck').prop("checked", false);
                $('.collect_footer').hide()
            }, 700)
        }
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})

$('body').on('tap', '.history_info', function () {
    var index = $(this).data('id')
    console.log(index);
    window.top.location = 'product.html?key=' + index;
})