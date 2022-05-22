const mongoose = require('mongoose');//mongoose import
const bcrypt = require('bcrypt');//bcrypt import 
const saltRounds = 10;//bcrypt 길이 지정하는거
var jwt = require('jsonwebtoken'); //jsonwebtoken import

const userSchema = mongoose.Schema({//db schema 설정
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

// 비밀번호 암호화
userSchema.pre( 'save', function(next){//pre메소드는 'save' 하기 전에 function을 수행
    
    let user = this;//this == userSchema를 가리키는거

    if(user.isModified('password')){//model안의 field에서 password가 바뀌면 실행
        bcrypt.genSalt(saltRounds,function(err,salt){//salt 생성
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){//암호화
                if(err) return next(err);
    
                user.password = hash;
                next();
            })
        })
    }else{//비밀번호 저장말고 다른거일때
        next();
    }
    
    
})

//Compare Password
userSchema.methods.comparePassword = function(plainPassword, cb){//plainPassword랑 callback 함수를 넣는다.
    //plainPassword, db password(암호화된 애)를 비교해야됨, 그러려면 plainPassword를 암호화해서 db password랑 같은지 확인하면 된다.
    bcrypt.compare(plainPassword,this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)//err = null, isMatch=true 이렇게 감
    })
}

//Generate Token 
userSchema.methods.generateToken = function(cb){
    var user = this;
    console.log(user);
    var token = jwt.sign(user._id.toHexString(), 'secretToken');//sign이라는 method로 토큰을 만들면 됨, _id는 mongodb에 저장되어있는 값임(아마 db에 저장하면 저렇게 뜰 듯)

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null, user);
    })
}

//Find By Token
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    //token decode
    // user._id + '' = token;
    jwt.verify(token,'secretToken',function(err,decode){
        user.findOne({"_id":decode, "token":token}, function(err,user){
            if(err) return cb(err);
            cb(null, user);
        })
    });
}


const User = mongoose.model('User',userSchema);//모델 설정

module.exports = { User }//이 모델을 다른 곳에서 사용할 수 있게 export해준다.