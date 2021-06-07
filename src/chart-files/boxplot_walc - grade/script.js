var x = new Array(1044);
var Grade = new Array(1044);
d3.csv(
    "https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/Book4.csv",
    function (data) {
        data.forEach(function (d, i) {
            x[i] = d.Walc;
            Grade[i] = d.Result;
        });
        var trace = {
            y: Grade,
            x: x,
            marker: { color: "#69b3a2" },
            type: "box",
        };
        var data = [trace];

        var layout = {
            yaxis: {
                title: "Grade",
                zeroline: true,
            },
            boxmode: "group",
        };

        Plotly.newPlot("myDiv", data, layout);
    }
);
