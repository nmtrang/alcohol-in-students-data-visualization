// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data and compute summary statistics for each specie
d3.csv("https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/Book4.csv", function(data) {

  // Build and Show the Y scale
  var y = d3.scaleLinear()
    .domain([0,20])          // Note that here the Y scale is set manually
    .range([height, 0])
  svg.append("g").call( d3.axisLeft(y) )

  // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(["Very Low", "Low", "Average", "High","Very High"])
    .padding(0.5)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Add individual points with jitter
  var jitterWidth = 60
  svg.selectAll("indPoints")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d){return(x(d.Walc) + x.bandwidth() - Math.random()*jitterWidth)})
      .attr("cy", function(d){return(y(d.Result))})
      .attr("r", 4)
      .style("fill", function(d){
        if(d.Result > 10){
          return "#000000"
        }
        else{
          return "#FF0000"
        }
      })
      .attr("stroke", "white")

})

// .attr("cx", function(d){return(x(d.Walc) + x.bandwidth()/2 - Math.random()*jitterWidth )})