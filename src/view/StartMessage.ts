// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    static I:StartMessage = null;
    rectFilter:Rect = null;
    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        StartMessage.I = this;

        this.rectFilter = new Rect( 0, Util.h(0.1), Util.width, Util.h(0.4), 0x000000, false, true );
        this.rectFilter.display.alpha = 0.2;

        this.texts[0] = Util.newTextField("カベキック", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        this.texts[1] = Util.newTextField("タッチでジャンプ！", Util.width / 19, FONT_COLOR, 0.5, 0.3, true, false);
        this.texts[2] = Util.newTextField("左右の壁をダブルジャンプで登っていこう", Util.width / 19, FONT_COLOR, 0.5, 0.35, true, false);
        this.texts.forEach( text =>{ GameObject.baseDisplay.addChild( text ); });

        GameObject.baseDisplay.once(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    }

    onDestroy(){
        this.rectFilter.destroy();
        this.rectFilter = null;
        this.texts.forEach( text =>{ text.parent.removeChild( text ); });
        this.texts = null;
        StartMessage.I = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Player.I.setStateJump();
        this.destroy();
    }
}
