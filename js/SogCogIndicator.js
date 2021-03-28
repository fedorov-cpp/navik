function SogCogIndicator() {
    var self = this;

    self.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    self.element.setAttribute("class", "SogCogIndicator");
    self.element.setAttribute("width", "100%");
    self.element.setAttribute("height", "100%");
    self.element.setAttribute("viewBox", "0 0 100 100");

    self.back = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    self.back.setAttribute("class", "sci-back");
    self.back.setAttribute("cx", "50");
    self.back.setAttribute("cy", "50");
    self.back.setAttribute("r", "45");
    self.element.appendChild(self.back);

    // indicators
    self.indicators = document.createElementNS("http://www.w3.org/2000/svg", "g");
    self.indicators.setAttribute("class", "sci-indicators");
    self.sogComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.sogComment.setAttribute("class", "sci-sogComment");
    self.sogComment.setAttribute("x", "25");
    self.sogComment.setAttribute("y", "34");
    self.sogComment.innerHTML = "SOG: ";
    self.sogIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.sogIndicator.setAttribute("class", "sci-sog");
    self.sogIndicator.setAttribute("x", "50");
    self.sogIndicator.setAttribute("y", "34");
    self.sogIndicator.innerHTML = "0";
    self.sogIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.sogIndicatorComment.setAttribute("class", "sci-sogComment");
    self.sogIndicatorComment.setAttribute("x", "50");
    self.sogIndicatorComment.setAttribute("y", "44");
    self.sogIndicatorComment.innerHTML = "узлов";
    self.cogComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.cogComment.setAttribute("class", "sci-cogComment");
    self.cogComment.setAttribute("x", "25");
    self.cogComment.setAttribute("y", "70");
    self.cogComment.innerHTML = "COG: ";
    self.cogIndicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.cogIndicator.setAttribute("class", "sci-cog");
    self.cogIndicator.setAttribute("x", "50");
    self.cogIndicator.setAttribute("y", "70");
    self.cogIndicator.innerHTML = "0";
    self.cogIndicatorComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
    self.cogIndicatorComment.setAttribute("class", "sci-cogComment");
    self.cogIndicatorComment.setAttribute("x", "50");
    self.cogIndicatorComment.setAttribute("y", "80");
    self.cogIndicatorComment.innerHTML = "градусов";
    self.indicators.appendChild(self.sogComment);
    self.indicators.appendChild(self.sogIndicator);
    self.indicators.appendChild(self.sogIndicatorComment);
    self.indicators.appendChild(self.cogComment);
    self.indicators.appendChild(self.cogIndicator);
    self.indicators.appendChild(self.cogIndicatorComment);
    self.element.appendChild(self.indicators);

    self.sog = 0;
    self.cog = 0;
    self.element.setSog = function(value) {
        self.sog = value;
        self.sogIndicator.innerHTML = self.sog;
    };
    self.element.setCog = function(value) {
        self.cog = value;
        self.cogIndicator.innerHTML = self.cog;
    };

    self.element.onclick = function() { return false; };
    self.element.onmousedown = function() { return false; };
    self.element.oncontextmenu = function() { return false; };
}

