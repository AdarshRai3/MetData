import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'; // Import all d3 functions

const MonthlyMean = ({ district, state, calculatedResult, dataType }) => {
  const svgRef = useRef(null); // Create a ref for the svg element

  useEffect(() => {
    const svg = d3.select(svgRef.current); // Select the svg element using the ref
    const width = 460;
    const height = 450;
    const margin = { top: 10, right: 30, bottom: 90, left: 40 };

    // Process the data (assuming calculatedResult is an array)
    const data = calculatedResult;

    // Scales
    const x = d3.scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(data.map(d => d.month)) // Assuming 'month' property in data
      .padding(0.2);

    // Set y-axis domain to include negative values (assuming some means might be negative)
    const y = d3.scaleLinear()
      .domain([-Math.max(...data.map(d => Math.abs(d.mean))), 300]) // Extend domain to negative mean
      .range([height - margin.bottom, margin.top]);

    // Axes
    // Configure bottom axis with middle tick position
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)') // Center the text
      .style('text-anchor', 'middle'); // Align text to the middle

    // Configure left axis with middle tick position
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y)
        .ticks(11) // Set 11 ticks for increments of 30
        .tickFormat(d => `${d}`)) // Customize tick format to display numbers
      .selectAll('text')
      .attr('transform', 'translate(0, -5)'); // Move text slightly to the right

    // Bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
        .attr('x', d => x(d.month))
        .attr('width', x.bandwidth())
        .attr('fill', '#69b3a2')
        // Display mean value inside the bar
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle') // Align text vertically
        .text(d => d.mean > 0 ? `+${d.mean.toFixed(1)}` : d.mean.toFixed(1)) // Format and display mean
        .append('tspan') // Add another text element for negative values (optional)
          .attr('dy', '1.2em') // Position slightly below main text
          .text(d => d.mean < 0 ? `${d.mean.toFixed(1)}` : '') // Display only for negative means
        .attr('y', d => Math.max(height - margin.bottom, y(d.mean))) // Set bar bottom based on mean value
        .attr('height', d => Math.abs(y(0) - y(d.mean))) // Set bar height based on mean value

    // Animation (optional)
    // svg.selectAll('rect')
    //   .transition()
    //   .duration(800)
    //   // ... existing animation code ...

  }, [calculatedResult]); // Update chart on data change

  return (
    <>
      <svg ref={svgRef} width={460} height={450} />
    </>
  );
};

export default MonthlyMean;