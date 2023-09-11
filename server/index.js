import express from "express";
import dotenv from 'dotenv';


// database connection 
import ConnectDB from "./database/connection";

dotenv.config();

const zomato = express();

zomato.use(express.json());

zomato.get('/', (req, res) => {
    res.json({
        message: "Server is running",
    });
});
const PORT = 4000;

zomato.listen(PORT, () => {
    // ConnectDB()
    //    .then(() => {
    //        console.log("server is running");
    //    })
    //     .catch((error) => {
    //        console.log("server is running , but database connection failed...");
    //        console.log(error);
    //  });
    console.log("server is running");

});