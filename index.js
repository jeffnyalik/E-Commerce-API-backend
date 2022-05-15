const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/users/user');
const authRoute = require('./routes/auths/auth');
const productsRoute = require('./routes/products/products');
const cartRoute = require('./routes/carts/cart');
const orderRoute = require('./routes/orders/order');

app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();

const PORT = 5000;

//database connection
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}).then(() =>
    console.log("database has been connected successfully")
).catch((error) =>{
    console.log(error);
})
//end db connection


//routes
    app.use('/api/user', userRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/products', productsRoute);
    app.use('/api/cart', cartRoute);
    app.use('/api/orders', orderRoute);
///

app.use(express.urlencoded({extended: true}));



app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
});