var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = 500;
ctx.canvas.height = 200;

var nbrDots = 50;
var dots = [];

console.logOnce = (function() {
    var logged = false;

    return function() {
        if (logged) return;
        console.log.apply(console, arguments);
        logged = true;
    }
}());

for (var i = 0; i < nbrDots; i++) {
    var dot = new Dot(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    dots.push(dot);
}

(function loop() {
    ctx.fillStyle = '#000000';
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var i in dots) {
        dots[i].update(ctx.canvas.width, ctx.canvas.height, dots);
        dots[i].display(ctx);
    }

    requestAnimationFrame(loop);
}());
