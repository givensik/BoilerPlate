const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name :{
        type : String,
        maxlength : 50
    },
    email:{
        type: String,
        trim : true, // 입력된값의 공백을 지워즌ㄴ 애
        unique : 1
    },
    lastname:{
        type : String
    },
    role:{
        type:Number,
        default : 0
    },
    image:String, // 이렇게 할수도 있다.
    token:{
        type : String
    },
    tokenExp:{
        type : Number

    }
})

const User = mongoose.model('User',userSchema);//모델 설정

module.exports = { User }//이 모델을 다른 곳에서 사용할 수 있게 export해준다.