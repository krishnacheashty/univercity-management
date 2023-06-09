import mongoose, { Mongoose } from "mongoose";
import app from "./app"
import config from "./config/index"


async function databaseConnection(){
    try{
        await mongoose.connect(config.database_url as string);
        console.log(`connect is  successfully`);
        app.listen(config.port,()=>{console.log(`server is listining ${config.port}`)});
        
    }
    catch(err){
        console.log('failed to connect database',err);
    }
}

databaseConnection();