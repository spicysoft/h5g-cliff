// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    wallWave:WallWaveType = WallWaveType.Wide;
    wallWaveFrame:number = 6;
    wallY:number;
    wallL:number;
    wallR:number;
    enemyStep:number = 6;

    constructor() {
        super();

        this.wallY = Util.h(1);
        this.wallL = Util.w(0.1);
        this.wallR = Util.w(0.9);
    }

    update() {

        Game.hard = Util.clamp( Player.I.Y / Util.h( 10 ), 0, 1 );

        while( this.wallY >= Camera2D.y - Util.h(0.5) ){
            if( (--this.wallWaveFrame) <= 0 ){
                this.wallWaveFrame = randI( 2, Util.lerp( 6+1, 2+1, Game.hard ) );
                this.wallWave = randI( 0, WallWaveType.Total );
            }

            const y = this.wallY - Util.h(1/8);
            let l;
            let r;
            switch( this.wallWave ){
                case WallWaveType.Wide:
                l = Util.w(0.1);
                r = Util.w(0.9);
                new Wall( this.wallL, this.wallY, l, y );
                new Wall( this.wallR, this.wallY, r, y );
                break;

                case WallWaveType.Narrow:
                l = Util.w(0.25);
                r = Util.w(0.75);
                new Wall( this.wallL, this.wallY, l, y );
                new Wall( this.wallR, this.wallY, r, y );
                break;
                
                case WallWaveType.Left:
                l = Util.w(0.1);
                r = Util.w(0.75);            
                new Wall( this.wallL, this.wallY, l, y );
                new Wall( this.wallR, this.wallY, r, y );
                break;
                
                case WallWaveType.Right:
                l = Util.w(0.25);
                r = Util.w(0.9);
                new Wall( this.wallL, this.wallY, l, y );
                new Wall( this.wallR, this.wallY, r, y );
                break;
                
                case WallWaveType.Random:
                l = randBool() ? Util.w(0.1) : Util.w(0.25);
                r = randBool() ? Util.w(0.9) : Util.w(0.75);            
                new Wall( this.wallL, this.wallY, l, y );
                new Wall( this.wallR, this.wallY, r, y );
                break;
            }


            if( (--this.enemyStep) <= 0 ){
                this.enemyStep = randI( Util.lerp( 2.7, 1.7, Game.hard ), Util.lerp( 6+1, 3+1, Game.hard ) );
                const type = randI( 0, EnemyType.Total );
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

