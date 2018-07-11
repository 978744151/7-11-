$(function () {
    fast()
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    console.log(access_code)
    if (access_code) {
        site()
        $('.sitesave').on('click', function () {
            var site_city = $('.site_city').val();
            var Indetail = $('.Indetail').val();
            var siteName = $('.siteName').val();
            var number = $('.site_number').val()
            var index = $('.side_ck').is(":checked") ? 0 : 1;
            var data = {
                userid: userid,
                consignee: siteName,
                country: '中国',
                provincialurbanarea: site_city+'',
                address: Indetail,
                mobile: number,
                isdefault: index,
                access_code: access_code
            }
            console.log(data)
            if (!Indetail.trim()) {
                mui.toast('请输入地址')
                return false
            }
            if (!siteName.trim()) {
                mui.toast('请输入姓名')
                return false
            }
            if (!number.trim()) {
                mui.toast('请输入正确手机号')
                return false
            }
            $.ajax({
                type: 'post',
                url: url + '/api/api-bin/wjcm/datalist/addUserAddressInformation.action',
                data: data,
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        self.location = document.referrer
                        //location.href = "querysite.html?retUrl="+location.href;
                    }
                    else if (data.success == 0) {
                        mui.toast('请重新登陆')
                        setTimeout(function () {
                            window.top.location = "landing.html"
                        }, 1000)
                    } else {
                        mui.toast(data.errmsg)
                    }
                },
                error: function () {
                    mui.toast('请稍后再试')
                }
            })
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})




