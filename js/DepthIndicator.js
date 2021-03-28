function DepthIndicator() {
    var self = this;

    self.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    self.element.setAttribute("class", "DepthIndicator");
    self.element.setAttribute("width", "100%");
    self.element.setAttribute("height", "100%");
    self.element.setAttribute("viewBox", "0 0 100 100");

    self.back = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    self.back.setAttribute("class", "di-back");
    self.back.setAttribute("cx", "50");
    self.back.setAttribute("cy", "50");
    self.back.setAttribute("r", "45");
    self.element.appendChild(self.back);

    // indicators
    self.depthIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.depthIndicator.setAttribute("class", "di-depth");
    self.depthIndicator.setAttribute("x", "50");
    self.depthIndicator.setAttribute("y", "50");
    self.depthIndicator.innerHTML = "0";
    self.depthIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.depthIndicatorComment.setAttribute("class", "di-depthComment");
    self.depthIndicatorComment.setAttribute("x", "50");
    self.depthIndicatorComment.setAttribute("y", "60");
    self.depthIndicatorComment.innerHTML = "м";
    self.element.appendChild(self.depthIndicator);
    self.element.appendChild(self.depthIndicatorComment);

    self.depth = 0;
    self.element.setDepth = function(depth) {
        self.depth = depth;
        self.depthIndicator.innerHTML = self.depth.toString();
    };

    self.element.onclick = function() { return false; };
    self.element.onmousedown = function() { return false; };
    self.element.oncontextmenu = function() { return false; };
}
