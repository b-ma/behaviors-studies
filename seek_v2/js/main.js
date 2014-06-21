var SHAPE_COUNT = 20;
var shapes = [];

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = ctx.canvas.width = 500;
var height = ctx.canvas.height = 200;


for (var i = 0; i < SHAPE_COUNT; i++) {
    var shape = new Shape(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    shapes.push(shape);
}
var mouse = new Vector;

// canvas.addEventListener('click', function(e) {
(function updateTarget() {
    mouse.x = Math.random() * width;
    mouse.y = Math.random() * height;
    setTimeout(updateTarget, 2 * 3000 * Math.random() + 1500);
}());
// }, false);

(function loop() {
    // add layer to scene
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.05;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // update scene
    for (var i in shapes) {
        shapes[i].update(width, height, mouse);
        shapes[i].display(ctx);
    }

    //  draw mouse position
    //  ctx.beginPath();
    //  ctx.fillStyle = '#ff0000';
    //  ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2, false)
    //  ctx.fill();

    requestAnimationFrame(loop);
}());
