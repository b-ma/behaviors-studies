var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.initialize.apply(this, arguments);
}

extend(Shape.prototype, {
    initialize: function(x, y) {
        this.MAX_SPEED = 2;
        this.MAX_FORCE = 2;
        this.mass = Math.random() * 100;
    },

    passThrough: function(w, h) {
        if (this.position.x > w) { this.position.x = 0; }
        if (this.position.x < 0) { this.position.x = w; }
        if (this.position.y > h) { this.position.y = 0; }
        if (this.position.y < 0) { this.position.y = h; }
    },

    bounce: function(w, h) {
        if (this.position.x < 0 || this.position.x > w) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > h) {
            this.velocity.y *= -1;
        }
    },

    update: function(w, h, target) {
        var steering = new Vector();

        // do stuff here

        steering
            .divide(this.mass)
            .truncate(this.MAX_FORCE);

        this.velocity
            .add(steering)
            .truncate(this.MAX_SPEED);

        this.position.add(this.velocity);
        this.passThrough(w, h);
        // this.bounce(w, h);
    },

    setBehavior: function() {
        // use stategy pattern
    },

    display: function(ctx) {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.velocity.direction());

        // draw shape
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.moveTo(-4, 4);
        ctx.lineTo(-4, -4);
        ctx.lineTo(6, 0);
        ctx.fill();

        ctx.restore();
    }
});
