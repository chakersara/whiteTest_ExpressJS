//Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A
require("dotenv").config();
require("./database/connect");
const cookieParser = require('cookie-parser')
const express=require("express");
const wt_router=require("./routes/white_test")
const user_router=require("./routes/user")
const cons_user_router=require("./routes/consult_user")
const auth = require('./middlewars/authentification');
const port=process.env.PORT||3000

// Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A


const app=express()
app.use(express.json())
app.use(cookieParser())

app.use("/wt",auth,wt_router)
app.use('/user',auth,user_router)
app.use("/list_user",auth,cons_user_router)

app.get("/",(req,res)=>{
    res.send("WEB API réalisé par Sarra Chaker GLSI-B et Chaima Arfaoui GLSI-A\nBienvenue!")
})


app.listen(port,()=>{
    console.log(`Application running on port ${port}`)
})
