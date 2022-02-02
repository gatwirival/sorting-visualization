function selectionSort() {
    var min = count,
        spliceIndex,
        i = 0;

    function findMin() {
        if (stop) return stop = false;

        d3.timeout(function() {
        
            if (i<=unsortedArray.length) {

                d3.select("#rect" + unsortedArray[i]).attr("class", "testing")

                d3.timeout(function() {
                    
                    d3.select("#rect" + unsortedArray[i]).attr("class", "")

                    if (unsortedArray[i] < min) {
                        d3.select("#rect" + unsortedArray[i]).attr("class", "min")
                        d3.select("#rect" + min).attr("class", "")
                        min = unsortedArray[spliceIndex = i]
                    }

                    d3.select("#counter").html(++steps);
                    i++;

                    d3.timeout(function() {return findMin()}, durationTime/2);

                }, durationTime/2);

            } else {

                sortedArray.push(min);
                unsortedArray.splice(spliceIndex,1);

                d3.select("#counter").html(++steps);

            rects.transition().duration(durationTime * 4)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal - 1) + ",0)" 
                })

            labels
                .classed("sorted", function(d) {return sortedArray.indexOf(d) == d - 1;})
                .transition().duration(durationTime * 4)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal) + ",0)" 
                })

                rects.attr("class", "")

                d3.timeout(function() {
                    if (unsortedArray.length > 0) selectionSort();
                }, durationTime);
                return;
            }                
        })
    }
    findMin();
}
