const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 5000;

//Database url 
const dbUrl = 'mongodb://127.0.0.1:27017/ecommerceDB';
//end

//database connection
mongoose.connect(dbUrl, {useNewUrlParser: true}).then(() =>
    console.log("database has been connected successfully")
).catch((error) =>{
    console.log(error);
})
//end db connection


app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
});