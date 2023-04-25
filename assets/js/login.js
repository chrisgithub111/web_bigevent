$(function(){
    //点击去注册账号
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();

    })

    //点击去登录的链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();

    })
    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify() 函数定义检验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        //检验两次密码是否一致的规则
        repwd:function(value){
           var pwd =  $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次密码不一致';
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        var data ={usename: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()};
        $.post('/api/reguser',data,function(res){
            if(res.status !==0){
                // return console.log(res.message);
                layer.msg(res.message);
            }
            // console.log('注册成功');
            layer.msg('注册成功');
            //模拟点击行为
            $('#link_login').click();
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                // console.log(res.token);
                //保存token
                localStorage.setItem('token',res.token);
                //跳到主页
                location.href ='/index.html';
            }
        })
    })

})