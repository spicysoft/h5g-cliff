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
    EnemyType[EnemyType["Stay"] = 0] = "Stay";
    EnemyType[EnemyType["RightLeft"] = 1] = "RightLeft";
    EnemyType[EnemyType["UpDown"] = 2] = "UpDown";
    EnemyType[EnemyType["Big"] = 3] = "Big";
    EnemyType[EnemyType["Total"] = 4] = "Total";
})(EnemyType || (EnemyType = {}));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type, x, y) {
        var _this = _super.call(this) || this;
        _this.frame = 0;
        _this.baseScale = 1;
        _this.scale = 1;
        Enemy.enemies.push(_this);
        _this.type = type;
        _this.baseX = x;
        _this.baseY = y;
        _this.radius = Util.w(ENEMY_SIZE_PER_W) * 0.5;
        _this.setDisplay(x, y);
        if (_this.type == EnemyType.Big) {
            _this.radius *= 1.3;
            _this.baseScale = _this.scale = 1.3;
        }
        egret.Tween.get(_this, { loop: true })
            .to({ scale: _this.baseScale * 1.25 }, 0)
            .to({ scale: _this.baseScale * 0.75 }, 500);
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
        switch (this.type) {
            case EnemyType.Stay:
                break;
            case EnemyType.RightLeft:
                {
                    var offset = Math.sin(this.frame / 120 * Math.PI) * Util.w(0.1);
                    this.display.x = this.baseX + offset;
                }
                break;
            case EnemyType.UpDown:
                {
                    var offset = Math.sin(this.frame / 120 * Math.PI) * Util.w(0.1);
                    this.display.y = this.baseY + offset;
                }
                break;
            case EnemyType.Big:
                break;
        }
        this.display.scaleX = this.display.scaleY = this.scale;
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