var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.initialize.apply(this, arguments);
}

extend(Shape.prototype, {
    initialize: function(x, y, behavior) {
        this.MAX_SPEED = 3;
        this.MAX_FORCE = 2;
        // this.TIME_AHEAD = 3;
        this.CIRCLE_DISTANCE = 50;
        this.CIRCLE_RADIUS = 20;
        this.wanderAngle = 0;
        this.ANGLE_CHANGE = Math.PI / 6;

        this.mass = Math.random() * 1000;
        this.color = (behavior === 'wander') ? '#ff0000' : '#ffffff' ;

        this.setBehavior(behavior);
    },

    setBehavior: function(behavior) {
        this.behaviorName = behavior;
        this.behavior = this[behavior];
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

    wander: function() {
        var circleCenter = this.velocity.clone();
        circleCenter.normalize(this.CIRCLE_DISTANCE);

        var displacement = new Vector(1, 0);
        displacement
            .setAngle(this.wanderAngle)
            .normalize(this.CIRCLE_RADIUS);

        this.wanderAngle += Math.random() * this.ANGLE_CHANGE - (this.ANGLE_CHANGE * 0.5);
        return displacement;
    },

    pursuit: function(target) {
        var distance = Vector.substract(target.position, this.position);
        var timeAhead = distance.magnitude() / this.MAX_SPEED;
        var targetVelocity = target.velocity.clone();
        var futurePosition = Vector.add(target.position, targetVelocity.multiply(timeAhead));
        return this.seek(futurePosition);
    },

    evade: function(target) {
        var distance = Vector.substract(target.position, this.position);
        var timeAhead = distance.magnitude() / this.MAX_SPEED;
        var targetVelocity = target.velocity.clone();
        var futurePosition = Vector.add(target.position, targetVelocity.multiply(timeAhead));
        return this.flee(futurePosition);
    },

    seek: function(targetPosition) {
        var desiredVelocity = Vector.substract(targetPosition, this.position);
        var steering = Vector.substract(desiredVelocity, this.velocity);
        return steering;
    },

    flee: function(targetPosition) {
        var desiredVelocity = Vector.substract(targetPosition, this.position);
        var steering = Vector.substract(desiredVelocity, this.velocity);
        steering.multiply(-1);
        return steering;
    },

    update: function(w, h, target) {
        // do stuff here
        var steering = new Vector();
        steering.add(this.behavior(target));

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

    display: function(ctx) {
        ctx.save();
        // move context
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.velocity.direction());
        // draw shape
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(-4, 4);
        ctx.lineTo(-4, -4);
        ctx.lineTo(6, 0);
        ctx.fill();

        ctx.restore();
    }
});
