// Liberapp 2019 - Tahiti Katagai
// スコア表示
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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this.point = 0;
        _this.bestScore = 0;
        _this.text = null;
        _this.textBest = null;
        Score.I = _this;
        _this.point = 0;
        _this.text = Util.newTextField("0", Util.width / 22, FONT_COLOR, 0.5, 0.0, true, true);
        GameObject.baseDisplay.addChild(_this.text);
        var bestScore = egret.localStorage.getItem(SAVE_KEY_BESTSCORE); // string
        if (bestScore == null) {
            bestScore = "20";
            egret.localStorage.setItem(SAVE_KEY_BESTSCORE, bestScore);
        }
        _this.bestScore = parseInt(bestScore);
        _this.textBest = Util.newTextField("BEST:" + bestScore + "", Util.width / 22, FONT_COLOR, 0.0, 0.0, true, true);
        GameObject.baseDisplay.addChild(_this.textBest);
        return _this;
    }
    Score.prototype.onDestroy = function () {
        GameObject.baseDisplay.removeChild(this.text);
        this.text = null;
        GameObject.baseDisplay.removeChild(this.textBest);
        this.textBest = null;
        Score.I = null;
    };
    Score.prototype.update = function () { };
    Score.prototype.addPoint = function (point) {
        if (point === void 0) { point = 1; }
        this.point += point;
        this.text.text = "" + this.point.toFixed();
        if (this.bestScore < this.point) {
            this.textBest.text = "BEST:" + this.point.toFixed();
        }
    };
    Score.I = null; // singleton instance
    return Score;
}(GameObject));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map