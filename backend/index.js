import express from "express";
import cors from "cors";
import mysql from "mysql";
const app = express();
const PORT= 8080;
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "9664069557",
        database: "metdata",
        connectionLimit: 10
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})