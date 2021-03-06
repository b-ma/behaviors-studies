//  configuration
var SHAPE_COUNT = 6;
var shapes = [];

var width = 500;
var height = 200;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var select = document.getElementById('select');

ctx.canvas.width = width;
ctx.canvas.height = height;

canvas.style.width = width + 'px';
canvas.style.height = height + 'px';

//  init shapes
for (var i = 0; i < SHAPE_COUNT; i++) {
    var x = Math.random() * ctx.canvas.width;
    var y = Math.random() * ctx.canvas.height;
    var type = i === 0 ? 'wander' : 'pursuit';
    var shape = new Shape(x, y, type);
    shapes.push(shape);
}

//  listen mouse
var mouse = new Vector;

canvas.addEventListener('click', function(e) {
    e.preventDefault();
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
}, false);

select.addEventListener('change', function(e) {
    shapes.forEach(function(shape) {
        if (shape.behaviorName === 'wander') { return; }
        shape.setBehavior(select.value)
    });
});

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
        // chasing the first shape (wander shape)
        shape.update(width, height, shapes[0]);
        shape.display(ctx);
    });

    //  draw mouse position
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2, false)
    ctx.fill();

    requestAnimationFrame(loop);
}());
