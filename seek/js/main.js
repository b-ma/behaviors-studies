var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = 500;
ctx.canvas.height = 200;

var nbrDots = 50;
var dots = [];

for (var i = 0; i < nbrDots; i++) {
    var dot = new Dot(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    dots.push(dot);
}

(function loop() {
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    for (var i in dots) {
        dots[i].update(ctx.canvas.width, ctx.canvas.height, dots);
        dots[i].display(ctx);
    }

    requestAnimationFrame(loop);
}());
