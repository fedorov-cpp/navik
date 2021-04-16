function CoordIndicator() {
    this.element = SvgElement("CoordIndicator", "100%", "100%", "0 0 100 100");
    this.element.appendChild(/*background*/SvgCircle("ci-back", "50", "50", "45"));

    const INDICATORS = {
        nIndicator: SvgText("ci-n", "50", "34", "0"),
        nIndicatorComment: SvgText("ci-nComment", "50", "44", "N"),
        eIndicator: SvgText("ci-e", "50", "70", "0"),
        eIndicatorComment: SvgText("ci-eComment", "50", "80", "E"),
    };
    this.indicators = SvgGroup("ci-indicators");
    for (let widgetName in INDICATORS) {
        this.indicators.appendChild(INDICATORS[widgetName]);
    }
    this.element.appendChild(this.indicators);

    this.element.setCoord = (value) => {
        INDICATORS['nIndicator'].innerHTML = value.n;
        INDICATORS['eIndicator'].innerHTML = value.e;
    };

    this.element.onclick = function() { return false; };
    this.element.onmousedown = function() { return false; };
    this.element.oncontextmenu = function() { return false; };
}

