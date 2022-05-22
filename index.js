//index.js
const express = require('express') //express module 가져오기
const app = express() // 새로운 express 앱을 express()로 만들기
const port = 3000 // 포트번호

//config import
const config = require('./config/key');

//cookieParser import
const cookieParser = require('cookie-parser');

//MongoDB Connection
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(()=>console.log("MongoDB connected")).catch(err=>console.log("Error!"))
//'mongodb+srv://givensik:wnstlr4268@youtubeclone.d1lys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//model import

//import User models
const { User } = require('./models/User'); 


//import middleware
const {auth} = require('./middleware/auth');


//body-parser -> client가 보내는 정보를 서버가 분석해서 가져올 수 있게 해주는 어플리케이션

//app.use(bodyParser.urlencoded);//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는거
//app.use(bodyParser.json);//application/json 이렇게 된 데이터를 분석해서 가져올 수 있게해줌

// express가 업데이트 되어서 bodyParser는 안써도 된다함.
// 아래꺼로 대체
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));

//use cookie Parser
app.use(cookieParser());

// route '/'
app.get('/', (req, res) => res.send('Hello World!'))// root directory('/')에 오면 저거 출력

// route '/register'

app.post('/api/users/register', (req, res)=>{
    const user = new User(req.body); // Make New instance -> JSON 파일 형식으로 들어옴
    //회원가입을 위한 정보들을 Client에서 가져오면, 그것들을 데이터 베이스에 넣어준다.
    // req.body에는 json 형식으로 
    // {
    //     id : 'givensik',
    //     pw : '1234'
    // }
    // 이런 데이터가 들어가 있는거임 근데 이렇게 req.body에 들어갈 수 있게 해주는게 body-parser이다.
    user.save((err, doc)=> {//user.save -> mongodb의 메소드
             if(err){
                return res.json({success : false, err})//에러가 나면 success : false라는 성공 못했다는 json파일이랑, err를 보냄
            }
            return res.status(200).json({success:true})
    }); 
            
})

//route '/login'
app.post('/api/users/login',(req,res)=>{
    const userInfo = new User(req.body);//new instance 생성,인스턴스 ? -> 실행 중인 임의의 프로세스, 클래스의 현재 생성된 오브젝트 라는디 그럼 이거는 User 에 req.body라는 객체를 넣는거같음
    // console.log(user);
    User.findOne({email : req.body.email},(err,userInfo)=>{//req.body.email에 해당하는 email이 있는지 확인, 있으면 userInfo에 안들어가나봄
       if(!userInfo){
           return res.json={
               loginSuccess : "False",
                message : "email is not in db!"
           };
       } 
       console.log(userInfo);
        userInfo.comparePassword(req.body.password,(err,isMatch)=>{//comparePassword라는 메소드를 만들어서 사용-> model에서 method를 만들음
            //plainPassword, db password(암호화된 애)를 비교해야됨, 그러려면 plainPassword를 암호화해서 db password랑 같은지 확인하면 된다.
            if(!isMatch) return res.json({loginSuccess : "False", message : "password is not correct!"})

            console.log("generate token start")
            // 비밀번호 같으면 token 생성 -> 이거도 method를 만들음 
            userInfo.generateToken((err,user)=>{
                //user -> token이 저장되었으면 그게 들어간 user정보가 들어옴
                if(err) return res.status(400).send(err);

                // 토큰을 저장, 어디? -> 쿠키, 로컬 스토리지 -> 쿠키(cookie parser를 깔아야됨)
                res.cookie('x_auth',user.token) // 'x_auth'라는 이름을 가진 쿠키가 생기고 그 값이 user.token이다.
                .status(200)
                .json({
                    loginSuccess : "true",
                    userId : user._id
                })

                
            })

        })
    });
    
    
})

//route '/auth'
app.get('/api/users/auth',auth,(req,res)=>{
    // 여기까지 온거는 authentication이 true라는 뜻
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true ,//role : 0 일때 일반유저, 0이 아니면 admin
        email : req.user.email,
        name : req.user.name
    })

})

//route '/logout'
app.get('/api/users/logout',auth, (req, res)=>{

    User.findOneAndUpdate({ _id : req.user._id }, {token : ""}, (err,user)=>{
        if(err) return res.json({success : false, err})
        return res.json({
            success : true
        })
    })

})




app.listen(port, ()=> console.log('Example app listening on port ${port}!'))