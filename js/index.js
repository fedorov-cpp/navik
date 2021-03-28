var isBase = true;
var basePane = null;
var subPane = null;

var distance = 0;
var oldX = null;
var upDistanse = 0;
var oldY = null;

var widgetsNames =["Wind Meter", "Depth Meter", "Wind indicator",
    "Depth indicator", "SOG COG indicator", "Coordinates indicator"];
var widgets = [WindMeter, DepthMeter, WindIndicator, DepthIndicator,
    SogCogIndicator, CoordIndicator];
var choice = new Choice(widgetsNames, widgets);
var clickTimeout = null;

window.onload = function() {
    window.onmousedown = function () { return false; };
    window.oncontextmenu = function () { return false; };
    basePane = document.getElementById("basePane");
    subPane = document.getElementById("subPane");

    verticalmove = function(e) {
        if (e.buttons == 1) {
            var y = e.pageY;
            if (oldY != null) {
                upDistanse += y - oldY;
                if (upDistanse > 0)
                    upDistanse = 0;
            }
            oldY = y;
            if (upDistanse < -200) {
                changeColorMode();
                document.onmouseup();
            }
        }
    };
    leftmove = function (e) {
        if ((e.buttons == 1) && isBase) {
            var x = e.pageX;
            if (oldX != null) {
                distance += x - oldX;
                if (distance > 0)
                    distance = 0;
            }
            oldX = x;
            if (distance < -200) {
                changePane();
                document.onmouseup();
                return;
            }
            verticalmove(e);
        }
    };
    rightmove = function (e) {
        if ((e.buttons == 1) && !isBase) {
            var x = e.pageX;
            if (oldX != null) {
                distance += x - oldX;
                if (distance < 0)
                    distance = 0;
            }
            oldX = x;
            if (distance > 200) {
                changePane();
                document.onmouseup();
                return;
            }
            verticalmove(e);
        }
    };
    basePane.onmousemove = function(e) { leftmove(e); };
    subPane.onmousemove = function (e) { rightmove(e); };
    document.onmouseup = function() {
        distance = 0;
        oldX = null;
        upDistanse = 0;
        oldY = null;
    };
    document.onclick = function() { return false; };
    // append Choice object to every changeable pane
    var changeables = document.getElementsByClassName("changeable");
    for (var i=0; i < changeables.length; ++i) {
        changeables[i].onmousedown = function(e) {
            clickTimeout = setTimeout(function() {choice.show(e);}, 1500);
        };
        changeables[i].onmouseup = function() {
            clearTimeout(clickTimeout);
            clickTimeout = null;
        };
    }
};

function changePane() {
    if (isBase == true) {
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
    var mode = document.getElementById("colorMode");
    if (mode.href.indexOf("css/night.css") != -1) {
        mode.href = "css/day.css";
    } else {
        mode.href = "css/night.css";
    }
}
