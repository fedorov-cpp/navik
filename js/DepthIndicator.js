function DepthIndicator() {
    this.element = SvgElement("DepthIndicator", "100%", "100%", "0 0 100 100");
    this.element.appendChild(/*background*/SvgCircle("di-back", "50", "50", "45"));

    const INDICATORS = {
        depthIndicator: SvgText("di-depth", "50", "50", "0"),
        depthIndicatorComment: SvgText("di-depthComment", "50", "60", "m"),
    };
    for (let widgetName in INDICATORS) {
        this.element.appendChild(INDICATORS[widgetName]);
    }

    this.element.setDepth = (depth) => {
        INDICATORS['depthIndicator'].innerHTML = depth.toString();
    };

    this.element.onclick = function() { return false; };
    this.element.onmousedown = function() { return false; };
    this.element.oncontextmenu = function() { return false; };
}
