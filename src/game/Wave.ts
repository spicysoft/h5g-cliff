// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    constructor() {
        super();
    }

    update() {
        if( GameOver.I || StartMessage.I )
            return;

        Game.hard = Util.clamp( Player.I.y / Util.h( 50 ), 0, 1 );

        if( this.milestone <= Player.I.y ){
            this.milestone += Util.lerp( 1.0, 0.5, Game.hard ) * Util.width;
            Score.I.addPoint();
            
        }
    }
}

