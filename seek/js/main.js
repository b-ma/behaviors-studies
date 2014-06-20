var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = ctx.canvas.width = 500;
var height = ctx.canvas.height = 200;

var nbrShapes = 10;
var shapes = [];

for (var i = 0; i < nbrShapes; i++) {
    var shape = new Shape(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    shapes.push(shape);
}
var mouse = new Vector;

canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
}, false);

(function loop() {
    // add layer to scene
    ctx.save();
    ctx.fillStyle = '#000000';
    // ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // update scene
    for (var i in shapes) {
        shapes[i].update(width, height, mouse);
        shapes[i].display(ctx);
    }

    //  draw mouse position
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2, false)
    ctx.fill();

    requestAnimationFrame(loop);
}());
