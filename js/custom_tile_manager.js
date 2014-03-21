function CustomTileSet() {
    this.customTiles = {};
};

CustomTileSet.prototype.set = function(key, value) {
    this.customTiles[key] = value;
};

CustomTileSet.prototype.get = function(key) {
    return this.customTiles[key];
};

CustomTileSet.prototype.remove = function(key) {
    delete this.customTiles[key];
};

CustomTileSet.prototype.clear = function() {
    this.customTiles = {};
};

function CustomTileManager() {
    this.tileSet = new CustomTileSet;
};

CustomTileManager.prototype.setupTileSelector = function(doneCallback) {
    var container = document.getElementsByClassName("custom-tile-selector")[0];
    container.style.display = "none";

    var that = this;
    var v;
    for (v = 2; v <= 2048; v *= 2) {
        (function() {
            var tileContainer = document.createElement("div");
            tileContainer.setAttribute("class", "custom-tile-container");
            var dropTarget = document.createElement("div");
            dropTarget.setAttribute("class", "custom-tile-image-container");
            dropTarget.ondragover = function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
            };
            var _v = v;
            dropTarget.ondrop = function(evt) {
                var img;
                evt.stopPropagation();
                evt.preventDefault();
                if (evt.dataTransfer.files.length > 0) {
                    var file = evt.dataTransfer.files[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        that.tileSet.set(_v, e.target.result);
                        img = document.createElement("img");
                        img.setAttribute("src", e.target.result);
                        img.setAttribute("class", "custom-tile-image");
                        dropTarget.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                } else {
                    that.tileSet.set(_v, evt.dataTransfer.getData("URL"));
                    img = document.createElement("img");
                    img.setAttribute("src", evt.dataTransfer.getData("URL"));
                    img.setAttribute("class", "custom-tile-image");
                    dropTarget.appendChild(img);
                }
            };
            var title = document.createElement("span");
            title.textContent = "Tile #" + v;
            tileContainer.appendChild(title);
            tileContainer.appendChild(dropTarget);
            container.appendChild(tileContainer);
        })();
    }
    var clear = document.createElement("div");
    clear.style.clear = "both";
    container.appendChild(clear);

    var startButton = document.createElement("button");
    startButton.textContent = "Start!";
    startButton.onclick = function() {
        container.style.display = "none";
        document.getElementsByClassName("game-container")[0].style.display = "";
        doneCallback();
    };
    container.appendChild(startButton);

    container.style.display = "";
    document.getElementsByClassName("game-container")[0].style.display = "none";
};

