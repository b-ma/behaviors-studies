var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = ctx.canvas.width = 500;
var height = ctx.canvas.height = 200;

var nbrShapes = 1;
var shapes = [];

for (var i = 0; i < nbrShapes; i++) {
    var shape = new Shape(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    shapes.push(shape);
}
var mouse = { x: -1, y: -1 };

canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
}, false);

(function loop() {
    // add layer to scene
    ctx.save();
    ctx.fillStyle = '#000000';
    // ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    // update scene
    //*
    for (var i in shapes) {
        shapes[i].update(ctx.canvas.width, ctx.canvas.height, shapes);
        shapes[i].display(ctx);
    }
    // */

    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2, false)
    ctx.fill();

    requestAnimationFrame(loop);
}());
