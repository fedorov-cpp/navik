let isBase = true;
let basePane = null;
let subPane = null;

let distance = 0;
let oldX = null;
let upDistance = 0;
let oldY = null;

const WIDGETS = {
    "Wind Meter": WindMeter,
    "Depth Meter": DepthMeter,
    "Wind indicator": WindIndicator,
    "Depth indicator": DepthIndicator,
    "SOG COG indicator": SogCogIndicator,
    "Coordinates indicator": CoordIndicator
};
const choice = new Choice(WIDGETS);
let clickTimeout = null;

window.onload = () => {
    window.onmousedown = function () { return false; };
    window.oncontextmenu = function () { return false; };
    basePane = document.getElementById("basePane");
    subPane = document.getElementById("subPane");

    let verticalmove = (event) => {
        if (event.buttons === 1) {
            let y = event.pageY;
            if (oldY != null) {
                upDistance += y - oldY;
                if (upDistance > 0) {
                    upDistance = 0;
                }
            }
            oldY = y;
            if (upDistance < -200) {
                changeColorMode();
                document.onmouseup();
            }
        }
    };

    let leftmove = (event) => {
        if ((event.buttons === 1) && isBase) {
            let x = event.pageX;
            if (oldX != null) {
                distance += x - oldX;
                if (distance > 0) {
                    distance = 0;
                }
            }
            oldX = x;
            if (distance < -200) {
                changePane();
                document.onmouseup();
                return;
            }
            verticalmove(event);
        }
    };

    let rightmove = (event) => {
        if ((event.buttons === 1) && !isBase) {
            let x = event.pageX;
            if (oldX != null) {
                distance += x - oldX;
                if (distance < 0) {
                    distance = 0;
                }
            }
            oldX = x;
            if (distance > 200) {
                changePane();
                document.onmouseup();
                return;
            }
            verticalmove(event);
        }
    };

    basePane.onmousemove = (event) => { leftmove(event); };
    subPane.onmousemove = (event) => { rightmove(event); };
    document.onmouseup = () => {
        distance = 0;
        oldX = null;
        upDistance = 0;
        oldY = null;
    };
    document.onclick = () => { return false; };
    // append Choice object to every changeable pane
    let changeables = document.getElementsByClassName("changeable");
    for (let i=0; i < changeables.length; ++i) {
        changeables[i].onmousedown = (event) => {
            clickTimeout = setTimeout(() => {choice.show(event);}, 1500);
        };
        changeables[i].onmouseup = () => {
            clearTimeout(clickTimeout);
            clickTimeout = null;
        };
    }
};

function changePane() {
    if (isBase === true) {
        subPane.style.left = "0";
        basePane.style.left = "-100%";
        isBase = false;
    } else {
        basePane.style.left = "0";
        subPane.style.left = "100%";
        isBase = true;
    }
}

function changeColorMode() {
    let mode = document.getElementById("colorMode");
    if (mode.href.indexOf("css/night.css") !== -1) {
        mode.href = "css/day.css";
    } else {
        mode.href = "css/night.css";
    }
}
