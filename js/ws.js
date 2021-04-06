var ws = new WebSocket('ws://' + location.host + '/');

ws.onmessage = function(event) {
    let data = null;
    try {
        data = JSON.parse(event.data);
        console.log(data);
    } catch (e) {
        console.log(e);
        return;
    }
    if (data.prop === 'windAngle') {
        let windMeters = document.getElementsByClassName("WindMeter");
        for (let i=0; i < windMeters.length; ++i) {
            windMeters[i].setWindAngle(data.data);
        }
        let windIndicators = document.getElementsByClassName("WindIndicator");
        for (let i=0; i < windIndicators.length; ++i) {
            windIndicators[i].setWindAngle(data.data);
        }
    } else if (data.prop === 'windSpeed') {
        let windMeters = document.getElementsByClassName("WindMeter");
        for (let i=0; i < windMeters.length; ++i) {
            windMeters[i].setWindSpeed(data.data);
        }
        let windIndicators = document.getElementsByClassName("WindIndicator");
        for (let i=0; i < windIndicators.length; ++i) {
            windIndicators[i].setWindSpeed(data.data);
        }
    } else if (data.prop === "depth") {
        let depths = document.getElementsByClassName("DepthMeter");
        for (let i=0; i < depths.length; ++i) {
            depths[i].setDepth(data.data);
        }
        let depthIndicators = document.getElementsByClassName("DepthIndicator");
        for (let i=0; i < depthIndicators.length; ++i) {
            depthIndicators[i].setDepth(data.data);
        }
    } else if (data.prop === "sogcog") {
        let sogCogIndicators = document.getElementsByClassName("SogCogIndicator");
        for (let i=0; i < sogCogIndicators.length; ++i) {
            sogCogIndicators[i].setSog(data.data.sog);
            sogCogIndicators[i].setCog(data.data.cog);
        }
    } else if (data.prop === "coord") {
        let coordIndicators = document.getElementsByClassName("CoordIndicator");
        for (let i=0; i < coordIndicators.length; ++i) {
            coordIndicators[i].setN(data.data.n);
            coordIndicators[i].setE(data.data.e);
        }
    }
};

ws.onopen = null;
ws.onclose = null;
