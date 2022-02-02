function insertionSort() {

    var value = unsortedArray.shift();
    sortedArray.push(value);      
    reArrange(sortedArray.length-1);

    function reArrange(n) {
        if (stop) return stop = false;            

        d3.selectAll("rect").attr("class", "")                
        d3.select("#rect" + value).attr("class", "testing")
        d3.select("#text" + value).attr("class", "sorted")     
        d3.select("#counter").html(++steps);
        
        if (n > 0 && sortedArray[n-1] > value) {
            d3.timeout(function() {
                sortedArray.splice(n,1);
                sortedArray.splice(n-1,0,value);

                slide(sortedArray[n], n);
                slide(sortedArray[n-1], n-1);

                reArrange(--n)
            }, durationTime * 2);
        } else if (unsortedArray.length) {
            d3.timeout(function() {insertionSort()}, durationTime * 2);
        } else {
        
            return d3.selectAll("rect").attr("class", "")
        }
    }
}