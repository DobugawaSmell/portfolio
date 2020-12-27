/**
 * 基本のポジションクラス
 */

 class Position{
    /**
     * @constructor
     * @param {number} x - X 座標
     * @param {number} y - Y 座標
     */

     constructor(x,y){
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
 }



/**
 * ものをかくクラスを作成
 */

class ellipse{
    /**
     * @constructor
     * @param {number} x -X座標
     * @param {number} y -Y座標
     * @param {number} w -幅
     * @param {number} h -高さ
     */

     /**
      * Canvas2D API をラップしたユーティリティクラス
      * @type {Canvas2DUtility}
      */
     let util = null;
}