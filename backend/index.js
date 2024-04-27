import express from "express";
import cors from "cors";
import db from "./connnection.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

db.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

app.post("/api/formdata", (req, res) => {
  const { state, district, dataType, fromYear, toYear, action } = req.body;

  const query = `
      SELECT year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, \`dec\` 
      FROM metdatadb.${dataType} 
      WHERE UPPER(state) = UPPER(?) AND UPPER(district) = UPPER(?) 
      AND year BETWEEN ? AND ?
  `;

  db.query(query, [state, district, fromYear, toYear], (err, results) => {
    if (err) throw err;

    console.log("Fetched Data:", results);

    if (results.length === 0) {
      return res.status(404).send({ message: "Data not found in the database." });
    }

    let calculatedResult;
    switch (action) {
      case "annualMean":
        calculatedResult = calculateAnnualMean(results);
        console.log(calculatedResult);
        break;
      case "monthlyMean":
        calculatedResult = calculateMonthlyMean(results);
        console.log(calculatedResult);
        break;
      case "annualTotal":
        calculatedResult = calculateAnnualTotal(results);
        console.log(calculatedResult);
        break;
      default:
        break;
    }

    res.send(calculatedResult);
  });
});

function calculateAnnualMean(data) {
  const annualMeans = [];
  for (const yearData of data) {
    let sum = 0;
    for (const month in yearData) {
      if (month !== "year") {
        sum += yearData[month];
      }
    }
    const yearMean = (sum / 12).toFixed(2);
    annualMeans.push({ year: yearData.year, mean: parseFloat(yearMean) });
  }
  return annualMeans;
}

function calculateMonthlyMean(data) {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const monthlyMeans = [];
  
    for (const monthName of monthNames) {
      let sum = 0;
      let count = 0;
      for (const yearData of data) {
        if (yearData[monthName]) {
          sum += yearData[monthName];
          count++;
        }
      }
      const average = count > 0 ? (sum / count).toFixed(2) : 0;
      monthlyMeans.push({ month: monthName, average: parseFloat(average) });
    }
  
    return monthlyMeans;
  }

function calculateAnnualTotal(data) {
  const annualTotals = [];
  for (const yearData of data) {
    let total = 0;
    for (const month in yearData) {
      if (month !== "year") {
        total += yearData[month];
      }
    }
    annualTotals.push({ year: yearData.year, total: total.toFixed(2) });
  }
  return annualTotals;
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
