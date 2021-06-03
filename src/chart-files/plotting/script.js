// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 70, left: 80},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#Plotting_G1_G2")
  .append("svg")
    .attr("width", width + margin.left + margin.right + 100)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/data.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 20])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height+ ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.G1); } )
        .attr("cy", function (d) { return y(d.G2); } )
        .attr("r", 3.5)
        .style("fill", function(d){
            if(d.sex == "F"){
                return "#FF9A08";
            }
            else{
                return "#181991";
            }
        })
    // Add legend
    svg.append("circle").attr("cx",50).attr("cy",30).attr("r", 6).style("fill", "#143D59")
    svg.append("circle").attr("cx",50).attr("cy",60).attr("r", 6).style("fill", "#F4B41A")
    svg.append("text").attr("x", 70).attr("y", 30).text("M").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 70).attr("y", 60).text("F").style("font-size", "15px").attr("alignment-baseline","middle")
    // Add name axis
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    .attr("x", -height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "20px")
    .text("G2");

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "center")
    .attr("x", width/2)
    .attr("y", height + 40)
    .style("font-size", "20px")
    .text("G1");
       
})

// append the svg object to the body of the page
var svg1 = d3.select("#Plotting_G2_G3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/data.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 20])
    .range([0, width]);
  svg1.append("g")
    .attr("transform", "translate(0," + height+ ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0]);
  svg1.append("g")
    .call(d3.axisLeft(y));

  // Add dots
    svg1.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.G2); } )
        .attr("cy", function (d) { return y(d.G3); } )
        .attr("r", 3.5)
        .style("fill", function(d){
            if(d.sex == "F"){
                return "#FF9A08";
            }
            else{
                return "#181991";
            }
        })
    // Add legend
    svg1.append("circle").attr("cx",50).attr("cy",30).attr("r", 6).style("fill", "#143D59")
    svg1.append("circle").attr("cx",50).attr("cy",60).attr("r", 6).style("fill", "#F4B41A")
    svg1.append("text").attr("x", 70).attr("y", 30).text("M").style("font-size", "15px").attr("alignment-baseline","middle")
    svg1.append("text").attr("x", 70).attr("y", 60).text("F").style("font-size", "15px").attr("alignment-baseline","middle")
    // Add name axis
    svg1.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    .attr("x", -height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "20px")
    .text("G3");

    svg1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "center")
    .attr("x", width/2)
    .attr("y", height + 40)
    .style("font-size", "20px")
    .text("G2");
       
})
