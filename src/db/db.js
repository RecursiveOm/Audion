    const mongoose = require("mongoose")

    async function connectDB(){
        try{
            await mongoose.connect(process.env.MONGODB_CONNECT_URL)
            console.log("Connected to DB");
            

        }catch(err){

            console.log("Error connecting to database");

        }
    }

    module.exports = connectDB;