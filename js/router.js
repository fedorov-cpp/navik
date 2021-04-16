let router = new WebSocket('ws://' + location.host + '/');

const ROUTS = {
    windAngle: {WindMeter: 'setWindAngle', WindIndicator: 'setWindAngle'},
    windSpeed: {WindMeter: 'setWindSpeed', WindIndicator: 'setWindSpeed'},
    depth: {DepthMeter: 'setDepth', DepthIndicator: 'setDepth'},
    sogCog: {SogCogIndicator: 'setSogCog'},
    coord: {CoordIndicator: 'setCoord'},
};

router.onmessage = (event) => {
    try {
        let data = JSON.parse(event.data);
        console.log(data);
        let routes = ROUTS[data.prop];
        for (let widgetName in routes) {
            let func = routes[widgetName];
            let widgets = document.getElementsByClassName(widgetName);
            for (let i=0; i < widgets.length; ++i) {
                widgets[i][func](data.data);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

router.onopen = null;
router.onclose = null;
router.onerror = (error) => {
    console.log(error);
};
