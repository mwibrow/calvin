var Themes = {
    Bee: {
        path: "Bee",
        cast: [
            {
                id: "background",
                src: "background.png",
            },
            {
                id: "backgroundItem",
                src: "cloud.png",
                count: 2
            },
            {
                id: "postBackground",
                src: "hills.png",
                marginX: 4,
                count: 4
            },
            {
                id: "preForeground",
                src: "hedges.png",
                count: 4
            },
            {
                id: "target",
                src: "spritesheet_flowers.png"
            },
            {
                id: "player",
                src: "spritesheet_bee.png"
            }
        ]
    }
}


function Game(canvasId, properties) {
    this.properties = {
        theme: Themes.Bee
    };
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            this.properties[property] = properties[property];
        }
    }
    this.stage = new createjs.Stage(canvasId);
    this.stageWidth = this.stage.canvas.width;
    this.stageHeight = this.stage.canvas.height;

    this._initialised = false;
}

Game.prototype.initialise = function() {
    this.theme = Themes[this.properties.theme];
    this.themeIndex = {};
    this.cast = {
        background: null,
        backgroundItems: [],
        postBackgroundItems: [],
        preForegroundItems: [],
        targets: [],
        player: null
    };

    this.manifest = [];
    for (var i = 0; i < this.theme.cast.length; i ++) {
        this.manifest.push({src: this.theme.cast[i].src,
                            id: this.theme.cast[i].id});
        this.themeIndex[this.theme.cast[i].id] = i;
    }

    var that = this;
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", function() { that._initialise(); });
    this.loader.loadManifest(this.manifest, true,
        'img/game/themes/' + this.theme.path + '/');
}

Game.prototype._initialise = function() {
    var i, j, bitmap, item, themeItem, spritesheet, scaleX, scaleY;

    // Background
    this.cast.background = new createjs.Shape();
    bitmap = new createjs.Bitmap(this.loader.getResult("background"));
    scaleY = this.stageHeight / bitmap.image.height;
    this.cast.background.graphics
        .beginBitmapFill(bitmap.image,
                         "repeat",
                         new createjs.Matrix2D(1, 0, 0, scaleY, 0, 0))
        .drawRect(0, 0, this.stageWidth, this.stageHeight);
    this.stage.addChild(this.cast.background);

    // BackgroundItems
    for (var i = 0; i < 2; i ++) {
        bitmap = new createjs.Bitmap(this.loader.getResult("backgroundItem"));
        bitmap.setTransform(
            Math.random() * (this.stageWidth - bitmap.image.width),
            Math.random() * (this.stageHeight / 2 - bitmap.image.height),
            1, 1);
        bitmap.width = bitmap.image.width;
        bitmap.height = bitmap.image.height;
        bitmap.alpha = 0.5 +  i / 2;
        this.cast.backgroundItems.push(bitmap);
        this.stage.addChild(bitmap);
    }

    // Post-background
    themeItem = this.theme.cast[this.themeIndex.postBackground];
    bitmap = new createjs.Bitmap(this.loader.getResult("postBackground"));
    spriteSheet = new createjs.SpriteSheet({
        framerate: 1,
        "images": [bitmap.image],
        "frames": {
            "regX": 0,
            "regY": 0,
            "width": bitmap.image.width,
            "height": bitmap.image.height / themeItem.count,
            "count": themeItem.count
        },
        "animations": {
            "frame1": [0, 0, "frame1"],
            "frame2": [1, 1, "frame2"],
            "frame3": [2, 2, "frame3"],
            "frame4": [3, 3, "frame4"]
        }
    });
    for (i = 0; i < 4; i ++) {
        j = Math.floor(Math.random() * themeItem.count) + 1;
        item = new createjs.Sprite(spriteSheet, "frame" + j);
        item.regX = themeItem.marginX;
        item.width = bitmap.image.width - themeItem.marginX * 2;
        item.height = bitmap.image.height / themeItem.count;
        item.x =  item.width * i;
        item.y = (this.stageHeight / 2) - item.height * 15 / 16;
        this.cast.postBackgroundItems.push(item);
        this.stage.addChild(item);
    }

    bitmap = new createjs.Bitmap(this.loader.getResult("preForeground"));
    spriteSheet = new createjs.SpriteSheet({
        framerate: 1,
        "images": [bitmap.image],
        "frames": {
            "regX": 0,
            "regY": 0,
            "width": bitmap.image.width / 4,
            "height": bitmap.image.height,
            "count": 4
        },
        "animations": {
            "frame1": [0, 0, "frame1"],
            "frame2": [1, 1, "frame2"],
            "frame3": [2, 2, "frame3"],
            "frame4": [3, 3, "frame4"]
        }
    });
    for (i = 0; i < 4; i ++) {
        j = Math.floor(Math.random() * 4) + 1;
        item = new createjs.Sprite(spriteSheet, "frame" + j);
        item.width = bitmap.image.width / 4;
        item.x =  bitmap.image.width / 4 * i;
        item.y = (this.stageHeight * 5 / 8) - bitmap.image.height * 15 / 16;
        this.cast.preForegroundItems.push(item);
        this.stage.addChild(item);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    var that = this;
    createjs.Ticker.addEventListener("tick", function(e) { that.tick(e); });

}

Game.prototype.tick = function(event) {
    var i, j, item;
    var deltaX = event.delta / (300 - 0);

    for (i = 0; i < this.cast.backgroundItems.length; i ++) {
        item = this.cast.backgroundItems[i];
        item.x = item.x - deltaX * 5 * (i + 1);
        if (item.x + item.width < 0) {
            item.x = this.stageWidth;
            item.y = Math.random() * (this.stageHeight / 2 - item.height);
        }
    }

    for (i = 0; i < this.cast.postBackgroundItems.length; i ++) {
        item = this.cast.postBackgroundItems[i];
        item.x = item.x - deltaX * 10;
        if (item.x + item.width < 0) {
            item.x = (this.cast.postBackgroundItems.length - 1) * item.width;
            j = Math.floor(Math.random() * 4) + 1;
            item.gotoAndPlay("frame" + j);
        }
    }

    for (i = 0; i < this.cast.preForegroundItems.length; i ++) {
        item = this.cast.preForegroundItems[i];
        item.x = item.x - deltaX * 20;
        if (item.x + item.width < 0) {
            item.x = (this.cast.preForegroundItems.length - 1) * item.width;
            j = Math.floor(Math.random() * 4) + 1;
            item.gotoAndPlay("frame" + j);
        }
    }

    this.stage.update(event);
}
