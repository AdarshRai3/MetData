import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'; 

const MonthlyMean = ({ district, state, calculatedResult, dataType }) => {
  const ref = useRef();

  useEffect(() => {
    const data = calculatedResult;
    const svg = d3.select(ref.current);
    const width = 464;
    const height = 250;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    svg.selectAll("*").remove();

 
    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 300])
      .range([height - marginBottom, marginTop]);

    svg.append("g")
      .attr("fill", "#007bff")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.month))
        .attr("y", d => y(d.mean))
        .attr("height", d => y(0) - y(d.mean))
        .attr("width", x.bandwidth());

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("Mean ↑"));

  }, [calculatedResult]);

  return (
    <svg ref={ref} style={{width: "100%", height: "500px"}}></svg>
  );
};

export default MonthlyMean;