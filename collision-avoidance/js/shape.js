var Shape =  function(x, y) {
    this.position = new Vector(x, y);
    // this.position = new Vector(0, height / 2);
    this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    // this.velocity = new Vector(1, 0);

    this.initialize.apply(this, arguments);
}

extend(Shape.prototype, {
    initialize: function(x, y) {
        this.MAX_VELOCITY = 2;
        this.MAX_SEE_AHEAD = 20; // Math.random() * 100
        this.MAX_AVOIDANCE_FORCE = 2;
        this.mass = Math.random() * 30;
    },

    passThrough: function(w, h) {
        if (this.position.x > w + this.MAX_SEE_AHEAD) { this.position.x = 0; }
        if (this.position.x < 0 - this.MAX_SEE_AHEAD) { this.position.x = w; }
        if (this.position.y > h + this.MAX_SEE_AHEAD) { this.position.y = 0; }
        if (this.position.y < 0 - this.MAX_SEE_AHEAD) { this.position.y = h; }
    },

    bounce: function(w, h) {
        if (this.position.x < 0 || this.position.x > w) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > h) {
            this.velocity.y *= -1;
        }
    },

    update: function(w, h, target, obstacles) {
        this.velocity.normalize();
        // do stuff here
        var ahead = Vector.add(this.position, this.velocity.clone().normalize(this.MAX_SEE_AHEAD));
        var ahead2 = Vector.add(this.position, this.velocity.clone().normalize(this.MAX_SEE_AHEAD * 0.5));

        var closestObstacle;
        var closestObstacleDistance = Infinity;

        obstacles.forEach(function(obstacle) {
            obstacle.setIsThreatening(false);
            var distance = Vector.distance(ahead, obstacle.position);
            var distance2 = Vector.distance(ahead2, obstacle.position);

            if (distance < obstacle.radius && distance < closestObstacleDistance) {
                closestObstacleDistance = distance;
                closestObstacle = obstacle;
            }

            if (distance2 < obstacle.radius && distance2 < closestObstacleDistance) {
                closestObstacleDistance = distance2;
                closestObstacle = obstacle;
            }
        }, this);

        if (closestObstacle) {
            closestObstacle.setIsThreatening(true);

            var avoidanceForce = Vector.substract(ahead, closestObstacle.position);
            avoidanceForce.normalize(this.MAX_AVOIDANCE_FORCE)

            var desiredVelocity = Vector.add(this.velocity, avoidanceForce);
            desiredVelocity
                .normalize()
                .divide(this.mass);

            this.velocity.add(desiredVelocity);
        }

        this.velocity.truncate(this.MAX_VELOCITY);

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
