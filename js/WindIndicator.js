function WindIndicator() {
    this.element = SvgElement("WindIndicator", "100%", "100%", "0 0 100 100");
    this.element.appendChild(/*background*/SvgCircle("wi-back", "50", "50", "45"));

    const INDICATORS = {
        windSpeedIndicator: SvgText("wi-windSpeed", "50", "34", "0"),
        windSpeedIndicatorComment: SvgText("wi-windSpeedComment", "50", "44", "m/s"),
        windAngleIndicator: SvgText("wi-windAngle", "50", "70", "0"),
        windAngleIndicatorComment: SvgText("wi-windAngleComment", "50", "80", "degrees"),
    };
    this.indicators = SvgGroup("wi-indicators");
    for (let widgetName in INDICATORS) {
        this.indicators.appendChild(INDICATORS[widgetName]);
    }
    this.element.appendChild(this.indicators);

    this.windAngle = 0;
    this.element.setWindAngle = (value) => {
        if ((value > -1) && (value < 360)) {
            if (Math.abs(value - this.windAngle) > 180) {
                this.windAngle -= 360;
            }
            if (value > 180) {
                INDICATORS['windAngleIndicator'].innerHTML = Math.abs(value - 360).toFixed(0);
            } else {
                INDICATORS['windAngleIndicator'].innerHTML = value.toFixed(0);
            }
            this.windAngle = value;
        }
    };

    this.element.setWindSpeed = (value) => {
        INDICATORS['windSpeedIndicator'].innerHTML = value.toFixed(0);
    };

    this.element.onclick = function() { return false; };
    this.element.onmousedown = function() { return false; };
    this.element.oncontextmenu = function() { return false; };
}
