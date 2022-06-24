const express = require('express');
const mongoose=require('mongoose');
const pageRoute=require('./routes/pageRoute');
const courseRoute=require('./routes/courseRoute');
const categoryRoute=require('./routes/categoryRoute');
const userRoute=require('./routes/userRoute');
var session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();

//connect db
 mongoose.connect('mongodb://localhost/smartedu-db').then(()=>{console.log("DB Connected successfuly")});

//template engine
app.set("view engine","ejs");

//Global variable
global.userIN=null;




//middleware

app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}))
app.use('*',(req,res,next)=>{
  userIN=req.session.userID;
  next();
})
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
