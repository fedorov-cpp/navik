function DepthMeter(maxDepth, totalPoints) {
    var self = this;
    self.maxDepth = maxDepth;
    self.k = totalPoints / self.maxDepth;
    self.depth = maxDepth;
    self.data = [];
    self.totalPoints = totalPoints;
    for (var i=0; i < totalPoints; ++i)
        self.data.push(self.depth);

    self.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    self.element.setAttribute("class", "DepthMeter");
    self.element.setAttribute("width", "100%");
    self.element.setAttribute("height", "100%");
    self.element.setAttribute("viewBox", "0 0 " + self.totalPoints.toString() +
        " " + self.totalPoints.toString());

    self.sea = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    self.sea.setAttribute("class", "dm-sea");
    self.sea.setAttribute("cx", (self.totalPoints / 2).toString());
    self.sea.setAttribute("cy", (self.totalPoints / 2).toString());
    self.sea.setAttribute("r", (self.totalPoints / 2).toString());
    self.element.appendChild(self.sea);

    self.seabed = document.createElementNS("http://www.w3.org/2000/svg", "path");
    self.seabed.setAttribute("class", "dm-seabed");
    self.element.appendChild(self.seabed);

    self.indicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.indicator.setAttribute("class", "dm-indicator");
    self.indicator.setAttribute("x", (self.totalPoints / 2).toString());
    self.indicator.setAttribute("y", (self.totalPoints / 3).toString());
    self.indicator.innerHTML = "0";
    self.element.appendChild(self.indicator);
    self.indicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.indicatorComment.setAttribute("class", "dm-indicatorComment");
    self.indicatorComment.setAttribute("x", (self.totalPoints / 2).toString());
    self.indicatorComment.setAttribute("y", (self.totalPoints / 2).toString());
    self.indicatorComment.innerHTML = "м";
    self.element.appendChild(self.indicatorComment);


    self.element.setDepth = function(depth) {
        self.depth = depth;
        self.indicator.innerHTML = self.depth.toString();
    };
    self.drawSeabed = function() {
        self.data.shift();
        self.data.push(self.depth);
        // draw
        var curve = "M 0 " + self.totalPoints + " ";
        for (var i=0; i < self.data.length; ++i) {
            curve += "L " + i + " " + self.data[i] * self.k + " ";
        }
        curve += "L " + totalPoints + " " + self.totalPoints + " Z";
        self.seabed.setAttribute("d", curve);
    };
    self.interval = setInterval(self.drawSeabed, 1000);
}
