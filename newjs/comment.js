$(function () {
    var tools = {
        getParamObj: function () {
            var obj = {};
            var search = location.search;
            search = search.slice(1);
            var arr = search.split("&");
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i].split("=")[0];
                var value = decodeURI(arr[i].split("=")[1]);
                obj[key] = value;
            }
            return obj;
        },
        getParam: function (key) {
            return this.getParamObj()[key];
        },
        checkLogin: function (data) {
            if (data.success != 1) {
                window.top.location = "login.html";
            }
        }
    }

    function errorMsg(msg) {
        var randomId = parseInt(Math.random() * 1000000 + 1);
        $('body').append("<div class='error_box' id='" + randomId + "'><span>" + msg + "</span></div>");
        $('#' + randomId).fadeIn(200);
        setTimeout(function () {
            $('#' + randomId).fadeOut(200);
        }, 1200);
    }

    var barcode = tools.getParam('key');
    var orderid = tools.getParam('order');
    var pic = tools.getParam('pic');
    var name = tools.getParam('name');
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    var username = localStorage.getItem('username');
    var portraiturl = localStorage.getItem('portraiturl');
    $('.com_name').html(name);
    $('.com_pic').attr('src', pic);
    //提醒项
    var url = 'http://mall.yanyuan666.com';
    //获取地址栏中所有的参数
    if (access_code) {
        $('.raty').raty({score: 5});
        function commentajax(date) {
            $.ajax({
                url: url + '/api/api-bin/wjcm/datalist/insertComment.action',
                data: date,
                success: function (data) {
                    console.log(data);
                    if (data.success == 1) {
                        errorMsg('感谢你的评价');
                        setTimeout(function () {
                            window.top.location = "user.html";
                        }, 300)
                    }else{
                        errorMsg(data.errmsg);
                    }
                },
                error: function () {
                    errorMsg('等待图片上传成功或请选择png格式的图片')
                    setTimeout(function () {
                        window.top.location = window.location.href;
                    }, 1200)
                }
            })
        }

        $('.comment_commit').on('click', function () {
            var goodsrank = $('.raty>input').val();
            //if($('textarea').val().trim() == false){
            //    errorMsg('请输入内容')
            //    return false
            //}
            var date = {
                barcode: barcode,
                orderid: orderid,
                userid: userid,
                username: username,
                content: $('textarea').val(),
                access_code: access_code,
                portraiturl: portraiturl,
                goodsrank: goodsrank,
                //img:$('.upfileimg').attr('src')
            }
            console.log(date)
            commentajax(date)
        })
    }
    else {
        errorMsg('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html";
        }, 1000)
    }
})