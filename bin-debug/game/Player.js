// Liberapp 2019 - Tahiti Katagai
// プレイヤー　まる
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
        _this.landing = false;
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
    }
    Player.prototype.onDestroy = function () {
        this.button.destroy();
        Player.I = null;
    };
    Player.prototype.setDisplay = function (x, y) {
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);
        shape.graphics.beginFill(PLAYER_COLOR, 1);
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
        this.display.scaleY = 1;
        this.step = 0;
    };
    Player.prototype.stateHang = function () {
        if (!this.landing) {
            this.display.anchorOffsetY *= 0.9;
            if ((++this.step) >= 60 * 3) {
                if (this.step % 20 == 0) {
                    this.display.anchorOffsetY = -this.radius * 0.2;
                }
                if (this.step >= 60 * 6) {
                    this.setStateFall();
                    return;
                }
            }
        }
        if (this.button.press) {
            this.setStateJump();
        }
    };
    Player.prototype.setStateFall = function () {
        this.state = this.stateFall;
        this.X += this.radius * 0.1 * this.display.scaleX;
        this.vx = 0;
        this.vy = 0;
        this.display.scaleY = 1;
        this.display.anchorOffsetY = 0;
        this.step = 0;
    };
    Player.prototype.stateFall = function () {
        this.vy += Util.h(GRAVITY_PER_H);
        this.Y += this.vy;
        if (this.button.press) {
            this.setStateJump();
        }
        if (this.checkWalls()) {
            this.setStateHang();
        }
        this.checkFall();
    };
    Player.prototype.setStateJump = function () {
        this.state = this.stateJump;
        this.vx = Util.w(PLAYER_SPEED_X_PER_W) * this.display.scaleX;
        this.vy = Util.w(PLAYER_JUMP_Y_PER_W);
        this.display.scaleY = 1.5;
        this.display.anchorOffsetY = 0;
        this.step = 0;
    };
    Player.prototype.stateJump = function () {
        if (this.button.press && this.step == 0) {
            this.setStateJump();
            this.step = 1;
        }
        // progress
        this.vy += Util.h(GRAVITY_PER_H);
        this.X += this.vx;
        this.Y += this.vy;
        this.display.scaleY += (1 - this.display.scaleY) * 0.2;
        if (this.checkWalls()) {
            this.setStateHang();
            this.display.scaleX *= -1;
        }
        this.checkFall();
        this.updateCamera();
    };
    Player.prototype.setStateMiss = function () {
        if (this.state == this.stateMiss)
            return;
        new GameOver();
        this.state = this.stateMiss;
        new EffectCircle(this.X, this.Y, this.radius, PLAYER_COLOR);
        EffectLine.create(this.X, this.Y, this.radius, PLAYER_COLOR, 8);
    };
    Player.prototype.stateMiss = function () {
    };
    // process
    Player.prototype.checkWalls = function () {
        var _this = this;
        var hit = false;
        var radius = this.radius + Util.w(WALL_WIDTH_PER_W) * 0.5;
        var range = radius;
        var ndx = 0;
        var ndy = 0;
        Wall.walls.forEach(function (wall) {
            if (wall.py0 > _this.Y - range && wall.py1 < _this.Y + range) {
                // 最近点
                var dx = _this.X - wall.px0;
                var dy = _this.Y - wall.py0;
                var dot = dx * wall.uvx + dy * wall.uvy;
                dot = Util.clamp(dot, 0, wall.length);
                var npx = wall.px0 + wall.uvx * dot;
                var npy = wall.py0 + wall.uvy * dot;
                // 接触判定と反射
                dx = _this.X - npx;
                dy = _this.Y - npy;
                var l = Math.pow(dx, 2) + Math.pow(dy, 2);
                if (l <= Math.pow(range, 2)) {
                    range = Math.sqrt(l);
                    ndx = dx;
                    ndy = dy;
                    hit = true;
                }
            }
        });
        // reflect
        if (hit) {
            var _l = 1 / range;
            ndx *= _l;
            ndy *= _l;
            var dot = radius - range;
            dot *= 0.95;
            this.X += ndx * dot;
            this.Y += ndy * dot;
            // 頭打ちならスルー (反対側まで着地しないでジャンプする)
            if (this.vx * (this.X - Util.w(0.5)) < 0) {
                hit = false;
            }
            dot = ndx * this.vx + ndy * this.vy;
            this.vx -= ndx * dot;
            this.vy -= ndy * dot;
            this.landing = ndy < 0;
        }
        return hit;
    };
    Player.prototype.checkFall = function () {
        if (this.Y - Camera2D.y > Util.height) {
            this.setStateMiss();
            return true;
        }
        return false;
    };
    Player.prototype.updateCamera = function () {
        var camY = this.Y - Util.h(0.65);
        if (Camera2D.y > camY) {
            Camera2D.y += (camY - Camera2D.y) * 0.25;
        }
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map