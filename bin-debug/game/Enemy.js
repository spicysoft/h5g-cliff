// Liberapp 2019 - Tahiti Katagai
// 敵
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
var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["RightLeft"] = 0] = "RightLeft";
    EnemyType[EnemyType["UpDown"] = 1] = "UpDown";
})(EnemyType || (EnemyType = {}));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type, x, y) {
        var _this = _super.call(this) || this;
        _this.frame = 0;
        Enemy.enemies.push(_this);
        _this.type = type;
        _this.baseX = x;
        _this.baseY = y;
        _this.radius = Util.w(ENEMY_SIZE_PER_W) * 0.5;
        _this.setDisplay(x, y);
        return _this;
    }
    Enemy.prototype.onDestroy = function () {
        var _this = this;
        Enemy.enemies = Enemy.enemies.filter(function (obj) { return obj != _this; });
    };
    Enemy.prototype.setDisplay = function (x, y) {
        if (this.display)
            GameObject.gameDisplay.removeChild(this.display);
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);
        var s = this.radius * 2;
        shape.graphics.beginFill(ENEMY_COLOR0, 1);
        shape.graphics.drawRect(-0.5 * s, -0.5 * s, s, s);
        shape.graphics.endFill();
        shape.rotation = 45;
        shape.x = x;
        shape.y = y;
    };
    Enemy.prototype.update = function () {
        if (GameOver.I != null)
            return;
        this.frame++;
        var offset = Math.sin(this.frame / 120 * Math.PI) * Util.w(0.1);
        if (this.type == EnemyType.RightLeft) {
            this.display.x = this.baseX + offset;
        }
        else {
            this.display.y = this.baseY + offset;
        }
        this.display.scaleX = this.display.scaleY = 1.25 - 0.5 * (this.frame % 30) / 30;
        if (Math.pow((Player.I.X - this.X), 2) + Math.pow((Player.I.Y - this.Y), 2) <= Math.pow((Player.I.radius + this.radius), 2)) {
            Player.I.setStateMiss();
        }
        if (Camera2D.y + Util.h(1) < this.baseY) {
            this.destroy();
        }
    };
    Enemy.enemies = [];
    return Enemy;
}(GameObject));
__reflect(Enemy.prototype, "Enemy");
//# sourceMappingURL=Enemy.js.map