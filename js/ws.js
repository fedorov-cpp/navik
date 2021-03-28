var ws = new WebSocket('ws://' + location.host + '/');

ws.onmessage = function(event) {
    try {
        var start = event.data.indexOf('^BEG^') + 5;
        var end = event.data.indexOf('$END$');
        var msg = event.data.substr(start, end - start);
    } catch (e) {
        return;
    }
    try {
        var data = JSON.parse(msg);
    } catch (e) {
        return;
    }
    if (data.resp === 'windAngle') {
        var windMeters = document.getElementsByClassName("WindMeter");
        for (var i=0; i < windMeters.length; ++i) {
            windMeters[i].setWindAngle(data.data);
        }
        var windIndicators = document.getElementsByClassName("WindIndicator");
        for (var i=0; i < windIndicators.length; ++i) {
            windIndicators[i].setWindAngle(data.data);
        }
    } else if (data.resp === 'windSpeed') {
        var windMeters = document.getElementsByClassName("WindMeter");
        for (var i=0; i < windMeters.length; ++i) {
            windMeters[i].setWindSpeed(data.data);
        }
        var windIndicators = document.getElementsByClassName("WindIndicator");
        for (var i=0; i < windIndicators.length; ++i) {
            windIndicators[i].setWindSpeed(data.data);
        }
    } else if (data.resp == "depth") {
        var depths = document.getElementsByClassName("DepthMeter");
        for (var i=0; i < depths.length; ++i) {
            depths[i].setDepth(data.data);
        }
        var depthIndicators = document.getElementsByClassName("DepthIndicator");
        for (var i=0; i < depthIndicators.length; ++i) {
            depthIndicators[i].setDepth(data.data);
        }
    } else if (data.resp == "sogcog") {
        var sogCogIndicators = document.getElementsByClassName("SogCogIndicator");
        for (var i=0; i < sogCogIndicators.length; ++i) {
            sogCogIndicators[i].setSog(data.data.sog);
            sogCogIndicators[i].setCog(data.data.cog);
        }
    } else if (data.resp == "coord") {
        var coordIndicators = document.getElementsByClassName("CoordIndicator");
        for (var i=0; i < coordIndicators.length; ++i) {
            coordIndicators[i].setN(data.data.n);
            coordIndicators[i].setE(data.data.e);
        }
    }
};

ws.onopen = function() {
    console.log("opened!");
};

ws.onclose = function() {
    console.log("closed!");
};
