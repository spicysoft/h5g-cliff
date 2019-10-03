// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト
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
var StartMessage = (function (_super) {
    __extends(StartMessage, _super);
    function StartMessage() {
        var _this = _super.call(this) || this;
        _this.texts = [];
        StartMessage.I = _this;
        _this.texts[0] = Util.newTextField("カベキック", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        _this.texts[1] = Util.newTextField("タッチでジャンプ！", Util.width / 19, FONT_COLOR, 0.5, 0.3, true, false);
        _this.texts[2] = Util.newTextField("左右の壁をダブルジャンプで登っていこう", Util.width / 19, FONT_COLOR, 0.5, 0.35, true, false);
        _this.texts.forEach(function (text) { GameObject.baseDisplay.addChild(text); });
        GameObject.baseDisplay.once(egret.TouchEvent.TOUCH_TAP, _this.tap, _this);
        return _this;
    }
    StartMessage.prototype.onDestroy = function () {
        this.texts.forEach(function (text) { text.parent.removeChild(text); });
        this.texts = null;
        StartMessage.I = null;
    };
    StartMessage.prototype.update = function () { };
    StartMessage.prototype.tap = function (e) {
        Player.I.setStateJump();
        this.destroy();
    };
    StartMessage.I = null;
    return StartMessage;
}(GameObject));
__reflect(StartMessage.prototype, "StartMessage");
//# sourceMappingURL=StartMessage.js.map