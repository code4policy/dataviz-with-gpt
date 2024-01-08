// Data (top 10 reasons for complaints)
const data = [
    { reason: "Enforcement & Abandoned Vehicles", Count: 61541 },
    { reason: "Code Enforcement", Count: 31811 },
    { reason: "Building", Count: 5209 },
    { reason: "Environmental Services", Count: 4416 },
    { reason: "Animal Issues", Count: 4155 },
    { reason: "Employee & General Comments", Count: 2166 },
    { reason: "Administrative & General Requests", Count: 2025 },
    { reason: "Graffiti", Count: 1838 },
    { reason: "Abandoned Bicycle", Count: 1318 },
    { reason: "Catchbasin", Count: 621 }
];

// Set dimensions and margins
const margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the svg object to the div with
// Append the svg object to the div with id "chart"
const svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create X axis
const x = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.Count)])
  .range([0, width]);
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Create Y axis
const y = d3.scaleBand()
  .range([0, height])
  .domain(data.map(d => d.reason))
  .padding(.1);
svg.append("g")
  .call(d3.axisLeft(y))

// Create Bars
svg.selectAll("myRect")
  .data(data)
  .join("rect")
  .attr("x", x(0))
  .attr("y", d => y(d.reason))
  .attr("width", d => x(d.Count))
  .attr("height", y.bandwidth())
  .attr("class", "bar")
  .on("mouseover", function() {
    d3.select(this).style("fill", "orange");
  })
  .on("mouseout", function() {
    d3.select(this).style("fill", "steelblue");
  });

// Optional: Add a tooltip
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

svg.selectAll(".bar")
  .on("mouseover", function(event, d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);
    tooltip.html(`Count: ${d.Count}`)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function() {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  });
