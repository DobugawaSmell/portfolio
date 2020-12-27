
/**
 * 座標を管理するためのクラス
 */
class Position {
    /**
     * @constructor
     * @param {number} x - X 座標
     * @param {number} y - Y 座標
     */
    constructor(x, y){
        /**
         * X 座標
         * @type {number}
         */
        this.x = x;
        /**
         * Y 座標
         * @type {number}
         */
        this.y = y;
    }

    /**
     * 値を設定する
     * @param {number} [x] - 設定する X 座標
     * @param {number} [y] - 設定する Y 座標
     */
    set(x, y){
        if(x != null){this.x = x;}
        if(y != null){this.y = y;}
    }
}


// グローバル汚染を避けるために即時関数を使って全体を囲う
(() => {
    /**
     * 描画対象となる Canvas Element
     * @type {HTMLCanvasElement}
     */
    let canvas = null;
    /**
     * Canvas2D API のコンテキスト
     * @type {CanvasRenderingContext2D}
     */
    let ctx = null;

    /**
     * 生成するオブジェクトの数
     * @type {number}
     */
    const OBJECT_COUNT = 800;

    /**
     * 生成するオブジェクトの数
     * @type {number}
     */
    const NOISE_COUNT = 10000;

    /**
     * Canvas2D API をラップしたユーティリティクラス
     * @type {Canvas2DUtility}
     */
    let util = null;

    /**
     * オブジェクトのポジションの配列
     * @type {Array<Position>}
     */
    let positArray = [];

    /**
     * ランダム変数の配列
     * @type {Array<number>}
     */
    let randArray = [];

    /**
     * ページのロードが完了したときに発火する load イベント
     */
    window.addEventListener('load', () => {
        // ユーティリティクラスを初期化
        util = new Canvas2DUtility(document.body.querySelector('#main_canvas'));
        // ユーティリティクラスから canvas を取得
        canvas = util.canvas;
        // ユーティリティクラスから 2d コンテキストを取得
        ctx = util.context;
        // 初期化処理を行う
        initialize();
        // 描画処理を行う
        render();
    }, false);

    /**
     * canvas やコンテキストを初期化する
     */
    function initialize(){
        for(let i=0; i<OBJECT_COUNT; i++){
            positArray[i] = new Position(generateRandomInt(canvas.width),generateRandomInt(canvas.height));
            randArray[i] = generateRandomFloat(1);
        }

        util.drawRect(0,0,canvas.width,canvas.height,'#4B8376');
        // canvas 全体を塗りつぶす
        // @param {number} x - 塗りつぶす矩形の左上角の X 座標
        // @param {number} y - 塗りつぶす矩形の左上角の Y 座標
        // @param {number} w - 塗りつぶす矩形の横幅
        // @param {number} h - 塗りつぶす矩形の高さ
        //ctx.fillRect(0, 0, canvas.width, canvas.height,'#4B8376');

        startTime = Date.now();
        
    }

    /**
     * 塗り色を設定し塗りつぶす
     */
    function render(){
        elapsedTime = Date.now() - startTime;

        //ランダムな数を取得
        rand1 = generateRandomInt(canvas.width);
        for(let i=0;i < NOISE_COUNT; i++){
            util.drawRect(generateRandomFloat(canvas.width),generateRandomFloat(canvas.width),2,2,'#4B8376');
        }

        //オブジェクトを描写
        for(let i=0; i< OBJECT_COUNT; i++){
            positArray[i].x += Math.sin(elapsedTime*randArray[i]);
            positArray[i].y += 1;
            if(positArray[i].y > canvas.height){
                positArray[i] = new Position(generateRandomFloat(canvas.width),0);
            }
        }

        for(let i=0; i<OBJECT_COUNT; i++){
            if(i < 600){
                util.drawCircle(positArray[i].x, positArray[i].y,4,'#222222');
            }else{
                util.drawCircle(positArray[i].x, positArray[i].y,3,'#AAAAAA');
            }
        }

        // 恒常ループのために描画処理を再帰呼出しする
        requestAnimationFrame(render);
    }

    /**
     * 特定の範囲におけるランダムな整数の値を生成する
     * @param {number} range - 乱数を生成する範囲（0 以上 ～ range 未満）
     */
    function generateRandomInt(range){
        let random = Math.random();
        return Math.floor(random * range);
    }

    /**
     * 特定の範囲におけるランダムな整数の値を生成する
     * @param {number} range - 乱数を生成する範囲（0 以上 ～ range 未満）
     */
    function generateRandomFloat(range){
        let random = Math.random();
        return random * range;
    }
})();