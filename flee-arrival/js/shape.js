var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.initialize.apply(this, arguments);
}

extend(Shape.prototype, {
    initialize: function(x, y, behavior) {
        this.MAX_VELOCITY = 2;
        this.mass = Math.random() * 20;

        this.setBehavior(behavior);
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

        if (this.position.y < 0 || this.position.y > w) {
            this.velocity.x *= -1;
        }
    },

    update: function(w, h, target) {
        // do stuff here
        this.behavior.apply(this, arguments);

        this.position.add(this.velocity);
        this.passThrough(w, h);
    },

    setBehavior: function(name) {
        switch (name) {
            case 'flee':
                this.behavior = this.fleeBehavior;
                break;
            case 'arrival':
                this.behavior = this.arrivalBehavior;
                break;
        }
    },

    fleeBehavior: function(w, h, target) {
        this.velocity.normalize();

        var desiredVelocity = Vector.substract(target, this.position);

        desiredVelocity
            .normalize()
            .multiply(-1);

        var steering = Vector.substract(desiredVelocity, this.velocity);

        steering
            .normalize()
            .divide(this.mass);

        this.velocity
            .add(steering)
            .normalize(this.MAX_VELOCITY);
    },

    arrivalBehavior: function(w, h, target) {
        var slowingRadius = 200;
        this.velocity.normalize();

        var desiredVelocity = Vector.substract(target, this.position);
        var distance = desiredVelocity.magnitude();
        desiredVelocity.normalize();

        if (distance < slowingRadius) {
            desiredVelocity.multiply(distance / slowingRadius);
        }

        var steering = Vector.substract(desiredVelocity, this.velocity);

        this.velocity
            .add(steering)
            .truncate(this.MAX_VELOCITY);
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
