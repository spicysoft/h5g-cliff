// Liberapp 2019 - Tahiti Katagai
// プレイヤー 四角

class Player extends GameObject{

    static I:Player = null;

    get x():number { return this.display.x; }
    get y():number { return this.display.y; }
    set x( x:number ){ this.display.x = x; }
    set y( y:number ){ this.display.y = y; }

    vx:number;
    vy:number;
    radius:number;

    button:Button = null;
    state:()=>void = this.stateNone;
    step:number = 0;

    constructor() {
        super();

        Player.I = this;

        this.vx = 0;
        this.vy = 0;
        this.radius = Util.w(PLAYER_RADIUS_PER_W);
        this.setDisplay( Util.w(0.5), Util.h(0.5) + Util.w(0.3) );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン

        // Camera2D.x = 
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( x:number, y:number ){
        let shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt( this.display, 1 );
        shape.graphics.beginFill( WALL_COLOR, 1 );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
        shape.x = x;
        shape.y = y;
    }

    update(){
        this.state();
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateHang(){
        this.state = this.stateHang;
    }
    stateHang() {
        if( this.button.press ){
            this.setStateJump();
        }
    }

    setStateJump(){
        this.state = this.stateJump;
        this.vx = Util.w(PLAYER_SPEED_X_PER_W) * this.display.scaleX;
        this.vy = Util.w(PLAYER_JUMP_Y_PER_W);
        this.display.scaleY = 1.5;
        this.step = 0;
    }
    stateJump() {
        if( this.button.press && this.step == 0 ){
            this.setStateJump();
            this.step = 1;
        }

        // progress
        this.vy += Util.h(GRAVITY_PER_H);
        this.x += this.vx;
        this.y += this.vy;
        this.display.scaleY += (1 - this.display.scaleY) * 0.2;

        if( this.x < Util.w(0.1) || this.x > Util.w(0.9) ){
            this.setStateHang();
            this.display.scaleX *= -1;
        }
    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        new GameOver();
        this.state = this.stateMiss;
        new EffectCircle( this.x, this.y, this.radius, PLAYER_COLOR );
        EffectLine.create( this.x, this.y, this.radius, PLAYER_COLOR, 8 );
    }
    stateMiss(){
    }
}