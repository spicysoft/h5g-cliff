// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const WALL_WIDTH_PER_W = 1/32;

const PLAYER_RADIUS_PER_W = 1/24;
const PLAYER_SPEED_X_PER_W = 1/120;
const PLAYER_JUMP_Y_PER_W = -1/60;
const GRAVITY_PER_H = -PLAYER_JUMP_Y_PER_W/48;

const SAVE_KEY_BESTSCORE = "cliff-bestScore";

const BACK_COLOR = 0x205070;    // index.htmlで設定
const FONT_COLOR = 0xc0c4d0;
const PLAYER_COLOR = 0xff00b0;
const WALL_COLOR = 0xe0e0e0;

class Game {

    static hard:number;
    static speed:number;
    
    static loadSceneGamePlay() {

        Game.hard = 0;
        Game.speed = 0;
        
        new Player();
        new Wave();

        new StartMessage();
        new Score();
    }

}
