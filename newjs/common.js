//初始化滚动效果
//轮播图效果
$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false,//去除滚动条
        start:98 + '%'
    });
})
var url = 'http://mall.yanyuan666.com'
function fast() {
    FastClick.attach(document.body);
}

//下拉刷新
var tools = {
//获取地址栏中所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        search = decodeURI(search)
        //console.log(search)
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
            location.href = "login.html";
        }
    }
}
//webview跳转优化
$('body').on('click','.back', function () {
    openWindow(history.back(-1))
})
function openWindow(url){
    mui.openWindow({
        url:url,
        id:'12312',
        styles:{
            top:'0',//新页面顶部位置
            bottom:'0',//新页面底部位置
            width:'100%',//新页面宽度，默认为100%
            height:'100%',//新页面高度，默认为100%
        },
        extras:{
            //自定义扩展参数，可以用来处理页面间传值
        },
        createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
        show:{
            autoShow:true,//页面loaded事件发生后自动显示，默认为true
            aniShow:'slide-in-right',//页面显示动画，默认为”slide-in-right“；
            duration:'200000000'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
        },
        waiting:{
            autoShow:true,//自动显示等待框，默认为true
            title:'正在加载...',//等待对话框上显示的提示内容
            options:{
                //width:,//等待框背景区域宽度，默认根据内容自动计算合适宽度
                //    height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
            }
        }
    })
}
//登陆
function login() {
    $('.d_denglu').on('click', function () {
        var phonenum = $(".d_phone").val();
        var yzm = $('.d_yzm').val()
        //var vericode =  $(".d_pass").val();
        //var password = $('.d_pass').val()
        if (phonenum.toString().length != 11) {
            mui.toast('请填写正确的手机号')
            return false
        }
        $.ajax({
            type: 'post',
            url: url + '/api/api-bin/wyy/entry/userLogin.action',
            data: {
                phonenumber: phonenum,
                yzm: yzm,
                deviceid: '1111',
                type: 2
            },
            success: function (data) {
                console.log(data);
                if (data.success == 1) {
                    localStorage.setItem('user', data.result.access_code);
                    localStorage.setItem('userid', data.result.user_info.userid);
                    localStorage.setItem('username', data.result.user_info.nickname);
                    localStorage.setItem('portraiturl', data.result.user_info.portraiturl);
                    mui.toast('登陆成功')
                    setTimeout(function () {
                        openWindow("index.html")
                    }, 500)
                } else {
                    mui.toast('密码或者手机号输入错误')
                }
            },
            error: function () {
                mui.toast('网络错误，请稍后再试')
            }
        })
    })
    $('.d_login').on('click', function () {
        openWindow("login.html")
    })
}
function refreshPage() {
    var sessionStorage = window.sessionStorage;
    var index = location.href.lastIndexOf("/");
    if (index != -1) {
        var href = location.href.substring(index + 1);
        sessionStorage.setItem("refreshPage", href);
    }
}
//跳转页面
//更换地址
function site() {
    $('body').on('click', '.site_city', function () {
        console.log(1)
        var index = layer.open({
            type: 1
            ,
            index: 2
            ,
            content: "<div id='target' data-toggle='distpicker' style='display:flex; justify-content: space-between'>" +
            "<div style='display: flex;'>" +
            '<select data-province="选择省" class="province"></select>' +
            '<select data-city="选择市" class="city"></select>' +
            '<select data-district="选择区" class="area"></select>' +
            "</div>" +
            "<div style='width: 50px;'>" +
            '<span class="site_true" >确定</span>' +
            "</div>" +
            '</div>'
            ,
            anim: 'up'
            ,
            style: 'position:fixed; bottom:0; left:0; width: 100%; height: 400px; padding:10px 0; border:none;'
            ,
            success: function () {
                $("#target").distpicker('reset', true);
                $('#target').on('change', function () {
                    console.log(1)
                    cityval = $('.city').val();
                    console.log(cityval)
                    province = $('.province').val();
                    console.log(province)
                    area = $('.area').val();
                    console.log(area)
                    $('.site_city').val(province + ' ' + cityval + ' ' + area);
                })
                $('.site_true').on('click', function () {
                    layer.close(index);
                })
            }
        });
    })
}
function picker() {
    (function ($, doc) {
        var userPicker = new $.PopPicker();
        userPicker.setData([{
            text: '未收到货'
        }, {
            text: '已收到货'
        }
        ]);
        var showUserPickerButton = doc.getElementById('showUserPicker');
        var userResult = doc.getElementById('userResult');
        showUserPickerButton.addEventListener('tap', function (event) {
            console.log(1)
            userPicker.show(function (items) {
                console.log(items)
                userResult.innerText = items[0].text;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
//        退货原因
        var returnPicker = new $.PopPicker();
        returnPicker.setData([{
            text: '不喜欢/不想要'
        }, {
            text: '大小/尺寸/款式和商品描述不符'
        },
            {
                text: '未按约定时间发货'
            },
            {
                text: '商品错发、漏发'
            },
            {
                text: '商品质量问题'
            },
            {
                text: '收到商品与描述不符'
            },
            {
                text: '7天无理由退货'
            },
        ]);
        var order_cause = doc.getElementById('order_cause');
        var causerResult = doc.getElementById('causerResult');
        order_cause.addEventListener('tap', function (event) {
            console.log(1)
            returnPicker.show(function (items) {
                console.log(items)
                causerResult.innerText = items[0].text;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
    }(mui, document))
}
//订单
var order = {
    //评论
    comment: function () {
        $('body').on('tap', '.go_comment', function () {
            var barcode = $(this).data('barcode');
            var orderid = $(this).data('orderid');
            var pic = $(this).data('pic');
            var name = $(this).data('name');
            openWindow("comment.html?key=" + barcode + "&order=" + orderid + '&pic=' + pic + '&name=' + name);
        })
    },
    //支付
    pay: function () {
        $('body').on('click', '.pay', function () {
            var ordersn = $(this).data('ordersn');
            var total = $(this).data('total');
            var goodsname = $(this).data('goodsname');
            openWindow('order_pay.html?key=' + ordersn + '&price=' + total + '&goodsname=' + goodsname);
        })
    },
    //关闭订单
    closeorder: function (userid, access_code) {
        $('body').on('tap', '.remover_order', function () {
            var orderid = $(this).data('id');
            console.log(orderid)
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/deleteOrdersDetails.action',
                data: {
                    userid: userid,
                    orderid: orderid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        mui.toast('操作成功')
                        var hash = window.location.hash.replace(/#/g, "");
                        if(hash == 'dfk'){
                            setTimeout(function () {
                                dfk()
                            }, 200)
                        }else{
                            setTimeout(function () {
                                openWindow('allorder.html');
                            }, 200)
                        }

                    }
                }
            })
        })
    },
    //物流
    express: function () {
        $('body').on('click', '.exp_info', function () {
            var shipsn = $(this).data('shipsn');
            var shipcode = $(this).data('shipcode');
            var ordersn = $(this).data('ordersn');
            var shippingname = $(this).data('shippingname')
            openWindow("express.html?shipsn=" + shipsn + "&shipcode=" + shipcode + "&ordersn=" + ordersn + "&shippingname=" + shippingname);
        })
    },
    //退货
    returngoods: function () {
        $('body').on('click', '.returnGoods', function (e) {
            e.stopPropagation()
        })
    },
    //确认收货
    truesh: function (access_code) {
        $('body').on('click', '.true_goods', function () {
            var orderid = $(this).data('id');
            var btnArray = ['否', '是'];
            mui.confirm('确认收货吗？', '', btnArray, function (e) {
                if (e.index == 1) {
                    $.ajax({
                        url: url + '/api/api-bin/wjcm/datalist/orderConfirmReceipt.action',
                        data: {
                            orderid: orderid,
                            access_code: access_code
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.success == 1) {
                                setTimeout(function () {
                                    dsh()
                                }, 200)
                                mui.toast('已确认收货')
                            }
                        }
                    })
                } else {

                }
            })
        });
    }
}

//尾部tab跳转


