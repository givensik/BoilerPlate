//index.js
const express = require('express') //express module 가져오기
const app = express() // 새로운 express 앱을 express()로 만들기
const port = 3000 // 포트번호

//MongoDB Connection
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://givensik:wnstlr4268@youtubeclone.d1lys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>console.log("MongoDB connected")).catch(err=>console.log("Error!"))

//model import
const { User } = require('./models/User');


app.get('/', (req, res) => res.send('Hello World!'))// root directory('/')에 오면 저거 출력



app.listen(port, ()=> console.log('Example app listening on port ${port}!'))