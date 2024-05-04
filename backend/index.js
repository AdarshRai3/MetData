import express from "express";
import cors from "cors";
import db from "./connection.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is up and running");
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("MySQL connected");
});

// Close the database connection when the app is shutting down
process.on('SIGINT', () => {
  db.end();
  console.log('MySQL connection closed');
  process.exit(0);
});

let calculatedResult;

app.post("/api/formdata", (req, res) => {
  const { state, district, dataType, fromYear, toYear, action } = req.body;

  // Input validation
  if (!state || !district || !dataType || isNaN(fromYear) || isNaN(toYear) || !action) {
    return res.status(400).send({ message: "Invalid request parameters." });
  }

  const query = `
    SELECT year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, deb
    FROM b5da1u4r1wr8gvlhvand.${dataType}
    WHERE UPPER(state) = UPPER(?) AND UPPER(district) = UPPER(?) AND year BETWEEN ? AND ?
  `;

  db.query(query, [state, district, fromYear, toYear], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Data not found in the database." });
    }

    switch (action) {
      case "annualMean":
        calculatedResult = calculateAnnualMean(results);
        break;
      case "monthlyMean":
        calculatedResult = calculateMonthlyMean(results);
        break;
      case "annualTotal":
        calculatedResult = calculateAnnualTotal(results);
        break;
      default:
        return res.status(400).send({ message: "Invalid action." });
    }

    res.send(calculatedResult);
  });
});

app.get("/api/formdata", (req, res) => {
  if (calculatedResult) {
    res.send(calculatedResult);
  } else {
    res.status(404).send({ message: "No calculated result available." });
  }
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
    monthlyMeans.push({ month: monthName, mean: parseFloat(average) });
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
  console.log(`Server is running on port ${PORT}`);
});