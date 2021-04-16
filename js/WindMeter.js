function WindMeter() {
    this.element = SvgElement("WindMeter", "100%", "100%", "0 0 100 100");

    // circles
    this.circlesNames = ["back", "deadband", "scale-right", "scale-left", "ticks"];
    this.circlesRadiuses = ["40", "18", "29", "29", "32"];
    this.circles = [];
    for (let i=0; i < this.circlesNames.length; ++i) {
        let circle = SvgCircle("wm-" + this.circlesNames[i], "50", "50", this.circlesRadiuses[i]);
        this.circles.push(circle);
        this.element.appendChild(circle);
    }
    // grids
    this.gridsNames = ["0", "30", "60", "90", "120", "240", "270", "300", "330"];
    this.grids = [];
    for (let i=0; i < this.gridsNames.length; ++i) {
        let grid = document.createElementNS("http://www.w3.org/2000/svg", "line");
        grid.setAttribute("class", "wm-grid " + this.gridsNames[i]);
        grid.setAttribute("x1", "50");
        grid.setAttribute("y1", "50");
        grid.setAttribute("x2", "50");
        grid.setAttribute("y2", "10");
        grid.setAttribute("transform", "rotate(" + this.gridsNames[i] + " 50 50)");
        this.grids.push(grid);
        this.element.appendChild(grid);
    }
    // ship
    this.ship = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.ship.setAttribute("class", "wm-ship");
    this.ship.setAttribute("d", "M 63 72.5 C 63 72.5 73 45 50 22.5 C 27 45 37 72.5 37 72.5 C 43 77 57 77 63 72.5 Z");
    this.element.appendChild(this.ship);
    // ticks text path
    this.ticksTextPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.ticksTextPath.setAttribute("id", "wm-ticksTextPath");
    this.ticksTextPath.setAttribute("d", "M 50 85 A 35 35 0 0 1 50 15 A 35 35 0 0 1 50 85");
    this.ticksTextPath.setAttribute("fill", "none");
    this.element.appendChild(this.ticksTextPath);
    // pointer
    this.pointer = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.pointer.setAttribute("class", "wm-pointer");
    this.pointer.setAttribute("d", "M 52 15.6 A 32,32 0 0,0 48,15.6 L 50 27 L 52 15.6 Z");
    this.pointerTransform = document.createElementNS("http://www.w3.org/2000/svg",
        "animateTransform");
    this.pointerTransform.setAttribute("id", "wm-pointer-transform");
    this.pointerTransform.setAttribute("attributeName", "transform");
    this.pointerTransform.setAttribute("type", "rotate");
    this.pointerTransform.setAttribute("dur", "0.5s");
    this.pointerTransform.setAttribute("begin", "indefinite");
    this.pointerTransform.setAttribute("repeatCount", "1");
    this.pointerTransform.setAttribute("fill", "freeze");
    this.pointer.appendChild(this.pointerTransform);
    this.element.appendChild(this.pointer);
    // scale text
    this.scaleText = SvgGroup("wm-scaleText");
    this.scaleTextTexts = ["0°", "30°", "30°", "60°", "60°", "90°", "90°"];
    this.scaleTextOffsets = ["50%", "41.6%", "58.3%", "33.3%", "66.6%", "25%", "75%"];
    for (let i=0; i < this.scaleTextTexts.length; ++i) {
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPath.setAttribute("href", "#wm-ticksTextPath");
        textPath.setAttribute("startOffset", this.scaleTextOffsets[i]);
        textPath.innerHTML = this.scaleTextTexts[i];
        text.appendChild(textPath);
        this.scaleText.appendChild(text);
    }
    this.element.appendChild(this.scaleText);

    const INDICATORS = {
        windSpeedIndicator: SvgText("wm-windSpeed", "50", "42", "0"),
        windSpeedIndicatorComment: SvgText("wm-windSpeedComment", "50", "47", "m/s"),
        windAngleIndicator: SvgText("wm-windAngle", "50", "63", "0"),
        windAngleIndicatorComment: SvgText("wm-windAngleComment", "50", "68", "degrees"),
    };
    this.indicators = SvgGroup("wm-indicators");
    for (let widgetName in INDICATORS) {
        this.indicators.appendChild(INDICATORS[widgetName]);
    }
    this.element.appendChild(this.indicators);

    this.windAngle = 0;
    this.element.setWindAngle = (value) => {
        if ((value > -1) && (value < 360)) {
            if (Math.abs(value - this.windAngle) > 180)
                this.windAngle -= 360;
            this.pointerTransform.setAttribute("from", this.windAngle + " 50 50");
            this.pointerTransform.setAttribute("to", value + " 50 50");
            this.pointerTransform.beginElement();
            if (value > 180)
                INDICATORS['windAngleIndicator'].innerHTML = Math.abs(value - 360).toFixed(0);
            else
                INDICATORS['windAngleIndicator'].innerHTML = value.toFixed(0);
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

