import express from "express";
import cors from "cors";
import db from "./connnection.js";

const app = express();
const PORT= 8080;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello world")
});

db.connect((err)=>{
    if(err) throw err;
    console.log("mysql connected"); 
});

app.post("/api/formdata", (req, res) => {
    const { state, district, dataType, fromYear, toYear, action } = req.body;
    
    // Modify your query to fetch monthly data
    const query = `
        SELECT year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, \`dec\` 
        FROM metdatadb.${dataType} 
        WHERE UPPER(state) = UPPER(?) AND UPPER(district) = UPPER(?) 
        AND year BETWEEN ? AND ?
    `;

    db.query(query, [state, district, fromYear, toYear], (err, results) => {
        if(err) throw err;
        
        console.log("Fetched Data:", results);

        if(results.length === 0) {
            return res.status(404).send({ message: "Data not found in the database." });
        }

        // Perform calculation based on 'action' value
        let calculatedResult;
        switch(action) {
            case 'annualMean':
                // Calculate annual mean
                break;
            case 'monthlyMean':
                // Calculate monthly mean for each year
                break;
            case 'annualTotal':
                // Show annual total
                break;
            default:
                break;
        }

        res.send(calculatedResult);
    });
});



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
