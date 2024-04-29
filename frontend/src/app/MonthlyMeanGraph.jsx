import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Bar, XAxis, YAxis } from '@mui/x-charts'; // Import necessary components

const chartSetting = {
  xAxis: [
    {
      label: 'Precipitation (mm)',
      tickFormat: (value) => `${value}mm`, // Format x-axis ticks with units
    },
  ],
  width: 500,
  height: 400,
};

const calculateMonthlyMeans = (data) => {
  // Assuming 'data' is an array of objects with monthly precipitation data
  const monthlyMeans = {};
  for (const item of data) {
    const month = item.month;
    const precipitation = item.seoul; // Assuming 'seoul' property holds precipitation data for Seoul
    monthlyMeans[month] = (monthlyMeans[month] || 0) + precipitation; // Calculate and accumulate monthly sums
  }

  // Calculate actual means by dividing by the number of months
  const numMonths = data.length;
  for (const month in monthlyMeans) {
    monthlyMeans[month] /= numMonths;
  }

  const formattedMeans = {};
  for (const month in monthlyMeans) {
    formattedMeans[month] = { month, seoul: Math.round(monthlyMeans[month]) }; // Round calculated means
  }

  return formattedMeans;
};

const MonthlyMean = ({ calculatedResult }) => {
  if (!calculatedResult) {
    return <div>No results to display yet.</div>;
  }

  const monthlyMeans = calculateMonthlyMeans(calculatedResult); // Calculate monthly means

  const seriesData = Object.values(monthlyMeans); // Extract data for series

  return (
    <BarChart
      dataset={seriesData}
      yAxis={[
        {
          scaleType: 'band',
          dataKey: 'month',
          tickPlacement: 'middle',
          tickLabelPlacement: 'middle',
          title: { // Add y-axis title (optional)
            text: 'Month',
          },
        },
      ]}
      series={[
        {
          dataKey: 'seoul',
          label: 'Seoul Rainfall (mm)', // Include units in label
          barStyle: { fill: 'skyblue' }, // Set bar color (optional)
        },
      ]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
      // Add x-axis customization here:
      axes={[
        <XAxis
          key="x"
          min={0}
          max={300}
          tickInterval={30}
          title={{ // Add x-axis title (optional)
            text: 'Precipitation (mm)',
          }}
        />,
      ]}
    />
  );
};

export default MonthlyMean;