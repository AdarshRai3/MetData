import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const AnnualMean = ({ district, state, calculatedResult, dataType }) => {
  const ref = useRef();
  const [hoverData, setHoverData] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const data = calculatedResult;
    const svg = d3.select(ref.current);
    const svgDimensions = svg.node().getBoundingClientRect();
    const width = svgDimensions.width;
    const height = svgDimensions.height;
    const marginTop = 5;
    const marginRight = 50;
    const marginBottom = 50;
    const marginLeft = 70;
    
    setDimensions({ width, height });

    svg.selectAll("*").remove();

    const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([marginLeft, width - marginRight])
      .padding(0.2);

    x.bandwidth(Math.min(x.bandwidth(), 15));

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

    if (hoverData) {
      setHoverStyle({
        position: "absolute",
        top: `${y(hoverData.mean + 15)}px`,
        left: `${x(hoverData.year) + x.bandwidth() / 2}px`,
        backgroundColor: 'white',
        fontSize: '0.5rem',
        fontWeight: 'bold',
        padding: '10px',
        height: '2rem',
        width: '5rem',
        border: '2px solid black',
        borderRadius: '5px',
      });
    }

    const rectGroup = svg.append("g")
      .attr("fill", "#007bff");

    rectGroup.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.year) + x.bandwidth() / 2 - x.bandwidth() / 4)
      .attr("y", d => y(d.mean))
      .attr("height", d => y(0) - y(d.mean))
      .attr("width", x.bandwidth() / 2)
      .on("mouseover", (event, d) => setHoverData(d))
      .on("mouseout", () => setHoverData(null));

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "0")
      .attr("dy", ".71em")
      .attr("transform", "rotate(0)");

    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y)
        .tickSize(-(width - marginLeft - marginRight))
        .tickFormat("")
      )
      .attr("stroke-opacity", "0.1");

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -marginLeft + 20)
      .attr("x", -marginBottom - 20)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .style("font-weight", "bold")
      .style("font-size", "14px")
      .style("fill", "#007bff")
      .text(`${dataType}`);

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - marginBottom + 50)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-size", "14px")
      .style("fill", "#007bff")
      .text("Mean value");
  }, [calculatedResult, district, state, dataType, hoverData]);

  return (
    <div style={{ position: "relative" }}>
    <svg
      ref={ref}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "75vw",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        margin: "2rem",
      }}
    ></svg>
    {hoverData && (
      <div style={hoverStyle}>
        {`Month: ${hoverData ? hoverData.year : ''}`}
        <br />
        {`Mean: ${hoverData ? hoverData.mean : ''}`}
      </div>
    )}
     </div>
  );
};

export default AnnualMean;
