setTimeout(function () {
    //$('.search_text').focus();
    if ($('.search_text').autofocus != true) {
        $('.search_text').focus();
    }
}, 300)
$(function () {
    document.getElementById("confirmBtn").addEventListener('tap', function () {
        var btnArray = ['否', '是'];
        mui.confirm('确认清空搜索记录吗？', '', btnArray, function (e) {
            if (e.index == 1) {
//    清空item事件
                localStorage.removeItem('history')
                render()
                mui.toast('清空成功')
            } else {

            }
        })
    });
//    模糊查询
    $('.search_text').on('keyup', function () {
        var inpuVal = $('.search_text').val().trim()
        if (inpuVal == '') {
            $('.query_list').html('');
        } else {
            $.ajax({
                url: url + '/api/api-bin/wjcm/entry/datalist/queryLikeGoods.action',
                data: {
                    name: inpuVal
                },
                success: function (data) {
                    var html = '';
                    if (data.result.goods.length) {
                        console.log(data.result)
                        for (var i = 0; i < data.result.goods.length; i++) {
                            html += '<p>' + data.result.goods[i].commodityname + '</p>'
                        }
                    }
                    $('.query_list').html(html);
                }
            })
        }
    })
    $('body').on('tap', '.query_list p', function () {
        var key = $(this).text()
        window.top.location = "searchlist.html?key=" + key + '&time=' + ((new Date()).getTime());
    })
//删除单个事件
    $('body').on('tap', '.sear_btn', function () {
        var index = $(this).data('id')
        console.log(index)
        var result = getitem()
        result.splice(index, 1)
        localStorage.setItem('history', JSON.stringify(result));
        var html = template('tpl', {arr: result});
        $('.mui-table-view').html(html);
    })
    function getitem() {
        var result = localStorage.getItem('history') || '[]';
        result = JSON.parse(result);
        return result
    }

    function render() {
        var result = getitem();
        var html = template('tpl', {arr: result});
        $('.mui-table-view').html(html);
    }

    render()
//      软键盘搜索事件
    document.getElementById('search_from').onsubmit = function () {
        var result = getitem();
        var key = $('.search_text').val().trim();
        if (key === "") {
            mui.toast("请输入内容");
            return;
        }
        var index = result.indexOf(key)
        if (index > -1) {
            result.splice(index, 1)
        }
        if (result.length > 10) {
            result.pop()
        }
        result.unshift(key);
        localStorage.setItem('history', JSON.stringify(result));
        render()
        document.activeElement.blur();
        setInterval(function () {
            //$('#load').show()
        })
        setInterval(function () {
            window.top.location = "searchlist.html?key=" + key + '&time=' + ((new Date()).getTime());
        }, 500)
        $('.search_text').val('')
    }
//    confirm确认框
//    历史记录
    $('body').on('tap', '.sear_history', function () {
        $this = $(this)
        var val = $this.text()
        //setInterval(function () {
        //    $('#load').show()
        //})
        //setInterval(function () {
        window.top.location = "searchlist.html?key=" + val + '&time=' + ((new Date()).getTime());
        //},500)
        //setTimeout(function () {
        //    $('#load').hide()
        //},600)
    })
// 热门搜索
    $('.sear_span>span').on('tap', function () {
        $this = $(this)
        var val = $this.text()
        //setInterval(function () {
        //    $('#load').show()
        //})
        //setInterval(function () {
        window.top.location = "searchlist.html?key=" + val + '&time=' + ((new Date()).getTime());
        //},500)
        //setTimeout(function () {
        //    $('#load').hide()
        //},600)
    })

})
