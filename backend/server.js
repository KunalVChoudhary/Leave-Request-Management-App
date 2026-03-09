require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser')
const cors = require('cors');

//Routes
const userRoute= require('./routes/userRoutes')
const leaveRequestRoute = require('./routes/leaveRequestRoutes')

const app = express();

//Connect To DataBase
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


//middlewares
app.use(express.json());
app.use(cookieParser(`${process.env.COOKIE_PARSER_SECRET_KEY}`));

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use('/',userRoute,leaveRequestRoute)

//start server
app.listen(process.env.PORT,()=>{console.log('Server Started');})