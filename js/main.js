var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = 500;
ctx.canvas.height = 200;

var dots = [];

var Dot = function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.distance = 100;
};

Dot.prototype.update = function(w, h, dots) {

    this.computeAlignment(dots);
    this.computeCohesion(dots);
    this.computeSeparation(dots);

    // if (this.velocity.x === 0) { this.velocity.x = 0.2; }
    // if (this.velocity.y === 0) { this.velocity.y = 0.2; }

    this.bounce(w, h);
    this.velocity.normalize();


    // update pos with velocity
    this.position.add(this.velocity);
};

Dot.prototype.getDistance = function(position) {
    var distVector = Vector.substract(this.position, position);
    return distVector.magnitude();
}

Dot.prototype.computeAlignment = function(dots) {
    var v = new Vector(0, 0);
    var neighborCount = 0;

    for (var i in dots) {
        if (dots[i] === this) { continue; }

        if (this.getDistance(dots[i].position) < this.distance) {
            v.add(dots[i].velocity);
            neighborCount += 1;
        }
    }

    if (neighborCount === 0) { return v; }

    v.divide(neighborCount);
    v.normalize(0.1);

    this.velocity.add(v);
};

Dot.prototype.computeCohesion = function(dots) {
    var v = new Vector(0, 0);
    var neighborCount = 0;

    for (var i in dots) {
        if (dots[i] === this) { continue; }

        if (this.getDistance(dots[i].position) < this.distance) {
            v.add(dots[i].position);
            neighborCount += 1;
        }
    }

    if (neighborCount === 0) { return v; }

    v.divide(neighborCount);
    v.normalize(0.4);

    this.velocity.add(v);
};

Dot.prototype.computeSeparation = function(dots) {
    var v = new Vector(0, 0);
    var neighborCount = 0;

    for (var i in dots) {
        if (dots[i] === this) { continue; }

        if (this.getDistance(dots[i].position) < this.distance) {
            v.add(Vector.substract(dots[i].position, this.position));
            neighborCount += 1;
        }
    }

    if (neighborCount === 0) { return v }

    v.divide(neighborCount);
    v.multiply(-1);
    v.normalize(0.8);

    this.velocity.add(v);
}

Dot.prototype.bounce = function(w, h) {
    if (this.position.x < 0 || this.position.x > w) {
        this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > h) {
        this.velocity.y *= -1;
    }
};

Dot.prototype.display = function(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
};

var nbrDots = 50;

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