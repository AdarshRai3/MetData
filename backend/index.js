import express from "express";
import cors from "cors";
import db from "./connnection.js";
const app = express();
const PORT= 8080;
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hello world")
})
    db.connect((err)=>{
        if(err) throw err;
        console.log("mysql connected"); 
    })


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})