const { User } = require('../models/User');

let auth = (req, res, next)=>{
    //인증처리
    //client cookie를 가져오기
    let token = req.cookies.x_auth;
    //쿠키를 복호화(method만들기) -> db의 user._id랑 비교해서 user 찾기
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})

        req.token = token ;
        req.user = user ;
        next();//next()를 해야 middleware에서 넘어감
    });
    //user가 있으면 인증 ok. 
    
}

module.exports = {auth};