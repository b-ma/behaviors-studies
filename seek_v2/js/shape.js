var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.MAX_VELOCITY = 2;
    this.mass = Math.random() * 30;
}

extend(Shape.prototype, {
    bounce: function(w, h) {
        if (this.position.x > w + 100) { this.position.x = 0; }
        if (this.position.x < 0 - 100) { this.position.x = w; }
        if (this.position.y > h + 100) { this.position.y = 0; }
        if (this.position.y < 0 - 100) { this.position.y = h; }
    },

    update: function(w, h, mouse) {
        this.velocity.normalize();

        var desiredVelocity = Vector.substract(mouse, this.position);
        var steering = Vector.substract(desiredVelocity, this.velocity);

        steering
            .normalize()
            .divide(this.mass);

        this.velocity
            .add(steering)
            .normalize(this.MAX_VELOCITY);

        this.position.add(this.velocity);
        this.bounce(w, h);
    },

    display: function(ctx) {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.velocity.direction());

        // draw shape
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        // ctx.moveTo(-4, 4);
        // ctx.lineTo(-4, -4);
        // ctx.lineTo(6, 0);
        ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.restore();
    }
});
