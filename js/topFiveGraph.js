// Send a request to API to get the data of top five scorers and process the data
function getTopFive() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getTopFive";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
            data = [
                {label: result[0].array_to_json[0].port_id, value: result[0].array_to_json[0].rank},
                {label: result[0].array_to_json[1].port_id, value: result[0].array_to_json[1].rank},
                {label: result[0].array_to_json[2].port_id, value: result[0].array_to_json[2].rank},
                {label: result[0].array_to_json[3].port_id, value: result[0].array_to_json[3].rank},
                {label: result[0].array_to_json[4].port_id, value: result[0].array_to_json[4].rank}
            ];
            console.log(data);
            plotTopGraph(data)
        }
    })// end of the ajax request
}

// Reference code: https://stackoverflow.com/questions/38983807/how-to-animate-a-horizontal-d3-bar-chart/38987948#38987948
// JSfiddle: https://jsfiddle.net/8v88gwqn/
function plotTopGraph(data) {

    // check if the graph exists
    // if exists, remove it
    if (d3.select("svg")) {
        d3.select("svg").remove();
    }

    var div = d3.select("#topFiveGraph").append("div").attr("class", "toolTip");

    var axisMargin = 20,
        margin = 40,
        valueMargin = 4,
        width = parseInt(d3.select('#topFiveGraph').style('width'), 10),
        height = parseInt(d3.select('#topFiveGraph').style('height'), 10),
        barHeight = (height - axisMargin - margin * 2) * 0.4 / data.length,
        barPadding = (height - axisMargin - margin * 2) * 0.6 / data.length,
        data, bar, svg, scale, xAxis, labelWidth = 0;

    max = d3.max(data, function (d) {
        return d.value;
    });


    svg = d3.select('#topFiveGraph')
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    bar.attr("class", "bar")
        .attr("cx", 0)
        .attr("transform", function (d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    bar.append("text")
        .attr("class", "label")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em") //vertical align middle
        .text(function (d) {
            return d.label;
        }).each(function () {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

    scale = d3.scale.linear()
        .domain([0, max])
        .range([0, width - margin * 2 - labelWidth]);

    xAxis = d3.svg.axis()
        .scale(scale)
        .tickSize(-height + 2 * margin + axisMargin)
        .orient("bottom");

    bar.append("rect")
        .attr("transform", "translate(" + labelWidth + ", 0)")
        .attr("height", barHeight)
        .attr("width", 0)
        .transition()
        .duration(1500)
        .delay(function (d, i) {
            return i * 250
        })
        .attr("width", function (d) {
            return scale(d.value);
        });

    bar.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .text(function (d) {
            return ("Rank: " + d.value);
        })
        .attr("x", function (d) {
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scale(d.value));
        });

    bar
        .on("mousemove", function (d) {
            div.style("left", d3.event.pageX + 10 + "px");
            div.style("top", d3.event.pageY - 25 + "px");
            div.style("display", "inline-block");
            div.html((d.label) + "<br>" + "Rank: " + (d.value));
        });
    bar
        .on("mouseout", function (d) {
            div.style("display", "none");
        });

    svg.insert("g", ":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform", "translate(" + (margin + labelWidth) + "," + (height - axisMargin - margin) + ")")
        .call(xAxis);

}