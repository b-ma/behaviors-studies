var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.maxVelocity = 2;
}

extend(Shape.prototype, {
    bounce: function(w, h) {
        if (this.position.x > w) { this.position.x = 0; }
        if (this.position.x < 0) { this.position.x = w; }
        if (this.position.y > h) { this.position.y = 0; }
        if (this.position.y < 0) { this.position.y = h; }
    },

    update: function(w, h) {
        this.velocity.normalize(this.maxVelocity);

        this.position.add(this.velocity);

        this.bounce(w, h);
    },

    display: function(ctx) {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.velocity.direction());

        // draw shape
        ctx.fillStyle = '#ffffff';
        ctx.moveTo(-4, 4);
        ctx.lineTo(-4, -4);
        ctx.lineTo(6, 0);
        ctx.fill();

        ctx.restore();
    }
});