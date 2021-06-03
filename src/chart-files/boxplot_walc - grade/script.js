// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



  var rowConverter = function(d){
        return {
            Walc: d.Walc,
            Q1: parseInt(d.Q1),
            Median: parseInt(d.Median),
            Q3: parseInt(d.Q3),
            Min: parseInt(d.Min),
            Max: parseInt(d.Max)
        };
    };
// Read the data and compute summary statistics for each specie
d3.csv("https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/Boxplot.csv",rowConverter, function(data) {

  // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Walc;})
    .rollup(function(d) {
      q1 = d.map(function(g) {return g.Q1})
      median = d.map(function(g) {return g.Median})
      q3 = d.map(function(g) {return g.Q3})
      min = d.map(function(g) {return g.Min})
      max = d.map(function(g) {return g.Max})
      return({q1: q1, median: median, q3: q3, min: min, max: max})
    })
    .entries(data)
  
  console.log("This is data")
  console.log(sumstat)
  // Show the X scale
  var x = d3.scaleBand()
    .range([0, width])
    .domain(["Very Low", "Low", "Average","High","Very High"])
    .paddingInner(1)
    .paddingOuter(.5)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Show the Y scale
  var y = d3.scaleLinear()
    .domain([0,20])
    .range([height, 0])
  svg.append("g").call(d3.axisLeft(y))

  // Show the main vertical line
  svg
    .selectAll("vertLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)

  // rectangle for the main box
  var boxWidth = 20
  svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)})
        .attr("y", function(d){
          console.log(d.value.q3)
          return(y(d.value.q3))
        })
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth)
        .attr("stroke", "black")
        .style("fill", "#69b3a2")

  // Show the median lines
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)
  // Show the min lines
  svg
    .selectAll("minLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.min))})
      .attr("stroke", "black")
      .style("width", 80)
  // Show the max lines
  svg
      .selectAll("minLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
        .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
        .attr("y1", function(d){return(y(d.value.max))})
        .attr("y2", function(d){return(y(d.value.max))})
        .attr("stroke", "black")
        .style("width", 80)

})