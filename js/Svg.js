let SvgText = (cls, x, y, text) => {
  let widget = document.createElementNS("http://www.w3.org/2000/svg", "text");
  widget.setAttribute("class", cls);
  widget.setAttribute("x", x);
  widget.setAttribute("y", y);
  widget.innerHTML = text;
  return widget;
};

let SvgCircle = (cls, cx, cy, r) => {
  let widget = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  widget.setAttribute("class", cls);
  widget.setAttribute("cx", cx);
  widget.setAttribute("cy", cy);
  widget.setAttribute("r", r);
  return widget;
};

let SvgElement = (cls, width, height, viewBox) => {
  let widget = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  widget.setAttribute("class", cls);
  widget.setAttribute("width", width);
  widget.setAttribute("height", height);
  widget.setAttribute("viewBox", viewBox);
  return widget;
};

let SvgGroup = (cls) => {
  let widget = document.createElementNS("http://www.w3.org/2000/svg", "g");
  widget.setAttribute("class", cls);
  return widget;
};