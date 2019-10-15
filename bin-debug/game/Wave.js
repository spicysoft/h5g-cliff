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
        _this.wallWave = WallWaveType.Wide;
        _this.wallWaveFrame = 6;
        _this.enemyStep = 6;
        _this.wallY = Util.h(1);
        _this.wallL = Util.w(0.1);
        _this.wallR = Util.w(0.9);
        return _this;
    }
    Wave.prototype.update = function () {
        Game.hard = Util.clamp(Player.I.Y / Util.h(10), 0, 1);
        while (this.wallY >= Camera2D.y - Util.h(0.5)) {
            if ((--this.wallWaveFrame) <= 0) {
                this.wallWaveFrame = randI(2, Util.lerp(6 + 1, 2 + 1, Game.hard));
                this.wallWave = randI(0, WallWaveType.Total);
            }
            var y = this.wallY - Util.h(1 / 8);
            var l = void 0;
            var r = void 0;
            switch (this.wallWave) {
                case WallWaveType.Wide:
                    l = Util.w(0.1);
                    r = Util.w(0.9);
                    new Wall(this.wallL, this.wallY, l, y);
                    new Wall(this.wallR, this.wallY, r, y);
                    break;
                case WallWaveType.Narrow:
                    l = Util.w(0.25);
                    r = Util.w(0.75);
                    new Wall(this.wallL, this.wallY, l, y);
                    new Wall(this.wallR, this.wallY, r, y);
                    break;
                case WallWaveType.Left:
                    l = Util.w(0.1);
                    r = Util.w(0.75);
                    new Wall(this.wallL, this.wallY, l, y);
                    new Wall(this.wallR, this.wallY, r, y);
                    break;
                case WallWaveType.Right:
                    l = Util.w(0.25);
                    r = Util.w(0.9);
                    new Wall(this.wallL, this.wallY, l, y);
                    new Wall(this.wallR, this.wallY, r, y);
                    break;
                case WallWaveType.Random:
                    l = randBool() ? Util.w(0.1) : Util.w(0.25);
                    r = randBool() ? Util.w(0.9) : Util.w(0.75);
                    new Wall(this.wallL, this.wallY, l, y);
                    new Wall(this.wallR, this.wallY, r, y);
                    break;
            }
            if ((--this.enemyStep) <= 0) {
                this.enemyStep = randI(Util.lerp(2.7, 1.7, Game.hard), Util.lerp(6 + 1, 3 + 1, Game.hard));
                var type = randI(0, EnemyType.Total);
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