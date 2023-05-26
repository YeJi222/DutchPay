module.exports = {
    isOwner:function(request, response){ // 로그인 상태인지 확인하는 모듈
        // console.log('user: ', request.user);
        if(request.user){ // 로그인되어 있으면 user 객체가 있음
            return true;
        } else{
            return false;
        }
    },
    statusUI:function(request, response){ // 로그인 상태를 나타내주는 모듈
        var authStatusUI = 'Hello :)';

        if(this.isOwner(request, response)){
            authStatusUI = `ID: ${request.user.id} | <a href="/auth/logout">logout</a>`;
        }
    
        return authStatusUI;
    }
}