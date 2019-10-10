// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WALL_WIDTH_PER_W = 1 / 32;
var PLAYER_RADIUS_PER_W = 1 / 24;
var PLAYER_SPEED_X_PER_W = 1 / 150;
var PLAYER_JUMP_Y_PER_W = -1 / 72;
var GRAVITY_PER_H = -PLAYER_JUMP_Y_PER_W / 64;
var ENEMY_SIZE_PER_W = 1 / 12;
var SAVE_KEY_BESTSCORE = "cliff-bestScore";
var BACK_COLOR = 0x205070; // index.htmlで設定
var FONT_COLOR = 0xc0c4d0;
var PLAYER_COLOR = 0xff00b0;
var WALL_COLOR = 0xe0e0e0;
var ENEMY_COLOR0 = 0xff00ff;
var ENEMY_COLOR1 = 0x8000ff;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        Game.hard = 0;
        Game.speed = 0;
        Camera2D.initial();
        new Player();
        new Wave();
        new StartMessage();
        new Score();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map