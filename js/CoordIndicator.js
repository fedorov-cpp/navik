function CoordIndicator() {
    var self = this;

    self.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    self.element.setAttribute("class", "CoordIndicator");
    self.element.setAttribute("width", "100%");
    self.element.setAttribute("height", "100%");
    self.element.setAttribute("viewBox", "0 0 100 100");

    self.back = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    self.back.setAttribute("class", "ci-back");
    self.back.setAttribute("cx", "50");
    self.back.setAttribute("cy", "50");
    self.back.setAttribute("r", "45");
    self.element.appendChild(self.back);

    // indicators
    self.indicators = document.createElementNS("http://www.w3.org/2000/svg", "g");
    self.indicators.setAttribute("class", "ci-indicators");
    self.nIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.nIndicator.setAttribute("class", "ci-n");
    self.nIndicator.setAttribute("x", "50");
    self.nIndicator.setAttribute("y", "34");
    self.nIndicator.innerHTML = "0";
    self.nIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.nIndicatorComment.setAttribute("class", "ci-nComment");
    self.nIndicatorComment.setAttribute("x", "50");
    self.nIndicatorComment.setAttribute("y", "44");
    self.nIndicatorComment.innerHTML = "N";
    self.eIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.eIndicator.setAttribute("class", "ci-e");
    self.eIndicator.setAttribute("x", "50");
    self.eIndicator.setAttribute("y", "70");
    self.eIndicator.innerHTML = "0";
    self.eIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.eIndicatorComment.setAttribute("class", "ci-eComment");
    self.eIndicatorComment.setAttribute("x", "50");
    self.eIndicatorComment.setAttribute("y", "80");
    self.eIndicatorComment.innerHTML = "E";
    self.indicators.appendChild(self.nIndicator);
    self.indicators.appendChild(self.nIndicatorComment);
    self.indicators.appendChild(self.eIndicator);
    self.indicators.appendChild(self.eIndicatorComment);
    self.element.appendChild(self.indicators);

    self.n = 0;
    self.e = 0;
    self.element.setN = function(value) {
        self.n = value;
        self.nIndicator.innerHTML = self.n;
    };
    self.element.setE = function(value) {
        self.e = value;
        self.eIndicator.innerHTML = self.e;
    };

    self.element.onclick = function() { return false; };
    self.element.onmousedown = function() { return false; };
    self.element.oncontextmenu = function() { return false; };
}

