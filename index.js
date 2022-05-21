//index.js
const express = require('express') //express module 가져오기
const app = express() // 새로운 express 앱을 express()로 만들기
const port = 3000 // 포트번호

//config import
const config = require('./config/key');

//MongoDB Connection
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(()=>console.log("MongoDB connected")).catch(err=>console.log("Error!"))
//'mongodb+srv://givensik:wnstlr4268@youtubeclone.d1lys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//model import

const { User } = require('./models/User'); //import User models

//body-parser
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));


// route '/'
app.get('/', (req, res) => res.send('Hello World!'))// root directory('/')에 오면 저거 출력

// route '/register'

app.get('/register', (req, res)=>{
    const user = new User; // Make New instance 
    user.save((err, doc)=> {//user.save -> mongodb의 메소드
                if(err){
                    return res.json({success : false, err})//에러가 나면 success : false라는 성공 못했다는 json파일이랑, err를 보냄
                }
                return res.status(200).json({success:true})
            }); 
            
})

app.listen(port, ()=> console.log('Example app listening on port ${port}!'))


// //master code 
// const express = require('express') //express module 가져오기
// const app = express() // 새로운 express 앱을 express()로 만들기
// const port = 3000 // 포트번호
// // const bodyParser = require('body-parser');//body-parser import
// const { User } = require("./models/User");//User관련 정보 model 가져오기

// const config = require('./config/key');

// //body-parser -> client가 보내는 정보를 서버가 분석해서 가져올 수 있게 해주는 어플리케이션

// //app.use(bodyParser.urlencoded);//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는거

// //app.use(bodyParser.json);//application/json 이렇게 된 데이터를 분석해서 가져올 수 있게해줌

// // express가 업데이트 되어서 bodyParser는 안써도 된다함.
// app.use(express.json()) //For JSON requests
// app.use(express.urlencoded({extended: true}));
// //아래꺼로 대체




// const mongoose = require('mongoose')
// mongoose.connect(config.mongoURI).then(()=>console.log("MongoDB connected")).catch(err=>console.log("Error!"))



// app.get('/', (req, res) => res.send('Hello World!'))// root directory('/')에 오면 저거 출력


// //register route 설정
// app.post('/register', (req,res)=>{
//     //회원가입을 위한 정보들을 Client에서 가져오면, 그것들을 데이터 베이스에 넣어준다.
//     // req.body에는 json 형식으로 
//     // {
//     //     id : 'givensik',
//     //     pw : '1234'
//     // }
//     // 이런 데이터가 들어가 있는거임 근데 이렇게 req.body에 들어갈 수 있게 해주는게 body-parser이다.
//     const user = new User(req.body) //인스턴스라고 하는디 이게 뭐징 -> 실행 중인 임의의 프로세스, 클래스의 현재 생성된 오브젝트 라는디 그럼 이거는 User 에 req.body라는 객체를 넣는거같음

//     user.save((err, doc)=> {//mongdb의 method임 user.save
//         if(err){
//             return res.json({success : false, err})//에러가 나면 success : false라는 성공 못했다는 json파일이랑, err를 보냄
//         }
//         return res.status(200).json({success:true})
//     }); 
//     //mongodb의 메소드
// })

// app.listen(port, ()=> console.log('Example app listening on port ' + port))