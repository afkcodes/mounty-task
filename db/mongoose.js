const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
}, (err,res)=>{
  if(res){
    console.log('Connected to DB')
  }
});