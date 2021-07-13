function buildMetadata(sample) {
    console.log(sample)

    d3.json("../data/samples.json").then(data => {
        var metadata = data.metadata;
        console.log(metadata)
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]

        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    })
}

function buildCharts(sample) {
    // console.log(sample)
    d3.json("../data/samples.json").then(data => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.
      id == sample)
      var result = resultArray[0]
      
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values
      
      var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse()
      var barData = [
          {
            y:yticks,
            x:sample_values.slice(0,10).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
          }
      ]

     Plotly.newPlot("bar", barData)
      
         // Bubble Chart
         var bubbleLayout = {
           title: "Bacteria Cultures per Sample",
           margin: {t: 0},
           hovermode: "closest",
           xaxis: { title: "OTU ID" },
           margin: { t: 30}
         };
         var bubbleData = [
           {
               x: otu_ids,
               y: sample_values,
               text: otu_labels,
               mode: "markers",
               marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
               }
            }
         ];
         Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    })
}


function init () {

    var selector = d3.select("#selDataset"); 

    d3.json("../data/samples.json").then(data => {
        
        var sampleNames = data.names;
        sampleNames.forEach(sample => {
           selector
            .append("option")
            .text(sample)
            .property("value, sample");
        })

        var firstSample = sampleNames[0]

        // console.log(firstSample)
        buildCharts(firstSample);
        buildMetadata(firstSample);
    })
    

}




// ******Updates bar chart when drop down is selected
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

init();
