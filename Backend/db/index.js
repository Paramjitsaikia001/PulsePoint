require('dotenv').config();
console.log('MONGODB_URI from .env:', process.env.MONGODB_URI); 
const mongoose = require("mongoose");
const { DB_NAME } = require("../constaint.js");

const connectDB = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI; 
        if (!mongodbUri) {
            throw new Error("MONGODB_URI is not defined in the .env file");
        }
        const connectionInstance = await mongoose.connect(`${mongodbUri}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log("Connection successful!");
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1); 
    }
};

module.exports = connectDB;

