
			
// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//                 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
			

var rowConverter = function(d){
    return {
        Year: parseInt(d.Year),
        Month: d.Month,
        "Primary_School": parseFloat(d["Primary_School"]),
        "High_School": parseFloat(d["High_School"]),
        "Associates_Degree": parseFloat(d["Associates_Degree"]),
        "Professional_Degree": parseFloat(d["Professional_Degree"]),
        White: parseFloat(d.White),
        Black: parseFloat(d.Black),
        Asian: parseFloat(d.Asian),
        Hispanic: parseFloat(d.Hispanic),
        Men: parseFloat(d.Men),
        Women: parseFloat(d.Women)

    };
    };

var margin = {top: 10, right: 0, bottom: 0, left: 100};
var w = 600  - margin.left - margin.right;
var h = 600 - margin.top - margin.bottom;
//Add tooltip
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
//Set SVG
var svg = d3.select("body")
            .append("svg")
            .attr("width", w + margin.left +margin.right + 100)
            .attr("height", h + margin.top + margin.bottom + 100)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top +")");

//Set xAxis
var xScale = d3.scaleBand()
                .rangeRound([0, w])
                .paddingInner(0.2);
var xAxis = svg.append("g")
                .attr("transform", "translate(0," +h+")")

//Set yAxis
var yScale = d3.scaleLinear()
                .range([h,0]);
var yAxis = svg.append("g")




d3.csv("https://raw.githubusercontent.com/nmtrang/us-unemployment-data-visualization/master/unemployment_data_us.csv", rowConverter, function(error, data) {
    if (error) {
        console.log(error);
    }
    else {
    // console.log(data);
    // console.log("This is width: ", w, "  | This is height: ",h);
    year = 2010;
    dataset1 = data.filter(function(d){
        return d.Year == year;
    })

    
    dataset1.forEach(function(d){
        return console.log("This is Primary_School: ", d["Primary_School"]);
    })

    var target = "Primary_School";
    xScale.domain(dataset1.map(function(d){ return d.Month}))
    xAxis.transition()
        .duration(1000)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor","end")
    yScale.domain([
                d3.min(dataset1,function(d){return d[target];}) - 1, 
                d3.max(dataset1, function(d){return d[target];}) + 0.5])
    yAxis.transition()
        .duration(1000)
        .call(d3.axisLeft(yScale))

    svg.append("text")
        .style("font", "30px times")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -70)
        .attr("x", -h/2 + 50)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("RATING");

    svg.append("text")
        .style("font", "30px times")
        .attr("class", "x label")
        .attr("text-anchor", "center")
        .attr("x", w/2 - 35)
        .attr("y", h + 50)
        .text("MONTH");

    svg.selectAll("rect")
        .data(dataset1)
        .enter()
        .append("rect")
        .attr("x", function(d){
            return xScale(d.Month);
        })
        .attr("y", function(d) {
            return yScale(d[target]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {

                return h - yScale(d[target]);
        })
        .attr("fill", function(d) {
                return "rgb(103,124,138)";
        })
        .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("text-anchor", "end")
                 .style("opacity", 100);

            tooltip.html("<strong>Month: "+ d.Month + "<br/> Unemployment Rate: " + d[target] )
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
                })
        .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
        });


    }
    d3.select("#year-select").on("change", function () {
        let input_year = d3.event.target.value;
        year = input_year;
        dataset1 = data.filter(function(d){
            return d.Year == year;
        })

        var year_bars = svg.selectAll("rect")
                      .data(dataset1);

        xScale.domain(dataset1.map(function(d){ return d.Month}));
        console.log("This is domain: ",dataset1.map(function(d){ return d.Month}));
        yScale.domain([
            d3.min(dataset1,function(d){return d[target];}) - 1, 
            d3.max(dataset1, function(d){return d[target];}) + 0.5])
        
        xAxis.transition()
            .duration(1000)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor","end")

        yAxis.transition().duration(1000).call(d3.axisLeft(yScale))

        year_bars.enter()
            .append("rect")
            .attr("x", function(d){
                return xScale(d.Month);
            })
            .attr("y", function(d) {
                return yScale(d[target]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                    return h - yScale(d[target]);
            })
            .attr("fill", function(d) {
                    return "rgb(103,124,138)";
            })
            .merge(year_bars)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("x", function(d){
                return xScale(d.Month);
            })
            .attr("y", function(d) {
                return yScale(d[target]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                    return h - yScale(d[target]);
            })
            .on("mouseover", function(d) {
                tooltip.transition()
                     .duration(200)
                     .style("text-anchor", "end")
                     .style("opacity", 100);
    
                tooltip.html("<strong>Month: "+ d.Month + "<br/> Unemployment Rate: " + d[target] )
                       .style("left", (d3.event.pageX + 5) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
                    })
            .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

            year_bars.exit()
            .transition()
            .duration(200)
            .attr("x", -xScale.bandwidth())
            .remove();

    });
    d3.select("#value-select").on("change", function () {
        // d3.event is set to the current event within an event listener
        let inputtarget = d3.event.target.value;
        target = inputtarget;
        console.log("This is current target: ", target);
        dataset1.forEach(function(d){
            console.log("This is value: ", d[target]);
        })

        xScale.domain(dataset1.map(function(d){ return d.Month}));
        yScale.domain([
            d3.min(dataset1,function(d){return d[target];}) - 1, 
            d3.max(dataset1, function(d){return d[target];}) + 0.5]);
        
        xAxis.transition()
            .duration(1000)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor","end")

        yAxis.transition().duration(1000).call(d3.axisLeft(yScale))
        // Update scale
        var bars = svg.selectAll("rect")
                      .data(dataset1);
                


        bars.append("g")
                  .attr("transform", "translate(0," +h+")")
                  .call(d3.axisBottom(xScale))
                  .selectAll("text")
                  .style("text-anchor", "end");

        bars.append("g")
            .call(d3.axisLeft(yScale));

        bars.enter()
            .append("rect")
            .attr("x", function(d){
                return xScale(d.Month);
            })
            .attr("y", function(d) {
                return yScale(d[target]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                    return h - yScale(d[target]);
            })
            .attr("fill", function(d) {
                    return "rgb(103,124,138)";
            })
            .merge(bars)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("x", function(d){
                return xScale(d.Month);
            })
            .attr("y", function(d) {
                return yScale(d[target]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                    return h - yScale(d[target]);
            })
            .on("mouseover", function(d) {
                tooltip.transition()
                     .duration(200)
                     .style("text-anchor", "end")
                     .style("opacity", 100);
    
                tooltip.html("<strong>Month: "+ d.Month + "<br/> Unemployment Rate: " + d[target] )
                       .style("left", (d3.event.pageX + 5) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
                    })
            .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });

            bars.exit()
            .transition()
            .duration(200)
            .attr("x", -xScale.bandwidth())
            .remove();


    });
    d3.select("#sort-select").on("change", function () {
        let sort_value = d3.event.target.value; 
        dataset2 = dataset1.sort(function (a, b) {
            switch (sort_value) {
                case "ascending":
                    return a[target] - b[target];
                case "descending":
                    return b[target] - a[target];
            }
        });
        console.log("Data after sorting#2: ", dataset2);

        // svg.selectAll("text")
        // .remove();
        
        var sorting_bars = svg.selectAll("rect")
                      .data(dataset2);

        xScale.domain(dataset1.map(function(d){ return d.Month}))
        xAxis.transition()
            .duration(1000)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor","end")
        yScale.domain([
                    d3.min(dataset1,function(d){return d[target];}) - 1, 
                    d3.max(dataset1, function(d){return d[target];}) + 0.5])
        yAxis.transition()
            .duration(1000)
            .call(d3.axisLeft(yScale))


        sorting_bars.enter()
            .append("rect")
            .attr("x", function(d){
                return xScale(d.Month);
            })
            .attr("y", function(d) {
                return yScale(d[target]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                    return h - yScale(d[target]);
            })
            .attr("fill", function(d) {
                    return "rgb(103,124,138)";
            })
            .merge(sorting_bars)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("x", function(d){
                return xScale(d.Month);
            })
            .attr("y", function(d) {
                return yScale(d[target]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                    return h - yScale(d[target]);
            })
            .on("mouseover", function(d) {
                tooltip.transition()
                     .duration(200)
                     .style("text-anchor", "end")
                     .style("opacity", 100);
    
                tooltip.html("<strong>Month: "+ d.Month + "<br/> Unemployment Rate: " + d[target] )
                       .style("left", (d3.event.pageX + 5) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
                    })
            .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });
            sorting_bars.exit()
            .transition()
            .duration(200)
            .attr("x", -xScale.bandwidth())
            .remove();

    });
    

})


