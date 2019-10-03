// Liberapp 2019 - Tahiti Katagai
// プレイヤー 四角
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.button = null;
        _this.state = _this.stateNone;
        _this.step = 0;
        Player.I = _this;
        _this.vx = 0;
        _this.vy = 0;
        _this.radius = Util.w(PLAYER_RADIUS_PER_W);
        _this.setDisplay(Util.w(0.5), Util.h(0.5) + Util.w(0.3));
        _this.button = new Button(null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null); // 透明な全画面ボタン
        return _this;
        // Camera2D.x = 
    }
    Object.defineProperty(Player.prototype, "x", {
        get: function () { return this.display.x; },
        set: function (x) { this.display.x = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "y", {
        get: function () { return this.display.y; },
        set: function (y) { this.display.y = y; },
        enumerable: true,
        configurable: true
    });
    Player.prototype.onDestroy = function () {
        this.button.destroy();
        Player.I = null;
    };
    Player.prototype.setDisplay = function (x, y) {
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);
        shape.graphics.beginFill(WALL_COLOR, 1);
        shape.graphics.drawCircle(0, 0, this.radius);
        shape.graphics.endFill();
        shape.x = x;
        shape.y = y;
    };
    Player.prototype.update = function () {
        this.state();
    };
    Player.prototype.setStateNone = function () {
        this.state = this.stateNone;
    };
    Player.prototype.stateNone = function () {
    };
    Player.prototype.setStateHang = function () {
        this.state = this.stateHang;
    };
    Player.prototype.stateHang = function () {
        if (this.button.press) {
            this.setStateJump();
        }
    };
    Player.prototype.setStateJump = function () {
        this.state = this.stateJump;
        this.vx = Util.w(PLAYER_SPEED_X_PER_W) * this.display.scaleX;
        this.vy = Util.w(PLAYER_JUMP_Y_PER_W);
        this.display.scaleY = 1.5;
        this.step = 0;
    };
    Player.prototype.stateJump = function () {
        if (this.button.press && this.step == 0) {
            this.setStateJump();
            this.step = 1;
        }
        // progress
        this.vy += Util.h(GRAVITY_PER_H);
        this.x += this.vx;
        this.y += this.vy;
        this.display.scaleY += (1 - this.display.scaleY) * 0.2;
        if (this.x < Util.w(0.1) || this.x > Util.w(0.9)) {
            this.setStateHang();
            this.display.scaleX *= -1;
        }
    };
    Player.prototype.setStateMiss = function () {
        if (this.state == this.stateMiss)
            return;
        new GameOver();
        this.state = this.stateMiss;
        new EffectCircle(this.x, this.y, this.radius, PLAYER_COLOR);
        EffectLine.create(this.x, this.y, this.radius, PLAYER_COLOR, 8);
    };
    Player.prototype.stateMiss = function () {
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map