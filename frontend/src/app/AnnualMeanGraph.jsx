import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const AnnualMean = ({ district, state, calculatedResult, dataType }) => {
  const ref = useRef();
  const [hoverData, setHoverData] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({});

  useEffect(() => {
    const data = calculatedResult;
    const svg = d3.select(ref.current);
    const svgDimensions = svg.node().getBoundingClientRect();
    const width = svgDimensions.width;
    const height = svgDimensions.height;
    const marginTop = 50;
    const marginRight = 50;
    const marginBottom = 50;
    const marginLeft = 70;

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

    // Title
    svg.append("text")
      .attr("x", width * 0.5)
      .attr("y", marginTop * 0.5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#007bff")
      .text(`Annual Mean ${dataType} for ${district} (${state})`);

    // Rectangles with hover interaction
    const rectGroup = svg.append("g")
      .attr("fill", "#007bff");

    rectGroup.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.year) + x.bandwidth() / 2 - x.bandwidth() / 4) // Center the bar on the tick
      .attr("y", d => y(d.mean))
      .attr("height", d => y(0) - y(d.mean))
      .attr("width", x.bandwidth() / 2) // Set the maximum width to 30
      .on("mouseover", (event, d) => setHoverData(d))
      .on("mouseout", () => setHoverData(null));

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .style("text-anchor", "middle") // Center the text on the tick
      .attr("dx", "0")
      .attr("dy", ".71em")
      .attr("transform", "rotate(0)"); // No rotation for horizontal labels

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
          {`Year: ${hoverData ? hoverData.year : ''}`}
          <br />
          {`Mean: ${hoverData ? hoverData.mean : ''}`}
        </div>
      )}
    </div>
  );
};

export default AnnualMean;