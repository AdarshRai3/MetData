// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const BarGraph = ({ data, action }) => {
//   const svgRef = useRef();

//   // Define margins and dimensions
//   const MARGIN = { TOP: 40, RIGHT: 20, BOTTOM: 50, LEFT: 50 };
//   const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
//   const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Define scales based on action
//     const xScale = d3
//       .scaleBand()
//       .domain(data.map((d) => (action === 'monthlyMean' ? d.month : d.year.toString())))
//       .range([0, WIDTH])
//       .paddingInner(0.3)
//       .paddingOuter(0.2);

//     const yScale = d3
//       .scaleLinear()
//       .domain([
//         0,
//         d3.max(data, (d) =>
//           action === 'monthlyMean'
//             ? d.average
//             : action === 'annualMean'
//             ? d.mean
//             : d.total
//         )
//       ])
//       .range([HEIGHT, 0]);

//     // Create bars
//     svg
//       .selectAll('rect')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('x', (d) => xScale(action === 'monthlyMean' ? d.month : d.year))
//       .attr('y', (d) => yScale(action === 'monthlyMean' ? d.average : d[action]))
//       .attr('width', xScale.bandwidth())
//       .attr('height', (d) => HEIGHT - yScale(action === 'monthlyMean' ? d.average : d[action]))
//       .attr('fill', 'steelblue');

//     // Add data labels
//     svg
//       .selectAll('.data-label')
//       .data(data)
//       .enter()
//       .append('text')
//       .attr('class', 'data-label')
//       .attr('x', (d) => xScale(action === 'monthlyMean' ? d.month : d.year) + xScale.bandwidth() / 2)
//       .attr('y', (d) => yScale(action === 'monthlyMean' ? d.average : d[action]) - 5)
//       .attr('text-anchor', 'middle')
//       .style('font-size', '12px')
//       .text((d) => (action === 'monthlyMean' ? d.average.toFixed(1) : d[action].toFixed(1)));

//     // Add axes
//     const xAxis = d3.axisBottom(xScale).tickSize(0);
//     const yAxis = d3.axisLeft(yScale);

//     svg
//       .append('g')
//       .attr('transform', `translate(${MARGIN.LEFT}, ${HEIGHT})`)
//       .call(xAxis);

//     svg
//       .append('g')
//       .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
//       .call(yAxis);

//     // Add labels based on action
//     svg
//       .append('text')
//       .attr('y', -10)
//       .attr('x', WIDTH / 2)
//       .attr('text-anchor', 'middle')
//       .style('font-size', '14px')
//       .text(
//         action === 'annualMean'
//           ? 'Annual Mean Rainfall (cm)'
//           : action === 'annualTotal'
//           ? 'Annual Total Rainfall (cm)'
//           : 'Monthly Mean Rainfall (cm)'
//       );
//   }, [data, action]);

//   return (
//     <svg
//       ref={svgRef}
//       width={WIDTH + MARGIN.LEFT + MARGIN.RIGHT}
//       height={HEIGHT + MARGIN.TOP + MARGIN.BOTTOM}
//     />
//   );
// };

// export default BarGraph;