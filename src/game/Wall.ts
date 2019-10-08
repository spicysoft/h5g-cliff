// Liberapp 2019 - Tahiti Katagai
// カベ

class Wall extends GameObject{

    static walls:Wall[] = [];

    // 始点と終点
    px0:number;
    py0:number; // lower
    px1:number;
    py1:number; // higher
    
    // 接触判定要 単位ベクトルと長さ
    uvx:number;
    uvy:number;
    length:number;

    constructor( px0:number, py0:number, px1:number, py1:number ){
        super();

        Wall.walls.push(this);

        this.px0 = px0;
        this.py0 = py0;
        this.px1 = px1;
        this.py1 = py1;

        this.uvx = px1 - px0;
        this.uvy = py1 - py0;
        this.length = Math.sqrt( this.uvx**2 + this.uvy**2 );
        const normalizer = 1 / this.length;
        this.uvx *= normalizer;
        this.uvy *= normalizer;

        this.setDisplay();
    }

    onDestroy(){
        Wall.walls = Wall.walls.filter( obj => obj != this );
    }

    setDisplay(){
        if( this.display )
            GameObject.gameDisplay.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);

        shape.graphics.lineStyle( Util.w(WALL_WIDTH_PER_W), WALL_COLOR );
        shape.graphics.moveTo( this.px0, this.py0 );
        shape.graphics.lineTo( this.px1, this.py1 );
    }

    update(){
        if( Camera2D.y + Util.h(1) < this.py1  ){
            this.destroy();
        }
    }
}

