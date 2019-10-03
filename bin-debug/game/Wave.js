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
        return _this;
    }
    Wave.prototype.update = function () {
        if (GameOver.I || StartMessage.I)
            return;
        Game.hard = Util.clamp(Player.I.y / Util.h(50), 0, 1);
        if (this.milestone <= Player.I.y) {
            this.milestone += Util.lerp(1.0, 0.5, Game.hard) * Util.width;
            Score.I.addPoint();
        }
    };
    return Wave;
}(GameObject));
__reflect(Wave.prototype, "Wave");
//# sourceMappingURL=Wave.js.map