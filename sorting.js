var count = 1 + 50,
        durationTime = 2000/count,
        array = d3.shuffle(d3.range(1,count)),
        unsortedArray = [...array],
        sortedArray = [],
        stop = false,
        steps = 0,
        bogoShuffles = 0;
    
    var margin = {top: 40, right: 40, bottom: 180, left: 40},
        width = 960 - margin.left - margin.right,
        height = 5000 - margin.top - margin.bottom;

    var barWidth = width/count;

    var x = d3.scaleLinear()
        .domain([0,count])
        .range([0, width]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      
    var rects = svg.append("g")
        .attr("transform", "translate(" + barWidth + ",2)")
        .selectAll("rect")
        .data(unsortedArray)
      .enter().append("rect")
    
    var labels = svg.selectAll("text")
        .data(unsortedArray)
      .enter().append("text")
        
    labels.attr("id", function(d) {return "text" + d})
        .attr("transform", function(d, i) {return "translate(" + x(i) + ",0)"})
        .html(function(d) {return d;})

    rects.attr("id", function(d) {return "rect" + d})
        .attr("transform", function(d, i) {return "translate(" + (x(i) - barWidth) + ",0)"})
        .attr("width", barWidth *.9)
        .attr("height", function(d) {return d*barWidth/3})

    function reset() {
        unsortedArray = [...array];
        sortedArray = [];
        stop = false;

        d3.select("#counter").html(steps = 0)

        labels.attr("class", "")                
            .transition().duration(2000)
            .attr("transform", function(d, i) {return "translate(" + (x(i)) + ", 0)"})              
        
        rects.attr("class", "")                
            .transition().duration(2000)
            .attr("transform", function(d, i) {return "translate(" + (x(i-1)) + ", 0)"})
    }

    // Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    document.querySelector(".bubblesort").disabled = true;
    document.querySelector(".insertion").disabled = true;
    document.querySelector(".mergesort").disabled = true;
    document.querySelector(".bogosort").disabled = true;
    document.querySelector(".selection").disabled = true;
    //document.querySelector(".mergesort").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    document.querySelector(".bubblesort").disabled = false;
    document.querySelector(".insertion").disabled = false;
    document.querySelector(".mergesort").disabled = false;
    //document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selection").disabled = false;
    document.querySelector(".bogosort").disabled = false;
}