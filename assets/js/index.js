$(function(){
    //调用用户基本信息
    getUserInfo();


    var layer = layui.layer;
    $('#btnLogout').on('click',function(){
        // console.log('ok');
        //提示用户是否确认退出
        layer.confirm('是否退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            //情况token
            localStorage.removeItem('token');
            //跳转登录页面
            location.href = '/login.html';
            //关闭询问框
            layer.close(index);
          })
    })

})

//获取用户基本的信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
      /*   headers:{
           Authorization: localStorage.getItem('token')|| ''
        }, */
        success:function(res){
            // console.log(res);
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }
            //调用渲染用户的头像
            renderAvatar(res.data);
        },
        //无论失败或者成功都会调这个函数
        /* complete:function(res){
            // console.log(res);
            //responseJSON responseJSON: {status: 1, message: '身份认证失败！'}
            if(res.responseJSON.status === 1 && res.responseJSON.message==='身份认证失败！'){
                //强制情况token
                localStorage.removeItem('token');
                //强制跳转
                location.href = '/login.html';
            }
        } */
    })
}

//渲染用户的头像
function renderAvatar(user){
    // 获取用户的名称
    var name = user.nickname || user.username;
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
    //按需渲染用户的头像
    if(user.user_pic !== null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}