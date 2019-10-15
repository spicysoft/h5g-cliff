// Liberapp 2019 - Tahiti Katagai
// 敵

enum EnemyType{
    Stay,
    RightLeft,
    UpDown,
    Big,
    Total
}

class Enemy extends GameObject{

    static enemies:Enemy[] = [];

    type:EnemyType;
    baseX:number;
    baseY:number;
    radius:number;
    frame:number = 0;
    baseScale:number = 1;
    scale:number = 1;

    constructor( type:EnemyType, x:number, y:number ){
        super();
        Enemy.enemies.push(this);
        this.type = type;
        this.baseX = x;
        this.baseY = y;
        this.radius = Util.w(ENEMY_SIZE_PER_W)*0.5;
        this.setDisplay( x, y );
        if( this.type == EnemyType.Big ){
            this.radius *= 1.3;
            this.baseScale = this.scale = 1.3;
        }
        egret.Tween.get(this,{loop:true})
            .to({scale:this.baseScale*1.25}, 0)
            .to({scale:this.baseScale*0.75}, 500)
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

        switch( this.type ){
            case EnemyType.Stay:
            break;
            case EnemyType.RightLeft:{
                const offset = Math.sin( this.frame / 120 * Math.PI ) * Util.w(0.1);
                this.display.x = this.baseX + offset;
            }
            break;
            case EnemyType.UpDown:{
                const offset = Math.sin( this.frame / 120 * Math.PI ) * Util.w(0.1);
                this.display.y = this.baseY + offset;
            }
            break;
            case EnemyType.Big:
            break;
        }

        this.display.scaleX = this.display.scaleY = this.scale;

        if( (Player.I.X - this.X)**2 + (Player.I.Y - this.Y)**2 <= (Player.I.radius + this.radius)**2 ){
            Player.I.setStateMiss();
        }

        if( Camera2D.y + Util.h(1) < this.baseY  ){
            this.destroy();
        }
    }
}

