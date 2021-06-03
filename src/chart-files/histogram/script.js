
// set the dimensions and margins of the graph
var his_margin = {top: 30, right: 50, bottom: 70, left: 80},
    his_width = 460 - his_margin.left - his_margin.right,
    his_height = 400 - his_margin.top - his_margin.bottom;

// append the svg object to the body of the page
var histogram = d3.select("#Histogram")
  .append("svg")
    .attr("width", his_width + his_margin.left + his_margin.right)
    .attr("height", his_height + his_margin.top + his_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + his_margin.left + "," + his_margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/Walc.csv", function(data) {

    // X axis
    var x = d3.scaleBand()
    .range([ 0, his_width ])
    .domain(data.map(function(d) { return d.Walc; }))
    .padding(0.2);

    histogram.append("g")
    .attr("transform", "translate(0," + his_height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(0,0)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 450])
    .range([ his_height, 0]);
    histogram.append("g")
    .call(d3.axisLeft(y));

    // Bars
    histogram.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Walc); })
        .attr("y", function(d) { return y(d.Count); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return his_height - y(d.Count); })
        .attr("fill", "#69b3a2")

    // Add legend
    // Add name axis
    histogram.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -55)
    .attr("x", -his_height / 2  + 60)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "20px")
    .text("Number of students");

    histogram.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "center")
    .attr("x", his_width/2-100)
    .attr("y", his_height + 40)
    .style("font-size", "20px")
    .text("Weekly alcohol consumption ");

})
