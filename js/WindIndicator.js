function WindIndicator() {
    var self = this;

    self.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    self.element.setAttribute("class", "WindIndicator");
    self.element.setAttribute("width", "100%");
    self.element.setAttribute("height", "100%");
    self.element.setAttribute("viewBox", "0 0 100 100");

    self.back = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    self.back.setAttribute("class", "wi-back");
    self.back.setAttribute("cx", "50");
    self.back.setAttribute("cy", "50");
    self.back.setAttribute("r", "45");
    self.element.appendChild(self.back);

    // indicators
    self.indicators = document.createElementNS("http://www.w3.org/2000/svg", "g");
    self.indicators.setAttribute("class", "wi-indicators");
    self.windSpeedIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windSpeedIndicator.setAttribute("class", "wi-windSpeed");
    self.windSpeedIndicator.setAttribute("x", "50");
    self.windSpeedIndicator.setAttribute("y", "34");
    self.windSpeedIndicator.innerHTML = "0";
    self.windSpeedIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windSpeedIndicatorComment.setAttribute("class", "wi-windSpeedComment");
    self.windSpeedIndicatorComment.setAttribute("x", "50");
    self.windSpeedIndicatorComment.setAttribute("y", "44");
    self.windSpeedIndicatorComment.innerHTML = "м/с";
    self.windAngleIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windAngleIndicator.setAttribute("class", "wi-windAngle");
    self.windAngleIndicator.setAttribute("x", "50");
    self.windAngleIndicator.setAttribute("y", "70");
    self.windAngleIndicator.innerHTML = "0";
    self.windAngleIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windAngleIndicatorComment.setAttribute("class", "wi-windAngleComment");
    self.windAngleIndicatorComment.setAttribute("x", "50");
    self.windAngleIndicatorComment.setAttribute("y", "80");
    self.windAngleIndicatorComment.innerHTML = "градусов";
    self.indicators.appendChild(self.windSpeedIndicator);
    self.indicators.appendChild(self.windSpeedIndicatorComment);
    self.indicators.appendChild(self.windAngleIndicator);
    self.indicators.appendChild(self.windAngleIndicatorComment);
    self.element.appendChild(self.indicators);

    self.windAngle = 0;
    self.windSpeed = 0;
    self.element.setWindAngle = function(value) {
        if ((value > -1) && (value < 360)) {
            if (Math.abs(value - self.windAngle) > 180)
                self.windAngle -= 360;
            if (value > 180)
                self.windAngleIndicator.innerHTML = Math.abs(value - 360).toFixed(0);
            else
                self.windAngleIndicator.innerHTML = value.toFixed(0);
            self.windAngle = value;
        }
    };
    self.element.setWindSpeed = function(value) {
        self.windSpeedIndicator.innerHTML = value.toFixed(0);
    };

    self.element.onclick = function() { return false; };
    self.element.onmousedown = function() { return false; };
    self.element.oncontextmenu = function() { return false; };
}
