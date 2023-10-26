const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require('./src/routes/Routes');
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const connection= mongoose.connect(process.env.MONGO_URL)
connection.then(()=>console.log("conntected"))
.catch(()=>{console.log("error in connecting mongo");})

// Use the auth route

app.get("/",(req,res)=> res.send({"email":"password"}));
app.post("/info",
(req,res)=>{
    const {email,pass} = req.body;
    console.log(email);
    console.log(pass);
    res.status(200).send("hello");
}
)
app.use('/', authRoutes);
app.listen(3003,()=>{console.log("Server is runing");})