MetData: Meteorological Data Portal for India
Project Overview
MetData is a web portal that provides meteorological datasets for 13 climate parameters across all districts in India from 1901 to 2024. This project aims to make climate data easily accessible and visualizable for users.
Demo

Live Project:
Video Demo (5 minutes):https://youtu.be/XBAL7ZmLDLY?si=YP-tQd57AgLIe8ia

Note: The demo currently works only for the state of Haryana and its districts, specifically for Precipitation data.
Features

Display meteorological datasets in graphical and numerical form
User-friendly form for data selection (state, district, data type, year range)
Calculation options:

Annual Mean
Monthly Mean
Annual Total


Responsive design for various devices (mobile, tablet, desktop)
Secure data handling

Technology Stack

Frontend: Next.js
Backend: Node.js
Database: MySQL
Visualization: D3.js

Implementation Details

Form Design:

Replaced input elements with select elements
Made state and district selection interdependent
Implemented dependent year range selection


Data Flow:

Frontend to Backend communication using Axios with CORS
Server-side form data validation
Calculations performed on the backend
Only calculated results sent to frontend


Responsive Design:

Utilized media queries for layout responsiveness
Implemented responsive D3.js charts using React hooks and SVG attributes



Challenges and Solutions

Form Design: Implemented dependent dropdowns for better user experience and data accuracy.
Data Processing: Moved calculations to the backend to prevent data manipulation on the client-side.
Responsive Charts: Used React's useEffect hook and SVG attributes to create responsive D3.js charts.

Future Enhancements

Expand dataset to cover all states and districts in India
Improve chart responsiveness
Implement more robust error handling and data validation

Getting Started
Prerequisites

Node.js (v14 or later)
MySQL

Installation

Clone the repository
Copygit clone https://github.com/AdarshRai3/MetData.git
cd MetData

Install dependencies
Copynpm install

Set up environment variables
Create a .env.local file in the root directory and add the following:
CopyDATABASE_URL=mysql://username:password@localhost:3306/metdata
NEXT_PUBLIC_API_URL=http://localhost:3000/api
Replace username and password with your MySQL credentials.
Set up the database
Copymysql -u username -p
CREATE DATABASE metdata;
USE metdata;
Then import the provided SQL dump or CSV files.
Run the development server
Copynpm run dev

Open http://localhost:3000 in your browser to see the application.

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
Contact
Adarsh Rai

Email: adarshraicareer@gmail.com
Phone: 9664069557
