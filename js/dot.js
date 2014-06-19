var Dot = function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.distance = 10;
};

Dot.prototype.update = function(w, h, dots) {
    var v = new Vector(0, 0);

    v.add(this.computeAlignment(dots).normalize(0.4));
    v.add(this.computeCohesion(dots).normalize(0.4));
    v.add(this.computeSeparation(dots).normalize(0.5));

    v.normalize();
    this.velocity.add(v);

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

    return v;
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
    return v;
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

    return v;
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
    ctx.rotate(this.velocity.direction());

    ctx.beginPath();
    ctx.moveTo(-3, 3);
    ctx.lineTo(-3, -3);
    ctx.lineTo(5, 0);
    // ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();
};
