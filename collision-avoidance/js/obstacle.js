var Obstacle = function(x, y, radius) {
    this.position = new Vector(x, y);
    this.radius = radius;
    this.setIsThreatening(false);
}

extend(Obstacle.prototype, {
    setIsThreatening: function(value) {
        this.color = value ? '#ff4000' : '#0040ff'
    },

    display: function(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.position.x, this.position.y);
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.restore();
    }
});
