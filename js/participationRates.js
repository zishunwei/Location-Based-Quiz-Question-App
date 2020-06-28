var graphData = [];
var ratesGraphTitle;

// for all users
function getAllRates() {
    alert("The graph is shown at the end of website, slide down to view it!")
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getParticipationRates";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {

            sortData(result[0].array_to_json);
            console.log(graphData);
            ratesGraphTitle = "Daily Participation Rates in Last Week (For All Users)"
            plotRatesGraph(graphData);

        }
    })// end of the ajax request
}

// for current user only
function getUserRates() {
    alert("The graph is shown at the end of website, slide down to view it!")
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getParticipationRates/" + httpsPortNumberAPI;
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {

            sortData(result[0].array_to_json);
            console.log(graphData);
            ratesGraphTitle = "Daily Participation Rates in Last Week (For Me Only)"
            plotRatesGraph(graphData);

        }
    })// end of the ajax request
}

// to check each item of the array and group it for plotting D3 graph
// if there is not data in one day, make the values as 0
function groupData(i, day) {

    if (i.day == day) {
        graphData.push({
            "day": i.day,
            "values": [
                {"value": i.questions_answered, "label": "question answered"},
                {"value": i.questions_correct, "label": "question correct"}
            ]
        })
    } else {
        graphData.push({
            "day": day,
            "values": [
                {"value": 0, "label": "question answered"},
                {"value": 0, "label": "question correct"}
            ]
        })
    }
}

// to foreach the array, sort in the order of "Monday to Sunday"
function sortData (data){
    for (var i in data) {
        groupData(data[i], "Monday");
        groupData(data[i], "Tuesday");
        groupData(data[i], "Wednesday");
        groupData(data[i], "Thursday");
        groupData(data[i], "Friday");
        groupData(data[i], "Saturday");
        groupData(data[i], "Sunday");
    }
}

// use code by https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad
// plot the data processed to a D3 graph
function plotRatesGraph(data) {
    // check if the graph exists
    // if exists, remove it
    if (d3.select("svg")){
        d3.select("svg").remove();
        graphData = [];
    }

    var margin = {top: 30, right: 10, bottom: 10, left: 40},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var color = d3.scale.ordinal()
        .range(["#ca0020", "#0571b0"]);

    var svg = d3.select('#ratesGraph').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var daysNames = data.map(function (d) {
        return d.day;
    });

    var labelNames = data[0].values.map(function (d) {
        return d.label;
    });

    x0.domain(daysNames);
    x1.domain(labelNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function (day) {
        return d3.max(day.values, function (d) {
            return d.value;
        });
    })]);

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(ratesGraphTitle);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style('opacity', '0')
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight', 'bold')
        .text("Value");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

    var slice = svg.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.day) + ",0)";
        });

    slice.selectAll("rect")
        .data(function (d) {
            return d.values;
        })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) {
            return x1(d.label);
        })
        .style("fill", function (d) {
            return color(d.label)
        })
        .attr("y", function (d) {
            return y(0);
        })
        .attr("height", function (d) {
            return height - y(0);
        })
        .on("mouseover", function (d) {
            d3.select(this).style("fill", d3.rgb(color(d.label)).darker(2));
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", color(d.label));
        })
        .append("svg:title")
        .text(function(d) { return d.value; });

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {
            return Math.random() * 1000;
        })
        .duration(1000)
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) {
            return height - y(d.value);
        });

    //Legend
    var legend = svg.selectAll(".legend")
        .data(data[0].values.map(function (d) {
            return d.label;
        }).reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        })
        .style("opacity", "0");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) {
            return color(d);
        });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        });

    legend.transition().duration(500).delay(function (d, i) {
        return 1300 + 100 * i;
    }).style("opacity", "1");

}
