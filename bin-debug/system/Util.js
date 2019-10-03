// Liberapp 2019 - Tahiti Katagai
// ゲームで便利に使えるUtilityクラス
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.w = function (rate) { return rate * Util.width; };
    Util.h = function (rate) { return rate * Util.height; };
    Util.init = function (eui) {
        this.width = eui.stage.stageWidth;
        this.height = eui.stage.stageHeight;
    };
    Util.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        if (value > max)
            value = max;
        return value;
    };
    Util.lerp = function (src, dst, rate01) {
        return src + (dst - src) * rate01;
    };
    // 角度を-PI~+PI範囲で表現
    Util.deltaAngle = function (radian) {
        var d = (radian + Math.PI) / (Math.PI * 2);
        d = (d * 0x10000) & 0xffff;
        d = d / 0x10000 * Math.PI * 2 - Math.PI;
        return d;
    };
    Util.color = function (r, g, b) {
        return (Math.floor(r * 0xff) * 0x010000 + Math.floor(g * 0xff) * 0x0100 + Math.floor(b * 0xff));
    };
    Util.colorLerp = function (c0, c1, rate01) {
        var rate10 = 1 - rate01;
        var color = (((c0 & 0xff0000) * rate10 + (c1 & 0xff0000) * rate01) & 0xff0000) +
            (((c0 & 0xff00) * rate10 + (c1 & 0xff00) * rate01) & 0xff00) +
            (((c0 & 0xff) * rate10 + (c1 & 0xff) * rate01) & 0xff);
        return color;
    };
    Util.newTextField = function (text, size, color, xRatio, yRatio, bold, adjust) {
        var tf = new egret.TextField();
        tf.text = text;
        tf.bold = bold;
        tf.size = size;
        tf.textColor = color;
        if (adjust) {
            tf.x = (Util.width - tf.width) * xRatio;
            tf.y = (Util.height - tf.height) * yRatio;
        }
        else {
            tf.x = Util.width * xRatio - tf.width * 0.5;
            tf.y = Util.height * yRatio - tf.height * 0.5;
        }
        return tf;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map