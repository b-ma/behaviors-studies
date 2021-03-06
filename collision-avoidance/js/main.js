//  configuration
var SHAPE_COUNT = 20;
var shapes = [];
var obstacles = [];

var width = 500;
var height = 200;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;

canvas.style.width = width + 'px';
canvas.style.height = height + 'px';

//  init shapes
for (var i = 0; i < SHAPE_COUNT; i++) {
    var x = Math.random() * ctx.canvas.width;
    var y = Math.random() * ctx.canvas.height;
    var shape = new Shape(x, y);
    shapes.push(shape);
}

//  listen mouse
var mouse = new Vector;

canvas.addEventListener('click', function(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;

    var obstacle = new Obstacle(mouse.x, mouse.y, Math.random() * 30);
    obstacles.push(obstacle);
}, false);

//  loop
(function loop() {
    // add layer to scene
    ctx.save();
    ctx.fillStyle = '#000000';
    // ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // update scene
    shapes.forEach(function(shape, index) {
        shape.update(width, height, mouse, obstacles);
        shape.display(ctx);
    });

    obstacles.forEach(function(obstacle, index) {
        obstacle.display(ctx);
    });

    //  draw mouse position
    //  ctx.beginPath();
    //  ctx.fillStyle = '#ff0000';
    //  ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2, false)
    //  ctx.fill();

    requestAnimationFrame(loop);
}());
