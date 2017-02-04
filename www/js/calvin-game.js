
function Game(canvasId, properties) {

    createjs.Stage.prototype.snapToPixel = true;


    this.stage = new createjs.Stage(canvasId);
    this.stage.snapToPixelEnabled = true;
    this.stageWidth = this.stage.canvas.width;
    this.stageHeight = this.stage.canvas.height;
    this.interTargetDuration = 3000;
    this._initialised = false;
}

Game.prototype.initialise = function() {

    this.cast = {
        background: null,
        backgroundItems: [],
        postBackgroundItems: [],
        preForegroundItems: [],
        targets: [],
        player: null
    }

    this.manifest = [
        {src: "background.png", id: "background"},
        {src: "cloud.png", id: "backgroundItem"},
        {src: "hills.png", id: "postBackground"},
        {src: "hedges.png", id: "preForeground"},
        {src: "spritesheet_bee.png", id: "player"},
        {src: "spritesheet_flowers.png", id: "target"}
    ]

    var that = this;
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", function() { that._initialise(); });
    this.loader.loadManifest(this.manifest, true,
        'img/game/themes/' + "Bee"+ '/');
}

Game.prototype._initialise = function() {
    var i, j, k, bitmap, item, themeItem, spritesheet, scaleX, scaleY;

    // Background
    bitmap = new createjs.Bitmap(this.loader.getResult("background"));
    bitmap.x = bitmap.y = 0;
    bitmap.scaleX = this.stage.canvas.width / bitmap.image.width;
    bitmap.scaleY = this.stage.canvas.height / bitmap.image.height;
    this.cast.background = bitmap;
    this.stage.addChild(bitmap);

    // BackgroundItems
    for (var i = 0; i < 2; i ++) {
        bitmap = new createjs.Bitmap(this.loader.getResult("backgroundItem"));
        bitmap.setTransform(
            Math.random() * (this.stageWidth - bitmap.image.width),
            Math.random() * (this.stageHeight / 2 - bitmap.image.height),
            1 - i / 2, 1 - i / 2);
        bitmap.width = bitmap.image.width;
        bitmap.height = bitmap.image.height;
        bitmap.alpha = 0.5 +  i / 2;
        bitmap.deltaScaleX = 4 + i * 2;
        this.cast.backgroundItems.push(bitmap);
        this.stage.addChild(bitmap);
    }

    // Post-background
    bitmap = new createjs.Bitmap(this.loader.getResult("postBackground"));
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

    var k = Math.floor(this.stage.canvas.width / bitmap.image.width * 4) + 2;
    for (i = 0; i < k; i ++) {
        j = Math.floor(Math.random() * 4) + 1;
        item = new createjs.Sprite(spriteSheet, "frame" + j);
        item.width = bitmap.image.width / 4;
        item.height = bitmap.image.height;
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



    bitmap = new createjs.Bitmap(this.loader.getResult("player"));
    spriteSheet = new createjs.SpriteSheet({
        framerate: 5,
        "images": [bitmap.image],
        "frames": {
            "regX": 0,
            "regY": 0,
            "width": bitmap.image.width / 2,
            "height": bitmap.image.height,
            "count": 2
        },
        "animations": {
            "frame1": [0, 1, "frame1"]
        }
    });
    item = new createjs.Sprite(spriteSheet, "frame1");
    item.x = this.stage.canvas.width / 3;
    item.y = this.stage.canvas.height / 2;
    item.regX = bitmap.image.width / 4;
    item.regY = bitmap.image.height / 2;
    this.stage.addChild(item);
    this.cast.player = item;

    this.addTarget();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    var that = this;
    createjs.Ticker.addEventListener("tick", function(e) { that.tick(e); });

}

Game.prototype.addTarget = function() {
    var item, bitmap, spritesheet, i;
    bitmap = new createjs.Bitmap(this.loader.getResult("target"));
    spriteSheet = new createjs.SpriteSheet({
        framerate: 1,
        "images": [bitmap.image],
        "frames": {
            "regX": 0,
            "regY": 0,
            "width": bitmap.image.width / 2,
            "height": bitmap.image.height,
            "count": 2
        },
        "animations": {
            "frame1": [0, 0, "frame1"],
            "frame2": [1, 1, "frame2"],
        }
    });
    item = new createjs.Sprite(spriteSheet, "frame2");
    item.x = this.stage.canvas.width + bitmap.image.width / 2;
    item.y = Math.random() * (this.stage.canvas.height - 2 * bitmap.image.height) + bitmap.image.height;
    item.regX = bitmap.image.width / 4;
    item.regY = bitmap.image.height / 4;
    i = this.stage.getChildIndex(this.cast.player);
    item.index = i;
    item.collected = false;
    this.cast.targets.push(item);
    this.stage.addChildAt(item, i);

    var that = this;
    window.setTimeout(function(){ that.addTarget() }, that.interTargetDuration);
}
Game.prototype.tick = function(event) {
    var i, j, item;
    var deltaX = event.delta / (100 - 0);

    for (i = 0; i < this.cast.backgroundItems.length; i ++) {
        item = this.cast.backgroundItems[i];
        item.x = item.x - deltaX * 4 * (i + 1);
        if (item.x + item.width < 0) {
            item.x = this.stageWidth;
            item.y = Math.random() * (this.stageHeight / 2 - item.height);
        }
    }

    for (i = 0; i < this.cast.postBackgroundItems.length; i ++) {
        item = this.cast.postBackgroundItems[i];
        item.x = item.x - deltaX * 10;
        if (item.x + item.width <= 0) {
            item.x = item.x + (this.cast.postBackgroundItems.length) * item.width;
            j = Math.floor(Math.random() * 4) + 1;
            item.gotoAndPlay("frame" + j);
        }
    }

    for (i = 0; i < this.cast.preForegroundItems.length; i ++) {
        item = this.cast.preForegroundItems[i];
        item.x = item.x - deltaX * 20;
        if (item.x + item.width <= 0) {
            item.x = item.x + (this.cast.preForegroundItems.length) * item.width;
            j = Math.floor(Math.random() * 4) + 1;
            item.gotoAndPlay("frame" + j);
        }
    }

    var target, targetX = this.stage.canvas.width, targetY = 0;
    for (i = 0; i < this.cast.targets.length; i ++) {
        item = this.cast.targets[i];
        item.x = item.x - deltaX * 20;
        if ((item.x < this.cast.player.x) && !item.collected) {
            item.collected = true;
            createjs.Tween.get(item).to({scaleX: 0, scaleY: 0},
             500, createjs.Ease.backIn);
        }
        if (item.x + item.width * item.scaleX <= 0) {
            this.stage.removeChild(item);
        }
        j = item.x - this.cast.player.x;
        if ((j > 0) && (j < targetX)) {
            targetX = j;
            targetY = item.y - this.cast.player.y;
        }
    }
    if (targetY !== 0) {
        this.cast.player.y = this.cast.player.y + targetY / 32;
    }
    this.stage.update(event);
}
