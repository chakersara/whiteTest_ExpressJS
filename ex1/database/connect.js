const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Application connectée à la base de données")
})
.catch(err=>
    console.log("Erreur de connection à la base de données :",err.message)
)
