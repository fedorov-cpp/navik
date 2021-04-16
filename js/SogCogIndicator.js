function SogCogIndicator() {
    this.element = SvgElement("SogCogIndicator", "100%", "100%", "0 0 100 100");
    this.element.appendChild(/*background*/SvgCircle("sci-back", "50", "50", "45"));

    const INDICATORS = {
        sogComment: SvgText("sci-sogComment", "25", "34", "SOG: "),
        sogIndicator: SvgText("sci-sog", "50", "34", "0"),
        sogIndicatorComment: SvgText("sci-sogComment", "50", "44", "knots"),
        cogComment: SvgText("sci-cogComment", "25", "70", "COG: "),
        cogIndicator: SvgText("sci-cog", "50", "70", "0"),
        cogIndicatorComment: SvgText("sci-cogComment", "50", "80", "degrees"),
    };
    this.indicators = SvgGroup("sci-indicators");
    for (let widgetName in INDICATORS) {
        this.indicators.appendChild(INDICATORS[widgetName]);
    }
    this.element.appendChild(this.indicators);

    this.element.setSogCog = (value) => {
        INDICATORS['sogIndicator'].innerHTML = value.sog;
        INDICATORS['cogIndicator'].innerHTML = value.cog;
    };

    this.element.onclick = function() { return false; };
    this.element.onmousedown = function() { return false; };
    this.element.oncontextmenu = function() { return false; };
}

