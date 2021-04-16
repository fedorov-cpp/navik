let ChoiceOption = (name, widget, func) => {
    let element = document.createElement("div");
    element.setAttribute("class", "choiceOption");
    element.innerHTML = name;
    element.onmousedown = () => {
        func(widget);
    };
    return element;
}

function Choice(widgets) {
    this.widgets = widgets;
    this.shown = false;
    this.div = null;

    this.close = () => {
        if (this.shown === true) {
            this.element.parentNode.removeChild(this.element);
            this.shown = false;
        }
    };

    this.show = (event) => {
        this.close();
        if (event.target !== this.element) {
            if (!event.target.classList.contains("changeable")) {
                // search changeable among parents recursively
                let target = event.target;

                while (target.parentNode) {
                    target = target.parentNode;
                    if (target.classList.contains("changeable")) {
                        this.div = target;
                        break;
                    }
                }

                if (this.div) {
                    while (this.div.firstChild) {
                        this.div.removeChild(this.div.firstChild);
                    }
                } else {
                    return;
                }
            } else {
                this.div = event.target;
            }

            this.div.appendChild(this.element);
            this.shown = true;
        }
    };

    this.selected = (widget) => {
        if (this.div) {
            this.close();

            if (widget === DepthMeter) {
                this.div.appendChild(new widget(5, 180).element);
            } else {
                this.div.appendChild(new widget().element);
            }
        }
    };

    this.element = document.createElement("div");
    this.element.setAttribute("id", "choicePane");
    for (let name in this.widgets) {
        let option = ChoiceOption(name, this.widgets[name], this.selected);
        this.element.appendChild(option);
    }
}
