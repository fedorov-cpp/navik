function ChoiceOption(name, widget, parent) {
    var self = this;
    self.parent = parent;
    self.name = name;
    self.widget = widget;
    self.element = document.createElement("div");
    self.element.setAttribute("class", "choiceOption");
    self.element.innerHTML = self.name;
    self.element.onmousedown = function() { self.parent.selected(self.widget); };
}

function Choice(names, widgets) {
    var self = this;
    self.names = names;
    self.widgets = widgets;
    self.shown = false;
    self.div = null;

    self.close = function() {
        if (self.shown == true) {
            self.element.parentNode.removeChild(self.element);
            self.shown = false;
        }
    };
    self.show = function(e) {
        self.close();
        if (e.target != self.element) {
            if (!e.target.classList.contains("changeable")) {
                // search changeable among parents recursively
                var target = e.target;
                while (target.parentNode) {
                    target = target.parentNode;
                    if (target.classList.contains("changeable")) {
                        self.div = target;
                        break;
                    }
                }
                if (self.div)
                    while (self.div.firstChild) {
                        self.div.removeChild(self.div.firstChild);
                    }
                else
                    return;
            } else self.div = e.target;
            self.div.appendChild(self.element);
            self.shown = true;
        }
    };
    self.selected = function(widget) {
        if (self.div) {
            self.close();
            if (widget == DepthMeter)
                self.div.appendChild(new widget(5, 180).element);
            else
                self.div.appendChild(new widget().element);
        }
    };

    self.element = document.createElement("div");
    self.element.setAttribute("id", "choicePane");
    for (var i=0; i < names.length; ++i) {
        var option = new ChoiceOption(self.names[i], self.widgets[i], self);
        self.element.appendChild(option.element);
    }
}
