// Liberapp 2019 - Tahiti Katagai
// 地形生成
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
var Wave = (function (_super) {
    __extends(Wave, _super);
    function Wave() {
        var _this = _super.call(this) || this;
        _this.milestone = 0;
        _this.wallY = Util.h(1);
        _this.wallL = Util.w(0.15);
        _this.wallR = Util.w(0.85);
        _this.enemyStep = 6;
        return _this;
    }
    Wave.prototype.update = function () {
        Game.hard = Util.clamp(Player.I.Y / Util.h(20), 0, 1);
        while (this.wallY >= Camera2D.y - Util.h(0.5)) {
            var y = this.wallY - Util.h(1 / 8);
            var l = randBool() ? Util.w(0.1) : Util.w(0.25);
            var r = randBool() ? Util.w(0.9) : Util.w(0.75);
            new Wall(this.wallL, this.wallY, l, y);
            new Wall(this.wallR, this.wallY, r, y);
            if ((--this.enemyStep) <= 0) {
                this.enemyStep = randI(2, Util.lerp(6, 3, Game.hard));
                var type = randBool() ? EnemyType.RightLeft : EnemyType.UpDown;
                new Enemy(type, Util.w(0.5), y);
            }
            this.wallY = y;
            this.wallL = l;
            this.wallR = r;
        }
        var point = Math.floor(-Camera2D.y / Util.h(0.1)) - Score.I.point;
        if (point > 0) {
            Score.I.addPoint(point);
        }
    };
    return Wave;
}(GameObject));
__reflect(Wave.prototype, "Wave");
//# sourceMappingURL=Wave.js.map