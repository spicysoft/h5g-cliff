// Liberapp 2019 - Tahiti Katagai
// 敵

enum EnemyType{
    RightLeft,
    UpDown,
}

class Enemy extends GameObject{

    static enemies:Enemy[] = [];

    type:EnemyType;
    baseX:number;
    baseY:number;
    radius:number;
    frame:number = 0;

    constructor( type:EnemyType, x:number, y:number ){
        super();
        Enemy.enemies.push(this);
        this.type = type;
        this.baseX = x;
        this.baseY = y;
        this.radius = Util.w(ENEMY_SIZE_PER_W)*0.5;
        this.setDisplay( x, y );
    }

    onDestroy(){
        Enemy.enemies = Enemy.enemies.filter( obj => obj != this );
    }

    setDisplay( x:number, y:number ){
        if( this.display )
            GameObject.gameDisplay.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);

        let s = this.radius * 2;
        shape.graphics.beginFill( ENEMY_COLOR0, 1 );
        shape.graphics.drawRect(-0.5*s, -0.5*s, s, s);
        shape.graphics.endFill();
        shape.rotation = 45;
        shape.x = x;
        shape.y = y;
    }

    update(){
        if( GameOver.I != null ) return;

        this.frame++;

        const offset = Math.sin( this.frame / 120 * Math.PI ) * Util.w(0.1);
        if( this.type == EnemyType.RightLeft ){
            this.display.x = this.baseX + offset;
        }else{
            this.display.y = this.baseY + offset;
        }

        this.display.scaleX = this.display.scaleY = 1.25 - 0.5 * ( this.frame % 30 ) / 30;

        if( (Player.I.X - this.X)**2 + (Player.I.Y - this.Y)**2 <= (Player.I.radius + this.radius)**2 ){
            Player.I.setStateMiss();
        }

        if( Camera2D.y + Util.h(1) < this.baseY  ){
            this.destroy();
        }
    }
}

