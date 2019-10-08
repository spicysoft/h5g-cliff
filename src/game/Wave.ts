// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    wallY:number;
    wallL:number;
    wallR:number;

    constructor() {
        super();

        this.wallY = Util.h(1);
        this.wallL = Util.w(0.15);
        this.wallR = Util.w(0.85);
    }

    update() {

        while( this.wallY >= Camera2D.y - Util.h(0.5) ){
            
            let y = this.wallY - Util.h(1/8);
            let l = randBool() ? Util.w(0.15) : Util.w(0.3);
            let r = randBool() ? Util.w(0.85) : Util.w(0.7);
            
            new Wall( this.wallL, this.wallY, l, y );
            new Wall( this.wallR, this.wallY, r, y );

            this.wallY = y;
            this.wallL = l;
            this.wallR = r;
        }

        if( GameOver.I || StartMessage.I )
            return;

        Game.hard = Util.clamp( Player.I.y / Util.h( 50 ), 0, 1 );
    }
}

