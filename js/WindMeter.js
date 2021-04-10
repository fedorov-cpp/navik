function WindMeter() {
    var self = this;

    self.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    self.element.setAttribute("class", "WindMeter");
    self.element.setAttribute("width", "100%");
    self.element.setAttribute("height", "100%");
    self.element.setAttribute("viewBox", "0 0 100 100");

    // circles
    self.circlesNames = ["back", "deadband", "scale-right", "scale-left", "ticks"];
    self.circlesRadiuses = ["40", "18", "29", "29", "32"];
    self.circles = [];
    for (var i=0; i < self.circlesNames.length; ++i) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("class", "wm-" + self.circlesNames[i]);
        circle.setAttribute("r", self.circlesRadiuses[i]);
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        self.circles.push(circle);
        self.element.appendChild(circle);
    }
    // grids
    self.gridsNames = ["0", "30", "60", "90", "120", "240", "270", "300", "330"];
    self.grids = [];
    for (var i=0; i < self.gridsNames.length; ++i) {
        var grid = document.createElementNS("http://www.w3.org/2000/svg", "line");
        grid.setAttribute("class", "wm-grid " + self.gridsNames[i]);
        grid.setAttribute("x1", "50"); grid.setAttribute("y1", "50");
        grid.setAttribute("x2", "50"); grid.setAttribute("y2", "10");
        grid.setAttribute("transform", "rotate(" + self.gridsNames[i] + " 50 50)");
        self.grids.push(grid);
        self.element.appendChild(grid);
    }
    // ship
    self.ship = document.createElementNS("http://www.w3.org/2000/svg", "path");
    self.ship.setAttribute("class", "wm-ship");
    self.ship.setAttribute("d", "M 63 72.5 S 73 45 50 22.5 M 63 72.5 S 50 79.5 37 72.5 " +
        "M 37 72.5 S 27 45 50 22.5 L 63 72.5 37 72.5 Z");
    self.element.appendChild(self.ship);
    // ticks text path
    self.ticksTextPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    self.ticksTextPath.setAttribute("id", "wm-ticksTextPath");
    self.ticksTextPath.setAttribute("d", "M 50 85 A 35 35 0 0 1 50 15 A 35 35 0 0 1 50 85");
    self.ticksTextPath.setAttribute("fill", "none");
    self.element.appendChild(self.ticksTextPath);
    // pointer
    self.pointer = document.createElementNS("http://www.w3.org/2000/svg", "path");
    self.pointer.setAttribute("class", "wm-pointer");
    self.pointer.setAttribute("d", "M 52 15.6 A 32,32 0 0,0 48,15.6 L 50 27 L 52 15.6 Z");
    self.pointerTransform = document.createElementNS("http://www.w3.org/2000/svg",
        "animateTransform");
    self.pointerTransform.setAttribute("id", "wm-pointer-transform");
    self.pointerTransform.setAttribute("attributeName", "transform");
    self.pointerTransform.setAttribute("type", "rotate");
    self.pointerTransform.setAttribute("dur", "0.5s");
    self.pointerTransform.setAttribute("begin", "indefinite");
    self.pointerTransform.setAttribute("repeatCount", "1");
    self.pointerTransform.setAttribute("fill", "freeze");
    self.pointer.appendChild(self.pointerTransform);
    self.element.appendChild(self.pointer);
    // scale text
    self.scaleText = document.createElementNS("http://www.w3.org/2000/svg", "g");
    self.scaleText.setAttribute("class", "wm-scaleText");
    self.scaleTextTexts = ["0°", "30°", "30°", "60°", "60°", "90°", "90°"];
    self.scaleTextOffsets = ["50%", "41.6%", "58.3%", "33.3%", "66.6%", "25%", "75%"];
    for (var i=0; i < self.scaleTextTexts.length; ++i) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPath.setAttribute("href", "#wm-ticksTextPath");
        textPath.setAttribute("startOffset", self.scaleTextOffsets[i]);
        textPath.innerHTML = self.scaleTextTexts[i];
        text.appendChild(textPath);
        self.scaleText.appendChild(text);
    }
    self.element.appendChild(self.scaleText);
    // indicators
    self.indicators = document.createElementNS("http://www.w3.org/2000/svg", "g");
    self.indicators.setAttribute("class", "wm-indicators");
    self.windSpeedIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windSpeedIndicator.setAttribute("class", "wm-windSpeed");
    self.windSpeedIndicator.setAttribute("x", "50");
    self.windSpeedIndicator.setAttribute("y", "42");
    self.windSpeedIndicator.innerHTML = "0";
    self.windSpeedIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windSpeedIndicatorComment.setAttribute("class", "wm-windSpeedComment");
    self.windSpeedIndicatorComment.setAttribute("x", "50");
    self.windSpeedIndicatorComment.setAttribute("y", "47");
    self.windSpeedIndicatorComment.innerHTML = "m/s";
    self.windAngleIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windAngleIndicator.setAttribute("class", "wm-windAngle");
    self.windAngleIndicator.setAttribute("x", "50");
    self.windAngleIndicator.setAttribute("y", "63");
    self.windAngleIndicator.innerHTML = "0";
    self.windAngleIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.windAngleIndicatorComment.setAttribute("class", "wm-windAngleComment");
    self.windAngleIndicatorComment.setAttribute("x", "50");
    self.windAngleIndicatorComment.setAttribute("y", "68");
    self.windAngleIndicatorComment.innerHTML = "degrees";
    self.indicators.appendChild(self.windSpeedIndicator);
    self.indicators.appendChild(self.windSpeedIndicatorComment);
    self.indicators.appendChild(self.windAngleIndicator);
    self.indicators.appendChild(self.windAngleIndicatorComment);
    self.element.appendChild(self.indicators);


    self.windAngle = 0;
    self.windSpeed = 0;
    self.element.setWindAngle = function(value) {
        console.log("setting wind angle: ", value);
        if ((value > -1) && (value < 360)) {
            if (Math.abs(value - self.windAngle) > 180)
                self.windAngle -= 360;
            self.pointerTransform.setAttribute("from", self.windAngle + " 50 50");
            self.pointerTransform.setAttribute("to", value + " 50 50");
            self.pointerTransform.beginElement();
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

