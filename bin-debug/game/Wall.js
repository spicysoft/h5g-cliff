// Liberapp 2019 - Tahiti Katagai
// カベ
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(px0, py0, px1, py1) {
        var _this = _super.call(this) || this;
        Wall.walls.push(_this);
        _this.px0 = px0;
        _this.py0 = py0;
        _this.px1 = px1;
        _this.py1 = py1;
        _this.uvx = px1 - px0;
        _this.uvy = py1 - py0;
        _this.length = Math.sqrt(Math.pow(_this.uvx, 2) + Math.pow(_this.uvy, 2));
        var normalizer = 1 / _this.length;
        _this.uvx *= normalizer;
        _this.uvy *= normalizer;
        _this.setDisplay();
        return _this;
    }
    Wall.prototype.onDestroy = function () {
        var _this = this;
        Wall.walls = Wall.walls.filter(function (obj) { return obj != _this; });
    };
    Wall.prototype.setDisplay = function () {
        if (this.display)
            GameObject.gameDisplay.removeChild(this.display);
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);
        shape.graphics.lineStyle(Util.w(WALL_WIDTH_PER_W), WALL_COLOR);
        shape.graphics.moveTo(this.px0, this.py0);
        shape.graphics.lineTo(this.px1, this.py1);
    };
    Wall.prototype.update = function () {
        if (Camera2D.y + Util.h(1) < this.py1) {
            this.destroy();
        }
    };
    Wall.walls = [];
    return Wall;
}(GameObject));
__reflect(Wall.prototype, "Wall");
//# sourceMappingURL=Wall.js.map