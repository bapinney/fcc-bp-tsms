var express = require('express');
var app = express();
var listenPort = 8080;
var url = require('url');

var getFullMo = function(moNum) {
//    console.log("testing!");
    switch (moNum) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "September";
    }
}

app.get('*', function(req, res) {
    var parsedURL = url.parse(req.url);
    var query = parsedURL.pathname.substring(1);
    var validTime = false;
    query = decodeURI(query);
//    console.log("Query is" + query);
    
    if (typeof parseInt(query) === "number") {
        //Numeric timestamp
        if (!isNaN((new Date(parseInt(query) * 1000)).getMonth())) {
//            console.log("Valid timestamp!");
            var date = new Date(parseInt(query) * 1000);
            validTime = true;
        }
    }
    if (validTime == false && !isNaN(new Date(query).getMonth())) {
        var date = new Date(query);
//        console.log("Valid date string");
        validTime = true;
    }
    
    if (validTime === true) {
//        console.log("valid time!");
        var dateTS = date.getTime(); //Gets time in MS
        dateTS = parseInt(dateTS/1000, 10); //Drop the ms and make an int
        var humanDate = getFullMo(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
        var output = {"unix": dateTS, "natural": humanDate};

    }
    else {
        var output = {"unix": null, "natural": null};        
    }
    var outStr = JSON.stringify(output);
    res.write(outStr);
    res.end();
});

app.listen(listenPort, function() {
   console.log("Example app listening on port " + listenPort); 
});

