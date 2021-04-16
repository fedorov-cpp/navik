function DepthMeter(maxDepth, totalPoints) {
    this.maxDepth = maxDepth;
    this.k = totalPoints / this.maxDepth;
    this.depth = maxDepth;
    this.data = [];
    this.totalPoints = totalPoints;
    for (let i=0; i < totalPoints; ++i) {
        this.data.push(this.depth);
    }

    this.element = SvgElement("DepthMeter", "100%", "100%", "0 0 " + this.totalPoints.toString() + " " + this.totalPoints.toString());
    this.element.appendChild(/*background*/SvgCircle("dm-sea", (this.totalPoints / 2).toString(), (this.totalPoints / 2).toString(), (this.totalPoints / 2).toString()));

    this.seabed = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.seabed.setAttribute("class", "dm-seabed");
    this.element.appendChild(this.seabed);

    const INDICATORS = {
        indicator: SvgText("dm-indicator", (this.totalPoints / 2).toString(), (this.totalPoints / 3).toString(), "0"),
        indicatorComment: SvgText("dm-indicatorComment", (this.totalPoints / 2).toString(), (this.totalPoints / 2).toString(), "m"),
    };
    for (let widgetName in INDICATORS) {
        this.element.appendChild(INDICATORS[widgetName]);
    }

    this.element.setDepth = (depth) => {
        this.depth = depth;
        INDICATORS['indicator'].innerHTML = this.depth.toString();
    };

    this.drawSeabed = () => {
        this.data.shift();
        this.data.push(this.depth);
        // draw
        let curve = "M 0 " + this.totalPoints + " ";
        for (let i=0; i < this.data.length; ++i) {
            curve += "L " + i + " " + this.data[i] * this.k + " ";
        }
        curve += "L " + totalPoints + " " + this.totalPoints + " Z";
        this.seabed.setAttribute("d", curve);
    };

    this.interval = setInterval(this.drawSeabed, 1000);
}
