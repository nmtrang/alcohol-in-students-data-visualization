var x = new Array(728)
var Grade_Mother = new Array(728)
var x1 = new Array(243)
var Grade_Father = new Array(243)
var x2 = new Array(73)
var Grade_Other = new Array(73)
d3.csv("https://raw.githubusercontent.com/MrCat-2510/Testing/main/Visual_Data/Book4.csv", function(data) {

    data.forEach(function(d,i){
      if(d.guardian == "mother"){
          x[i] = d.Walc
          Grade_Mother[i] = d.Result
      }
      if(d.guardian == "father"){
        x1[i] = d.Walc
        Grade_Father[i] = d.Result
      }
      if(d.guardian == "other"){
        x2[i] = d.Walc
        Grade_Other[i] = d.Result
      }
    })
    console.log("I hope this working")
    console.log(Grade_Father)
    var trace1 = {
      y: Grade_Mother,
      x: x,
      name: 'mother',
      marker: {color: '#3D9970'},
      type: 'box'
    };
    var trace2 = {
      y: Grade_Father,
      x: x1,
      name: 'father',
      marker: {color: '#FF4136'},
      type: 'box'
    };
    var trace3 = {
      y: Grade_Other,
      x: x2,
      name: 'other',
      marker: {color: '#FF851B'},
      type: 'box'
    };
    var data = [trace1, trace2, trace3];

    var layout = {
      yaxis: {
        title: 'Grade',
        zeroline: false
      },
      boxmode: 'group'
    };

    Plotly.newPlot('myDiv', data, layout);
})
