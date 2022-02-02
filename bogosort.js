function bogoSort() {
    d3.select("#counter").html("<span id='steps'></span> shuffles: <span id='shuffles'></span>")

    var bogoArray = d3.shuffle(d3.range(1,count));

    function bogoShuffle() {

        d3.select("#shuffles").html(++bogoShuffles)

        for (i=0; i<bogoArray.length; i++) {

            d3.select("#text" + bogoArray[i])
                .datum(bogoArray[i])
                .attr("class", "")                
                .attr("transform", function(d) {return "translate(" + (x(i)) + ", 0)"})              
            
            d3.select("#rect" + bogoArray[i])
                .datum(bogoArray[i])
                .attr("class", "")
                .attr("transform", function(d) {return "translate(" + (x(i-1)) + ", 0)"})
        }
    }

    bogoShuffle();

    var sorted = true;
    var i = 0;
    testNum();

    if (stop) {
        bogoShuffles = 0; 
        return stop = false;
    }
    
    function testNum() {
        if (stop) return;

        if (i == bogoArray.length) {
            if (sorted != true) {
                return bogoSort();
            } else {                
                console.log("sorted?!?!?!?")
                bogoShuffles = 0;
                steps = 0;
                return;
            } 
        } 

        d3.select("#rect" + bogoArray[i]).attr("class", "testing")
        d3.select("#steps").html(++steps)

        d3.timeout(function() {
            if (bogoArray[i] != i+1) {sorted = false;}
            i++;
            d3.selectAll("rect").attr("class", "")
            testNum();
        }, durationTime/20)            
    }
}