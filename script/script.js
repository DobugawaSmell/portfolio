//準備
let cursorR = 4;  //カーソルの半径

window.onload = function() {
    const cursor = document.getElementById('cursor');  //カーソル用のdivを取得
}

//上記のdivタグをマウスに追従させる処理
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});