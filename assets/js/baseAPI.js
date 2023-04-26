$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007' + options.url;
    // console.log(options.url);
    //统一为有权限的接口设置请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token')|| ''
        }
    }

    //全局统一挂载回调函数 complete
    options.complete = function(res){
        // console.log(res);
        //responseJSON responseJSON: {status: 1, message: '身份认证失败！'}
        if(res.responseJSON.status === 1 && res.responseJSON.message==='身份认证失败！'){
            //强制情况token
            localStorage.removeItem('token');
            //强制跳转
            location.href = '/login.html';
        }
    }
    
})