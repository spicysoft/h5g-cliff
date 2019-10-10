// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    wallY:number;
    wallL:number;
    wallR:number;
    enemyStep:number;

    constructor() {
        super();

        this.wallY = Util.h(1);
        this.wallL = Util.w(0.15);
        this.wallR = Util.w(0.85);
        this.enemyStep = 6;
    }

    update() {

        Game.hard = Util.clamp( Player.I.Y / Util.h( 20 ), 0, 1 );

        while( this.wallY >= Camera2D.y - Util.h(0.5) ){
            let y = this.wallY - Util.h(1/8);
            let l = randBool() ? Util.w(0.1) : Util.w(0.25);
            let r = randBool() ? Util.w(0.9) : Util.w(0.75);            
            new Wall( this.wallL, this.wallY, l, y );
            new Wall( this.wallR, this.wallY, r, y );

            if( (--this.enemyStep) <= 0 ){
                this.enemyStep = randI( 2, Util.lerp( 6, 3, Game.hard ) );
                const type = randBool() ? EnemyType.RightLeft : EnemyType.UpDown;
                new Enemy( type, Util.w(0.5), y );
            }

            this.wallY = y;
            this.wallL = l;
            this.wallR = r;
        }

        let point = Math.floor( -Camera2D.y / Util.h(0.1) ) - Score.I.point;
        if( point > 0 ){
            Score.I.addPoint( point );
        }
    }
}

