// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const WALL_WIDTH_PER_W = 1/32;

const PLAYER_RADIUS_PER_W = 1/24;
const PLAYER_SPEED_X_PER_W = 1/150;
const PLAYER_JUMP_Y_PER_W = -1/72;
const GRAVITY_PER_H = -PLAYER_JUMP_Y_PER_W/64;

const ENEMY_SIZE_PER_W = 1/12;

const SAVE_KEY_BESTSCORE = "cliff-bestScore";

const BACK_COLOR = 0x205070;    // index.htmlで設定
const FONT_COLOR = 0xc0c4d0;
const PLAYER_COLOR = 0xff00b0;
const WALL_COLOR = 0xe0e0e0;
const ENEMY_COLOR0 = 0xff00ff;
const ENEMY_COLOR1 = 0x8000ff;

class Game {

    static hard:number;
    static speed:number;
    
    static loadSceneGamePlay() {

        Game.hard = 0;
        Game.speed = 0;
        Camera2D.initial();
        
        new Player();
        new Wave();

        new StartMessage();
        new Score();
    }

}
