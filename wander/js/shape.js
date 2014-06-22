var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.initialize.apply(this, arguments);
}

extend(Shape.prototype, {
    initialize: function(x, y) {
        this.MAX_VELOCITY = 2;
        this.CIRCLE_DISTANCE = 50;
        this.CIRCLE_RADIUS = 20;
        this.wanderAngle = Math.random() * (2 * Math.PI) - Math.PI;
        this.ANGLE_CHANGE = Math.PI / 6;
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
        this.velocity.normalize();
        var steering = this.wank()

        steering
            .normalize()
            .divide(this.mass);
        // add steering force
        this.velocity
            .add(steering)
            .normalize(this.MAX_SPEED);

        this.position.add(this.velocity);
        this.passThrough(w, h);
        // this.bounce(w, h);
    },

    wank: function() {
        // define circle center
        var circleCenter = this.velocity.clone();
        circleCenter.normalize(this.CIRCLE_DISTANCE);
        // define displacement force
        var displacement = new Vector(0, -1);
        displacement
            .multiply(this.CIRCLE_RADIUS)
            .setAngle(this.wanderAngle);

        this.wanderAngle += Math.random() * this.ANGLE_CHANGE - (this.ANGLE_CHANGE * 0.5);

        return Vector.add(circleCenter, displacement);
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
