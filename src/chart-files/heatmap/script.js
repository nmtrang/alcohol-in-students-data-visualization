// set the dimensions and margins of the graph
var margin = { top: 80, right: 20, bottom: 30, left: 80 },
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv(
    "https://raw.githubusercontent.com/TraLe-ITDSIU19058/Data-Visualization-Project/main/heatmapdata.csv",
    function (data) {
        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        var myGroups = d3
            .map(data, function (d) {
                return d.Group;
            })
            .keys();
        var myVars = d3
            .map(data, function (d) {
                return d.Variable;
            })
            .keys();

        // Build X scales and axis:
        var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05);
        svg.append("g")
            .style("font-size", 9)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain")
            .remove();

        // Build Y scales and axis:
        var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05);
        svg.append("g")
            .style("font-size", 15)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain")
            .remove();

        // Build color scale
        var myColor = d3
            .scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1, -0.5]);

        // create a tooltip
        var tooltip = d3
            .select("#my_dataviz")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("padding", "5px");

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            tooltip.style("opacity", 1);
            d3.select(this).style("stroke", "black").style("opacity", 1);
        };
        var mousemove = function (d) {
            tooltip
                .html("<strong>Correlation: " + d.Value)
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px")
                .style("font-size", "15");
        };
        var mouseleave = function (d) {
            tooltip.style("opacity", 0);
            d3.select(this).style("stroke", "none").style("opacity", 0.8);
        };

        // add the squares
        svg.selectAll()
            .data(data, function (d) {
                return d.Group + ":" + d.Variable;
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return x(d.Group);
            })
            .attr("y", function (d) {
                return y(d.Variable);
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) {
                return myColor(d.Value);
            })
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
    }
);

// Add title to graph
svg.append("text")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .style("font-weight", "bold")
    .text(" Heatmap: The correlation of student alcohol assumption data");

// Add legend
label = ["-0.2", "0", "0.2", "0.4", "0.8", "0.1"];

// Add one dot in the legend for each name.
var size = 20;
svg.selectAll("mylabels")
    .data(label)
    .enter()
    .append("text")
    .attr("x", 1000 + size * 1.2)
    .attr("y", function (d, i) {
        return 1000 + i * (size + 5) + size / 2;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) {
        return myColor(d.Value);
    })
    .text(function (d) {
        return label;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");
